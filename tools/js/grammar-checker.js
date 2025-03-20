// Grammar Checker Implementation
class GrammarChecker {
    constructor() {
        this.textInput = document.getElementById('textInput');
        this.checkBtn = document.getElementById('checkBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.resultSection = document.getElementById('resultSection');
        this.progressBar = document.getElementById('progressBar');
        this.textWithHighlights = document.getElementById('textWithHighlights');
        this.grammarScore = document.getElementById('grammarScore');
        this.issuesFound = document.getElementById('issuesFound');
        this.wordsChecked = document.getElementById('wordsChecked');
        this.readabilityScore = document.getElementById('readabilityScore');
        this.languageSelect = document.getElementById('languageSelect');

        // Grammar rules and patterns
        this.grammarRules = {
            subjectVerbAgreement: {
                pattern: /\b(he|she|it)\s+(are|were|have)\b|\b(I|you|we|they)\s+(is|was|has)\b/gi,
                message: 'Subject-verb agreement error'
            },
            articleUsage: {
                pattern: /\b(a\s+[aeiou]|an\s+[^aeiou])\w+/gi,
                message: 'Incorrect article usage'
            },
            doublePunctuation: {
                pattern: /[.!?]{2,}|\s+[.,]|[.,]\s+[.,]/g,
                message: 'Incorrect punctuation'
            },
            commonMisspellings: {
                pattern: /\b(teh|recieve|seperate|occured|alot)\b/gi,
                message: 'Common misspelling'
            },
            passiveVoice: {
                pattern: /\b(am|is|are|was|were)\s+\w+ed\b/gi,
                message: 'Consider using active voice'
            },
            wordiness: {
                pattern: /\b(in order to|due to the fact that|at this point in time)\b/gi,
                message: 'Consider using a more concise expression'
            }
        };

        // Advanced NLP patterns
        this.nlpPatterns = {
            // Contextual grammar patterns
            contextualErrors: new Map([
                ['their|there|they\'re', (text, match) => this.checkContextualUsage(text, match)],
                ['its|it\'s', (text, match) => this.checkPossessiveUsage(text, match)],
                ['affect|effect', (text, match) => this.checkVerbNounUsage(text, match)]
            ]),
            // Sentence structure analysis
            sentenceStructure: {
                runOn: /[^.!?]+(?=[.!?])[^.!?]+(?=[.!?])/g,
                fragmentary: /\b(Because|Although|Unless|If)\s+[^.!?]*[.!?]/g
            }
        };

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.checkBtn.addEventListener('click', () => this.checkGrammar());
        this.clearBtn.addEventListener('click', () => this.clearText());
        this.textInput.addEventListener('input', () => this.handleRealTimeCheck());
    }

    async checkGrammar() {
        const text = this.textInput.value.trim();
        if (!text) return;

        this.showProgress();
        const results = await this.analyzeText(text);
        this.displayResults(results);
        this.hideProgress();
    }

    async analyzeText(text) {
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
        const results = {
            errors: [],
            suggestions: [],
            stats: {
                totalWords: text.split(/\s+/).length,
                issues: 0,
                readabilityScore: this.calculateReadability(text)
            }
        };

        // Check basic grammar rules
        Object.entries(this.grammarRules).forEach(([type, rule]) => {
            const matches = text.matchAll(rule.pattern);
            for (const match of matches) {
                results.errors.push({
                    type,
                    message: rule.message,
                    index: match.index,
                    length: match[0].length,
                    context: this.getErrorContext(text, match.index)
                });
            }
        });

        // Advanced NLP analysis
        await this.performAdvancedAnalysis(text, results);

        results.stats.issues = results.errors.length;
        results.stats.grammarScore = this.calculateGrammarScore(results.stats.issues, results.stats.totalWords);

        return results;
    }

    async performAdvancedAnalysis(text, results) {
        // Contextual analysis
        for (const [pattern, checker] of this.nlpPatterns.contextualErrors) {
            const matches = text.match(new RegExp(`\\b(${pattern})\\b`, 'gi'));
            if (matches) {
                for (const match of matches) {
                    const error = await checker(text, match);
                    if (error) results.errors.push(error);
                }
            }
        }

        // Sentence structure analysis
        Object.entries(this.nlpPatterns.sentenceStructure).forEach(([type, pattern]) => {
            const matches = text.match(pattern);
            if (matches) {
                matches.forEach(match => {
                    results.errors.push({
                        type,
                        message: type === 'runOn' ? 'Consider breaking this into multiple sentences' : 'Incomplete sentence',
                        index: text.indexOf(match),
                        length: match.length,
                        context: this.getErrorContext(text, text.indexOf(match))
                    });
                });
            }
        });
    }

    calculateReadability(text) {
        const words = text.split(/\s+/).length;
        const sentences = (text.match(/[.!?]+/g) || []).length || 1;
        const syllables = this.countSyllables(text);
        
        // Flesch Reading Ease Score
        return Math.round(206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words));
    }

    countSyllables(text) {
        return text.toLowerCase()
            .replace(/[^a-z]/g, '')
            .replace(/[^aeiouy]*[aeiouy]+/g, 'a')
            .length;
    }

    calculateGrammarScore(issues, totalWords) {
        const baseScore = 100;
        const deduction = (issues / totalWords) * 100;
        return Math.max(0, Math.round(baseScore - deduction));
    }

    getErrorContext(text, index) {
        const contextLength = 50;
        const start = Math.max(0, index - contextLength);
        const end = Math.min(text.length, index + contextLength);
        return text.slice(start, end);
    }

    displayResults(results) {
        this.resultSection.style.display = 'block';
        this.grammarScore.textContent = `${results.stats.grammarScore}%`;
        this.issuesFound.textContent = results.stats.issues;
        this.wordsChecked.textContent = results.stats.totalWords;
        this.readabilityScore.textContent = results.stats.readabilityScore;

        // Display highlighted text with errors
        let highlightedText = this.textInput.value;
        results.errors.forEach(error => {
            const errorSpan = `<span class="error" data-error="${error.message}">${highlightedText.slice(error.index, error.index + error.length)}</span>`;
            highlightedText = highlightedText.slice(0, error.index) + errorSpan + highlightedText.slice(error.index + error.length);
        });

        this.textWithHighlights.innerHTML = highlightedText;
    }

    clearText() {
        this.textInput.value = '';
        this.resultSection.style.display = 'none';
    }

    showProgress() {
        this.progressBar.style.display = 'block';
        this.progressBar.querySelector('.progress-bar').style.width = '100%';
    }

    hideProgress() {
        this.progressBar.style.display = 'none';
        this.progressBar.querySelector('.progress-bar').style.width = '0%';
    }

    // Real-time checking with debounce
    handleRealTimeCheck() {
        clearTimeout(this.checkTimeout);
        this.checkTimeout = setTimeout(() => this.checkGrammar(), 1000);
    }

    // Advanced contextual checking methods
    async checkContextualUsage(text, match) {
        // Implement context-aware checking for their/there/they're
        const context = this.getErrorContext(text, text.indexOf(match));
        // Add your implementation here
    }

    async checkPossessiveUsage(text, match) {
        // Implement context-aware checking for its/it's
        const context = this.getErrorContext(text, text.indexOf(match));
        // Add your implementation here
    }

    async checkVerbNounUsage(text, match) {
        // Implement context-aware checking for affect/effect
        const context = this.getErrorContext(text, text.indexOf(match));
        // Add your implementation here
    }
}

// Initialize the grammar checker
document.addEventListener('DOMContentLoaded', () => {
    new GrammarChecker();
});