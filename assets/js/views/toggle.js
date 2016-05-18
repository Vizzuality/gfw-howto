(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};
  root.app.Model = root.app.Model || {};

  // View for display results
  root.app.View.ToggleView = Backbone.View.extend({

    el: '#toggleView',

    model: new (Backbone.Model.extend({
      defaults: {
        toggle: 'desktop'
      }
    })),

    events: {
      'click .choice' : 'toggle'
    },

    initialize: function(settings) {
      if (! !!this.$el.length) {
        return;
      }

      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);

      this.cache();
      this.listeners();
      this.changeToggle();
    },

    cache: function() {
      this.$desktopContent = $('#desktopContent');
      this.$mobileContent = $('#mobileContent');

      this.$buttons = this.$el.find('.choice');
      this.$skitter = this.$el.find('.skitter');
    },

    listeners: function() {
      this.model.on('change:toggle', this.changeToggle.bind(this));
    },

    toggle: function(e) {
      e && e.preventDefault();

      this.$buttons.removeClass('-active');
      $(e.currentTarget).addClass('-active');

      this.model.set('toggle',$(e.currentTarget).data('toggle'));
    },

    changeToggle: function() {
      var toggle = this.model.get('toggle');
      switch(toggle) {
        case 'desktop':
          this.$desktopContent.show(0);
          this.$mobileContent.hide(0);
          this.$skitter.css({ left: '0%' });
        break;
        case 'mobile':
          this.$desktopContent.hide(0);
          this.$mobileContent.show(0);
          this.$skitter.css({ left: '50%' });
        break;
      }
    }

  });

})(this);
