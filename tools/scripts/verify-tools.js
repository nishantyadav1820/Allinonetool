const fs = require('fs');
const path = require('path');

// Load tools data
const toolsData = {
    imageTools: [
        {
            id: 'image-resizer',
            name: 'Image Resizer',
            path: 'tools/image-resizer.html'
        },
        {
            id: 'image-compressor',
            name: 'Image Compressor',
            path: 'tools/image-compressor.html'
        },
        {
            id: 'image-to-png',
            name: 'Image to PNG',
            path: 'tools/image-to-png.html'
        },
        {
            id: 'image-to-jpg',
            name: 'Image to JPG',
            path: 'tools/image-to-jpg.html'
        }
    ],
    textTools: [
        {
            id: 'text-to-speech',
            name: 'Text to Speech',
            path: 'tools/text-to-speech.html'
        },
        {
            id: 'word-counter',
            name: 'Word Counter',
            path: 'tools/word-counter.html'
        },
        {
            id: 'grammar-checker',
            name: 'Grammar Checker',
            path: 'tools/grammar-checker.html'
        }
    ],
    documentTools: [
        {
            id: 'pdf-to-word',
            name: 'PDF to Word',
            path: 'tools/pdf-to-word.html'
        }
    ],
    mediaTools: [
        {
            id: 'youtube-thumbnail',
            name: 'YouTube Thumbnail',
            path: 'tools/youtube-thumbnail.html'
        },
        {
            id: 'video-converter',
            name: 'Video Converter',
            path: 'tools/video-converter.html'
        }
    ]
};

// Function to verify tool files
function verifyTools() {
    const results = {
        working: [],
        missing: [],
        total: 0
    };

    // Check each category
    Object.entries(toolsData).forEach(([category, tools]) => {
        tools.forEach(tool => {
            results.total++;
            const toolPath = path.join(__dirname, '..', tool.path);
            
            if (fs.existsSync(toolPath)) {
                results.working.push({
                    id: tool.id,
                    name: tool.name,
                    category
                });
            } else {
                results.missing.push({
                    id: tool.id,
                    name: tool.name,
                    category
                });
            }
        });
    });

    return results;
}

// Run verification
const results = verifyTools();

// Print results
console.log('\nTool Verification Results');
console.log('=======================');
console.log(`Total Tools: ${results.total}`);
console.log(`Working Tools: ${results.working.length}`);
console.log(`Missing Tools: ${results.missing.length}`);

if (results.missing.length > 0) {
    console.log('\nMissing Tools:');
    console.log('-------------');
    results.missing.forEach(tool => {
        console.log(`[${tool.category}] ${tool.name} (${tool.id})`);
    });
}

// Create report file
const report = {
    timestamp: new Date().toISOString(),
    results
};

fs.writeFileSync(
    path.join(__dirname, 'tool-verification-report.json'),
    JSON.stringify(report, null, 2)
);
