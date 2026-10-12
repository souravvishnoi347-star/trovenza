const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

// Ensure images directory exists and copy uploaded logo
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const uploadedLogoPath = 'C:\\Users\\soura\\.gemini\\antigravity\\brain\\aa94bc5c-b687-432c-b1db-132683763892\\.user_uploaded\\media_1789717243550.png';
const targetLogoPath = path.join(imagesDir, 'logo.png');

if (fs.existsSync(uploadedLogoPath)) {
  try {
    fs.copyFileSync(uploadedLogoPath, targetLogoPath);
    console.log('[Assets] Official Lion Medallion Logo successfully linked to images/logo.png');
  } catch (err) {
    console.error('[Assets] Error copying logo:', err.message);
  }
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  let cleanUrl = req.url.split('?')[0];
  if (cleanUrl === '/' || cleanUrl === '') {
    cleanUrl = '/index.html';
  }

  // Prevent directory traversal
  const safePath = path.normalize(cleanUrl).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(__dirname, safePath);

  // If pointing to a directory, look for index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // If no extension and .html file exists, serve it (Clean URLs)
  if (!path.extname(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
          <div style="font-family: sans-serif; text-align: center; padding: 4rem;">
            <h1>404 - Page Not Found</h1>
            <p>Return to <a href="/">Trovenza Travels Homepage</a></p>
          </div>
        `);
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Server Error: ${err.code}`);
      }
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`  TROVENZA GROUP - OFFICIAL MULTI-SERVICE PLATFORM`);
  console.log(`  Homepage:      http://localhost:${PORT}/`);
  console.log(`  Taxi Services: http://localhost:${PORT}/taxi-services.html`);
  console.log(`  Char Dham:     http://localhost:${PORT}/chardham-yatra.html`);
  console.log(`  Govt Tenders:  http://localhost:${PORT}/govt-tenders.html`);
  console.log(`  Contact:       http://localhost:${PORT}/contact.html`);
  console.log(`======================================================\n`);
});
