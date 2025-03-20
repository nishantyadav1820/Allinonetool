const toolsData = {
    popularTools: [
        {
            id: 'bmi-calculator',
            name: 'BMI Calculator',
            description: 'Calculate Body Mass Index and health status',
            icon: 'bi-heart-pulse',
            path: 'tools/calculators/bmi.html',
            category: 'Health'
        },
        {
            id: 'background-remover',
            name: 'Background Remover',
            description: 'Remove image backgrounds instantly using AI',
            icon: 'bi-layers-half',
            path: 'tools/background-remover.html',
            category: 'Image'
        },
        {
            id: 'image-resizer',
            name: 'Image Resizer',
            description: 'Resize images while maintaining quality',
            icon: 'bi-arrows-angle-expand',
            path: 'tools/image-resizer.html',
            category: 'Image'
        },
        {
            id: 'image-compressor',
            name: 'Image Compressor',
            description: 'Compress images without losing quality',
            icon: 'bi-file-zip',
            path: 'tools/image-compressor.html',
            category: 'Image'
        },
        {
            id: 'text-to-speech',
            name: 'Text to Speech',
            description: 'Convert text to natural-sounding speech',
            icon: 'bi-volume-up',
            path: 'tools/text-to-speech.html',
            category: 'Text'
        },
        {
            id: 'word-counter',
            name: 'Word Counter',
            description: 'Count words, characters, and reading time',
            icon: 'bi-123',
            path: 'tools/word-counter.html',
            category: 'Text'
        },
        {
            id: 'grammar-checker',
            name: 'Grammar Checker',
            description: 'Check grammar and improve writing',
            icon: 'bi-check2-circle',
            path: 'tools/grammar-checker.html',
            category: 'Text'
        },
        {
            id: 'text-diff-checker',
            name: 'Text Differ',
            description: 'Compare texts and highlight differences with advanced features',
            icon: 'bi-file-diff',
            path: 'tools/text-differ.html',
            category: 'Text'
        },
        {
            id: 'pdf-to-word',
            name: 'PDF to Word',
            description: 'Convert PDF files to editable Word documents',
            icon: 'bi-file-earmark-word',
            path: 'tools/pdf-tools.html#pdfToWord',
            category: 'Document'
        },
        {
            id: 'pdf-editor',
            name: 'PDF Editor',
            description: 'Edit PDF files while maintaining original formatting',
            icon: 'bi-file-earmark-pdf',
            path: 'tools/pdf-editor.html',
            category: 'Document'
        },
        {
            id: 'video-trimmer',
            name: 'Video Editor',
            description: 'Cut, trim, merge videos with advanced editing features',
            icon: 'bi-camera-video',
            path: 'tools/video-trimmer.html',
            category: 'Media'
        },
        {
            id: 'audio-studio',
            name: 'Audio Studio',
            description: 'Online audio studio with waveform visualization and effects',
            icon: 'bi-soundwave',
            path: 'tools/audio-studio.html',
            category: 'Media'
        },
        {
            id: 'json-tools',
            name: 'JSON Tools',
            description: 'Format, validate, and transform JSON data',
            icon: 'bi-braces',
            path: 'tools/json-formatter.html',
            category: 'Developer'
        },
        {
            id: 'code-formatter',
            name: 'Code Beautifier',
            description: 'Format HTML, CSS, JS, SQL, and more',
            icon: 'bi-code-square',
            path: 'tools/code-formatter.html',
            category: 'Developer'
        },
        {
            id: 'diff-checker',
            name: 'Code Diff Checker',
            description: 'Compare and highlight code differences',
            icon: 'bi-file-diff',
            path: 'tools/code-differ.html',
            category: 'Developer'
        },
        {
            id: 'qr-generator',
            name: 'QR Code Generator',
            description: 'Generate QR codes from text or URLs',
            icon: 'bi-qr-code',
            path: 'tools/qr-generator.html',
            category: 'Utility'
        },
        {
            id: 'color-picker',
            name: 'Color Picker',
            description: 'Pick and convert colors in different formats',
            icon: 'bi-palette',
            path: 'tools/color-picker.html',
            category: 'Utility'
        },
        {
            id: 'password-generator',
            name: 'Password Generator',
            description: 'Generate strong and secure passwords',
            icon: 'bi-key',
            path: 'tools/password-generator.html',
            category: 'Utility'
        },
        {
            id: 'unit-converter',
            name: 'Unit Converter',
            description: 'Convert between different units of measurement',
            icon: 'bi-arrow-left-right',
            path: 'tools/unit-converter.html',
            category: 'Utility'
        },
        {
            id: 'scientific-calculator',
            name: 'Scientific Calculator',
            description: 'Advanced calculator with scientific functions',
            icon: 'bi-calculator',
            path: 'tools/scientific-calculator.html',
            category: 'Utility'
        },
        {
            id: 'url-encoder',
            name: 'URL Tools',
            description: 'Encode, decode, shorten URLs and generate QR codes',
            icon: 'bi-link',
            path: 'tools/url-encoder.html',
            category: 'Utility'
        }
    ],
    healthTools: [
        {
            id: 'bmi-calculator',
            name: 'BMI Calculator',
            description: 'Calculate Body Mass Index and health status',
            icon: 'bi-heart-pulse',
            path: 'tools/calculators/bmi.html',
            popular: true
        },
        {
            id: 'age-calculator',
            name: 'Age Calculator',
            description: 'Calculate exact age and important dates',
            icon: 'bi-calendar-check',
            path: 'tools/calculators/age.html'
        },
        {
            id: 'period-tracker',
            name: 'Period Tracker',
            description: 'Track menstrual cycle and predict future dates',
            icon: 'bi-calendar-heart',
            path: 'tools/calculators/period-tracker.html'
        },
        {
            id: 'bmr-calculator',
            name: 'BMR Calculator',
            description: 'Calculate Basal Metabolic Rate for daily calorie needs',
            icon: 'bi-fire',
            path: 'tools/calculators/bmr.html'
        },
        {
            id: 'body-fat-calculator',
            name: 'Body Fat Calculator',
            description: 'Calculate body fat percentage and health status',
            icon: 'bi-person-lines-fill',
            path: 'tools/calculators/body-fat.html'
        },
        {
            id: 'ideal-weight-calculator',
            name: 'Ideal Weight Calculator',
            description: 'Calculate ideal weight based on height and body frame',
            icon: 'bi-person-check',
            path: 'tools/calculators/ideal-weight.html'
        },
        {
            id: 'waist-hip-ratio-calculator',
            name: 'Waist-Hip Ratio Calculator',
            description: 'Calculate waist-hip ratio and health risk',
            icon: 'bi-rulers',
            path: 'tools/calculators/waist-hip-ratio.html'
        }
    ],
    imageTools: [
        {
            id: 'background-remover',
            name: 'Background Remover',
            description: 'Remove image backgrounds instantly using AI',
            icon: 'bi-layers-half',
            path: 'tools/background-remover.html',
            popular: true
        },
        {
            id: 'image-resizer',
            name: 'Image Resizer',
            description: 'Resize images while maintaining quality',
            icon: 'bi-arrows-angle-expand',
            path: 'tools/image-resizer.html',
            popular: true
        },
        {
            id: 'image-compressor',
            name: 'Image Compressor',
            description: 'Compress images without losing quality',
            icon: 'bi-file-zip',
            path: 'tools/image-compressor.html',
            popular: true
        },
        {
            id: 'image-to-png',
            name: 'Image to PNG',
            description: 'Convert any image to PNG format',
            icon: 'bi-file-earmark-image',
            path: 'tools/image-to-png.html'
        },
        {
            id: 'image-to-jpg',
            name: 'Image to JPG',
            description: 'Convert any image to JPG format',
            icon: 'bi-file-earmark-image',
            path: 'tools/image-to-jpg.html'
        },
        {
            id: 'image-to-webp',
            name: 'Image to WebP',
            description: 'Convert images to WebP format',
            icon: 'bi-file-earmark-image',
            path: 'tools/image-to-webp.html'
        },
        {
            id: 'image-to-pdf',
            name: 'Image to PDF',
            description: 'Convert images to PDF format',
            icon: 'bi-file-earmark-pdf',
            path: 'tools/image-to-pdf.html'
        },
        {
            id: 'image-watermark',
            name: 'Image Watermark',
            description: 'Add watermark to images',
            icon: 'bi-image',
            path: 'tools/image-watermark.html'
        },
        {
            id: 'image-editor',
            name: 'Image Editor',
            description: 'Edit images with filters and effects',
            icon: 'bi-pencil-square',
            path: 'tools/image-editor.html'
        }
    ],
    textTools: [
        {
            id: 'text-to-speech',
            name: 'Text to Speech',
            description: 'Convert text to natural-sounding speech',
            icon: 'bi-volume-up',
            path: 'tools/text-to-speech.html',
            popular: true
        },
        {
            id: 'word-counter',
            name: 'Word Counter',
            description: 'Count words, characters, and reading time',
            icon: 'bi-123',
            path: 'tools/word-counter.html',
            popular: true
        },
        {
            id: 'grammar-checker',
            name: 'Grammar Checker',
            description: 'Check grammar and improve writing',
            icon: 'bi-check2-circle',
            path: 'tools/grammar-checker.html',
            popular: true
        },
        {
            id: 'plagiarism-checker',
            name: 'Plagiarism Checker',
            description: 'Check text for potential plagiarism',
            icon: 'bi-shield-check',
            path: 'tools/plagiarism-checker.html'
        },
        {
            id: 'text-translator',
            name: 'Text Translator',
            description: 'Translate text between languages',
            icon: 'bi-translate',
            path: 'tools/text-translator.html'
        },
        {
            id: 'text-case-converter',
            name: 'Case Converter',
            description: 'Convert text case (upper, lower, title)',
            icon: 'bi-type',
            path: 'tools/text-case-converter.html'
        },
        {
            id: 'text-diff-checker',
            name: 'Text Differ',
            description: 'Compare texts and highlight differences with advanced features',
            icon: 'bi-file-diff',
            path: 'tools/text-differ.html',
            popular: true
        }
    ],
    documentTools: [
        {
            id: 'pdf-to-word',
            name: 'PDF to Word',
            description: 'Convert PDF files to editable Word documents',
            icon: 'bi-file-earmark-word',
            path: 'tools/pdf-tools.html#pdfToWord',
            popular: true
        },
        {
            id: 'word-to-pdf',
            name: 'Word to PDF',
            description: 'Convert Word documents to PDF format',
            icon: 'bi-file-earmark-pdf',
            path: 'tools/pdf-tools.html#wordToPdf'
        },
        {
            id: 'merge-pdf',
            name: 'Merge PDF',
            description: 'Combine multiple PDF files into one',
            icon: 'bi-file-earmark-plus',
            path: 'tools/pdf-tools.html#mergePdf'
        },
        {
            id: 'split-pdf',
            name: 'Split PDF',
            description: 'Split PDF into multiple files',
            icon: 'bi-file-earmark-minus',
            path: 'tools/pdf-tools.html#splitPdf'
        },
        {
            id: 'compress-pdf',
            name: 'Compress PDF',
            description: 'Reduce PDF file size',
            icon: 'bi-file-zip',
            path: 'tools/compress-pdf.html'
        },
        {
            id: 'pdf-to-jpg',
            name: 'PDF to JPG',
            description: 'Convert PDF pages to JPG images',
            icon: 'bi-file-earmark-image',
            path: 'tools/pdf-to-jpg.html'
        },
        {
            id: 'pdf-editor',
            name: 'PDF Editor',
            description: 'Edit PDF files while maintaining original formatting',
            icon: 'bi-file-earmark-pdf',
            path: 'tools/pdf-editor.html',
            popular: true
        }
    ],
    mediaTools: [

        {
            id: 'youtube-thumbnail',
            name: 'YouTube Thumbnail',
            description: 'Download YouTube video thumbnails in HD',
            icon: 'bi-youtube',
            path: 'tools/youtube-thumbnail.html',
            popular: true
        },
        {
            id: 'video-converter',
            name: 'Video Converter',
            description: 'Convert videos to different formats',
            icon: 'bi-camera-video',
            path: 'tools/video-converter.html',
            popular: true
        },
        {
            id: 'video-trimmer',
            name: 'Video Trimmer',
            description: 'Cut and trim video clips',
            icon: 'bi-scissors',
            path: 'tools/video-trimmer.html'
        },

        {
            id: 'audio-studio',
            name: 'Audio Studio',
            description: 'Online audio studio with waveform visualization and effects',
            icon: 'bi-soundwave',
            path: 'tools/audio-studio.html',
            popular: true
        }
    ],
    multimedia: [
        {
            id: 'video-trimmer',
            name: 'Video Editor',
            description: 'Cut, trim, merge videos with advanced editing features',
            icon: 'bi-camera-video',
            path: 'tools/video-trimmer.html',
            popular: true
        },

    ],
    developerTools: [
        {
            id: 'json-tools',
            name: 'JSON Tools',
            description: 'Format, validate, and transform JSON data',
            icon: 'bi-braces',
            path: 'tools/json-formatter.html',
            popular: true
        },
        {
            id: 'code-formatter',
            name: 'Code Beautifier',
            description: 'Format HTML, CSS, JS, SQL, and more',
            icon: 'bi-code-square',
            path: 'tools/code-formatter.html',
            popular: true
        },
        {
            id: 'diff-checker',
            name: 'Code Diff Checker',
            description: 'Compare and highlight code differences',
            icon: 'bi-file-diff',
            path: 'tools/code-differ.html',
            popular: true
        },
        {
            id: 'base64-tools',
            name: 'Base64 Tools',
            description: 'Encode/decode text, files, and images',
            icon: 'bi-code-slash',
            path: 'tools/base64-converter.html'
        },
        {
            id: 'jwt-debugger',
            name: 'JWT Debugger',
            description: 'Decode and verify JWT tokens',
            icon: 'bi-key',
            path: 'tools/jwt-debugger.html'
        },
        {
            id: 'regex-tester',
            name: 'Regex Tester',
            description: 'Test and debug regular expressions',
            icon: 'bi-asterisk',
            path: 'tools/regex-tester.html'
        },
        {
            id: 'cron-parser',
            name: 'Cron Expression Parser',
            description: 'Parse and validate cron expressions',
            icon: 'bi-clock',
            path: 'tools/cron-parser.html'
        },
        {
            id: 'http-client',
            name: 'HTTP Client',
            description: 'Test API endpoints and view responses',
            icon: 'bi-send',
            path: 'tools/http-client.html'
        },
        {
            id: 'ssl-tools',
            name: 'SSL Tools',
            description: 'Certificate decoder and SSL checker',
            icon: 'bi-shield-lock',
            path: 'tools/ssl-tools.html'
        }
    ],
    utilityTools: [
        {
            id: 'qr-generator',
            name: 'QR Code Generator',
            description: 'Generate QR codes from text or URLs',
            icon: 'bi-qr-code',
            path: 'tools/qr-generator.html',
            popular: true
        },
        {
            id: 'color-picker',
            name: 'Color Picker',
            description: 'Pick and convert colors in different formats',
            icon: 'bi-palette',
            path: 'tools/color-picker.html',
            popular: true
        },
        {
            id: 'password-generator',
            name: 'Password Generator',
            description: 'Generate strong and secure passwords',
            icon: 'bi-key',
            path: 'tools/password-generator.html',
            popular: true
        },
        {
            id: 'unit-converter',
            name: 'Unit Converter',
            description: 'Convert between different units of measurement',
            icon: 'bi-arrow-left-right',
            path: 'tools/unit-converter.html',
            popular: true
        },
        {
            id: 'scientific-calculator',
            name: 'Scientific Calculator',
            description: 'Advanced calculator with scientific functions',
            icon: 'bi-calculator',
            path: 'tools/scientific-calculator.html',
            popular: true
        },
        {
            id: 'gst-calculator',
            name: 'GST Calculator',
            description: 'Calculate GST amounts and final prices',
            icon: 'bi-percent',
            path: 'tools/calculators/gst.html'
        },
        {
            id: 'salary-calculator',
            name: 'Salary Calculator',
            description: 'Calculate net salary, taxes, and deductions',
            icon: 'bi-cash-stack',
            path: 'tools/calculators/salary.html'
        },
        {
            id: 'lic-calculator',
            name: 'LIC Premium Calculator',
            description: 'Calculate LIC premiums and maturity values',
            icon: 'bi-shield-check',
            path: 'tools/calculators/lic.html'
        },
        {
            id: 'emi-calculator',
            name: 'EMI Calculator',
            description: 'Calculate loan EMIs and total interest',
            icon: 'bi-bank',
            path: 'tools/calculators/emi.html'
        },
        {
            id: 'investment-calculator',
            name: 'Investment Calculator',
            description: 'Calculate returns on investments and SIPs',
            icon: 'bi-graph-up',
            path: 'tools/calculators/investment.html'
        },
        {
            id: 'file-hash',
            name: 'File Hash',
            description: 'Calculate MD5, SHA-1, SHA-256 hashes',
            icon: 'bi-hash',
            path: 'tools/file-hash.html'
        },
        {
            id: 'url-encoder',
            name: 'URL Tools',
            description: 'Encode, decode, shorten URLs and generate QR codes',
            icon: 'bi-link',
            path: 'tools/url-encoder.html',
            popular: true
        },
        {
            id: 'cpc-calculator',
            name: 'CPC Pay Calculator',
            description: 'Calculate salary as per 6th and 7th Pay Commission rules',
            icon: 'bi-cash-stack',
            path: 'tools/calculators/cpc.html',
            category: 'calculators'
        }
    ]
};

module.exports = toolsData;
