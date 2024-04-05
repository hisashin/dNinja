import express from 'express';
import path from 'path';
import * as fs from 'fs';
import { genKiCad } from './lib/kicad.mjs'
import { genGerber } from './lib/gerber.mjs'
import { encycle, decycle } from 'json-cyclic'

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.set('view engine', 'ejs')
app.use('/images', express.static('images'));

app.get('/', (req, res) => {
  //res.send('Hello World');
  res.render('index');
});
app.get('/download', (req, res) => {
  let hx = req.query.hx;
  let hy = req.query.hy;
  let d = req.query.d;
  let b = req.query.b;
  let sq = req.query.sq;
  let rc = ('true' == req.query.rc);
  let paste = ('true' == req.query.paste);
  let dx = req.query.dx;
  let dy = req.query.dy;
  let format = req.query.format;
  let layers = req.query.layers;
  if(sq && !Array.isArray(sq))sq = [ sq ];
  if(layers && !Array.isArray(layers))layers = [ layers ];
  console.log(`format=${format}, layers=${layers}`);
  let data = genKiCad(hx, hy, d, b, sq, rc, paste, dx, dy);
  if('gerber' == format) {
    data = genGerber(data, layers);
  }
  res.writeHead(200, {
    'Content-Type': 'application/force-download',
    'Content-disposition': `attachment; filename=${data.filename}`
  });
  res.end(data.content);
});
app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
