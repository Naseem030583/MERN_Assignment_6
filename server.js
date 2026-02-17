// Import the built-in http module for creating the server
const http = require('http');

// Import the fs module for reading files asynchronously
const fs = require('fs');

// Import the path module for handling file paths
const path = require('path');

// Define the port number the server will listen on
const PORT = 3000;

/**
 * Helper function to get the content type based on file extension
 * @param {string} filePath - The path of the file
 * @returns {string} - The MIME type for the file
 */
function getContentType(filePath) {
    const extname = path.extname(filePath);
    const contentTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.ico': 'image/x-icon'
    };
    return contentTypes[extname] || 'text/plain';
}

/**
 * Helper function to serve a file asynchronously
 * @param {string} filePath - Path to the file to serve
 * @param {object} res - HTTP response object
 * @param {number} statusCode - HTTP status code (default: 200)
 */
function serveFile(filePath, res, statusCode = 200) {
    // Read the file asynchronously
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // If file not found, serve 404 page
            if (err.code === 'ENOENT') {
                serveFile(path.join(__dirname, 'public', '404.html'), res, 404);
            } else {
                // Server error
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 - Internal Server Error</h1>');
            }
        } else {
            // Successfully read file, send response
            const contentType = getContentType(filePath);
            res.writeHead(statusCode, { 'Content-Type': contentType });
            res.end(content);
        }
    });
}

/**
 * Route handler function - maps URLs to file paths
 * @param {string} url - The requested URL
 * @returns {string} - The file path to serve
 */
function getFilePath(url) {
    // Define route mappings
    const routes = {
        '/': 'home.html',
        '/home': 'home.html',
        '/about': 'about.html',
        '/contact': 'contact.html',
        '/services': 'services.html'
    };

    // Check if it's a defined route
    if (routes[url]) {
        return path.join(__dirname, 'public', routes[url]);
    }

    // Check if it's a static file request (CSS, JS, images)
    if (url.startsWith('/styles.css') || url.startsWith('/script.js')) {
        return path.join(__dirname, 'public', url);
    }

    // Return null for undefined routes (will trigger 404)
    return null;
}

/**
 * Create the HTTP server
 * The callback function handles all incoming requests
 */
const server = http.createServer((req, res) => {
    // Log the incoming request for debugging
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);

    // Only handle GET requests
    if (req.method === 'GET') {
        // Get the file path for the requested URL
        const filePath = getFilePath(req.url);

        if (filePath) {
            // Serve the file if route exists
            serveFile(filePath, res, 200);
        } else {
            // Serve 404 page for undefined routes
            serveFile(path.join(__dirname, 'public', '404.html'), res, 404);
        }
    } else {
        // Method not allowed
        res.writeHead(405, { 'Content-Type': 'text/html' });
        res.end('<h1>405 - Method Not Allowed</h1>');
    }
});

/**
 * Start the server and listen on the specified port
 */
server.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log('🧺 Laundry Services Web Server');
    console.log('='.repeat(50));
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('');
    console.log('Available Routes:');
    console.log(`  • http://localhost:${PORT}/home    - Home Page`);
    console.log(`  • http://localhost:${PORT}/about   - About Page`);
    console.log(`  • http://localhost:${PORT}/contact - Contact Page`);
    console.log(`  • http://localhost:${PORT}/services - Services Page`);
    console.log('');
    console.log('Press Ctrl+C to stop the server');
    console.log('='.repeat(50));
});
