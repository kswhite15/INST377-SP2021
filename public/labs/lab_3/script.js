// let newArr = carousel.querySelectorAll('li').map(
//   li.style.position = 'relative'
//   && (li.insertAdjacentHTML('beforeend', '<span style=\'position:absolute;left:0;top:0\'></span>'))
// );

// let width = 130;
// let count = 3;

// let list = carousel.querySelector('ul');
// let listElems = carousel.querySelectorAll('li');

// let position = 0;

// carousel.querySelector('arrow-prev').onclick = function() {
//   position += width * count;
//   position = Math.min(position, 0);
//   list.style.marginLeft = `${position}px`;
// };

// carousel.querySelector('arrow-next').onclick = function() {
//   position -= width * count;
//   position = Math.max(position, -width * (listElems.length - count));
//   list.style.marginLeft = `${position}px`;
// };

const btnPrev = document.querySelector('button.arrow.prev');
const btnNext = document.querySelector('button.arrow.next');
const ul = document.querySelector('div.gallery > ul');
const liWidth = document.querySelector('div.gallery > ul > li').clientWidth;
const limit = ul.querySelectorAll('img').length * liWidth;

const count = 3;
let position = 0;

const scrollFn = (isNext) => {
  const off = position + (count * (isNext ? liWidth : -(liWidth)));
  if (off < 0 || off > limit) {
    return;
  }

  position = off;
  ul.style.transform = `translateX(${-(position)}px)`;
};

btnPrev.onclick = () => scrollFn(false);
btnNext.onclick = () => scrollFn(true);