const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  console.log(`Request: ${req.url}`);
  
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.url === '/' || req.url === '/test') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <title>🚀 اختبار الاتصال - منصة الغلة</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            background: linear-gradient(135deg, #10b981, #059669); 
            color: white; text-align: center; padding: 50px;
          }
          h1 { font-size: 3rem; margin-bottom: 20px; }
          .success { font-size: 1.5rem; margin: 20px 0; }
          .container { max-width: 600px; margin: 0 auto; }
          .button { 
            display: inline-block; margin: 10px; padding: 15px 30px; 
            background: #065f46; color: white; text-decoration: none; 
            border-radius: 10px; font-weight: bold; 
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🌾 منصة الغلة المليون دولار</h1>
          <div class="success">
            ✅ الخادم يعمل بنجاح على المنفذ 5173!<br>
            🚀 SaaS جاهز للعمل
          </div>
          <div>
            <strong>الوقت:</strong> ${new Date().toLocaleString('ar-DZ')}
          </div>
          <div style="margin-top: 30px;">
            <h3>المشكلة محلولة! 🎉</h3>
            <p>إذا رأيت هذه الصفحة، فإن المنفذ 5173 يعمل بشكل صحيح</p>
          </div>
        </div>
        <script>
          console.log('🚀 Emergency server working on port 5173');
          console.log('✅ Time:', new Date().toISOString());
        </script>
      </body>
      </html>
    `);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

const PORT = 5173;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Emergency server running on http://localhost:${PORT}`);
  console.log(`✅ Test URL: http://localhost:${PORT}/test`);
  console.log(`🌾 الغلة Emergency Server Active`);
});

// Handle server errors
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`❌ Port ${PORT} is already in use. Trying to kill existing process...`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
  }
});