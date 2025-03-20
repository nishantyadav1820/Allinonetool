// PDF to Image Converter JavaScript

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

class PDFToImage {
    constructor() {
        this.currentPage = 1;
        this.totalPages = 0;
        this.pdfDocument = null;
        this.selectedFormat = 'jpg';
        this.quality = 90;
        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        this.dropZone = document.getElementById('dropZone');
        this.fileInput = document.getElementById('fileInput');
        this.previewContainer = document.getElementById('previewContainer');
        this.pdfPreview = document.getElementById('pdfPreview');
        this.pageInfo = document.getElementById('pageInfo');
        this.prevPageBtn = document.getElementById('prevPage');
        this.nextPageBtn = document.getElementById('nextPage');
        this.qualitySlider = document.getElementById('qualitySlider');
        this.convertBtn = document.getElementById('convertBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.resetBtn = document.getElementById('resetBtn');
    }

    setupEventListeners() {
        // File upload events
        this.dropZone.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.dropZone.addEventListener('dragleave', () => this.dropZone.classList.remove('dragover'));
        this.dropZone.addEventListener('drop', (e) => this.handleDrop(e));
        this.fileInput.addEventListener('change', () => this.handleFileSelect());

        // Navigation events
        this.prevPageBtn.addEventListener('click', () => this.changePage(-1));
        this.nextPageBtn.addEventListener('click', () => this.changePage(1));

        // Format selection
        document.querySelectorAll('.format-option').forEach(option => {
            option.addEventListener('click', () => this.selectFormat(option));
        });

        // Quality control
        this.qualitySlider.addEventListener('input', () => {
            this.quality = parseInt(this.qualitySlider.value);
        });

        // Action buttons
        this.convertBtn.addEventListener('click', () => this.convertToImage());
        this.resetBtn.addEventListener('click', () => this.reset());
    }

    handleDragOver(e) {
        e.preventDefault();
        this.dropZone.classList.add('dragover');
    }

    async handleDrop(e) {
        e.preventDefault();
        this.dropZone.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/pdf') {
            await this.loadPDF(file);
        }
    }

    async handleFileSelect() {
        const file = this.fileInput.files[0];
        if (file && file.type === 'application/pdf') {
            await this.loadPDF(file);
        }
    }

    async loadPDF(file) {
        try {
            const arrayBuffer = await file.arrayBuffer();
            this.pdfDocument = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            this.totalPages = this.pdfDocument.numPages;
            this.currentPage = 1;
            this.previewContainer.style.display = 'block';
            this.convertBtn.disabled = false;
            this.updatePageInfo();
            await this.renderPage();
        } catch (error) {
            console.error('Error loading PDF:', error);
            alert('Error loading PDF file. Please try again.');
        }
    }

    async renderPage() {
        try {
            const page = await this.pdfDocument.getPage(this.currentPage);
            const viewport = page.getViewport({ scale: 1.5 });
            const canvas = this.pdfPreview;
            const context = canvas.getContext('2d');

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({
                canvasContext: context,
                viewport: viewport
            }).promise;
        } catch (error) {
            console.error('Error rendering page:', error);
        }
    }

    updatePageInfo() {
        this.pageInfo.textContent = `Page ${this.currentPage} of ${this.totalPages}`;
        this.prevPageBtn.disabled = this.currentPage <= 1;
        this.nextPageBtn.disabled = this.currentPage >= this.totalPages;
    }

    async changePage(delta) {
        const newPage = this.currentPage + delta;
        if (newPage >= 1 && newPage <= this.totalPages) {
            this.currentPage = newPage;
            this.updatePageInfo();
            await this.renderPage();
        }
    }

    selectFormat(option) {
        document.querySelectorAll('.format-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        option.classList.add('selected');
        this.selectedFormat = option.dataset.format;
    }

    async convertToImage() {
        try {
            const page = await this.pdfDocument.getPage(this.currentPage);
            const viewport = page.getViewport({ scale: 2 }); // Higher scale for better quality
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({
                canvasContext: context,
                viewport: viewport
            }).promise;

            // Convert to selected format
            let mimeType, fileName;
            switch (this.selectedFormat) {
                case 'png':
                    mimeType = 'image/png';
                    fileName = `page_${this.currentPage}.png`;
                    break;
                case 'tiff':
                    mimeType = 'image/tiff';
                    fileName = `page_${this.currentPage}.tiff`;
                    break;
                default:
                    mimeType = 'image/jpeg';
                    fileName = `page_${this.currentPage}.jpg`;
            }

            const imageData = canvas.toDataURL(mimeType, this.quality / 100);
            this.downloadImage(imageData, fileName);
        } catch (error) {
            console.error('Error converting to image:', error);
            alert('Error converting PDF to image. Please try again.');
        }
    }

    downloadImage(imageData, fileName) {
        const link = document.createElement('a');
        link.href = imageData;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    reset() {
        this.pdfDocument = null;
        this.currentPage = 1;
        this.totalPages = 0;
        this.fileInput.value = '';
        this.previewContainer.style.display = 'none';
        this.convertBtn.disabled = true;
        this.downloadBtn.disabled = true;
        this.qualitySlider.value = 90;
        this.quality = 90;
        document.querySelector('.format-option[data-format="jpg"]').click();
    }
}

// Initialize the converter when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PDFToImage();
});