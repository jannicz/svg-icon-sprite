const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

/**
 * Library for generating SVG sprites (using symbol technique)
 *
 * @example
 * Run using "node ./generate-sprite [options] with following options:
 * --folder=folder/subfolder
 * --output=folder/filename.svg
 *
 * @author Jan Suwart
 * @licence MIT
 */
class SvgIconSpriteGenerator {

  constructor(args) {
    if (!args.folder) {
      throw new Error('Please provide a foldername relative to your project root directory');
    }

    // Configuration variables
    this.folder = args.folder;
    this.output = args.output || 'sprite.svg';

    // Private variables
    this.elementsChanged = 0;
    this.svgElement = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0" height="0">\n`;
  }

  /**
   * Define path and filename, read the folder and filter for files, append files
   */
  parseFiles() {
    // PWD = working directory when the process was started
    const workingPath = path.resolve(process.cwd(), this.folder);

    console.log('Running svg-icon-sprite generator...');

    this.readDirectory(this.folder, 'svg').then(files => {

      if (!files.length) {
        console.log(`No SVG files found in folder "${workingPath}"`);
        return;
      }

      const fullFilePath = files.map(file => {
        return { name: file, path: path.resolve(workingPath, file) };
      });

      fullFilePath.forEach((fileObj) => {
        try {
          let file = fs.readFileSync(fileObj.path, 'utf8');
          let name = fileObj.name.replace('.svg', '');

          // console.log('\nProcessing file', fileObj.name, '\n');

          this.svgElement += this.appendSymbol(file, name);
        } catch (e) {
          console.log('Could not parse', fileObj.name, '- file skipped!');
        }
      });

      this.svgElement += '</svg>';

      this.writeFile(this.output, this.svgElement);

    }).catch((error) => {
      console.log('Could not read directory because of error', error);
    });
  }

  /**
   * @param {string} file - full path of current file
   * @param {string} file - name of current file
   * @return {string} the created symbol element as string
   */
  appendSymbol(file, name) {
    if (!file || !name) {
      throw new Error('No file found at ' + file);
    } else if (!file.includes('<svg')) {
      throw new Error('No SVG node found in ' + file);
    }

    this.elementsChanged++;

    const symbolEl = file
      .replace(/ id=".*?"/, '')
      .replace('<svg', `<symbol id="${name}"`)
      .replace('</svg>', '</symbol>');

    // console.log('\nProcessing SVG file', symbolEl, '\n');

    return symbolEl;
  }

  /**
   * Reads the directory and returns array of files that match filetype (i.e. .svg)
   * @param {string} dirname - full directory name relative to the working directory of the script
   * @param {string} filetype - substring that the file should be tested for, i.e. '.svg'
   */
  readDirectory(dirname, filetype) {
    console.log('Reading folder "' + dirname + '" and looking for type "*.' + filetype + '"');

    return new Promise((resolve, reject) => {
      let fileList = [];

      fs.readdir(dirname, (error, files) => {
        if (error) {
          reject(error);
        } else {
          files.forEach((file) => {
            if (file.includes(filetype)) {
              console.log('Reading', file);
              fileList.push(file);
            }
          });

          resolve(fileList);
        }
      });
    });
  }

  /**
   * Writes the string into a folder
   * @param {string} fullFileName - folder and filename
   * @param {string} outputString - the output that should be written
   */
  writeFile(fullFileName, outputString) {
    console.log('Writing', this.elementsChanged, 'elements to file', fullFileName);

    fs.writeFile(fullFileName, outputString, 'utf8', err => {
    	if (err) {
    		console.log('Error writing file', err);
    	}
    });
  }

  /**
   * @param {string} string - input string
   * TODO implement removal of fill and stroke
   */
  stripProperties(string) {

  }
}

const argv = minimist(process.argv.slice(2));

// Create the instance and set the options
const spriteGenerator = new SvgIconSpriteGenerator(argv);
spriteGenerator.parseFiles();
