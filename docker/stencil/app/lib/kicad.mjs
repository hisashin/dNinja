import * as fs from 'fs';

export function genKiCad(hx, hy, d, b, sq, rc, paste, dx, dy) {
  console.log(`hx=${hx}, hy=${hy}, d=${d}, b=${b}, sq=${sq}, rc=${rc}, dx=${dx}, dy=${dy}`);
  let sqAll = sq ? sq.includes('all') : false;
  let sqCenter = sq ? sq.includes('center') : false;
  let sqCorner = sq ? sq.includes('corner') : false;
  if(sqAll) {
    sq = ['all'];
    sqCenter = true;
    sqCorner = true;
  }
  let sqstr = sq ? '_SQ' + sq.join('-') : '';
  let filename = `N${hx}x${hy}_D${d}_B${b}${sqstr}.kicad_pcb`;
  console.log(`filename=${filename}`);
  let content = fs.readFileSync('./views/kicad_pcb.ejs', 'utf8');
  
  let values = [];
  let bmm = b / mil;
  let xmin = x0 - (hx * bmm / 2);
  let ymin = y0 - (hy * bmm / 2);
  let center, corner, rect;
  let rotc = false;
  for(let i = 0 ; i < hx ; i++) {
    for(let j = 0 ; j < hy ; j++) {
      center = isCenter(i, j, hx, hy);
      corner = i == 0 || i == hx -1 || j == 0 || j == hy - 1;
      rect = sqAll || (center && sqCenter) || (corner && sqCorner);
      if(center && rc)rotc = true;
      values.push(addHole(xmin + i*bmm, ymin + j*bmm, d, rect, center && rc, paste));
    }
  }
  values.push(addText(dx, dy, `N:${hx}x${hy} D:${d}mil B:${b}mil SQ:${Array.isArray(sq) ? sq.join(',') : sq}${rotc ? ' RotC' : ''}`));
  values.push(addOutline(dx, dy));
  content = content.replace('##REPLACEME###', values.join('\n'));
  
  return {
    filename: filename,
    content: content
  }
}
function isCenter(i, j, hx, hy) {
  let xdiff = i+1 - hx/2;
  let ydiff = j+1 - hy/2;
  return xdiff >= 0 && xdiff < 1 && ydiff >= 0 && ydiff < 1;
}

const x0 = 148.5;
const y0 = 105;
const o = 1; // corner offset
const rad = Math.PI / 4; // corner mid angle
const oc = o * Math.cos(rad);
const os = o * Math.cos(rad);
const mil = 39.3700787402;

/*
  F.Paste example:
  (gr_circle (center 150.405 103.095) (end 151.675 103.095)
    (stroke (width 0.1) (type solid)) (fill solid) (layer "F.Paste") (tstamp cd7c72f7-a478-45b8-b565-a8e556ae5151))

  Edge.Cuts example:
  (gr_circle (center 150.405 106.905) (end 149.135 106.905)
    (stroke (width 0.1) (type default)) (fill none) (layer "Edge.Cuts") (tstamp 46393a3e-688f-4460-96ab-33e6c16dc651))
 */
function addHole(x, y, d, rect, rotate, paste) {
  let r = d/(2*mil);
  let value = '';
  if(rect) {
    if(rotate) {
      r = r * Math.sqrt(2);
      value = `  (gr_poly
    (pts
      (xy ${x-r} ${y})
      (xy ${x} ${y-r})
      (xy ${x+r} ${y})
      (xy ${x} ${y+r})
    )`;
    } else {
      value = `  (gr_rect (start ${x-r} ${y-r}) (end ${x+r} ${y+r})`
    }
  } else {
    value = `  (gr_circle (center ${x} ${y}) (end ${x-r} ${y})`
  }
  value += `    (stroke (width ${paste ? '0.0' : '0.1'}) (type ${paste ? 'solid' : 'default'})) (fill ${paste ? 'solid' : 'none'}) (layer "${paste ? 'F.Paste' : 'Edge.Cuts'}") (tstamp 87dbf45e-8178-4dd4-b1c0-bc349d2bfdf6))`;
  return value;
}
function addText(dx, dy, str) {
  let x = x0 - dx / 2 + 1;
  let y = y0 - dy / 2 + 2.55
  return `  (gr_text "${str}" (at ${x} ${y}) (layer "Dwgs.User") (tstamp 066eb32b-b25c-42fa-8c64-343b5f798f3f)
    (effects (font (size 1 1) (thickness 0.15)) (justify left bottom))
  )`;
}
function addOutline(dx, dy) {
  let xmin = x0 - dx/2;
  let xmax = x0 + dx/2;
  let ymin = y0 - dy/2;
  let ymax = y0 + dy/2;
  return `  (gr_line (start ${xmin} ${ymax-o}) (end ${xmin} ${ymin+o})
    (stroke (width 0.1) (type default)) (layer "Edge.Cuts") (tstamp e51b62be-65a9-4868-a96a-57c0ec3866b5))
  (gr_arc (start ${xmin} ${ymin+o}) (mid ${xmin+o-oc} ${ymin+1-os}) (end ${xmin+o} ${ymin})
    (stroke (width 0.1) (type default)) (layer "Edge.Cuts") (tstamp ada88ee5-9faa-42f2-a552-0da5d77fb6d8))
  (gr_line (start ${xmin+o} ${ymin}) (end ${xmax-o} ${ymin})
    (stroke (width 0.1) (type default)) (layer "Edge.Cuts") (tstamp 67b54bb4-7c0d-4a79-9e0a-a616ba84209c))
  (gr_arc (start ${xmax-1} ${ymin}) (mid ${xmax-1+oc} ${ymin+1-os}) (end ${xmax} ${ymin+o})
    (stroke (width 0.1) (type default)) (layer "Edge.Cuts") (tstamp a8a5a360-38cf-44c1-a7a5-9d56e85ecd45))
  (gr_line (start ${xmax} ${ymin+o}) (end ${xmax} ${ymax-o})
    (stroke (width 0.1) (type default)) (layer "Edge.Cuts") (tstamp 0f832683-45f3-415b-a5f9-3e70ba12d2e2))
  (gr_arc (start ${xmax} ${ymax-o}) (mid ${xmax-o+oc} ${ymax-o+os}) (end ${xmax-1} ${ymax})
    (stroke (width 0.1) (type default)) (layer "Edge.Cuts") (tstamp c65d5b61-8e72-4ea5-bad0-37638a9f3efb))
  (gr_line (start ${xmax-1} ${ymax}) (end ${xmin+o} ${ymax})
    (stroke (width 0.1) (type default)) (layer "Edge.Cuts") (tstamp c5c3b5e5-6c1b-4caf-bbb9-c4123631d014))
  (gr_arc (start ${xmin+1} ${ymax}) (mid ${xmin+1-oc} ${ymax-o+os}) (end ${xmin} ${ymax-o})
    (stroke (width 0.1) (type default)) (layer "Edge.Cuts") (tstamp bdfc5fa4-d401-44de-9c4c-889a64aca97c))`;
}
