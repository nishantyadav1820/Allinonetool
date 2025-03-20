const fs = require('fs');
const path = require('path');

// Tool templates for different categories
const templates = {
    imageTools: {
        type: 'image',
        accepts: 'image/*',
        icon: 'bi-file-earmark-image',
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
        accepts: 'text/*',
        icon: 'bi-file-text',
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
        accepts: '.pdf,.doc,.docx',
        icon: 'bi-file-earmark-text',
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
        accepts: 'video/*,audio/*',
        icon: 'bi-play-circle',
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
        accepts: 'text/*,.json,.xml,.html,.css,.js',
        icon: 'bi-code-slash',
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
        accepts: '*/*',
        icon: 'bi-tools',
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

// Generate HTML for a tool
function generateToolHTML(toolData, template) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${toolData.name} - Multi-Tools</title>
    <meta name="description" content="${toolData.description}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/tools.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
</head>
<body class="${template.type}-tool">
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
        <div class="container">
            <a class="navbar-brand" href="../">Multi-Tools</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="../">Home</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <main class="container mt-5 pt-4">
        <div class="row">
            <div class="col-lg-8 mx-auto">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h1 class="h3 mb-4 text-center">${toolData.name}</h1>
                        
                        <div class="tool-section">
                            <!-- Upload Section -->
                            <div class="drop-zone" id="dropZone">
                                <i class="${toolData.icon} tool-icon"></i>
                                <h5>Drag & Drop your file here</h5>
                                <p class="text-muted">or</p>
                                <button class="btn btn-primary" onclick="document.getElementById('fileInput').click()">
                                    Choose File
                                </button>
                                <input type="file" id="fileInput" hidden accept="${template.accepts}">
                                <p class="text-muted mt-2">
                                    <small>Supported formats: ${template.accepts.replace(/\*/g, '').replace(/,/g, ', ')}</small>
                                </p>
                            </div>

                            <!-- File Info -->
                            <div class="file-info mt-4" id="fileInfo">
                                <div class="card bg-light">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <p class="mb-1"><strong>File Name:</strong> <span id="fileName">-</span></p>
                                                <p class="mb-0"><strong>File Size:</strong> <span id="fileSize">-</span></p>
                                            </div>
                                            <div class="col-sm-6">
                                                <p class="mb-1"><strong>Format:</strong> <span id="format">-</span></p>
                                                <p class="mb-0"><strong>Modified:</strong> <span id="modified">-</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Preview Container -->
                            <div class="preview-container" id="previewContainer">
                                ${getPreviewHTML(template.type)}
                            </div>

                            <!-- Settings Container -->
                            <div class="settings-container mt-4" id="settingsContainer">
                                <h5 class="mb-3">Conversion Settings</h5>
                                ${getSettingsHTML(template.type)}
                            </div>

                            <!-- Progress Bar -->
                            <div class="progress mt-4" style="display: none;" id="progressBar">
                                <div class="progress-bar progress-bar-striped progress-bar-animated" 
                                     role="progressbar" style="width: 0%"></div>
                            </div>

                            <!-- Action Buttons -->
                            <div class="text-center mt-4">
                                <button class="btn btn-primary" id="convertBtn" disabled>
                                    <i class="bi bi-arrow-repeat me-2"></i>Convert
                                </button>
                                <button class="btn btn-success" id="downloadBtn" disabled>
                                    <i class="bi bi-download me-2"></i>Download
                                </button>
                                <button class="btn btn-outline-secondary" id="resetBtn">
                                    <i class="bi bi-arrow-counterclockwise me-2"></i>Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- How to Use Section -->
                <div class="card mt-4 shadow-sm">
                    <div class="card-body">
                        <h2 class="h4 mb-3">How to Use</h2>
                        <ol class="mb-0">
                            ${template.instructions.map(instr => `<li>${instr}</li>`).join('\n')}
                        </ol>
                    </div>
                </div>

                <!-- Features Section -->
                <div class="card mt-4 shadow-sm">
                    <div class="card-body">
                        <h2 class="h4 mb-3">Features</h2>
                        <ul class="mb-0">
                            ${template.features.map(feature => `<li>${feature}</li>`).join('\n')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <footer class="bg-light mt-5 py-4">
        <div class="container text-center">
            <p class="mb-0">&copy; 2024 Multi-Tools. All rights reserved.</p>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../js/tool-handler.js"></script>
</body>
</html>`;
}

// Helper function to generate preview HTML based on type
function getPreviewHTML(type) {
    switch (type) {
        case 'image':
            return '<img src="" alt="Preview" class="preview-image mb-3" id="previewImage">';
        case 'media':
            return `
                <video class="preview-video mb-3" id="previewVideo" controls></video>
                <audio class="preview-audio mb-3" id="previewAudio" controls></audio>
            `;
        case 'document':
            return '<iframe class="preview-frame mb-3" id="previewFrame"></iframe>';
        case 'text':
        case 'developer':
            return '<textarea class="form-control mb-3" id="previewText" rows="10" readonly></textarea>';
        default:
            return '';
    }
}

// Helper function to generate settings HTML
function getSettingsHTML(type) {
    let html = '';
    
    switch (type) {
        case 'image':
            html += `
                <div class="mb-4">
                    <label class="form-label">Quality:</label>
                    <div class="row g-3">
                        <div class="col-4">
                            <div class="card option-card text-center" data-quality="high">
                                <div class="card-body">
                                    <h6 class="mb-0">High</h6>
                                    <small class="text-muted">100%</small>
                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="card option-card text-center" data-quality="medium">
                                <div class="card-body">
                                    <h6 class="mb-0">Medium</h6>
                                    <small class="text-muted">85%</small>
                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="card option-card text-center" data-quality="low">
                                <div class="card-body">
                                    <h6 class="mb-0">Low</h6>
                                    <small class="text-muted">70%</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label">Resize:</label>
                    <select class="form-select" id="resizeSelect">
                        <option value="original">Original Size</option>
                        <option value="1920">1920px (Width)</option>
                        <option value="1280">1280px (Width)</option>
                        <option value="800">800px (Width)</option>
                    </select>
                </div>`;
            break;
            
        case 'media':
            html += `
                <div class="mb-4">
                    <label class="form-label">Quality:</label>
                    <select class="form-select" id="qualitySelect">
                        <option value="high">High Quality</option>
                        <option value="medium">Medium Quality</option>
                        <option value="low">Low Quality</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="form-label">Format:</label>
                    <select class="form-select" id="formatSelect">
                        <option value="mp4">MP4</option>
                        <option value="webm">WebM</option>
                        <option value="mov">MOV</option>
                    </select>
                </div>`;
            break;
            
        case 'document':
            html += `
                <div class="mb-4">
                    <label class="form-label">Output Format:</label>
                    <select class="form-select" id="formatSelect">
                        <option value="pdf">PDF</option>
                        <option value="docx">Word (DOCX)</option>
                        <option value="txt">Text (TXT)</option>
                    </select>
                </div>
                <div class="mb-4">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="ocrCheck">
                        <label class="form-check-label" for="ocrCheck">
                            Enable OCR (Text Recognition)
                        </label>
                    </div>
                </div>`;
            break;
            
        case 'text':
        case 'developer':
            html += `
                <div class="mb-4">
                    <label class="form-label">Output Format:</label>
                    <select class="form-select" id="formatSelect">
                        <option value="plain">Plain Text</option>
                        <option value="html">HTML</option>
                        <option value="markdown">Markdown</option>
                    </select>
                </div>
                <div class="mb-4">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="formatCheck">
                        <label class="form-check-label" for="formatCheck">
                            Auto-format Output
                        </label>
                    </div>
                </div>`;
            break;
    }
    
    return html;
}

// Load tools data
const toolsData = require('../js/tools-data.js');

// Generate all missing tool pages
Object.entries(toolsData).forEach(([category, tools]) => {
    const template = templates[category];
    if (!template) return;
    
    tools.forEach(tool => {
        const outputPath = path.join(__dirname, '..', tool.path);
        
        // Skip if file already exists
        if (fs.existsSync(outputPath)) {
            console.log(`Skipping existing tool: ${tool.id}`);
            return;
        }
        
        try {
            const html = generateToolHTML(tool, template);
            fs.writeFileSync(outputPath, html);
            console.log(`Generated: ${tool.id}`);
        } catch (error) {
            console.error(`Error generating ${tool.id}:`, error);
        }
    });
});
