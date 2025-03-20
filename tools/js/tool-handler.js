// Common tool handler for Multi-Tools
class ToolHandler {
    constructor() {
        // UI Elements
        this.dropZone = document.getElementById('dropZone');
        this.fileInput = document.getElementById('fileInput');
        this.fileInfo = document.getElementById('fileInfo');
        this.fileName = document.getElementById('fileName');
        this.fileSize = document.getElementById('fileSize');
        this.format = document.getElementById('format');
        this.modified = document.getElementById('modified');
        this.previewContainer = document.getElementById('previewContainer');
        this.settingsContainer = document.getElementById('settingsContainer');
        this.progressBar = document.getElementById('progressBar');
        this.convertBtn = document.getElementById('convertBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.advancedToggle = document.getElementById('advancedToggle');
        this.advancedSettings = document.getElementById('advancedSettings');

        // Preview elements
        this.previewImage = document.getElementById('previewImage');
        this.previewVideo = document.getElementById('previewVideo');
        this.previewFrame = document.getElementById('previewFrame');
        this.previewText = document.getElementById('previewText');

        // State
        this.currentFile = null;
        this.selectedOptions = {};

        // Initialize
        this.initializeEventListeners();
    }

    // Initialize all event listeners
    initializeEventListeners() {
        // File input handling
        this.dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.dropZone.classList.add('dragover');
        });

        this.dropZone.addEventListener('dragleave', () => {
            this.dropZone.classList.remove('dragover');
        });

        this.dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            this.dropZone.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            this.handleFile(file);
        });

        this.fileInput.addEventListener('change', () => {
            if (this.fileInput.files[0]) {
                this.handleFile(this.fileInput.files[0]);
            }
        });

        // Option card selection
        document.querySelectorAll('.option-card').forEach(card => {
            card.addEventListener('click', () => {
                const type = Object.keys(card.dataset)[0];
                const value = card.dataset[type];
                this.handleOptionSelection(type, value, card);
            });
        });

        // Advanced settings toggle
        if (this.advancedToggle && this.advancedSettings) {
            this.advancedToggle.addEventListener('change', () => {
                this.advancedSettings.style.display = this.advancedToggle.checked ? 'block' : 'none';
            });
        }

        // Button actions
        this.convertBtn.addEventListener('click', () => this.handleConversion());
        this.downloadBtn.addEventListener('click', () => this.handleDownload());
        this.resetBtn.addEventListener('click', () => this.resetTool());
    }

    // Handle file selection
    async handleFile(file) {
        if (!file || !this.isValidFileType(file)) {
            alert('Please upload a valid file.');
            return;
        }

        this.currentFile = file;
        
        // Update file info
        this.fileName.textContent = file.name;
        this.fileSize.textContent = this.formatFileSize(file.size);
        this.format.textContent = file.type.split('/')[1].toUpperCase();
        this.modified.textContent = new Date(file.lastModified).toLocaleDateString();
        
        // Create preview
        await this.createPreview(file);

        // Show containers
        this.fileInfo.style.display = 'block';
        this.previewContainer.style.display = 'block';
        this.settingsContainer.style.display = 'block';
        this.convertBtn.disabled = false;
    }

    // Create preview based on file type
    async createPreview(file) {
        const url = URL.createObjectURL(file);

        if (file.type.startsWith('image/')) {
            if (this.previewImage) {
                this.previewImage.src = url;
                // Get image dimensions
                const img = new Image();
                img.onload = () => {
                    const dimensions = document.getElementById('dimensions');
                    if (dimensions) {
                        dimensions.textContent = `${img.width} × ${img.height}`;
                    }
                };
                img.src = url;
            }
        } else if (file.type.startsWith('video/')) {
            if (this.previewVideo) {
                this.previewVideo.src = url;
            }
        } else if (file.type.startsWith('text/')) {
            if (this.previewText) {
                const text = await file.text();
                this.previewText.value = text;
            }
        }
    }

    // Handle option selection (quality, format, etc.)
    handleOptionSelection(type, value, card) {
        // Remove selected class from other cards in the same category
        card.closest('.row').querySelectorAll('.option-card').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Add selected class to clicked card
        card.classList.add('selected');
        
        // Store selection
        this.selectedOptions[type] = value;
    }

    // Handle conversion process
    async handleConversion() {
        if (!this.currentFile || Object.keys(this.selectedOptions).length === 0) {
            alert('Please select a file and configure conversion options.');
            return;
        }

        this.progressBar.style.display = 'block';
        this.convertBtn.disabled = true;
        const progress = this.progressBar.querySelector('.progress-bar');

        // Simulate conversion process
        for (let i = 0; i <= 100; i += 10) {
            progress.style.width = i + '%';
            progress.setAttribute('aria-valuenow', i);
            await new Promise(resolve => setTimeout(resolve, 200));
        }

        this.downloadBtn.disabled = false;
    }

    // Handle download
    handleDownload() {
        const link = document.createElement('a');
        const extension = this.getOutputExtension();
        link.download = this.fileName.textContent.replace(/\.[^/.]+$/, '') + extension;
        
        // For demo, use the preview source
        if (this.previewImage) {
            link.href = this.previewImage.src;
        } else if (this.previewVideo) {
            link.href = this.previewVideo.src;
        } else {
            link.href = URL.createObjectURL(this.currentFile);
        }
        
        link.click();
    }

    // Reset the tool
    resetTool() {
        this.fileInput.value = '';
        this.fileInfo.style.display = 'none';
        this.previewContainer.style.display = 'none';
        this.settingsContainer.style.display = 'none';
        this.progressBar.style.display = 'none';
        this.convertBtn.disabled = true;
        this.downloadBtn.disabled = true;
        
        document.querySelectorAll('.option-card').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        if (this.advancedToggle) {
            this.advancedToggle.checked = false;
        }
        if (this.advancedSettings) {
            this.advancedSettings.style.display = 'none';
        }
        
        this.currentFile = null;
        this.selectedOptions = {};
    }

    // Utility: Format file size
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Utility: Check if file type is valid
    isValidFileType(file) {
        const accept = this.fileInput.accept;
        if (!accept) return true;
        
        const acceptedTypes = accept.split(',').map(type => type.trim());
        return acceptedTypes.some(type => {
            if (type.startsWith('.')) {
                return file.name.toLowerCase().endsWith(type.toLowerCase());
            } else if (type.endsWith('/*')) {
                return file.type.startsWith(type.slice(0, -1));
            } else {
                return file.type === type;
            }
        });
    }

    // Utility: Get output extension based on selected format
    getOutputExtension() {
        const format = this.selectedOptions.format;
        if (format) return '.' + format;
        
        // Default extensions based on tool type
        if (this.fileInput.accept.includes('image/')) return '.jpg';
        if (this.fileInput.accept.includes('video/')) return '.mp4';
        if (this.fileInput.accept.includes('audio/')) return '.mp3';
        return '.txt';
    }
}

// Initialize tool handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.toolHandler = new ToolHandler();
});
