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
      // model vars
      this.model.set(this.options.model);
      this.$checkbox = this.$el.find('[name="checkbox-tag"]');
    },

    listeners: function() {
      Backbone.Events.on('Route/go',this.routerGo.bind(this));
      this.model.on('change:filters', this.publishFilters.bind(this));
    },
 
    /**
     * UI EVENTS
     */
    setFilters: function(e) {
      var filters = _.compact(_.map(this.$checkbox, function(el){
        var checked = $(el).is(':checked');
        if (checked) {
          return $(el).data('tag')
        }
      }.bind(this)));
      this.model.set('filters', _.clone(filters));
    },

    updateFilterCheckboxes: function() {
      var filters = this.model.get('filters');
      _.each(this.$checkbox, function(el){
        var tag = $(el).data('tag');
        var is_checked = _.contains(filters, tag);
        $(el).prop( "checked", is_checked);
      })
    },

    /**
     * STATE EVENTS
     */
    routerGo: function(params) {
      if (!!params && !!params.filters) {
        var filters = JSON.parse(params.filters);
        this.model.set('filters', _.clone(filters));
        this.updateFilterCheckboxes();
      }
    },

    publishFilters: function() {
      Backbone.Events.trigger('Filters/change', this.model.get('filters'));
      Backbone.Events.trigger('Route/update', 'filters', this.model.get('filters'));
    },

  });

})(this);
