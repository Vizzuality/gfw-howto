(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};
  root.app.Model = root.app.Model || {};

  // View for display results
  root.app.View.BlogListView = Backbone.View.extend({

    el: '#blogListView',

    template: HandlebarsTemplates['blogList'],

    model: new (Backbone.Model.extend({
      url: 'https://gfw-huggin.herokuapp.com/users/1/web_requests/21/blogrss.json',
    })),

    events: {

    },

    initialize: function(settings) {
      if (! !!this.$el.length) {
        return;
      }

      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);


      this.cache();

      this.model.fetch().success(function(data){
        this.render();
      }.bind(this));
    },

    cache: function() {
    },

    render: function() {
      this.$el.html(this.template({ blogposts: this.parse() }))
    },

    parse: function() {
      return this.model.get('items');
    },

    slugify: function(text) {
      return text.toString().toLowerCase().trim()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/&/g, '-and-')         // Replace & with 'and'
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-');        // Replace multiple - with single -
    },

  });

})(this);
