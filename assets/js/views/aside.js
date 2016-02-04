(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};
  root.app.Model = root.app.Model || {};

  // View for display results
  root.app.View.AsideView = Backbone.View.extend({

    el: '#asideView',

    model: new (Backbone.Model.extend({})),

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      this.model.set(this.options.model);
      this.cache();
      this.highlight();
    },

    cache: function() {
    },

    highlight: function() {
      this.$el.find('#aside-'+this.model.get('id')).addClass('-active');
    }
  });

})(this);
