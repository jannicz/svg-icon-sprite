# SVG Icon Sprite - Web Component

In progress...

## Demo

[Try out the svg-icon-sprite demo](https://jannicz.github.io/svg-icon-sprite/)

## Generating the sprite

Each time you add an icon, you need to run a script generating the sprite. You might want to add it to your npm scripts:

```json
"scripts": {
  "generate:sprite": "node node-modules/svg-icon-sprite/scripts/generate-sprite.js --folder=assets/icons --output=assets/sprites/sprite.svg"
}
```

And run it via

```
npm run generate:sprite
```

The script will iterate all SVGs in the folder `/assets/icons` and create a sprite SVG file into
`/assets/sprites` using the [svg symbols technique](https://css-tricks.com/svg-symbol-good-choice-icons/).

## Invoke the component
