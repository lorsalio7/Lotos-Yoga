let mainSlider = new Splide('.main-slider', {
  direction: 'ttb',
  height   : '100vh',
  wheel    : true,
  speed    : 500,
  arrows   : false
});

mainSlider.mount();

let nextPrevSliderButton = document.querySelector(".next-slide-button");
let nextPrevSliderButtonIcon = nextPrevSliderButton.querySelector(".next-slide-button__icon");
let nextPrevSliderButtonIconClasses = Array.from(nextPrevSliderButtonIcon.classList).join(" ");
let nextPrevSliderButtonIconRotateClasses = "next-slide-button__icon w-[30px] h-[30px] relative rounded-[50%] bg-gradient-to-b from-hot-pink from-0% to-tan-hide to-100% before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:w-0 before:h-0 before:border-t-[6px] before:border-r-[3px] before:border-b-0 before:border-l-[3px] before:border-t-white before:border-r-transparent before:border-b-transparent before:border-l-transparent before:-translate-x-1/2 before:-translate-y-1/2 before:transition-[transform] before:rotate-180 before:duration-500 before:linear";
let firstSlide = document.querySelectorAll(".main-slider .splide__slide")[0];
let currentSliderNumber = document.querySelector(".current-slider-number");
let totalSliderNumber = document.querySelector(".total-slider-number");
let currentSlideTitle = document.querySelector(".current-slide-title");
let prevNextSlideTitle = document.querySelector(".next-prev-slider-title");

let access = true;


function changeNextPrevSliderButton() {
  if (mainSlider.index === mainSlider.length - 1) {
    return access = false;
  } else {
    return access = true;
  }
}

nextPrevSliderButton.addEventListener("click", () => {
  changeNextPrevSliderButton();
  if(access) {
    mainSlider.go("+1");
  } else {
    mainSlider.go("-1");
  }
});

currentSlideTitle.textContent = firstSlide.dataset.slideTitle;

if(mainSlider.length < 10) {
  totalSliderNumber.textContent = "0" + mainSlider.length;
} else {
  totalSliderNumber.textContent = mainSlider.length;
}


mainSlider.on("move", () => {
  currentSliderNumber.textContent = mainSlider.index < 9 ? "0" + (mainSlider.index + 1) : mainSlider.index + 1;
})

mainSlider.on("active", (el) => {
  changeNextPrevSliderButton();
  currentSlideTitle.textContent = el.slide.dataset.slideTitle;
  let nextSlide = el.slide.nextElementSibling;

  if(nextSlide) {
    let nextSlideTitle = nextSlide.dataset.slideTitle;
    prevNextSlideTitle.textContent = nextSlideTitle;
    nextPrevSliderButtonIcon.className = nextPrevSliderButtonIconClasses;
  } else {
    nextPrevSliderButtonIcon.className = nextPrevSliderButtonIconRotateClasses;
    let prevSlide = el.slide.previousElementSibling;
    let prevSlideTitle = prevSlide.dataset.slideTitle;
    prevNextSlideTitle.textContent = prevSlideTitle;
  }
})
