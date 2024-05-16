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
  let mainSlider = new Splide('.main-slider', {
    direction: 'ttb',
    height: 'calc(var(--vh) * 100)',
    wheel: true,
    speed: 500,
    arrows: false,
    pagination: false,
    lazyLoad: 'nearby'
  });
  mainSlider.mount();
  window.addEventListener("resize", () => {
    mainSlider.options.height = 'calc(var(--vh) * 100)';
    mainSlider.refresh();
  });
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
      nextPrevSliderButtonIcon.classList.remove("rotate-180");
    } else {
      nextPrevSliderButtonIcon.classList.add("rotate-180");
      prevNextSlideTitle.textContent = "Вернуться";
    }
    if (currentSlideTitle.textContent == "Контакты" && !isMapLoaded) {
      loadMap();
      isMapLoaded = true;
    }
    activateMenuLink(el.index, siteMenuLinks, "text-black-50");
  });
  function fixVh() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
  }
  fixVh();
  window.addEventListener("resize", () => {
    fixVh();
  });
  ;
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
    burgerButtonLine.className = "burger-button__line absolute top-1/2 left-1 block w-5 h-[2px] bg-transparent transition-[background-color] duration-200 ease-linear delay-200 before:content-[''] before:absolute before:top-0 before:left-0 before:-rotate-45 before:block before:w-5 before:h-[2px] before:bg-tan-hide before:transition-[top,transform] before:duration-[0.2s,0.2s] before:ease-[linear,linear] before:delay-[0.4s,0.6s] after:content-[''] after:absolute after:top-0 after:left-0 after:block after:w-5 after:rotate-45 after:h-[2px] after:bg-tan-hide after:transition-[width,top,transform] after:duration-[0.2s,0.2s,0.2s] after:ease-[linear,linear,linear] after:delay-[0.2s,0.4s,0.6s]";
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
            directionSliderPaginationRunner.style.top = "".concat(item.offsetTop, "px");
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
  let trainersSlider = document.querySelector(".trainers-slider");
  let trainersPhotoSlider = document.querySelector(".trainers-photo-slider");
  if (trainersSlider) {
    trainersSlider = new Splide(trainersSlider, {
      speed: 700,
      arrows: false,
      pagination: false,
      gap: 30,
      perPage: 1,
      rewind: true,
      lazyLoad: 'nearby'
    });
    trainersPhotoSlider = new Splide(trainersPhotoSlider, {
      speed: 700,
      arrows: false,
      pagination: false,
      gap: 30,
      perPage: 1,
      rewind: true
    });
    trainersSlider.sync(trainersPhotoSlider);
    let trainersSliderLeftArrow = document.querySelector(".trainers-slider-left-arrow");
    let trainersSliderRightArrow = document.querySelector(".trainers-slider-right-arrow");
    let trainersSliderPagination = document.querySelector(".trainers-slider-pagination");
    let trainersSliderPaginationRunner = document.querySelector(".trainers-slider-pagination-runner");
    trainersSlider.on('mounted updated', function (data) {
      trainersSliderPagination.innerHTML = "";
      trainersSlider.Components.Elements.slides.forEach((slide, index) => {
        let button = document.createElement("button");
        button.setAttribute("type", "button");
        button.classList.add("trainers-slider-pagination-button", "text-black-50", "mb-[16px]", "text-[18px]");
        button.textContent = slide.dataset.trainerName;
        if (index === 0) {
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
          if (index === currentIndex) {
            item.classList.remove("text-black-50");
            item.classList.add("active", "text-black");
            trainersSliderPaginationRunner.style.top = "".concat(item.offsetTop, "px");
          } else {
            item.classList.add("text-black-50");
            item.classList.remove("active", "text-black");
          }
        });
      }
      trainersSlider.on("active", el => {
        let activeIndex = Number(trainersSlider.index);
        activePaginationButton(activeIndex);
      });
    });
    trainersSlider.mount();
    trainersPhotoSlider.mount();
    trainersSliderLeftArrow.addEventListener("click", () => {
      trainersSlider.go("-1");
    });
    trainersSliderRightArrow.addEventListener("click", () => {
      trainersSlider.go("+1");
    });
  }
  ;
  let reviewsSlider = document.querySelector(".reviews-slider");
  if (reviewsSlider) {
    reviewsSlider = new Splide(reviewsSlider, {
      speed: 700,
      arrows: false,
      pagination: false,
      gap: 30,
      perPage: 1,
      rewind: true
    });
    let reviewsSliderLeftArrow = document.querySelector(".reviews-slider-left-arrow");
    let reviewsSliderRightArrow = document.querySelector(".reviews-slider-right-arrow");
    let reviewsSliderPagination = document.querySelector(".reviews-slider-pagination");
    let reviewsSliderPaginationRunner = document.querySelector(".reviews-slider-pagination-runner");
    reviewsSlider.on('mounted updated', function (data) {
      reviewsSliderPagination.innerHTML = "";
      reviewsSlider.Components.Elements.slides.forEach((slide, index) => {
        let button = document.createElement("button");
        button.setAttribute("type", "button");
        button.classList.add("reviews-slider-pagination-button", "text-black-50", "mb-[16px]", "text-[18px]");
        button.textContent = slide.dataset.reviewsName;
        if (index === 0) {
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
          if (index === currentIndex) {
            item.classList.remove("text-black-50");
            item.classList.add("active", "text-black");
            reviewsSliderPaginationRunner.style.top = "".concat(item.offsetTop, "px");
          } else {
            item.classList.add("text-black-50");
            item.classList.remove("active", "text-black");
          }
        });
      }
      reviewsSlider.on("active", el => {
        let activeIndex = Number(reviewsSlider.index);
        activePaginationButton(activeIndex);
      });
    });
    reviewsSlider.mount();
    reviewsSliderLeftArrow.addEventListener("click", () => {
      reviewsSlider.go("-1");
    });
    reviewsSliderRightArrow.addEventListener("click", () => {
      reviewsSlider.go("+1");
    });
  }
  ;
  let reviewsSection = document.querySelector(".reviews");
  if (reviewsSection) {
    let reviewsModal = document.querySelector(".reviews-modal");
    let reviewsModalContainer = reviewsModal.querySelector(".modal-container");
    let reviewsModalBody = reviewsModal.querySelector(".modal-body");
    let reviewsModalCloseButton = reviewsModal.querySelector(".close-button");
    let reviewsModalContent = reviewsModal.querySelector(".modal-content");
    let reviewsTextContainer = document.querySelectorAll(".reviews-text-container");
    let reviewsReadAllButtons = document.querySelectorAll(".reviews-read-all-button");
    let reviewsArray = [];
    function createReviewsArray() {
      if (reviewsReadAllButtons[0].offsetWidth > 0 && reviewsReadAllButtons[0].offsetHeight > 0) {
        reviewsTextContainer.forEach(review => {
          let reviewText = Array.from(review.querySelectorAll("p"));
          let reviewClassess = reviewText[0].className;
          let reviewArr = [];
          for (let i = 0; i < reviewText.length; i++) {
            let clonedReview = reviewText[i].cloneNode(true);
            clonedReview.className = reviewClassess;
            reviewArr.push(clonedReview);
          }
          reviewsArray.push(reviewArr);
        });
      }
    }
    createReviewsArray();
    window.addEventListener('resize', debounce(() => {
      createReviewsArray();
    }, 300));
    reviewsReadAllButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        openReviewsModal(index);
      });
    });
    function openReviewsModal(index) {
      reviewsModal.style.display = "flex";
      setTimeout(() => {
        reviewsModal.classList.add("opacity-100", "reviews-modal--active");
        reviewsModalContainer.classList.add("opacity-100", "translate-y-0");
      }, 10);
      let currentReview = reviewsArray[index];
      reviewsModalContent.innerHTML = "";
      currentReview.forEach(paragraph => {
        reviewsModalContent.appendChild(paragraph.cloneNode(true));
      });
      reviewsModal.addEventListener("click", e => {
        if (!e.target === reviewsModalBody && reviewsModal.classList.contains("reviews-modal--active") || e.target === reviewsModal || e.target === reviewsModalCloseButton) {
          closeReviewsModal();
        }
      });
    }
    function closeReviewsModal() {
      reviewsModal.classList.remove("opacity-100", "reviews-modal--active");
      reviewsModalContainer.classList.remove("opacity-100", "translate-y-0");
      setTimeout(() => {
        reviewsModal.removeAttribute("style");
        reviewsModalContent.innerHTML = "";
      }, 400);
      reviewsModal.removeEventListener("click", closeReviewsModal);
    }
  }
  ;
  if (reviewsSection) {
    function fixPaginationHeight() {
      let reviewsRightCol = document.querySelector(".reviews-right-col");
      let paginationRightColHeight = reviewsRightCol.offsetHeight;
      document.documentElement.style.setProperty('--pagination-height', "".concat(paginationRightColHeight, "px"));
    }
    fixPaginationHeight();
    window.addEventListener('resize', debounce(() => {
      fixPaginationHeight();
    }, 300));
  }
  ;
  let sendReviewButton = document.querySelector(".send-review-button");
  if (sendReviewButton) {
    let contactsReviewForm = document.querySelector(".contacts-review-form");
    let contactsReviewFormCloseButton = contactsReviewForm.querySelector(".close-review-form-button");
    let signUpButton = document.querySelector(".sign-up-button");
    sendReviewButton.addEventListener("click", openReviewForm);
    contactsReviewFormCloseButton.addEventListener("click", closeReviewForm);
    function openReviewForm() {
      contactsReviewForm.classList.remove("hidden");
      contactsReviewForm.classList.add("block");
      signUpButton.classList.remove("shadow-button");
      setTimeout(() => {
        contactsReviewForm.classList.add("opacity-100");
      }, 10);
    }
    function closeReviewForm() {
      contactsReviewForm.classList.remove("opacity-100");
      setTimeout(() => {
        contactsReviewForm.classList.add("hidden");
        contactsReviewForm.classList.remove("block");
        signUpButton.classList.add("shadow-button");
      }, 550);
    }
  }
  ;
  let contactsMap = document.querySelector("#contacts-map");
  let loadMap;
  if (contactsMap) {
    loadMap = function () {
      document.cookie = 'sameSite=Strict';
      function init() {
        contactsMap = new ymaps.Map(contactsMap, {
          center: [59.931765080896845, 30.35767835426295],
          zoom: 17
        });
        let placemark = new ymaps.Placemark([59.931765080896845, 30.35767835426295], {}, {
          iconLayout: "default#image",
          iconImageHref: "img/pin-map.svg",
          iconImageSize: [49, 60],
          iconImageOffset: [-19, -44]
        });
        window.addEventListener("resize", debounce(() => {
          mapAdaptive();
        }, 300));
        window.addEventListener("orientationchange", debounce(() => {
          mapAdaptive();
        }, 300));
        contactsMap.geoObjects.add(placemark);
        contactsMap.behaviors.disable(["scrollZoom"]);
        contactsMap.controls.remove("zoomControl");
        contactsMap.controls.remove("geolocationControl");
        contactsMap.controls.remove("routeEditor");
        contactsMap.controls.remove("trafficControl");
        contactsMap.controls.remove("typeSelector");
        contactsMap.controls.remove("fullscreenControl");
        contactsMap.controls.remove("searchControl");
        contactsMap.controls.remove("rulerControl");
        contactsMap.controls.remove("routeButtonControl");
        contactsMap.controls.remove("routePanelControl");
      }
      function mapAdaptive() {
        contactsMap.container.fitToViewport();
      }
      ymaps.ready(init);
    };
  }
  ;
  let copyrightYear = document.querySelector(".copyright-year");
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }
  ;
});