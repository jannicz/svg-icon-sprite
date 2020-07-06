import { SvgIcon } from '../src/svg-icon.webcomponent';
import { SvgAttr } from '../src/svg-attr.enum';

// Matchers, i.e. toBeInTheDocument, toBeTrue etc.
import '@testing-library/jest-dom';

// Selectors, i.e. getByTestId
import { getByTestId } from '@testing-library/dom';

describe('SVG Icon Webcomponent callbacks and error warnings', () => {
  document.body.innerHTML =
    '<div class="outer" data-testid="outer">' +
    '  <svg-icon src="foo#bar"></svg-icon>' +
    '</div>';
  const svg = new SvgIcon();

  it('should execute render() when the connectedCallback is called', () => {
    const render = jest.spyOn(svg, 'render');
    svg.connectedCallback();
    expect(render).toHaveBeenCalled();
  });

  it('should render the shadow dom in the document', () => {
    const svgEl = getByTestId(document.body, 'outer');

    // TODO Find a way to access shadow-dom and check whether the svg was rendered
    expect(svgEl).toBeInTheDocument();
  });

  it('should execute updateByProperty() after the attributeChangedCallback is called', () => {
    const updateByProperty = jest.spyOn(svg, 'updateByProperty');
    svg.attributeChangedCallback(SvgAttr.ViewBox, 'something', 'else');
    expect(updateByProperty).toHaveBeenCalledWith('viewbox');
  });

  it('should log a warning when a default path is not set and not passed', () => {
    const log = jest.spyOn(global.console, 'warn')
    svg.attributeChangedCallback(SvgAttr.Src, 'something', 'foo');

    expect(log).toHaveBeenCalledWith('SVG-Icon Webcomponent: \"foo\" missing the path to the sprite and no default path is set');
    expect(svg.src).toBeUndefined();
  });
});

describe('SVG Icon Webcomponent rendering and properties', () => {
  const svg = new SvgIcon();

  it('should correctly change src when passing a new value', () => {
    svg.attributeChangedCallback(SvgAttr.Src, 'something', 'foo#bar');

    expect(svg.src).toBe('foo#bar');
  });

  it('should correctly detect the default path from meta application-name when passing a new src', () => {
    document.head.innerHTML =
      '<meta name="application-name" content="Some name" data-svg-sprite-path="/sprites/sprite2.svg">';

    svg.attributeChangedCallback(SvgAttr.Src, 'something', 'baz');
    expect(svg.src).toBe('/sprites/sprite2.svg#baz');

    svg.attributeChangedCallback(SvgAttr.Src, 'something', '/sprites/sprite.svg#foo');
    expect(svg.src).toBe('/sprites/sprite.svg#foo');
  });

  it('should render the HTML with the correct values', () => {
    svg.width = '100px';
    svg.height = '120px';
    svg.src = 'foo#bar';
    svg.render();

    expect(svg.src).toBe('foo#bar');
    expect(svg.innerHTML.replace((/  |\r\n|\n|\r/gm),''))
      .toBe('<svg width="100px" height="120px" style="fill: currentColor;"><use xlink:href="foo#bar" style="fill: currentColor;"></use></svg>');
  });

  it('should correctly update all class names', () => {
    svg.attributeChangedCallback(SvgAttr.Classes, 'something', 'foo bar baz');

    expect(svg.innerHTML.replace((/  |\r\n|\n|\r/gm),''))
      .toBe('<svg width="100px" height="120px" style="fill: currentColor;" class="foo bar baz"><use xlink:href="foo#bar" style="fill: currentColor;"></use></svg>');
  });

  it('should correctly remove some class names', () => {
    svg.attributeChangedCallback(SvgAttr.Classes, 'something', 'foo');

    expect(svg.innerHTML.replace((/  |\r\n|\n|\r/gm),''))
      .toBe('<svg width="100px" height="120px" style="fill: currentColor;" class="foo"><use xlink:href="foo#bar" style="fill: currentColor;"></use></svg>');
  });

  it('should correctly reset height and width to 100%', () => {
    svg.attributeChangedCallback(SvgAttr.Height, 'something', '');
    svg.attributeChangedCallback(SvgAttr.Width, 'something', '');

    expect(svg.innerHTML.replace((/  |\r\n|\n|\r/gm),''))
      .toBe('<svg width="100%" height="100%" style="fill: currentColor;" class="foo"><use xlink:href="foo#bar" style="fill: currentColor;"></use></svg>');
  });
});
