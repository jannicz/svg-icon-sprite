const typeInput = document.querySelector('#type');
const viewBoxEnableInput = document.querySelector('#viewbox-on');
const viewBox1Input = document.querySelector('#viewbox1');
const viewBox2Input = document.querySelector('#viewbox2');
const viewBox3Input = document.querySelector('#viewbox3');
const viewBox4Input = document.querySelector('#viewbox4');
const sizeInput = document.querySelector('#size');
const colorInput = document.querySelector('#color');
const classesInput = document.querySelector('#classes');
const sizeLabel = document.querySelector('[for="size"] span');
const typeLabel = document.querySelector('[for="type"] span');
const classesLabel = document.querySelector('[for="classes"] span');
const colorLabel = document.querySelector('[for="color"] span');
const icon = document.querySelector('.manipulation svg-icon');
let viewBox = '0 0 24 24';

// Polyfill forEach for NodeLists
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

/**
 * Onload hover effect
 */
const iconElems = document.querySelectorAll('.demo-list-item');

iconElems.forEach((icon, i) => {
  const index = i + 1;

  setTimeout(() => {
    icon.classList.add('focus');
  }, 500 + (index * 100));
  setTimeout(() => {
    icon.classList.remove('focus');
  }, 700 + (1.4 * index * 100));
});

/**
 * Demo Controls
 */
typeInput.addEventListener('change', (event) => {
  let number = event.target.value;
  let demoList = document.querySelectorAll('.demo-list li');
  let newIconSrc = demoList[number].querySelector('svg-icon').getAttribute('src');
  icon.setAttribute('src', newIconSrc);
  typeLabel.textContent = newIconSrc;
  console.log('Change src to', newIconSrc);
});
sizeInput.addEventListener('change', (event) => {
  let size = event.target.value + 'px';
  icon.setAttribute('width', size);
  sizeLabel.textContent = size;
  console.log('Change width to', size);
});
colorInput.addEventListener('change', (event) => {
  let color = event.target.value;
  console.log('Change color to', color);
  icon.setAttribute('style', 'color: ' + color + ';');
  colorLabel.textContent = color;
});
classesInput.addEventListener('change', (event) => {
  let classNr = event.target.value;
  let className;
  if (classNr == 1) {
    className = 'fill-opacity';
  } else if (classNr == 2) {
    className = 'stroke-width';
  } else {
    className = undefined;
  }

  if (className) {
    icon.setAttribute('classes', className);
  } else {
    icon.removeAttribute('classes');
  }
  classesLabel.textContent = className;
  console.log('Change icon class to', className);
});
viewBoxEnableInput.addEventListener('change', (event) => {
  const enabled = event.target.checked;
  console.log('Viewbox enabled', enabled);
  if (enabled) {
    icon.setAttribute('viewBox', viewBox);
    document.querySelectorAll('.viewbox-input').forEach((element) => {
      element.removeAttribute('disabled');
    });
  } else {
    icon.removeAttribute('viewBox');
    document.querySelectorAll('.viewbox-input').forEach((element) => {
      element.setAttribute('disabled', 'disabled');
    });
  }
});
viewBox1Input.addEventListener('change', () => setViewBox());
viewBox2Input.addEventListener('change', () => setViewBox());
viewBox3Input.addEventListener('change', () => setViewBox());
viewBox4Input.addEventListener('change', () => setViewBox());

function setViewBox() {
  viewBox = `${viewBox1Input.value} ${viewBox2Input.value} ${viewBox3Input.value} ${viewBox4Input.value}`;
  icon.setAttribute('viewBox', viewBox);
  console.log('Setting viewBox to', viewBox);
}
