(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};
  root.app.Model = root.app.Model || {};

  // View for display results
  root.app.View.FaqsView = Backbone.View.extend({

    el: '#faqsView',

    template: HandlebarsTemplates['faqs'],

    events: {
      'click .toggle' : 'toggleFaq'
    },

    model: new (Backbone.Model.extend({
      defaults: {
        filters: [],
        itemsOnPage: 5
      }
    })),

    collection: new (Backbone.Collection.extend({

      url: baseurl + '/json/faqs.json',

      // Me may use a comparator function, 
      // we will prevent sort each time our results
      parse: function(response){
        var response = _.map(response, function(el){
          el.tags = (!!el.tags && !!el.tags.length) ? el.tags.split(', ') : [];
          el.tags_info = _.map(el.tags, function(tag){
            return window.gfw_howto.tags[tag];
          })
          return el;
        })
        return response;
      },

      getFaqs: function(filters,page,itemsOnPage) {
        this.filters = filters;
        this.itemsOnPage = itemsOnPage;
        if(!!this.filters.length) {
          
          // If a filter exists
          this.collection = _.filter(_.sortBy(this.toJSON(), 'title'), function(el){
            var is_selected = _.intersection(this.filters,el.tags);
            return !!is_selected.length;
          }.bind(this));
          
          return this.collection.slice(page*this.itemsOnPage, (page*this.itemsOnPage) + this.itemsOnPage)

        } else {
          
          // If a filter doesn't exist
          this.collection = _.sortBy(this.toJSON(), 'title');
          return this.collection.slice(page*this.itemsOnPage, (page*this.itemsOnPage) + this.itemsOnPage);

        }
      },

      getCount: function() {
        if (!!this.filters.length) {
          
          this.collection = _.filter(_.sortBy(this.toJSON(), 'title'), function(el){
            var is_selected = _.intersection(this.filters,el.tags);
            return !!is_selected.length;
          }.bind(this));
          return this.collection.length

        } else {

          return this.toJSON().length;

        }
      }

    })),

    initialize: function(settings) {
      if (! !!this.$el.length) {
        return;
      }
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      this.collection.fetch().done(function() {
        this.setListeners();
        this.render(0)
      }.bind(this));
    },

    setListeners: function() {
      this.model.on('change:filters', function(){
        this.render(0);
      }.bind(this));

      Backbone.Events.on('Filters/change', function(filters){
        this.model.set('filters', _.clone(filters));
      }.bind(this));
    },

    cache: function() {
      this.$listItems = this.$el.find('.m-faqs-list li');
      this.$paginationContainer = this.$el.find('.m-faqs-pagination');
    },

    render: function(page) {
      this.$el.html(this.template({
        baseurl: window.gfw_howto.baseurl,
        list: this.collection.getFaqs(this.model.get('filters'),page,this.model.get('itemsOnPage'))
      }));
      this.cache();
      this.initPaginate(page);
    },

    initPaginate: function(page){
      // pagination
      this.$paginationContainer.pagination({
        items: this.collection.getCount(),
        itemsOnPage: this.model.get('itemsOnPage'),
        currentPage: page + 1,
        displayedPages: 3,
        selectOnClick: false,
        prevText: ' ',
        nextText: ' ',
        onPageClick: _.bind(function(page, e){
          e && e.preventDefault();
          this.render(page-1)
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
