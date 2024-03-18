"use strict";

window.addEventListener("DOMContentLoaded", () => {
  function debounce(func, ms, now) {
    // объявляем функцию debounce

    let onLast; // переменная отвечает за вызов функции func после того, как прошло время ожидания ms от последнего события движения курсора

    return function () {
      // эта функция запускается при каждом событии движения курсора

      const context = this; // запоминаем передаваемую функцию func
      const args = arguments; // запоминаем параметры передаваемой функции func

      const onFirst = now && !onLast; // если хотим запустить функцию func при первом событии движения курсора и время ожидания не установлено

      clearTimeout(onLast); // сбрасываем время ожидания ms

      onLast = setTimeout(() => {
        // устанавливаем время ожидания

        onLast = null; // очищаем переменную onLast
        if (!now) func.apply(context, args); // если при первом событии движения курсора функция func не была вызвана, то вызываем ее когда время ожидания ms закончилось
      }, ms); // подставляем значение параметра ms

      if (onFirst) func.apply(context, args); // запускаем функцию func при первом событии движения курсора
    };
  }
  ;
  function fixVh() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  fixVh();
  window.addEventListener('resize', debounce(() => {
    fixVh();
  }, 300));
  ;
  let mainSlider = new Splide('.main-slider', {
    direction: 'ttb',
    height: '100vh',
    wheel: true,
    speed: 500,
    arrows: false,
    pagination: false
  });
  mainSlider.mount();
  let nextPrevSliderButton = document.querySelector(".next-slide-button");
  let nextPrevSliderButtonIcon = nextPrevSliderButton.querySelector(".next-slide-button__icon svg");
  let firstSlide = document.querySelectorAll(".main-slider .splide__slide")[0];
  let currentSliderNumber = document.querySelector(".current-slider-number");
  let totalSliderNumber = document.querySelector(".total-slider-number");
  let currentSlideTitle = document.querySelector(".current-slide-title");
  let prevNextSlideTitle = document.querySelector(".next-prev-slider-title");
  let siteMenuLinks = document.querySelectorAll(".site-menu-link");
  let siteMenuLinksActive = Array.from(siteMenuLinks[0].classList).join(" ");
  function activateMenuLink(slideIndex, links, itemClass) {
    links.forEach(element => {
      element.classList.add(itemClass);
      if (Number(element.dataset.linkSlide) - 1 === slideIndex) {
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
    mainSlider.go(Number(target.dataset.linkSlide) - 1);
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
    if (access) {
      mainSlider.go("+1");
    } else {
      mainSlider.go("-1");
    }
  });
  currentSlideTitle.textContent = firstSlide.dataset.slideTitle;
  if (mainSlider.length < 10) {
    totalSliderNumber.textContent = "0" + mainSlider.length;
  } else {
    totalSliderNumber.textContent = mainSlider.length;
  }
  mainSlider.on("move", () => {
    currentSliderNumber.textContent = mainSlider.index < 9 ? "0" + (mainSlider.index + 1) : mainSlider.index + 1;
  });
  mainSlider.on("active", el => {
    changeNextPrevSliderButton();
    currentSlideTitle.textContent = el.slide.dataset.slideTitle;
    let nextSlide = el.slide.nextElementSibling;
    if (nextSlide) {
      let nextSlideTitle = nextSlide.dataset.slideTitle;
      prevNextSlideTitle.textContent = nextSlideTitle;
      nextPrevSliderButtonIcon.setAttribute("transform", "rotate(0 0 0)");
    } else {
      nextPrevSliderButtonIcon.setAttribute("transform", "rotate(-180 0 0)");
      let prevSlide = el.slide.previousElementSibling;
      let prevSlideTitle = prevSlide.dataset.slideTitle;
      prevNextSlideTitle.textContent = prevSlideTitle;
    }
    activateMenuLink(el.index, siteMenuLinks, "text-black-50");
  });
  const burgerButton = document.querySelector(".burger-button");
  const siteMenu = document.querySelector(".site-navigation");
  const siteMenuClassList = Array.from(siteMenu.classList).join(" ");
  const burgerButtonDot = burgerButton.querySelector(".burger-button__dot");
  const burgerButtonDotClassList = Array.from(burgerButtonDot.classList).join(" ");
  const burgerButtonLine = burgerButton.querySelector(".burger-button__line");
  const burgerButtonLineClassList = Array.from(burgerButtonLine.classList).join(" ");
  burgerButton.addEventListener("click", () => {
    burgerButton.classList.toggle("burger-button--active");
    if (burgerButton.classList.contains("burger-button--active")) {
      openSiteMenu();
    } else {
      closeSiteMenu();
    }
  });
  function openSiteMenu() {
    burgerButtonDot.className = "burger-button__dot absolute top-2/4 left-0 block w-[2px] h-[2px] bg-black opacity-0 transition-opacity duration-200 ease-linear before:content-[''] before:absolute before:left-0 before:top-[-7px] before:block before:w-[2px] before:h-[2px] before:bg-black before:opacity-0 before:transition-opacity before:duration-200 before:ease-linear after:content-[''] after:absolute after:left-0 after:top-[7px] after:block after:w-[2px] after:h-[2px] after:bg-black after:opacity-0 after:transition-opacity after:duration-200 after:ease-linear";
    burgerButtonLine.className = "burger-button__line absolute top-2/4 left-1 block w-5 h-[2px] bg-transparent transition-[background-color] duration-200 ease-linear delay-200 before:content-[''] before:absolute before:top-0 before:left-0 before:-rotate-45 before:block before:w-5 before:h-[2px] before:bg-tan-hide before:transition-[top,transform] before:duration-[0.2s,0.2s] before:ease-[linear,linear] before:delay-[0.4s,0.6s] after:content-[''] after:absolute after:top-0 after:left-0 after:block after:w-5 after:rotate-45 after:h-[2px] after:bg-tan-hide after:transition-[width,top,transform] after:duration-[0.2s,0.2s,0.2s] after:ease-[linear,linear,linear] after:delay-[0.2s,0.4s,0.6s]";
    siteMenu.className = "site-navigation pointer-events-auto fixed inset-x-0 translate-y-0 inset-y-0 z-10 h-full overflow-y-auto bg-dawn-pink-90 transition-transform duration-500 linear p-7";
  }
  function closeSiteMenu() {
    burgerButtonDot.className = burgerButtonDotClassList;
    burgerButtonLine.className = burgerButtonLineClassList;
    siteMenu.className = siteMenuClassList;
    burgerButton.classList.remove("burger-button--active");
  }
  ;
  let directionsSlider = document.querySelector(".directions-slider");
  if (directionsSlider) {
    directionsSlider = new Splide(directionsSlider, {
      speed: 700,
      arrows: false,
      pagination: false,
      gap: 30,
      perPage: 1,
      rewind: true
    });
    let slideTitle = document.querySelector(".directions-slider-title-caption");
    let directionSliderPagination = document.querySelector(".direction-slider-pagination");
    let directionSliderPaginationRunner = document.querySelector(".direction-slider-pagination-runner");
    let directionSliderLeftArrow = document.querySelector(".directions-slider-left-arrow");
    let directionSliderRightArrow = document.querySelector(".directions-slider-right-arrow");
    directionsSlider.on('mounted updated', function (data) {
      directionSliderPagination.innerHTML = "";
      directionsSlider.Components.Elements.slides.forEach((slide, index) => {
        let button = document.createElement("button");
        button.setAttribute("type", "button");
        button.classList.add("direction-slider-pagination-button", "text-black-50", "mb-[20px]", "text-[18px]");
        button.textContent = slide.dataset.directionTitle;
        if (index === 0) {
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
          if (index === currentIndex) {
            item.classList.remove("text-black-50");
            item.classList.add("active", "text-black");
            directionSliderPaginationRunner.style.top = `${item.offsetTop}px`;
          } else {
            item.classList.add("text-black-50");
            item.classList.remove("active", "text-black");
          }
        });
      }
      directionsSlider.on("active", el => {
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
  ;
});