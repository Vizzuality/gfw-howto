(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};
  root.app.Model = root.app.Model || {};

  // View for display results
  root.app.View.AsideView = Backbone.View.extend({

    el: '#asideView',

    events: {
      'click .js-toggle-list' : 'toggleSubmenu'
    },

    model: new (Backbone.Model.extend({
    })),

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      this.listeners();
      this.cache();

      // inits
      this.highlight();
    },

    cache: function() {
      // model vars
      this.model.set(this.options.model);
    },

    listeners: function() {
    },

    highlight: function() {
      if (!!this.model.get('id')) {
        var $el = this.$el.find('#aside-'+this.model.get('id'));
        $el.addClass('-active');
      }
    },

    toggleSubmenu: function(e) {
      e && e.preventDefault();
      var submenuId = $(e.currentTarget).data('submenu');
      var $submenu = $('#'+submenuId);

      $(e.currentTarget).toggleClass('-collapsed');
      $submenu.toggleClass('-collapsed');
    },

  });

})(this);

(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};
  root.app.Model = root.app.Model || {};

  // View for display results
  root.app.View.BlogView = Backbone.View.extend({

    el: '#blogView',

    template: HandlebarsTemplates['blog'],

    model: new (Backbone.Model.extend({
      url: 'https://gfw-huggin.herokuapp.com/users/1/web_requests/21/blogrss.json',
    })),

    events: {

    },

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      this.options.sample = ($(window).width() < 850) ? 1 : 2;


      this.cache();

      this.model.fetch().success(function(data){
        this.render();
      }.bind(this));
    },

    cache: function() {
    },

    render: function() {
      this.$el.html(this.template({ blogposts: this.parse() }))
    },

    parse: function() {
      var groups = _.groupBy(_.map(this.model.get('items'), function(item){
        item.categories = (!!item.categories) ? this.slugify(item.categories) : 'default';
        return item;
      }.bind(this)), 'categories');

      var items = _.map(_.sample(groups,this.options.sample), function(group){
        return _.sample(group);
      });

      return items;
    },

    slugify: function(text) {
      return text.toString().toLowerCase().trim()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/&/g, '-and-')         // Replace & with 'and'
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-');        // Replace multiple - with single -
    },

  });

})(this);

(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};
  root.app.Model = root.app.Model || {};

  // View for display results
  root.app.View.ContentView = Backbone.View.extend({

    el: '#contentView',

    model: new (Backbone.Model.extend({
      defaults: {
        filters: []
      }
    })),

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      this.listeners();
      this.cache();
    },

    cache: function() {
      this.$cards = this.$el.find('.m-content-item');
    },

    listeners: function() {
      this.model.on('change:filters', this.filter.bind(this));

      Backbone.Events.on('Filters/change', function(filters){
        this.model.set('filters', _.clone(filters));
      }.bind(this));
    },

    filter: function() {
      var filters = this.model.get('filters');

      if (!!filters.length) {
        _.each(this.$cards, function(card){
          var visible = _.intersection(filters, $(card).data('tags').split(' ')); 
          $(card).toggleClass('-invisible', ! !!visible.length);
        }.bind(this));
      } else {
        this.$cards.toggleClass('-invisible', false);
      }
    }

  });

})(this);

(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};
  root.app.Model = root.app.Model || {};

  // View for display results
  root.app.View.FaqsView = Backbone.View.extend({

    el: '#faqsView',

    events: {
      'click .toggle' : 'toggleFaq'
    },

    collection: new (Backbone.Collection.extend({

      url: baseurl + '/json/faqs.json',

      getGroups: function(filter,page) {
        this.filter = filter;
        if(!!this.filter && this.filter != 'all') {
          this.collection = _.groupBy(_.sortBy(this.toJSON(), 'order'), 'app');
          return _.compact(_.map(this.collection, function(group, k) {
            if (k != this.filter) { return null; }
            return _.sortBy(group,'order').slice(page*5, (page*5) + 5);
          }.bind(this)));
        } else {
          this.collection = _.flatten(_.map(_.groupBy(_.sortBy(this.toJSON(), 'order'), 'app'), function(group){
            return group
          }.bind(this))).slice(page*5, (page*5) + 5);
          return _.groupBy(this.collection, 'app');
        }
      },

      getCount: function() {
        if (!!this.filter && this.filter != 'all') {
          var filtered = _.groupBy(this.toJSON(), 'app')[this.filter];
          return (!!filtered) ? filtered.length : 0;
        } else {
          return this.toJSON().length;
        }
      }

    })),

    template: HandlebarsTemplates['faqs'],

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      this.collection.fetch().done(function() {
        this.setListeners();
        this.render('all',0)
      }.bind(this));
    },

    setListeners: function() {
      Backbone.Events.on('faqs/filter', function(value) {
        this.render(value, 0);
      }.bind(this));
    },

    cache: function() {
      this.$listItems = this.$el.find('.m-faqs-list li');
      this.$paginationContainer = this.$el.find('.m-faqs-pagination');
    },

    render: function(filter,page) {
      this.$el.html(this.template({
        groups: this.collection.getGroups(filter,page)
      }));
      this.cache();
      this.initPaginate(filter,page);
    },

    initPaginate: function(filter,page){
      // pagination
      this.$paginationContainer.pagination({
        items: this.collection.getCount(),
        itemsOnPage: 5,
        currentPage: page + 1,
        displayedPages: 3,
        selectOnClick: false,
        prevText: ' ',
        nextText: ' ',
        onPageClick: _.bind(function(page, e){
          e && e.preventDefault();
          this.render(filter,page-1)
          this.$paginationContainer.pagination('drawPage', page);
        }, this )
      });
    },

    // Events
    toggleFaq: function(e) {
      var $parent = $(e.currentTarget).parent();
      if ($parent.hasClass('-selected')) {
        this.$listItems.removeClass('-selected');
      } else {
        this.$listItems.removeClass('-selected');
        $parent.addClass('-selected');
      }
    },



  });

})(this);

(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};
  root.app.Model = root.app.Model || {};

  // View for display results
  root.app.View.FaqsSelectView = Backbone.View.extend({

    el: '#faqsSelectView',

    events: {
      'change select' : 'filterByApp'
    },

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      this.$select = this.$el.find('select');
      this.initChosen();
    },

    initChosen: function() {
      this.$select.chosen({
        disable_search: true
      });
    },

    filterByApp: function(e) {
      var value = $(e.currentTarget).val();
      Backbone.Events.trigger('faqs/filter', value);
    }

  });

})(this);

(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};
  root.app.Model = root.app.Model || {};

  // View for display results
  root.app.View.FiltersView = Backbone.View.extend({

    el: '#filtersView',

    events: {
      'change .js-checkbox-tag' : 'setFilters'
    },

    model: new (Backbone.Model.extend({
      defaults: {
        filters: []
      }
    })),

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      this.listeners();
      this.cache();
    },

    cache: function() {
      this.$checkbox = this.$el.find('[name="checkbox-tag"]');
    },

    listeners: function() {
      this.model.on('change:filters', this.changeFilters.bind(this));
    },

    setFilters: function() {
      var filters = _.compact(_.map(this.$checkbox, function(el){
        var checked = $(el).is(':checked');
        if (checked) {
          return $(el).data('tag')
        }
      }.bind(this)));
      console.log(filters);
      this.model.set('filters', _.clone(filters));
    },

    changeFilters: function() {
      Backbone.Events.trigger('Filters/change', this.model.get('filters'));
    }

  });

})(this);

(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};
  root.app.Collection = root.app.Collection || {};

  // Model for getting the data
  root.app.Collection.SearchCollection = Backbone.Collection.extend({
    url: baseurl + '/json/search.json'
  });

  // View for display results
  root.app.View.SearchView = Backbone.View.extend({

    el: '#searchView',

    events: {
      'keyup #search-input' : 'search',
      'click #search-close' : 'removeResults'
    },

    resultsTemplate: HandlebarsTemplates['search'],

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      this.collection = new root.app.Collection.SearchCollection();

      this.collection.fetch().done(function(){
        this.cache();
        this.initFuse();
      }.bind(this));
    },

    cache: function() {
      this.searchIndex = 0;
      this.$searchInput = this.$el.find('#search-input');
      this.$searchClose = this.$el.find('#search-close');
      this.$searchResults = this.$el.find('#search-results');

    },

    initFuse: function() {
      var json = this.collection.toJSON();
      this.fuse = new Fuse(json, {
        caseSensitive: false,
        includeScore: false,
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        keys: ['title','content','category','tags']
      });
    },

    search: function(e) {
      var val = $(e.currentTarget).val();
      switch(e.keyCode) {
        case 13:
          this.selectResult();
        break;
        case 27:
          this.removeResults();
        break;
        case 38:
          this.indexResults('up');
        break;
        case 40:
          this.indexResults('down');
        break;
        default:
          (!!val) ? this.setResults(val) : this.removeResults();
          this.highlightResults();
      }
    },

    indexResults: function(direction) {
      if (!!this.results.length) {
        switch(direction) {
          case 'up':
            (this.searchIndex != 0) ? this.searchIndex-- : this.searchIndex = 0;
          break;
          case 'down':
            (this.searchIndex < this.results.length - 1) ? this.searchIndex++ : this.searchIndex = this.results.length - 1;
          break;
        }
      }
      this.highlightResults();
    },

    highlightResults: function() {
      this.$searchResults.children('li').removeClass('-highlight');
      this.$searchResults.children('li').eq(this.searchIndex).addClass('-highlight');
    },

    selectResult: function() {
      var href = this.$searchResults.children('li').eq(this.searchIndex).children('a').attr('href');
      window.location = href;
    },

    setResults: function(val) {
      this.results = this.fuse.search(val).slice(0, 5);
      this.$searchResults.addClass('-active').html(this.resultsTemplate({ results: (!!this.results.length) ? this.results : null }));
      // svg addClass
      this.$searchClose.addClass('-active');
    },

    removeResults: function() {
      this.searchIndex = 0;
      this.results = this.fuse.search('');
      this.$searchInput.val('');
      this.$searchResults.removeClass('-active').html(this.resultsTemplate({ results: []}));
      // svg removeClass
      this.$searchClose.removeClass('-active');
    }

  });

})(this);

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

      enquire.register("screen and (min-width: 850px)", {
        match: function(){
          this.mobile = false;
          this.initSlider();
        }.bind(this)
      });
      enquire.register("screen and (max-width: 850px)", {
        match: function(){
          this.mobile = true;
          this.initSlider();
        }.bind(this)
      });
    },

    initSlider: function() {
      this.options.slider = this.setOptions();
      this.initNavigation();
      this.initLory();
    },

    cache: function() {
      this.$slider = this.$el.find('.js_slider');
      this.$sliderItems = this.$el.find('.js_slide');
      this.slideCount = this.$el.find('.js_slide').length;

      this.$sliderNavigation = this.$el.find('.js_slide_navigation');
    },

    // Slider plugin
    initLory: function() {
      // init slider
      if (!!this.slider) {
        this.slider.reset();
        this.slider.destroy();
      }

      // set width of each element
      this.$slider[0].addEventListener('before.lory.init', this.setSlideWidth.bind(this));
      this.$slider[0].addEventListener('on.lory.resize', this.setSlideWidth.bind(this));
      this.$slider[0].addEventListener('after.lory.init', this.setNavigation.bind(this));
      this.$slider[0].addEventListener('after.lory.slide', this.setNavigation.bind(this));

      this.slider = window.lory.lory(this.$slider[0], this.options.slider);
    },

    setOptions: function() {
      this.cache();
      return {
        slidesToScroll: (!!this.mobile) ? 1 : 2,
        infinite: (!!this.mobile) ? 1 : 2,
        slides_per_slide: (!!this.mobile) ? 1 : 2
      }
    },

    setSlideWidth: function() {
      var width = this.$slider.width()/this.options.slider.slides_per_slide;
      this.$sliderItems.width(width);
    },

    initNavigation: function() {
      var pages = Math.ceil(this.slideCount/this.options.slider.slides_per_slide);
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
        this.slider.slideTo(index*this.options.slider.slides_per_slide)
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
      // Set current
      this.$sliderNavigationItems.removeClass('-active');
      this.$sliderNavigation.find('li[data-index='+current+']').addClass('-active');
    }

  });

})(this);

(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};
  root.app.Model = root.app.Model || {};

  // View for display results
  root.app.View.ToggleView = Backbone.View.extend({

    el: '#toggleView',

    model: new (Backbone.Model.extend({
      defaults: {
        toggle: 'desktop'
      }
    })),

    events: {
      'click .choice' : 'toggle'
    },

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);

      this.cache();
      this.listeners();
      this.changeToggle();
    },

    cache: function() {
      this.$desktopContent = $('#desktopContent');
      this.$mobileContent = $('#mobileContent');

      this.$buttons = this.$el.find('.choice');
      this.$skitter = this.$el.find('.skitter');
    },

    listeners: function() {
      this.model.on('change:toggle', this.changeToggle.bind(this));
    },

    toggle: function(e) {
      e && e.preventDefault();

      this.$buttons.removeClass('-active');
      $(e.currentTarget).addClass('-active');

      this.model.set('toggle',$(e.currentTarget).data('toggle'));
    },

    changeToggle: function() {
      var toggle = this.model.get('toggle');
      switch(toggle) {
        case 'desktop':
          this.$desktopContent.show(0);
          this.$mobileContent.hide(0);
          this.$skitter.css({ left: '0%' });
        break;
        case 'mobile':
          this.$desktopContent.hide(0);
          this.$mobileContent.show(0);
          this.$skitter.css({ left: '50%' });
        break;
      }
    }

  });

})(this);

(function(root) {

  'use strict';

  root.app = root.app || {};

  root.app.Router = Backbone.Router.extend({

    routes: {
      // HOME
      '': 'home',
      // HOME
      'faqs(/)': 'faqs',
      // APP
      'categories/:id(/)': 'category',
      //THEME
      'tags/:id(/)': 'tag',
      // POST
      'gfw/:id' : 'post',
      'climate/:id' : 'post',
      'fires/:id' : 'post',
      'commodities/:id' : 'post',
      'odp/:id': 'post'
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
      this.setGlobalViews();
      this.setListeners();
    },

    setListeners: function() {
      this.listenTo(this.router, 'route:home', this.homePage);
      this.listenTo(this.router, 'route:faqs', this.faqsPage);
      this.listenTo(this.router, 'route:category', this.categoryPage);
      this.listenTo(this.router, 'route:tag', this.tagPage);
      this.listenTo(this.router, 'route:post', this.postPage);
    },

    start: function() {
      Backbone.history.start({
        pushState: true,
        root: (!!baseurl) ? baseurl : "/"
      });
    },

    homePage: function() {
      this.asideView = new root.app.View.AsideView({ options: { model: { id: null }}});
      this.searchView = new root.app.View.SearchView();
    },

    faqsPage: function() {
      this.faqsView = new root.app.View.FaqsView();
      this.faqsSelectView = new root.app.View.FaqsSelectView();
      this.asideView = new root.app.View.AsideView({ options: { model: { id: 'faqs' }}});
    },

    categoryPage: function(id) {
      this.filtersView = new root.app.View.FiltersView({});
      this.contentView = new root.app.View.ContentView({});      
      this.asideView = new root.app.View.AsideView({
        options: {
          model: {
            id: id
          }
        }
      });
    },

    tagPage: function(id) {
      this.asideView = new root.app.View.AsideView({});
    },

    postPage: function() {
      this.toggleView = new root.app.View.ToggleView();
      this.asideView = new root.app.View.AsideView({ options: { model: { id: null }}});
    },

    setGlobalViews: function() {
      this.blogView = new root.app.View.BlogView();
    }

  });

  new app.AppView().start();

})(this);
