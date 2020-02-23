const addMoreBtn = document.querySelector('#add-more-btn');
const moreExamplesList = document.querySelector('#more-example-list');
const iconSrcArr = [
  '../assets/sprites/sprite.svg#build-24px',
  '../assets/sprites/sprite.svg#accessibility-24px',
  '../assets/sprites/sprite.svg#language-24px'
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
    ></svg-icon>`;
  moreExamplesList.appendChild(el);
  count++;

  console.log('Add new icon to DOM', src);
});
