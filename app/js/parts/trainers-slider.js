let trainersSlider = document.querySelector(".trainers-slider");
let trainersPhotoSlider = document.querySelector(".trainers-photo-slider");

if(trainersSlider) {
  trainersSlider = new Splide(trainersSlider, {
    speed    : 700,
    arrows   : false,
    pagination: false,
    gap: 30,
    perPage: 1,
    rewind : true,
    lazyLoad: 'nearby'
  });

  trainersPhotoSlider = new Splide(trainersPhotoSlider, {
    speed: 700,
    arrows: false,
    pagination: false,
    gap: 30,
    perPage: 1,
    rewind: true,
  });

  trainersSlider.sync(trainersPhotoSlider);


  let trainersSliderLeftArrow = document.querySelector(".trainers-slider-left-arrow");
  let trainersSliderRightArrow = document.querySelector(".trainers-slider-right-arrow");
  let trainersSliderPagination = document.querySelector(".trainers-slider-pagination");
  let trainersSliderPaginationRunner = document.querySelector(".trainers-slider-pagination-runner");

  trainersSlider.on('mounted updated', function ( data ) {
    trainersSliderPagination.innerHTML = "";
    trainersSlider.Components.Elements.slides.forEach((slide, index)=>{
      let button = document.createElement("button");
      button.setAttribute("type", "button");
      button.classList.add("trainers-slider-pagination-button", "text-black-50", "mb-[16px]", "text-[18px]");
      button.textContent = slide.dataset.trainerName;
      if(index === 0) {
        button.classList.add("active", "text-black");
      }
      button.addEventListener("click", () => {
        trainersSlider.go(index);
      });
      trainersSliderPagination.appendChild(button);
    });

    let trainersSliderPaginationButtons = trainersSliderPagination.querySelectorAll(".trainers-slider-pagination-button");

    function activePaginationButton(activeIndex) {

      let currentIndex = activeIndex;
      trainersSliderPaginationButtons.forEach((item, index) => {
        if(index === currentIndex) {
          item.classList.remove("text-black-50");
          item.classList.add("active", "text-black");
          trainersSliderPaginationRunner.style.top = `${item.offsetTop}px`;
        }  else {
          item.classList.add("text-black-50");
          item.classList.remove("active", "text-black");
        }
      })
    }

    trainersSlider.on("active", (el) => {
      let activeIndex = Number(trainersSlider.index);

      activePaginationButton(activeIndex);
    });
  })

  trainersSlider.mount();
  trainersPhotoSlider.mount();

  trainersSliderLeftArrow.addEventListener("click", () => {
    trainersSlider.go("-1");
  });

  trainersSliderRightArrow.addEventListener("click", () => {
    trainersSlider.go("+1");
  });
}
