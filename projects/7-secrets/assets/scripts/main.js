$(document).ready(function () {
  const ISTOUCH = 'ontouchstart' in window || navigator.msMaxTouchPoints;

  if (!ISTOUCH) {
    $(".reviews__item .item-container").tilt({
      maxTilt: 5,
      scale: 1.05
    });
    $(".gifts__item").tilt({
      maxTilt: 1.5,
      scale: 1.05,
      axis: 'x'
    });
    $(".nuances-wrapper .img-wrapper img").tilt({
      maxTilt: 3,
      scale: 1.05
    });
  }
});