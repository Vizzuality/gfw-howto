(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};

  root.app.View.SliderView = Backbone.View.extend({

    el: '#sliderView',

    events: {
      'click .js_slide_navigation li' : 'clickNavigation'
    },

    navTemplate: HandlebarsTemplates['slider'],

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      this.options.slides_per_slide = ($(window).width() < 850) ? 1 : 2;
      this.cache();
      this.initNavigation();
      this.initLory();
    },

    cache: function() {
      this.$slider = this.$el.find('.js_slider');
      this.$sliderItems = this.$el.find('.js_slide');

      this.$sliderNavigation = this.$el.find('.js_slide_navigation');
    },

    // Slider plugin
    initLory: function() {
      this.options.slider = this.setOptions();
      // set width of each element
      this.$slider[0].addEventListener('before.lory.init', this.setSlideWidth.bind(this));
      this.$slider[0].addEventListener('after.lory.init', this.setNavigation.bind(this));
      this.$slider[0].addEventListener('after.lory.slide', this.setNavigation.bind(this));

      // init slider
      this.slider = lory(this.$slider[0], this.options.slider);
    },

    setOptions: function() {
      return {
        slidesToScroll: this.options.slides_per_slide,
        infinite: this.options.slides_per_slide,
      }
    },

    setSlideWidth: function() {
      var width = this.$slider.width()/this.options.slides_per_slide;
      this.$sliderItems.width(width);
    },

    initNavigation: function() {
      var pages = Math.ceil(this.$sliderItems.length/this.options.slides_per_slide);
      var arrayPages =(function(a,b){while(a--)b[a]=a+1;return b})(pages,[]);

      this.$sliderNavigation.html(this.navTemplate({pages: arrayPages}));
      this.$sliderNavigationItems = this.$sliderNavigation.find('li');
    },

    // Events
    clickNavigation: function(e) {
      e && e.preventDefault();
      var index = $(e.currentTarget).data('index');
      var direction = $(e.currentTarget).data('direction');
      if (index != undefined) {
        this.slider.slideTo(index*this.options.slides_per_slide)
      } else {
        switch (direction) {
          case 'left':
            this.slider.prev();
          break;
          case 'right':
            this.slider.next();
          break;
        }
      }
    },

    // Events
    setNavigation: function(e) {
      e && e.preventDefault();
      var current = 0;
      if (this.slider) {
        current = Math.ceil(this.slider.returnIndex()/2);
      }
      console.log(current);
      // Set current
      this.$sliderNavigationItems.removeClass('-active');
      this.$sliderNavigation.find('li[data-index='+current+']').addClass('-active');
    }

  });

})(this);
