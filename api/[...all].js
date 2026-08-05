import handler from '../dist/server/server.js';

export default async (req, res) => {
  try {
    // Convert Node.js request/response to Fetch API
    const url = new URL(req.url, `http://${req.headers.host}`);
    
    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : req,
    });
    
    // Call the server handler
    const response = await handler.default.fetch(request);
    
    // Set response status and headers
    res.status(response.status);
    Object.entries(Object.fromEntries(response.headers)).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    
    // Send response body
    if (response.body) {
      const buffer = await response.arrayBuffer();
      res.end(Buffer.from(buffer));
    } else {
      res.end();
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(`
      <!doctype html>
      <html>
        <head><title>Error</title></head>
        <body><h1>Error</h1><p>${error.message}</p></body>
      </html>
    `);
  }
};
