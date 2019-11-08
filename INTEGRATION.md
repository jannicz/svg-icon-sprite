# SVG Icon Sprite - Web Component

## Integration Examples

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

### Angular

Using Angular, first import svg-icon-sprite inside the component (`.ts` file)

```javascript
import 'svg-icon-sprite';
```

Now you can use the `svg-icon` tag inside your template (`.html` file)

```html
<svg-icon src="assets/sprite.svg#bunsen-burner"></svg-icon>
```

In order to use Web Components, you must add `CUSTOM_ELEMENTS_SCHEMA` in `app.module.ts`

```
@NgModule({
  ...
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
```

## Author & License
- Jan Suwart | MIT License
