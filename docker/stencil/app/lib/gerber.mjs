import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import child_process from 'child_process';
import AdmZip from 'adm-zip';

const parentDir = '/tmp';

/*
root@1731c10f44d1:/usr/src/app# kicad-cli pcb export gerbers -h
input: 1 argument(s) expected. 0 provided.
Usage: gerbers [-h] [--output VAR] [--layers VAR] [--exclude-refdes] [--exclude-value] [--include-border-title] [--no-x2] [--no-netlist] [--subtract-soldermask] [--disable-aperture-macros] [--precision VAR] [--common-layers VAR] [--board-plot-params] input

Positional arguments:
  input                        	Input file 

Optional arguments:
  -h, --help                   	shows help message and exits 
  -o, --output                 	Output file name [default: ""]
  -l, --layers                 	Comma separated list of untranslated layer names to include such as F.Cu,B.Cu [default: ""]
  --erd, --exclude-refdes      	Exclude the reference designator text 
  --ev, --exclude-value        	Exclude the value text 
  --ibt, --include-border-title	Include the border and title block 
  --no-x2                      	Do not use the extended X2 format 
  --no-netlist                 	Do not generate netlist attributes 
  --subtract-soldermask        	Subtract soldermask from silkscreen 
  --disable-aperture-macros    	Disable aperature macros 
  --precision                  	Precision of gerber coordinates, valid options: 5 or 6 [default: 6]
  --cl, --common-layers        	Layers to include on each plot, comma separated list of untranslated layer names to include such as F.Cu,B.Cu [default: ""]
  --board-plot-params          	Use the gerber plot settings already configured in the board file 
*/

export function genGerber(data, layers) {
  let uuid = uuidv4();
  console.log(`uuid=${uuid}`);
  let dir = parentDir + '/' + uuid;
  fs.mkdirSync(dir);
  console.log(`${dir} created`);
  let kicad = dir + '/' + data.filename;
  fs.writeFileSync(kicad, data.content);
  console.log(`${kicad} saved`);
  let l = layers ? ' -l ' + layers.join(',') : '';
  let cmd = `cd ${dir};kicad-cli pcb export gerbers ${l} ${kicad}`
  console.log(`cmd=${cmd}`);
  const res = child_process.execSync(cmd);
  console.log(`res=${res}`);
  const files = fs.readdirSync(dir);
  if(layers.length == 1) {
    let target = layers[0].replace('.', '_');
    console.log(`target=${target}`);
    for (let i = 0; i < files.length; i++) {
      console.log(`checking ${dir}/${files[i]}`);
      if(files[i].includes(target)) {
        let content = fs.readFileSync(dir + '/' + files[i]);
        rmdir(dir);
        return {
          filename: files[i],
          content: content
        };      
      }
    }
    rmdir(dir);
    return {
      filename: data.filename,
      content: data.content
    };
  } else {
    const zip = new AdmZip();
    for (let i = 0; i < files.length; i++) {
      console.log(`adding ${dir}/${files[i]}`);
      zip.addLocalFile(dir + '/' + files[i]);
    }
    const zipfilename = dir + '/gerbers.zip'
    zip.writeZip(zipfilename);
    console.log(`saved ${zipfilename}`);
    let content = fs.readFileSync(zipfilename);
    rmdir(dir);
    return {
      filename: 'gerbers.zip',
      content: content
    };
  }
}
function rmdir(dir) {
  console.log(`deleting ${dir}`);
  fs.rmSync(dir, { recursive: true });
}
