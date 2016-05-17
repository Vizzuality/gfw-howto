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
