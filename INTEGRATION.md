# SVG Icon Sprite - Web Component

## Integration Examples

First, add the lib to your node-modules and `package.json`.

### React

When using a module loader like Webpack (i.e. with a React), import the web component
via the `import` statement and then invoke it in your template (`HTML`, `JSX` etc.)

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

A thorough React example you will find on [codesandbox](https://codesandbox.io/s/fervent-northcutt-lvupd)

### Angular

In order to use Web Components in Angular, you must fist add `CUSTOM_ELEMENTS_SCHEMA` in `app.module.ts`

```
@NgModule({
  ...
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
```

Then import `svg-icon-sprite` inside of the component (`.ts` file)

```javascript
import 'svg-icon-sprite';
```

Now you can use the `svg-icon` tag inside your template (`.html` file)

```html
<svg-icon src="assets/sprites/sprite.svg#bunsen-burner"></svg-icon>
```

See the full [example on codesandbox](https://codesandbox.io/s/happy-chatelet-zsl93)

## Author & License
- Jan Suwart | MIT License
