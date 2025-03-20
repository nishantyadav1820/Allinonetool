const fs = require('fs');
const path = require('path');

// Function to update navigation links in a file
function updateNavigationLinks(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Update navbar brand link
        content = content.replace(
            /href="\/index\.html"/g,
            'href="../index.html"'
        );
        
        // Update home nav link
        content = content.replace(
            /<a class="nav-link"[^>]*href="\/index\.html"/g,
            '<a class="nav-link" href="../index.html"'
        );
        
        fs.writeFileSync(filePath, content);
        console.log(`Updated navigation in: ${path.basename(filePath)}`);
    } catch (error) {
        console.error(`Error updating ${filePath}:`, error);
    }
}

// Get all HTML files in the tools directory
const toolsDir = path.join(__dirname, '..', 'tools');
const files = fs.readdirSync(toolsDir)
    .filter(file => file.endsWith('.html'))
    .map(file => path.join(toolsDir, file));

// Update each file
files.forEach(updateNavigationLinks);
