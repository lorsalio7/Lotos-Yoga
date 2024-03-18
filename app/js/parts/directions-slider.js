let directionsSlider = document.querySelector(".directions-slider");

if(directionsSlider) {
  directionsSlider = new Splide(directionsSlider, {
    speed    : 700,
    arrows   : false,
    pagination: false,
    gap: 30,
    perPage: 1,
    rewind : true,
  });


  let slideTitle = document.querySelector(".directions-slider-title-caption");
  let directionSliderPagination = document.querySelector(".direction-slider-pagination");
  let directionSliderPaginationRunner = document.querySelector(".direction-slider-pagination-runner");
  let directionSliderLeftArrow = document.querySelector(".directions-slider-left-arrow");
  let directionSliderRightArrow = document.querySelector(".directions-slider-right-arrow");

  directionsSlider.on('mounted updated', function ( data ) {

    directionSliderPagination.innerHTML = "";
    directionsSlider.Components.Elements.slides.forEach((slide, index)=>{
      let button = document.createElement("button");
      button.setAttribute("type", "button");
      button.classList.add("direction-slider-pagination-button", "text-black-50", "mb-[20px]", "text-[18px]");
      button.textContent = slide.dataset.directionTitle;
      if(index === 0) {
        button.classList.add("active", "text-black");
      }
      button.addEventListener("click", () => {
        directionsSlider.go(index);
      });
      directionSliderPagination.appendChild(button);
    });
    let directionSliderPaginationButtons = document.querySelectorAll(".direction-slider-pagination-button");




    function activePaginationButton(activeIndex) {

      let currentIndex = activeIndex;
      directionSliderPaginationButtons.forEach((item, index) => {
        if(index === currentIndex) {
          item.classList.remove("text-black-50");
          item.classList.add("active", "text-black");
          directionSliderPaginationRunner.style.top = `${item.offsetTop}px`;
        }  else {
          item.classList.add("text-black-50");
          item.classList.remove("active", "text-black");
        }
      })
    }

    directionsSlider.on("active", (el) => {
      let activeIndex = Number(directionsSlider.index);
      slideTitle.textContent = el.slide.dataset.directionTitle;

      activePaginationButton(activeIndex);
    });
  });
  directionsSlider.mount();

  directionSliderLeftArrow.addEventListener("click", () => {
    directionsSlider.go("-1");
  });

  directionSliderRightArrow.addEventListener("click", () => {
    directionsSlider.go("+1");
  });
}










