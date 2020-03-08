const addMoreBtn = document.querySelector('#add-more-btn');
const removeLastBtn = document.querySelector('#remove-last-btn');
const moreExamplesList = document.querySelector('#more-example-list');
const iconSrcArr = [
  '../assets/sprites/sprite.svg#build-24px',
  'accessibility-24px',
  'language-24px'
];
let count = 0;

// Polyfill forEach for NodeLists
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

addMoreBtn.addEventListener('click', () => {
  const src = iconSrcArr[count % 3];
  const el = document.createElement('li');

  el.innerHTML = `
    <svg-icon
      src="${src}"
      width="24px"
      height="24px"
      classes="onload"
    ></svg-icon>`;
  moreExamplesList.appendChild(el);
  count++;

  console.log('Add new icon to DOM', src);
});

removeLastBtn.addEventListener('click', () => {
  const el = moreExamplesList.querySelector('li:last-child')

  if (el) {
    moreExamplesList.removeChild(el);
    console.log('Remove last icon from DOM', el);
  }
});
