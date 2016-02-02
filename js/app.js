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
      // set width of each element
      this.$slider[0].addEventListener('before.lory.init', this.setSlideWidth.bind(this));
      this.$slider[0].addEventListener('after.lory.init', this.setNavigation.bind(this));
      this.$slider[0].addEventListener('after.lory.slide', this.setNavigation.bind(this));

      // init slider
      this.slider = lory(this.$slider[0], {
        slidesToScroll: 2,
        infinite: 2
      });


    },

    setSlideWidth: function() {
      var width = this.$slider.width()/ 2;
      this.$sliderItems.width(width);
    },

    initNavigation: function() {
      var pages = Math.ceil(this.$sliderItems.length/2);
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
        this.slider.slideTo(index*2)
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
      console.log();
    },

    // Events
    setNavigation: function(e) {
      e && e.preventDefault();
      var current = 0;
      if (this.slider) {
        current = Math.ceil(this.slider.returnIndex()/2);
      }
      // Set current
      this.$sliderNavigationItems.removeClass('-active');
      this.$sliderNavigation.find('li[data-index='+current+']').addClass('-active');
    }

  });

})(this);

(function(root) {

  'use strict';

  root.app = root.app || {};

  root.app.Router = Backbone.Router.extend({

    routes: {
      '': 'home',
    },

    ParamsModel: Backbone.Model.extend({}),

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);

      this.params = new this.ParamsModel(); // This object save the URL params
    },

    /**
     * Set params and update model
     * @param {String} name
     * @param {String|Object|Array} value
     * @param {Array[String]} keys
     */
    setParams: function(name, value, keys) {
      if (typeof value === 'string' || typeof value === 'number') {
        this.params.set(name, value);
      } else if (typeof value === 'object' && !_.isArray(value)) {
        if (keys && _.isArray(keys)) {
          // var params = _.pick(value, 'id', 'opacity', 'order');
          // this.params.set(name, JSON.stringify(params));
        } else {
          this.params.set(name, JSON.stringify(value));
        }
      } else if (typeof value === 'object' && _.isArray(value)) {
        if (keys && _.isArray(keys)) {
          var params = _.map(value, function(v) {
            return _.pick(v, keys);
          });
          this.params.set(name, JSON.stringify(params));
        } else {
          this.params.set(name, JSON.stringify(value));
        }
      }
    },

    /**
     * Change url with params
     */
    updateUrl: function() {
      var url = location.pathname.slice(1) + '?' + this._serializeParams();
      this.navigate(url, { trigger: false });
    },

    /**
     * This method will update this.params object when URL change
     * @param  {String} routeName
     * @param  {Array} params
     */
    updateParams: function(params, routeName) {
      if (this.options.decoded && params[0]) {
        try {
          params = this._decodeParams(params[0]);
        } catch(err) {
          console.error('Invalid params. ' + err);
          params = null;
          return this.navigate('map');
        }
        this.params.clear({ silent: true }).set({ config: params });
      } else {
        var p = this._unserializeParams();
        this.params.clear({ silent: true }).set(this._unserializeParams());
      }
    },

    /**
     * Transform URL string params to object
     * @return {Object}
     */
    _unserializeParams: function() {
      var params = {};
      if (location.search.length) {
        var paramsArr = decodeURIComponent(location.search.slice(1)).split('&'),
          temp = [];
        for (var p = paramsArr.length; p--;) {
          temp = paramsArr[p].split('=');
          if (temp[1] && !_.isNaN(Number(temp[1]))) {
            params[temp[0]] = Number(temp[1]);
          } else if (temp[1]) {
            params[temp[0]] = temp[1];
          }
        }
      }
      return params;
    },

    /**
     * Transform object params to URL string
     * @return {String}
     */
    _serializeParams: function() {
      return this.params ? $.param(this.params.attributes) : null;
    }

  });

})(this);

(function(root) {

  'use strict';

  /**
   * Provide top-level namespaces for our javascript.
   * @type {Object}
   */
  root.app = root.app || {
    Model: {},
    Collection: {},
    View: {},
    Helper: {}
  };

  /**
   * Main Application View
   */
  root.app.AppView = Backbone.View.extend({

    /**
     * Main DOM element
     * @type {Object}
     */
    el: document.body,

    initialize: function() {
      this.router = new root.app.Router();
      this.setListeners();
    },

    setListeners: function() {
      this.listenTo(this.router, 'route:home', this.homePage);
    },

    start: function() {
      Backbone.history.start({ pushState: true });
    },

    homePage: function() {
      this.sliderView = new root.app.View.SliderView();
    },

  });

  new app.AppView().start();

})(this);
