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
      this.listenTo(this.router, 'route:category', this.appPage);
      this.listenTo(this.router, 'route:tag', this.themePage);
      this.listenTo(this.router, 'route:post', this.postPage);
    },

    start: function() {
      Backbone.history.start({
        pushState: true,
        root: (!!baseurl) ? baseurl : "/"
      });
    },

    homePage: function() {
      this.sliderView = new root.app.View.SliderView();
    },

    faqsPage: function() {
      this.faqsView = new root.app.View.FaqsView();
    },

    appPage: function(id) {
      this.asideView = new root.app.View.AsideView({
        options: {
          model: {
            id: id
          }
        }
      });
    },

    themePage: function(id) {
      this.asideView = new root.app.View.AsideView({
        options: {
          model: {
            id: id
          }
        }
      });
    },

    postPage: function() {
      this.toggleView = new root.app.View.ToggleView();
    },

    setGlobalViews: function() {
      this.blogView = new root.app.View.BlogView();
      this.searchView = new root.app.View.SearchView();
    }

  });

  new app.AppView().start();

})(this);
