const burgerButton = document.querySelector(".burger-button");

const siteMenu = document.querySelector(".site-navigation");
const siteMenuClassList = Array.from(siteMenu.classList).join(" ");
const burgerButtonDot = burgerButton.querySelector(".burger-button__dot");
const burgerButtonDotClassList = Array.from(burgerButtonDot.classList).join(" ");
const burgerButtonLine = burgerButton.querySelector(".burger-button__line");
const burgerButtonLineClassList = Array.from(burgerButtonLine.classList).join(" ");

burgerButton.addEventListener("click", () => {
  burgerButton.classList.toggle("burger-button--active");

  if(burgerButton.classList.contains("burger-button--active")) {
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

