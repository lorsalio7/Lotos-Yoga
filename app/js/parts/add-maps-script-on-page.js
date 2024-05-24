let sliderSplide = document.getElementById("slider-splide");

let MAP_URL = "https://api-maps.yandex.ru/2.1/?apikey=34aee372-ec8f-4fe4-a941-87d490ddd366&lang=ru_RU";

setTimeout(()=>{
  let loadScript = document.createElement("script");
    loadScript.setAttribute("src", MAP_URL);
    sliderSplide.insertAdjacentElement("afterend", loadScript);
}, 5000);
