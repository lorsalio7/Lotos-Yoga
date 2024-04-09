if(reviewsSection) {
  function fixPaginationHeight() {
    let reviewsRightCol = document.querySelector(".reviews-right-col");
    let paginationRightColHeight = reviewsRightCol.offsetHeight;
    document.documentElement.style.setProperty('--pagination-height', `${paginationRightColHeight}px`);
  }

  fixPaginationHeight();

  window.addEventListener('resize', debounce(() => {
    fixPaginationHeight();
  }, 300));
}
