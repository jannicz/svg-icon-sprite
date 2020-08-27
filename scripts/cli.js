#!/usr/bin/env node

const svgParser = require('./svg-parser.lib.js');
const fs = require('fs');
const path = require('path');

/**
 * CLI for generating SVG sprites
 *
 * @example
 * Run using "node ./generate-sprite [options] with following options:
 * --folder=folder/subfolder
 * --output=folder/filename.svg
 * --strip
 * --trim
 *
 * @author Jan Suwart
 * @licence MIT
 */
class SvgIconSpriteGenerator {

  strip = false;
  trim = false;
  output = 'sprite.svg';
  folder;
  elementsChanged = 0;

  constructor(args) {
    if (!args) {
      throw new Error('Please provide all required args, i.e. --folder=./foldername');
    }

    console.log('\nRunning svg-icon-sprite generator via CLI...\n');

    args.forEach((arg, i) => {
      // @see https://regexr.com/5avua
      const regex = /--(\w+)=?(.*)/i;
      const match = arg.match(regex);

      if (match) {
        switch(match[1]) {
          case 'folder': {
            this.folder = match[2];
            break;
          }
          case 'output': {
            this.output = match[2];
            break;
          }
          case 'strip': {
            this.strip = match[2] !== 'false';
            break;
          }
          case 'trim': {
            this.trim = match[2] !== 'false';
            break;
          }
          default: {
            console.warn('Ignoring invalid argument', arg);
          }
        }
      }
      // console.log('match =>', match);
    });
    // console.log('Class vars, output=>', this.output, 'folder =>', this.folder, 'strip =>', this.strip, 'trim =>', this.trim);
  }

  /**
   * Main parsing function
   */
  async parse() {
    // PWD = working directory when the process was started
    const workingPath = path.resolve(process.cwd(), this.folder);
    const files = await svgParser.readDirectory(this.folder, 'svg');

    let svgElement = this.iterateFiles(workingPath, files);
    svgElement = svgParser.wrapInSvgTag(svgElement);

    if (this.trim) {
      svgElement = svgParser.removeWhitespaces(svgElement);
    }

    await svgParser.writeIconsToFile(this.output, svgElement);
    console.log('\nWrote', this.elementsChanged, 'symbol elements in file', this.output);
  }

  iterateFiles(workingPath, files) {
    let svgElems = '';

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
        let symbolEl = svgParser.createSymbol(file, name);

        if (this.strip) {
          symbolEl = svgParser.stripProperties(symbolEl);
        }

        svgElems += symbolEl;
        this.elementsChanged++;
      } catch (e) {
        console.warn('- Could not parse', fileObj.name, '==========> file skipped <==========');
      }
    });

    return svgElems;
  }
}

// Grab arguments
const [,, ...args] = process.argv;

// Create the instance and set the options
const spriteGenerator = new SvgIconSpriteGenerator(args);

// Start parsing and generation sequence
spriteGenerator.parse().catch(error => {
  console.log('Could not read and parse directory because of error:', error);
});

module.exports = SvgIconSpriteGenerator;
