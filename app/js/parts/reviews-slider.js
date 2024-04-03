let reviewsSlider = document.querySelector(".reviews-slider");

if(reviewsSlider) {
  reviewsSlider = new Splide(reviewsSlider, {
    speed    : 700,
    arrows   : false,
    pagination: false,
    gap: 30,
    perPage: 1,
    rewind : true,
  });

  let reviewsSliderLeftArrow = document.querySelector(".reviews-slider-left-arrow");
  let reviewsSliderRightArrow = document.querySelector(".reviews-slider-right-arrow");
  let reviewsSliderPagination = document.querySelector(".reviews-slider-pagination");
  let reviewsSliderPaginationRunner = document.querySelector(".reviews-slider-pagination-runner");

  reviewsSlider.on('mounted updated', function ( data ) {
    reviewsSliderPagination.innerHTML = "";
    reviewsSlider.Components.Elements.slides.forEach((slide, index)=>{
      let button = document.createElement("button");
      button.setAttribute("type", "button");
      button.classList.add("reviews-slider-pagination-button", "text-black-50", "mb-[16px]", "text-[18px]");
      button.textContent = slide.dataset.reviewsName;
      if(index === 0) {
        button.classList.add("active", "text-black");
      }
      button.addEventListener("click", () => {
        reviewsSlider.go(index);
      });
      reviewsSliderPagination.appendChild(button);
    });
    let reviewsSliderPaginationButtons = reviewsSliderPagination.querySelectorAll(".reviews-slider-pagination-button");

    function activePaginationButton(activeIndex) {

      let currentIndex = activeIndex;
      reviewsSliderPaginationButtons.forEach((item, index) => {
        if(index === currentIndex) {
          item.classList.remove("text-black-50");
          item.classList.add("active", "text-black");
          reviewsSliderPaginationRunner.style.top = `${item.offsetTop}px`;
        }  else {
          item.classList.add("text-black-50");
          item.classList.remove("active", "text-black");
        }
      })
    }

    reviewsSlider.on("active", (el) => {
      let activeIndex = Number(reviewsSlider.index);

      activePaginationButton(activeIndex);
    });
  })

  reviewsSlider.mount();

  reviewsSliderLeftArrow.addEventListener("click", () => {
    reviewsSlider.go("-1");
  });

  reviewsSliderRightArrow.addEventListener("click", () => {
    reviewsSlider.go("+1");
  });
}
