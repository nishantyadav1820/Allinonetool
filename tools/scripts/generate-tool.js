const fs = require('fs');
const path = require('path');

// Tool template data
const toolTemplates = {
    image: {
        accepts: 'image/*',
        icon: 'bi-file-earmark-image',
        supportedFormats: 'PNG, JPG, WebP, BMP, GIF, TIFF',
        previewType: 'image',
        defaultSettings: {
            quality: true,
            resize: true,
            format: false
        }
    },
    document: {
        accepts: '.pdf,.doc,.docx',
        icon: 'bi-file-earmark-text',
        supportedFormats: 'PDF, DOC, DOCX',
        previewType: 'iframe',
        defaultSettings: {
            quality: true,
            pageRange: true,
            ocr: true
        }
    },
    text: {
        accepts: 'text/*',
        icon: 'bi-file-text',
        supportedFormats: 'TXT, RTF, HTML, MD',
        previewType: 'textarea',
        defaultSettings: {
            encoding: true,
            lineEndings: true,
            wordWrap: true
        }
    },
    media: {
        accepts: 'video/*,audio/*',
        icon: 'bi-play-circle',
        supportedFormats: 'MP4, AVI, MOV, MP3, WAV',
        previewType: 'video',
        defaultSettings: {
            quality: true,
            format: true,
            bitrate: true
        }
    }
};

// Generate HTML for a tool
function generateToolHTML(toolData) {
    const template = toolTemplates[toolData.type] || toolTemplates.utility;
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${toolData.name} - ToolVerse</title>
    <meta name="description" content="${toolData.description}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/tools.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
        <div class="container">
            <a class="navbar-brand" href="../">ToolVerse</a>
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
                                <i class="${template.icon} display-4 text-primary mb-3"></i>
                                <h5>Drag & Drop your file here</h5>
                                <p class="text-muted">or</p>
                                <button class="btn btn-primary" onclick="document.getElementById('fileInput').click()">
                                    Choose File
                                </button>
                                <input type="file" id="fileInput" hidden accept="${template.accepts}">
                                <p class="text-muted mt-2">
                                    <small>Supported formats: ${template.supportedFormats}</small>
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
                                ${getPreviewHTML(template.previewType)}
                            </div>

                            <!-- Settings Container -->
                            <div class="settings-container mt-4" id="settingsContainer">
                                <h5 class="mb-3">Conversion Settings</h5>
                                ${getSettingsHTML(template.defaultSettings)}
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
                            ${toolData.instructions.map(instr => `<li>${instr}</li>`).join('\n')}
                        </ol>
                    </div>
                </div>

                <!-- Features Section -->
                <div class="card mt-4 shadow-sm">
                    <div class="card-body">
                        <h2 class="h4 mb-3">Features</h2>
                        <ul class="mb-0">
                            ${toolData.features.map(feature => `<li>${feature}</li>`).join('\n')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <footer class="bg-light mt-5 py-4">
        <div class="container text-center">
            <p class="mb-0">&copy; 2024 ToolVerse. All rights reserved.</p>
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
        case 'video':
            return '<video class="preview-video mb-3" id="previewVideo" controls></video>';
        case 'iframe':
            return '<iframe class="preview-frame mb-3" id="previewFrame"></iframe>';
        case 'textarea':
            return '<textarea class="form-control mb-3" id="previewText" rows="10" readonly></textarea>';
        default:
            return '';
    }
}

// Helper function to generate settings HTML
function getSettingsHTML(settings) {
    let html = '';
    
    if (settings.quality) {
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
        </div>`;
    }

    if (settings.resize) {
        html += `
        <div class="mb-4">
            <label class="form-label">Resize:</label>
            <select class="form-select" id="resizeSelect">
                <option value="original">Original Size</option>
                <option value="1920">1920px (Width)</option>
                <option value="1280">1280px (Width)</option>
                <option value="800">800px (Width)</option>
            </select>
        </div>`;
    }

    if (settings.format) {
        html += `
        <div class="mb-4">
            <label class="form-label">Output Format:</label>
            <select class="form-select" id="formatSelect">
                <option value="mp4">MP4</option>
                <option value="webm">WebM</option>
                <option value="mov">MOV</option>
            </select>
        </div>`;
    }

    return html;
}

// Example usage:
const toolData = {
    name: 'Image to JPG Converter',
    description: 'Convert any image format to JPG with high quality',
    type: 'image',
    instructions: [
        'Upload your image by dragging it or clicking "Choose File"',
        'Preview the image content',
        'Select your desired quality settings',
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
};

const html = generateToolHTML(toolData);
const outputPath = path.join(__dirname, '..', 'tools', 'image-to-jpg.html');
fs.writeFileSync(outputPath, html);
