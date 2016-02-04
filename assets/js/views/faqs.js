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

    model: new (Backbone.Model.extend({})),

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      this.model.set(this.options.model);
      this.cache();
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
    }

  });

})(this);
