function fixVh() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

fixVh();

window.addEventListener('resize', debounce(() => {
  fixVh();
}, 300));
