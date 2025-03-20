document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchContainer = document.querySelector('.search-container');
    const healthToolsList = document.getElementById('healthToolsList');
    const popularToolsList = document.getElementById('popularToolsList');
    const imageToolsList = document.getElementById('imageToolsList');
    const textToolsList = document.getElementById('textToolsList');
    const documentToolsList = document.getElementById('documentToolsList');
    const mediaToolsList = document.getElementById('mediaToolsList');
    const developerToolsList = document.getElementById('developerToolsList');
    const utilityToolsList = document.getElementById('utilityToolsList');

    // Create search suggestions dropdown
    const suggestionsDropdown = document.createElement('div');
    suggestionsDropdown.className = 'search-suggestions dropdown-menu w-100 shadow-sm';
    suggestionsDropdown.style.display = 'none';
    searchContainer.appendChild(suggestionsDropdown);

    let selectedSuggestionIndex = -1;

    // Create tool card HTML with enhanced animation and styling
    function createToolCard(tool) {
        return `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <a href="${tool.path}" class="text-decoration-none tool-link" data-tool-id="${tool.id}">
                    <div class="card tool-card h-100 border-0 shadow-sm">
                        ${tool.popular ? '<span class="popular-badge">Popular</span>' : ''}
                        <div class="card-body text-center">
                            <i class="bi ${tool.icon} tool-icon"></i>
                            <h5 class="card-title">${tool.name}</h5>
                            <p class="card-text text-muted">${tool.description}</p>
                        </div>
                    </div>
                </a>
            </div>
        `;
    }

    // Populate tool sections with improved grid layout
    function populateToolSection(containerId, tools) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="row">
                ${tools.map(tool => createToolCard(tool)).join('')}
            </div>
        `;

        // Add smooth navigation
        container.querySelectorAll('.tool-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const toolId = link.dataset.toolId;
                const tool = findToolById(toolId);
                if (tool && tool.path) {
                    link.classList.add('clicked');
                    setTimeout(() => {
                        window.location.href = tool.path;
                    }, 300);
                }
            });
        });
    }

    // Enhanced tool search with debouncing and suggestions
    let searchTimeout;
    function handleSearch() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            const allTools = [];
            const suggestions = [];
            
            Object.entries(toolsData).forEach(([category, tools]) => {
                tools.forEach(tool => {
                    tool.category = category;
                    allTools.push(tool);
                });
            });

            const filteredTools = allTools.filter(tool => {
                const match = tool.name.toLowerCase().includes(searchTerm) ||
                       tool.description.toLowerCase().includes(searchTerm);
                if (match && suggestions.length < 6) {
                    suggestions.push(tool);
                }
                return match;
            });

            if (searchTerm) {
                // Update suggestions dropdown
                if (suggestions.length > 0) {
                    suggestionsDropdown.innerHTML = suggestions.map((tool, index) => `
                        <a class="dropdown-item ${index === selectedSuggestionIndex ? 'active' : ''}" href="${tool.path}">
                            <i class="bi ${tool.icon} me-2"></i>
                            <span class="tool-name">${tool.name}</span>
                            <small class="text-muted ms-2">${tool.category.replace(/([A-Z])/g, ' $1').trim()}</small>
                        </a>
                    `).join('');
                    suggestionsDropdown.style.display = 'block';
                } else {
                    suggestionsDropdown.style.display = 'none';
                }

                document.querySelectorAll('section').forEach(section => {
                    if (section.id !== 'popularTools') {
                        section.style.display = 'none';
                    }
                });

                const popularHeader = document.querySelector('[data-category="popular"]');
                popularHeader.querySelector('span').textContent = `Search Results (${filteredTools.length})`;
                popularToolsList.classList.add('show');
                populateToolSection('popularToolsList', filteredTools);
            } else {
                suggestionsDropdown.style.display = 'none';
                selectedSuggestionIndex = -1;
                document.querySelectorAll('section').forEach(section => {
                    section.style.display = 'block';
                });
                const popularHeader = document.querySelector('[data-category="popular"]');
                popularHeader.querySelector('span').textContent = 'Popular Tools';
                initializeTools();
            }
        }, 300);
    }

    // Initialize all sections to be visible
    function initializeCategoryToggles() {
        document.querySelectorAll('.category-header').forEach(header => {
            const content = header.nextElementSibling;
            content.style.display = 'block';
            content.style.height = 'auto';
        });
    }

    // Helper function to find tool by ID
    function findToolById(toolId) {
        let foundTool = null;
        Object.values(toolsData).forEach(category => {
            const tool = category.find(t => t.id === toolId);
            if (tool) foundTool = tool;
        });
        return foundTool;
    }

    // Initialize popular tools section
    function populatePopularTools() {
        const popularTools = Object.values(toolsData)
            .flatMap(category => category.filter(tool => tool.popular));
        populateToolSection('popularToolsList', popularTools);
    }

    // Initialize all sections
    function initializeTools() {
        populatePopularTools();
        populateToolSection('healthToolsList', toolsData.healthTools);
        populateToolSection('imageToolsList', toolsData.imageTools);
        populateToolSection('textToolsList', toolsData.textTools);
        populateToolSection('documentToolsList', toolsData.documentTools);
        populateToolSection('mediaToolsList', toolsData.mediaTools);
        populateToolSection('developerToolsList', toolsData.developerTools);
        populateToolSection('utilityToolsList', toolsData.utilityTools);
    }

    // Event listeners
    // Add keyboard navigation for search suggestions
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('keydown', (e) => {
        const suggestions = suggestionsDropdown.querySelectorAll('.dropdown-item');
        if (suggestions.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedSuggestionIndex = (selectedSuggestionIndex + 1) % suggestions.length;
            updateSelectedSuggestion(suggestions);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedSuggestionIndex = selectedSuggestionIndex <= 0 ? suggestions.length - 1 : selectedSuggestionIndex - 1;
            updateSelectedSuggestion(suggestions);
        } else if (e.key === 'Enter' && selectedSuggestionIndex >= 0) {
            e.preventDefault();
            window.location.href = suggestions[selectedSuggestionIndex].href;
        } else if (e.key === 'Escape') {
            suggestionsDropdown.style.display = 'none';
            selectedSuggestionIndex = -1;
        }
    });

    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            suggestionsDropdown.style.display = 'none';
            selectedSuggestionIndex = -1;
        }
    });

    function updateSelectedSuggestion(suggestions) {
        suggestions.forEach((item, index) => {
            item.classList.toggle('active', index === selectedSuggestionIndex);
        });
    }

    searchInput.addEventListener('input', handleSearch);

    // Initialize the page
    initializeTools();
    initializeCategoryToggles();
});
