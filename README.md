# SVG Icon Sprite - Web Component

A dependency-free Web Component to include and manipulate SVGs from a generated sprite file

## Demo

<img width="280" alt="Demo Screenshot" src="screenshot.png">

[Try out the svg-icon-sprite demo](https://jannicz.github.io/svg-icon-sprite/)

## Use Cases

 - Serve all your SVG icons from a single file
 - Generate the sprite file with the provided script
 - Fill, scale and manipulate your icons

## Generating the sprite

Each time you add an icon, you need to run a script generating the sprite.
Add the following line to your npm scripts

```json
"scripts": {
  "generate:sprite": "node node_modules/svg-icon-sprite/scripts/cli.js --folder=dir/subdir --output=dir/filename.svg"
}
```

where following arguments can be passed

Property   | Desc.
---------- | ------------
`--folder` | Path of the source files relative to your *package.json*, i.e. `--folder=assets/icons`
`--output` | Sprite destination, i.e. `--output=assets/sprites/sprite.svg`
`--strip`  | Optionally removes `fill` and `stroke` attributes from the SVG
`--trim`   | Optionally removes all whitespaces (tabs, linebreaks etc.)

Afterwards run it via

```
npm run generate:sprite
```

The script will iterate all SVGs in the source folder and create a single sprite SVG file
using the [svg symbols technique](https://css-tricks.com/svg-symbol-good-choice-icons/).

## Import the component

### In static web pages

Simply reference the main file using the script tag in your HTML head

```html
<head>
  <script type="module" src="svg-icon-sprite/dist/svg-icon-sprite.js"></script>
</head>
```

### Via a module bundler

If you are using a bundler, import the node module via

```js
// Webpack or some ES6-style bundler
import 'svg-icon-sprite';

// Browserify (CommonJS)
const SvgIcon = require('svg-icon-sprite');
```

### Use the component

Now that the web component is registered, you can invoke using the `svg-icon` tag

```html
<svg-icon
  src="assets/sprites/sprite.svg#explore"
  width="48px"
  viewBox="0 0 24 24"
></svg-icon>
```

Above markup will render the icon that had the filename `explore.svg` and is now included in the sprite.

## Options

- `src` - icon source relative to your app folder, syntax is `folder/file#icon` where `icon` is the filename of the svg
- `width` *optional* - width of the svg in any length unit, i.e. `32px`, `50%`, `auto` etc., default is `100%`
- `height` *optional* - the height of the svg in any length unit
- `classes` *optional* - class name(s) separated by spaces
- `viewBox` *optional* - define lengths and coordinates in order to scale to fit the total space available

## Coloring

This icon pattern works best when applied on single color icons (SVGs that do not have
fill or stroke attributes). This enables you to use CSS rules to change the icon's color:

```scss
svg-icon {
  color: red;
}
```

When using multi-color icons (icon that contain styles inside of their markup),
you will only be able to apply CSS transforms (i.e. scale).

### Scaling and Sizing

If your SVG does not scale like expected (i.e. it is cropped or larger than desired) it might be lacking a `viewBox`.
Set the `viewBox` property manually to match the size of the exported shape. A combination of the correct
`viewBox` and width is required.

```html
<!-- i.e. lower '0 0 24 24' to '0 0 20 20' to scale up -->
<svg-icon src="assets/sprites/sprite.svg#star"
  width="48px"
  viewBox="0 0 24 24"
></svg-icon>
```

See the viewBox [example](https://jannicz.github.io/svg-icon-sprite/examples/scaling.html) for further details.
Still troubled? Then read [this article](https://css-tricks.com/scale-svg/).

### Default sprite path

You can set the default sprite path by adding the attribute `data-svg-sprite-path` to any meta tag in your html head
 
```html
<head>
  <meta name="application-name" content="Name of Your App" data-svg-sprite-path="../assets/sprites/sprite.svg">
</head>
```
 
From now on you just need to pass the icon name as src attribute, i.e. `src="explore"`

## Integration

### Using inside of Angular or React

The SVG-Icon web component matches perfectly with SPA like Angular or React

 - [React & Next.js integration example](./INTEGRATION.md#user-content-react) 
 - [Angular integration example](./INTEGRATION.md#user-content-angular)

## Polyfills and browser support

As Web Components are not supported in all browsers, you might want to install a polyfill

```
npm i @webcomponents/webcomponentsjs
```

and include it in the head of your `index.html`

```html
<script src="node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js"></script>
```

This should enable support in all evergreen browsers (also including Edge, Safari 9+).
To learn more, read [this](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs#browser-support).

## Author & License
- Jan Suwart | MIT License
