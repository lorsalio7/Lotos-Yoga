let contactsMap = document.querySelector("#contacts-map");

if(contactsMap) {

  function init() {
    contactsMap = new ymaps.Map(contactsMap, {
      center: [59.931765080896845,30.35767835426295],
      zoom: 17
    });

    let placemark = new ymaps.Placemark([59.931765080896845,30.35767835426295], {}, {
      iconLayout: "default#image",
      iconImageHref: "img/pin-map.svg",
      iconImageSize: [49,60],
      iconImageOffset: [-19,-44]
    });
    window.addEventListener("resize", debounce(() => {
      mapAdaptive();
    }, 300));

    window.addEventListener("orientationchange", () => {
      mapAdaptive();
    })

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
  ymaps.ready(init);

  function mapAdaptive() {
    contactsMap.container.fitToViewport();
  }
}

