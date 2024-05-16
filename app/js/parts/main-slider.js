let mainSlider = new Splide('.main-slider', {
  direction: 'ttb',
  height   : '100vh',
  wheel    : true,
  speed    : 500,
  arrows   : false,
  pagination: false
});

mainSlider.mount();

window.addEventListener("resize", () => {
  mainSlider.options.height = 'calc(var(--vh) * 100)';
  mainSlider.refresh();
})


let nextPrevSliderButton = document.querySelector(".next-slide-button");
let nextPrevSliderButtonIcon = nextPrevSliderButton.querySelector(".next-slide-button__icon g");
let firstSlide = document.querySelectorAll(".main-slider .splide__slide")[0];
let currentSliderNumber = document.querySelector(".current-slider-number");
let totalSliderNumber = document.querySelector(".total-slider-number");
let currentSlideTitle = document.querySelector(".current-slide-title");
let prevNextSlideTitle = document.querySelector(".next-prev-slider-title");
let siteMenuLinks = document.querySelectorAll(".site-menu-link");
let siteMenuLinksActive = Array.from(siteMenuLinks[0].classList).join(" ");
let isMapLoaded = false;


function activateMenuLink(slideIndex ,links, itemClass) {
  links.forEach(element => {
    element.classList.add(itemClass);
    if((Number(element.dataset.linkSlide) - 1) === slideIndex) {
      element.classList.remove(itemClass);
    }
  });
}

siteMenuLinks.forEach(link => {
  link.addEventListener("click", goToSlide);
});

function goToSlide(e) {
  e.preventDefault();
  let target = e.target;
  mainSlider.go((Number(target.dataset.linkSlide) - 1));
  closeSiteMenu();
}

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
    nextPrevSliderButtonIcon.classList.remove("rotate-180");
  } else {
    nextPrevSliderButtonIcon.classList.add("rotate-180");
    prevNextSlideTitle.textContent = "Вернуться";
  }

  if(currentSlideTitle.textContent == "Контакты" && !isMapLoaded) {
    loadMap();
    isMapLoaded = true;
  }

  activateMenuLink(el.index, siteMenuLinks, "text-black-50");
})
