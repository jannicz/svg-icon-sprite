#!/usr/bin/env node

const svgParser = require('./svg-parser.lib.js');
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

  constructor(args) {
    if (!args) {
      throw new Error('Please provide all required args, i.e. --folder=./foldername');
    }

    console.log('\nRunning svg-icon-sprite generator via CLI...\n');

    this.parseCliArgs(args);
    // console.log('Class vars, output=>', this.output, 'folder =>', this.folder, 'strip =>', this.strip, 'trim =>', this.trim);
  }

  parseCliArgs(args) {
    args.forEach((arg) => {
      const regex = /--(\w+)=?(.*)/i;
      // @see https://regexr.com/5avua
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
  }

  createFileList(files, workingPath) {
    if (!files.length) {
      throw new Error(`No SVG files found in folder "${workingPath}"`);
    }

    return files.map(file => {
      return { name: file, path: path.resolve(workingPath, file) };
    });
  }

  /**
   * Main parsing function, use current working directory as initial path
   */
  async parse() {
    const workingPath = path.resolve(process.cwd(), this.folder);
    const files = await svgParser.readDirectory(this.folder, 'svg');
    const fileList = this.createFileList(files, workingPath);

    let { svgElement, elementsChanged } = svgParser.iterateFiles(fileList, this.strip, this.trim);

    if (elementsChanged > 0) {
      svgElement = svgParser.wrapInSvgTag(svgElement);

      await svgParser.writeIconsToFile(this.output, svgElement);
      console.log('\nWrote', elementsChanged, 'symbol elements in file', this.output);
    } else {
      console.log('\nFinished without result (no file changes done)');
    }
  }
}

// Grab arguments
const [,, ...args] = process.argv;

// Create the instance and set the options
const spriteGenerator = new SvgIconSpriteGenerator(args);

// Start parsing and generation sequence
spriteGenerator.parse().catch(error => {
  console.log('Failed to parse icons because of error:', error);
});

module.exports = SvgIconSpriteGenerator;
