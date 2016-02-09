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
