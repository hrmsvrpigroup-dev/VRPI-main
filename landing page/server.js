const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT_START = 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.jsx': 'text/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

// Connected live-reload clients
const reloadClients = [];

function notifyReload() {
  while (reloadClients.length > 0) {
    const res = reloadClients.pop();
    try {
      res.write('data: reload\n\n');
      res.end();
    } catch (e) {}
  }
}

// Watch files for changes
let reloadTimeout = null;
fs.watch(ROOT_DIR, { recursive: true }, (eventType, filename) => {
  if (!filename) return;
  const ext = path.extname(filename).toLowerCase();
  if (['.html', '.css', '.js', '.jsx', '.json', '.svg', '.png', '.jpg'].includes(ext)) {
    if (reloadTimeout) clearTimeout(reloadTimeout);
    reloadTimeout = setTimeout(() => {
      console.log(`\x1b[36m[hot-reload]\x1b[0m File changed: ${filename} -> refreshing browser`);
      notifyReload();
    }, 150);
  }
});

// Live reload client snippet injected into HTML
const LIVE_RELOAD_SCRIPT = `
<!-- Injected Live Reload by VR PI Dev Server -->
<script>
  (function() {
    function connectReload() {
      var es = new EventSource('/__live_reload');
      es.onmessage = function(e) {
        if (e.data === 'reload') {
          console.log('[Dev Server] Reloading page...');
          window.location.reload();
        }
      };
      es.onerror = function() {
        es.close();
        setTimeout(connectReload, 1500);
      };
    }
    connectReload();
  })();
</script>
`;

function startServer(port) {
  const server = http.createServer((req, res) => {
    // Live reload endpoint
    if (req.url === '/__live_reload') {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      });
      res.write('\n');
      reloadClients.push(res);
      return;
    }

    let reqPath = decodeURI(req.url.split('?')[0]);
    if (reqPath === '/' || reqPath === '') {
      reqPath = '/index.html';
    }

    let filePath = path.join(ROOT_DIR, reqPath);

    // Prevent directory traversal
    if (!filePath.startsWith(ROOT_DIR)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('403 Forbidden');
      return;
    }

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        // Fallback to index.html for SPA routing if requested file doesn't exist
        filePath = path.join(ROOT_DIR, 'index.html');
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      fs.readFile(filePath, (readErr, content) => {
        if (readErr) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('500 Internal Server Error');
          return;
        }

        res.writeHead(200, {
          'Content-Type': contentType,
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        });

        if (ext === '.html') {
          let htmlString = content.toString('utf8');
          if (htmlString.includes('</body>')) {
            htmlString = htmlString.replace('</body>', LIVE_RELOAD_SCRIPT + '</body>');
          } else {
            htmlString += LIVE_RELOAD_SCRIPT;
          }
          res.end(htmlString);
        } else {
          res.end(content);
        }
      });
    });
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} in use, trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });

  server.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log('\n\x1b[1m\x1b[32m  VR PI Free Industrial Internship Landing Page\x1b[0m');
    console.log(`\x1b[34m  Reference:\x1b[0m https://recrot.webflow.io/contact-us\n`);
    console.log(`  \x1b[1m➜\x1b[0m  \x1b[1mLocal:\x1b[0m   \x1b[36m${url}/\x1b[0m`);
    console.log(`  \x1b[90m➜  Press Ctrl+C to stop the dev server\x1b[0m\n`);

    // Auto open browser on Windows / Mac / Linux
    const openCmd = process.platform === 'win32' ? `start ${url}` :
                    process.platform === 'darwin' ? `open ${url}` :
                    `xdg-open ${url}`;
    exec(openCmd, () => {});
  });
}

startServer(PORT_START);
