import express from 'express';

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.get('/download', (req, res) => {
  //res.status(200).contentType('text/plain');
  //res.send('This is the content', { 'Content-Disposition': 'attachment; filename=name.txt' }); 
  res.writeHead(200, {'Content-Type': 'application/force-download','Content-disposition':'attachment; filename=file.txt'});
  res.end('Hello Text');
});
app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
