(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};
  root.app.Model = root.app.Model || {};

  // View for display results
  root.app.View.FaqsView = Backbone.View.extend({

    el: '#faqsView',

    appOrder: {
      gfw: 0,
      climate: 1,
      fires: 2,
      commodities: 3
    },

    events: {
      'click .toggle' : 'toggleFaq'
    },

    collection: new (Backbone.Collection.extend({
      url: baseurl + '/json/faqs.json',
      parse: function(response) {
        var groups = _.groupBy(response, 'app');
        return groups;
      }
    })),

    template: HandlebarsTemplates['faqs'],

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      this.collection.fetch().done(function() {
        this.setListeners();
        this.render()
        this.cache();
      }.bind(this));
    },

    setListeners: function() {
      Backbone.Events.on('faqs/filter', function(value) {
        this.render(value);
      }.bind(this));
    },

    cache: function() {
      this.$listItems = $('.m-faqs-list li');
    },

    toggleFaq: function(e) {
      var $parent = $(e.currentTarget).parent();

      if ($parent.hasClass('-selected')) {
        this.$listItems.removeClass('-selected');
      } else {
        this.$listItems.removeClass('-selected');
        $parent.addClass('-selected');
      }
    },

    render: function(filter) {
      this.$el.html(this.template({
        groups: this.getGroups(filter)
      }));
    },

    getGroups: function(filter) {
      var collection = this.collection.toJSON()[0];
      if(!!filter && filter != 'all') {
        return _.compact(_.map(collection, function(group, k) {
          if (k != filter) { return null; }
          return group;
        }));
      } else {
        return collection;
      }
    }

  });

})(this);
