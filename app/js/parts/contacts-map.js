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
    contactsMap.geoObjects.add(placemark);
    contactsMap.behaviors.disable(["scrollZoom"]);
    contactsMap.controls.remove("zoomControl");
  }
  ymaps.ready(init);
}

