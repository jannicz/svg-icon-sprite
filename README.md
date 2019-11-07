# SVG Icon Sprite - Web Component

A Web Component to include and manipulate SVGs from a generated sprite file

## Demo

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

### React

Using a module loader like Webpack (i.e. with a React) import the web component
via the `import` statement and then invoke it in your template (HTML, JSX etc.)

```jsx harmony
import 'svg-icon-sprite';

class MyClass extends React.Component {
  render() {
    return (
      <svg-icon
          src="assets/sprites/sprite.svg#blender"
          width="50px"
          height="50px"
          classes="foo bar"
      ></svg-icon>
    )
  }
}
```

### Angular

Using Angular, first import svg-icon-sprite inside the component (`.ts` file)

```javascript
import 'svg-icon-sprite';
```

Now you can use the `svg-icon` tag inside your template

```html
<svg-icon src="assets/sprite.svg#bunsen-burner"></svg-icon>
```

Don't forget to add CUSTOM_ELEMENTS_SCHEMA in `app.module.ts`

```
@NgModule({
  ...
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
```

## Author & License
- Jan Suwart | MIT License
