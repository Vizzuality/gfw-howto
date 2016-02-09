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

    collection: new (Backbone.Collection.extend({

      url: baseurl + '/json/faqs.json',

      getGroups: function(filter,page) {
        this.filter = filter;
        if(!!this.filter && this.filter != 'all') {
          this.collection = _.groupBy(_.sortBy(this.toJSON(), 'order'), 'app');
          return _.compact(_.map(this.collection, function(group, k) {
            if (k != this.filter) { return null; }
            return _.sortBy(group,'order').slice(page*5, (page*5) + 5);
          }.bind(this)));
        } else {
          this.collection = _.flatten(_.map(_.groupBy(_.sortBy(this.toJSON(), 'order'), 'app'), function(group){
            return group
          }.bind(this))).slice(page*5, (page*5) + 5);
          return _.groupBy(this.collection, 'app');
        }
      },

      getCount: function() {
        if (!!this.filter && this.filter != 'all') {
          var filtered = _.groupBy(this.toJSON(), 'app')[this.filter];
          return (!!filtered) ? filtered.length : 0;
        } else {
          return this.toJSON().length;
        }
      }

    })),

    template: HandlebarsTemplates['faqs'],

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      this.collection.fetch().done(function() {
        this.setListeners();
        this.render('all',0)
      }.bind(this));
    },

    setListeners: function() {
      Backbone.Events.on('faqs/filter', function(value) {
        this.render(value, 0);
      }.bind(this));
    },

    cache: function() {
      this.$listItems = this.$el.find('.m-faqs-list li');
      this.$paginationContainer = this.$el.find('.m-faqs-pagination');
    },

    render: function(filter,page) {
      this.$el.html(this.template({
        groups: this.collection.getGroups(filter,page)
      }));
      this.cache();
      this.initPaginate(filter,page);
    },

    initPaginate: function(filter,page){
      // pagination
      this.$paginationContainer.pagination({
        items: this.collection.getCount(),
        itemsOnPage: 5,
        currentPage: page + 1,
        displayedPages: 3,
        selectOnClick: false,
        prevText: ' ',
        nextText: ' ',
        onPageClick: _.bind(function(page, e){
          e && e.preventDefault();
          this.render(filter,page-1)
          this.$paginationContainer.pagination('drawPage', page);
        }, this )
      });
    },

    // Events
    toggleFaq: function(e) {
      var $parent = $(e.currentTarget).parent();
      if ($parent.hasClass('-selected')) {
        this.$listItems.removeClass('-selected');
      } else {
        this.$listItems.removeClass('-selected');
        $parent.addClass('-selected');
      }
    },



  });

})(this);
