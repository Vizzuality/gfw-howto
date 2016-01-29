document.addEventListener('DOMContentLoaded', function() {
  var slider = document.querySelector('.js_slider');

  slider.addEventListener('before.lory.init', setSlideWidth);

  lory(slider, {
    slidesToScroll: 2,
    infinite: 2,
    enableMouseEvents: true
  });

});

function setSlideWidth() {
 var $slider = $('.js_slider');
 var $slide = $('.js_slide');
 var width = $slider.width()/ 2;
 $slide.width(width);
}

