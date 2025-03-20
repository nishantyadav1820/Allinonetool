// PDF Tools JavaScript Module

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

class PDFTools {
    constructor() {
        this.initializeMergeTool();
        this.initializeSplitTool();
        this.initializeCompressTool();
        this.setupEventListeners();
    }

    initializeMergeTool() {
        this.mergeFiles = [];
        this.mergeDropZone = document.getElementById('mergeDropZone');
        this.mergeFileInput = document.getElementById('mergeFileInput');
        this.mergeFileList = document.getElementById('mergeFileList');
        this.mergeButton = document.getElementById('mergeButton');

        // Initialize Sortable.js for drag-and-drop reordering
        new Sortable(this.mergeFileList, {
            animation: 150,
            handle: '.drag-handle',
            onEnd: () => this.updateMergeOrder()
        });
    }

    initializeSplitTool() {
        this.splitDropZone = document.getElementById('splitDropZone');
        this.splitFileInput = document.getElementById('splitFileInput');
        this.splitButton = document.getElementById('splitButton');
        this.splitPreview = document.getElementById('splitPreview');
        this.currentPage = 1;
        this.totalPages = 0;
    }

    initializeCompressTool() {
        this.compressDropZone = document.getElementById('compressDropZone');
        this.compressFileInput = document.getElementById('compressFileInput');
        this.compressButton = document.getElementById('compressButton');
        this.compressionQuality = 'medium';
    }

    setupEventListeners() {
        // Merge PDF events
        this.mergeDropZone.addEventListener('drop', (e) => this.handleDrop(e, 'merge'));
        this.mergeDropZone.addEventListener('dragover', this.handleDragOver);
        this.mergeFileInput.addEventListener('change', () => this.handleFileSelect('merge'));
        this.mergeButton.addEventListener('click', () => this.mergePDFs());

        // Split PDF events
        this.splitDropZone.addEventListener('drop', (e) => this.handleDrop(e, 'split'));
        this.splitDropZone.addEventListener('dragover', this.handleDragOver);
        this.splitFileInput.addEventListener('change', () => this.handleFileSelect('split'));
        this.splitButton.addEventListener('click', () => this.splitPDF());

        // Compress PDF events
        this.compressDropZone.addEventListener('drop', (e) => this.handleDrop(e, 'compress'));
        this.compressDropZone.addEventListener('dragover', this.handleDragOver);
        this.compressFileInput.addEventListener('change', () => this.handleFileSelect('compress'));
        this.compressButton.addEventListener('click', () => this.compressPDF());

        // Compression quality selection
        document.querySelectorAll('.compression-option').forEach(option => {
            option.addEventListener('click', () => this.selectCompressionQuality(option));
        });

        // Split type selection
        document.querySelectorAll('input[name="splitType"]').forEach(radio => {
            radio.addEventListener('change', () => this.toggleSplitOptions());
        });
    }

    handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add('dragover');
    }

    handleDrop(e, type) {
        e.preventDefault();
        e.currentTarget.classList.remove('dragover');
        const files = Array.from(e.dataTransfer.files).filter(file => file.type === 'application/pdf');
        this.processFiles(files, type);
    }

    handleFileSelect(type) {
        const input = type === 'merge' ? this.mergeFileInput :
                     type === 'split' ? this.splitFileInput :
                     this.compressFileInput;
        const files = Array.from(input.files);
        this.processFiles(files, type);
    }

    async processFiles(files, type) {
        if (type === 'merge') {
            for (const file of files) {
                await this.addFileToMergeList(file);
            }
        } else if (type === 'split') {
            if (files.length > 0) {
                await this.loadPDFPreview(files[0], this.splitPreview);
                this.splitButton.disabled = false;
            }
        } else if (type === 'compress') {
            if (files.length > 0) {
                await this.loadPDFPreview(files[0], document.getElementById('compressPreview'));
                this.compressButton.disabled = false;
            }
        }
    }

    async addFileToMergeList(file) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <i class="bi bi-grip-vertical drag-handle"></i>
            <span class="file-name">${file.name}</span>
            <span class="file-size">${this.formatFileSize(file.size)}</span>
            <i class="bi bi-x-circle remove-btn"></i>
        `;

        fileItem.querySelector('.remove-btn').addEventListener('click', () => {
            this.mergeFiles = this.mergeFiles.filter(f => f !== file);
            fileItem.remove();
            this.mergeButton.disabled = this.mergeFiles.length < 2;
        });

        this.mergeFileList.appendChild(fileItem);
        this.mergeFiles.push(file);
        this.mergeButton.disabled = this.mergeFiles.length < 2;
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    async loadPDFPreview(file, container) {
        const canvas = document.createElement('canvas');
        container.innerHTML = '';
        container.appendChild(canvas);
        container.style.display = 'block';

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
        this.totalPages = pdf.numPages;

        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
            canvasContext: context,
            viewport: viewport
        }).promise;
    }

    async mergePDFs() {
        try {
            const mergedPdf = await PDFLib.PDFDocument.create();
            const progressBar = document.querySelector('.progress-container');
            progressBar.style.display = 'block';

            for (let i = 0; i < this.mergeFiles.length; i++) {
                const file = this.mergeFiles[i];
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
                const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                pages.forEach(page => mergedPdf.addPage(page));

                const progress = ((i + 1) / this.mergeFiles.length) * 100;
                progressBar.querySelector('.progress-bar').style.width = `${progress}%`;
            }

            const mergedPdfBytes = await mergedPdf.save();
            this.downloadPDF(mergedPdfBytes, 'merged.pdf');
            progressBar.style.display = 'none';
        } catch (error) {
            console.error('Error merging PDFs:', error);
            alert('An error occurred while merging the PDFs. Please try again.');
        }
    }

    async splitPDF() {
        const file = this.splitFileInput.files[0];
        if (!file) return;

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
            const totalPages = pdf.getPageCount();

            if (document.getElementById('splitByPage').checked) {
                const ranges = document.querySelector('#pageRangeInput input').value
                    .split(',')
                    .map(range => range.trim())
                    .filter(range => range);

                for (const range of ranges) {
                    const [start, end] = range.split('-').map(num => parseInt(num));
                    const newPdf = await PDFLib.PDFDocument.create();
                    const pages = await newPdf.copyPages(pdf, [
                        ...[...Array(end ? end - start + 1 : 1).keys()].map(i => start - 1 + i)
                    ]);
                    pages.forEach(page => newPdf.addPage(page));
                    const newPdfBytes = await newPdf.save();
                    this.downloadPDF(newPdfBytes, `split_${range}.pdf`);
                }
            } else {
                const maxSize = parseInt(document.querySelector('#sizeInput input').value) * 1024 * 1024;
                let currentPdf = await PDFLib.PDFDocument.create();
                let currentSize = 0;
                let partNumber = 1;

                for (let i = 0; i < totalPages; i++) {
                    const pages = await currentPdf.copyPages(pdf, [i]);
                    pages.forEach(page => currentPdf.addPage(page));
                    const pdfBytes = await currentPdf.save();

                    if (pdfBytes.length > maxSize) {
                        const newPdfBytes = await currentPdf.save();
                        this.downloadPDF(newPdfBytes, `split_part${partNumber}.pdf`);
                        currentPdf = await PDFLib.PDFDocument.create();
                        partNumber++;
                    }
                }

                if (currentPdf.getPageCount() > 0) {
                    const lastPdfBytes = await currentPdf.save();
                    this.downloadPDF(lastPdfBytes, `split_part${partNumber}.pdf`);
                }
            }
        } catch (error) {
            console.error('Error splitting PDF:', error);
            alert('An error occurred while splitting the PDF. Please try again.');
        }
    }

    async compressPDF() {
        const file = this.compressFileInput.files[0];
        if (!file) return;

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
            
            const compressionLevels = {
                high: { quality: 0.9, compress: true },
                medium: { quality: 0.6, compress: true },
                low: { quality: 0.3, compress: true }
            };

            const options = compressionLevels[this.compressionQuality];
            const compressedPdfBytes = await pdf.save({
                useObjectStreams: true,
                ...options
            });

            this.downloadPDF(compressedPdfBytes, 'compressed.pdf');
        } catch (error) {
            console.error('Error compressing PDF:', error);
            alert('An error occurred while compressing the PDF. Please try again.');
        }
    }

    downloadPDF(bytes, filename) {
        const blob = new Blob([bytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
    }

    selectCompressionQuality(option) {
        document.querySelectorAll('.compression-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        option.classList.add('selected');
        this.compressionQuality = option.dataset.quality;
    }

    toggleSplitOptions() {
        const pageRangeInput = document.getElementById('pageRangeInput');
        const sizeInput = document.getElementById('sizeInput');
        if (document.getElementById('splitByPage').checked) {
            pageRangeInput.style.display = 'block';
            sizeInput.style.display = 'none';
        } else {
            pageRangeInput.style.display = 'none';
            sizeInput.style.display = 'block';
        }
    }

    updateMergeOrder() {
        const newFiles = [];
        this.mergeFileList.querySelectorAll('.file-item').forEach(item => {
            const fileName = item.querySelector('.file-name').textContent;
            const file = this.mergeFiles.find(f => f.name === fileName);
            if (file) newFiles.push(file);
        });
        this.mergeFiles = newFiles;
    }
}

// Initialize PDF Tools when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PDFTools();
});