// The purpose of this script is to move the header up out of view while
// the user is scrolling down a page
let lastScrollY = Math.max(0, window.scrollY);
const header = document.querySelector('.md-header__inner');

window.addEventListener('scroll', () => {
  const currentScrollY = Math.max(0, window.scrollY);
  const isScrollingDown = currentScrollY > lastScrollY;
  header.classList.toggle('hidden', isScrollingDown);
  lastScrollY = currentScrollY;
});
