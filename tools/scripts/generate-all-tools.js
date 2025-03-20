const fs = require('fs');
const path = require('path');
const toolsData = require('../js/tools-data.js');

// Tool templates for different categories
const templates = {
    imageTools: {
        type: 'image',
        instructions: [
            'Upload your image by dragging it or clicking "Choose File"',
            'Preview the image content',
            'Select your desired quality settings',
            'Adjust advanced settings if needed',
            'Click "Convert" to start conversion',
            'Download your converted image'
        ],
        features: [
            'Support for multiple image formats',
            'High-quality conversion',
            'Preview before download',
            'Adjustable quality settings',
            'Fast processing'
        ]
    },
    textTools: {
        type: 'text',
        instructions: [
            'Enter or paste your text in the input area',
            'Configure text processing options',
            'Click "Process" to analyze/convert the text',
            'Review the results',
            'Copy or download the processed text'
        ],
        features: [
            'Real-time text processing',
            'Multiple text formats supported',
            'Advanced text analysis',
            'Copy and download options',
            'Fast and accurate results'
        ]
    },
    documentTools: {
        type: 'document',
        instructions: [
            'Upload your document by dragging it or clicking "Choose File"',
            'Preview the document content',
            'Select conversion options',
            'Click "Convert" to start processing',
            'Download your converted document'
        ],
        features: [
            'Support for multiple document formats',
            'High-quality conversion',
            'Preview before download',
            'Maintain original formatting',
            'Fast processing speed'
        ]
    },
    mediaTools: {
        type: 'media',
        instructions: [
            'Upload your media file by dragging it or clicking "Choose File"',
            'Preview the media content',
            'Select your desired format and quality',
            'Click "Convert" to start conversion',
            'Download your converted file'
        ],
        features: [
            'Support for multiple media formats',
            'High-quality conversion',
            'Preview before download',
            'Adjustable quality settings',
            'Fast processing'
        ]
    },
    developerTools: {
        type: 'developer',
        instructions: [
            'Enter or paste your code/data',
            'Configure formatting options',
            'Click "Process" to format/validate',
            'Review the results',
            'Copy or download the processed code'
        ],
        features: [
            'Multiple format support',
            'Syntax highlighting',
            'Error detection',
            'Copy and download options',
            'Fast processing'
        ]
    },
    utilityTools: {
        type: 'utility',
        instructions: [
            'Enter your input data',
            'Configure processing options',
            'Click "Process" to start',
            'Review the results',
            'Copy or download the output'
        ],
        features: [
            'Easy to use interface',
            'Multiple options available',
            'Fast processing',
            'Accurate results',
            'Free to use'
        ]
    }
};

// Generate all tool pages
Object.entries(toolsData).forEach(([category, tools]) => {
    const template = templates[category];
    
    tools.forEach(tool => {
        const toolData = {
            name: tool.name,
            description: tool.description,
            type: template.type,
            instructions: template.instructions,
            features: template.features
        };

        const html = generateToolHTML(toolData);
        const outputPath = path.join(__dirname, '..', 'tools', `${tool.id}.html`);
        
        try {
            fs.writeFileSync(outputPath, html);
            console.log(`Generated: ${tool.id}.html`);
        } catch (error) {
            console.error(`Error generating ${tool.id}.html:`, error);
        }
    });
});
