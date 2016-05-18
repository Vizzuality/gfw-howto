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
      this.model.set('filters', _.clone(filters));
    },

    changeFilters: function() {
      Backbone.Events.trigger('Filters/change', this.model.get('filters'));
    }

  });

})(this);
