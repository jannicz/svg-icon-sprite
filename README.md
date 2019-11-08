# SVG Icon Sprite - Web Component

A Web Component to include and manipulate SVGs from a generated sprite file

## Demo

<img width="280" alt="Demo Screenshot" src="screenshot.png">

[Try out the svg-icon-sprite demo](https://jannicz.github.io/svg-icon-sprite/)

## Use Cases

 - Serve all your SVG icons from a single file
 - Generate the sprite file with the provided script
 - Fill, scale and manipulate the icons as you wish

## Installation

```
npm i -S svg-icon-sprite
```

## Generating the sprite

Each time you add an icon, you need to run a script generating the sprite.
Add the following line to your npm scripts

```json
"scripts": {
  "generate:sprite": "node node_modules/svg-icon-sprite/scripts/generate-sprite.js --folder=dir/subdir --output=dir/filename.svg"
}
```

in which `--folder` is the path of the source files relative to your __package.json__, i.e. `--folder=assets/icons`
and likewise `--output` is the sprite destination, i.e. `--output=assets/sprites/sprite.svg`. Afterwards run it via

```
npm run generate:sprite
```

The script will iterate all SVGs in the source folder and create a single sprite SVG file
using the [svg symbols technique](https://css-tricks.com/svg-symbol-good-choice-icons/).

## Import the component

### Static web pages

Simply import it using the script tag in your HTML head

```html
<head>
  <script type="module" src="node_modules/svg-icon-sprite/dist/svg-icon-sprite.js"></script>
</head>
```

### Via a module bundler

If you are using a bundler, import the node module via

```js
// Webpack or some ES6-style bundler
import 'svg-icon-sprite';

// CommonJS (Browserify)
const SvgIconSprite = require('svg-icon-sprite');
```

Now you can invoke the web component using the `svg-icon` tag

```html
<svg-icon
  src="assets/sprites/sprite.svg#explore"
  width="48px"
  height="48px"
  classes="foo bar"
></svg-icon>
```

### Using Angular or React

Web components match perfectly with SPA like Angular or React.

 - [React integration example](./INTEGRATION.md#user-content-react) 
 - [Angular integration example](./INTEGRATION.md#user-content-angular) 

## Options

- `src` - icon source name, the syntax is `path/file#icon` where `path` is relative to your app folder, `file` is
the name of the sprite and `icon` is the filename of the svg icon
- `width` *optional* - width of the svg in any length unit, i.e. `32px`, `50%`, `auto` etc., default is `100%`
- `height` *optional* - the height of the svg in any length unit
- `classes` *optional* - class name(s) separated by spaces
- `viewBox` *optional* - define lengths and coordinates in order to scale to fit the total space available

## Coloring

This icon pattern works best when applied on single color icons (SVGs that do not have
fill or stroke attributes). This enables you to use CSS rules to change the icons color:

```scss
svg-icon {
  color: red;
}
```

Using two-tone or multi color icons, you will only be able to apply CSS transforms (i.e. scale).

## Author & License
- Jan Suwart | MIT License
