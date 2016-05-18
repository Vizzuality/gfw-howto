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
      this.toggleView = new root.app.View.ToggleView();
    }

  });

  new app.AppView().start();

})(this);
