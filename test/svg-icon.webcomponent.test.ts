import { SvgIcon } from '../src/svg-icon.webcomponent';
import { SvgAttr } from '../src/svg-attr.enum';

// Matchers, i.e. toBeInTheDocument, toBeTrue etc.
import '@testing-library/jest-dom';

// Selectors, i.e. getByTestId
import { getByTestId } from '@testing-library/dom';

describe('SVG Icon Webcomponent', () => {
  document.body.innerHTML =
    '<div class="outer" data-testid="outer">' +
    '  <svg-icon src="foo#bar"></svg-icon>' +
    '</div>';
  const svg = new SvgIcon();

  it('should render the component in the document', () => {
    const svgEl = getByTestId(document.body, 'outer');

    // TODO Find a way to access shadow-dom and check whether the svg was rendered
    expect(svgEl).toBeInTheDocument();
  });

  it('should log a warning when a default path is not set and not passed', () => {
    const log = jest.spyOn(global.console, 'warn')
    svg.attributeChangedCallback(SvgAttr.Src, 'something', 'foo');

    expect(log).toHaveBeenCalledWith('SVG-Icon Webcomponent: \"foo\" missing the path to the sprite and no default path is set');
    expect(svg.src).toBeUndefined();
  });

  it('should correctly change src when passing a new value', () => {
    document.head.innerHTML =
      '<meta name="application-name" content="Some name" data-svg-sprite-path="/sprites/sprite.svg">';
    svg.attributeChangedCallback(SvgAttr.Src, 'something', 'foo#bar');

    expect(svg.src).toBe('foo#bar');
  });

  it('should correctly detect a default path when passing a new src', () => {
    svg.attributeChangedCallback(SvgAttr.Src, 'something', 'baz');

    expect(svg.src).toBe('/sprites/sprite.svg#baz');
  });
});
