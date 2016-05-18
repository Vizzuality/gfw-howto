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
