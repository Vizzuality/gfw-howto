(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};

  root.app.View.SliderView = Backbone.View.extend({

    el: '#sliderView',

    navTemplate: HandlebarsTemplates['slider'],

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      this.cache();
      this.initLory();
      this.initNavigation();
    },

    cache: function() {
      this.$slides = this.$el.find('.js_slide');
    },

    // Slider plugin
    initLory: function() {
      // set width of each element
      this.el.addEventListener('before.lory.init', this.setSlideWidth.bind(this));

      // init slider
      lory(this.el, {
        slidesToScroll: 2,
        infinite: 2,
        enableMouseEvents: true
      });
    },

    setSlideWidth: function() {
      var width = this.$el.width()/ 2;
      this.$slides.width(width);
    },

    initNavigation: function() {
      var lengthCeil = Math.ceil(this.$slides.length/2);
      console.log(lengthCeil);
    }

  });

})(this);


// document.addEventListener('DOMContentLoaded', function() {
//   var slider = document.querySelector('.js_slider');

//   slider.addEventListener('before.lory.init', setSlideWidth);

//   lory(slider, {
//     slidesToScroll: 2,
//     infinite: 2,
//     enableMouseEvents: true
//   });

// });

// function setSlideWidth() {
//  var $slider = $('.js_slider');
//  var $slide = $('.js_slide');
//  var width = $slider.width()/ 2;
//  $slide.width(width);
// }

