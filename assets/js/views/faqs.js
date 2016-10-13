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
      'click .toggle' : 'onClickFaq'
    },

    model: new (Backbone.Model.extend({
      defaults: {
        page: null,
        filters: [],
        pagination: true,
        itemsOnPage: 12
      }
    })),

    collection: new (Backbone.Collection.extend({

      url: baseurl + '/json/faqs.json',

      // Me may use a comparator function,
      // we will prevent sort each time our results
      parse: function(response){
        var response = _.map(response, function(el){

          el.tags = (!!el.tags && !!el.tags.length) ? el.tags.split(', ') : [];

          el.tags_slugs = _.map(el.tags, function(_tag){
            return _tag.replace(/_/g, '-')
          })

          el.tags_info = _.map(el.tags, function(_tag){
            var tag = window.gfw_howto.tags[_tag];
            tag.url = baseurl + '/tags/' + tag.slug + '/';
            return tag;
          })

          el.slug = this.slugify(el.title);

          return el;
        }.bind(this));

        return response;
      },

      getFaqs: function(params) {
        this.filters = params.filters;
        this.itemsOnPage = params.itemsOnPage;
        if(!!this.filters && !!this.filters.length) {
          // If a filter exists
          this.collection = _.filter(this.toJSON(), function(el){
            var is_selected = _.intersection(this.filters,el.tags_slugs);
            return !!is_selected.length;
          }.bind(this));

          return params.pagination
            ? this.collection.slice(params.page*this.itemsOnPage, (params.page*this.itemsOnPage) + this.itemsOnPage)
            : this.collection;

        } else {
          // If a filter doesn't exist
          this.collection = this.toJSON();
          return params.pagination
            ? this.collection.slice(params.page*this.itemsOnPage, (params.page*this.itemsOnPage) + this.itemsOnPage)
            : this.collection;
        }
      },

      getCount: function() {
        if (!!this.filters && !!this.filters.length) {
          this.collection = _.filter(this.toJSON(), function(el){
            var is_selected = _.intersection(this.filters,el.tags_slugs);
            return !!is_selected.length;
          }.bind(this));

          return this.collection.length

        } else {
          return this.toJSON().length;
        }
      },

      getPageFromSlug: function(filters,slug,itemsOnPage) {
        if(!!this.filters && !!this.filters.length) {
          // If a filter exists
          this.collection = _.filter(this.toJSON(), function(el){
            var is_selected = _.intersection(this.filters,el.tags_slugs);
            return !!is_selected.length;
          }.bind(this));
        } else {
          // If a filter doesn't exist
          this.collection = this.toJSON();
        }

        var index = _.findIndex(this.collection, {slug: slug});
        if (index >= 0) {
          return Math.floor(index/itemsOnPage);
        }
        return 0;
      },

      /**
       * HELPERS
       * slugify
       * @param  {[string]} text
       * @return {[string]} text
       */
      slugify: function(text) {
        return text.toString().toLowerCase().trim()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/&/g, '-and-')         // Replace & with 'and'
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-');        // Replace multiple - with single -
      },


    })),

    initialize: function(settings) {
      if (! !!this.$el.length) {
        return;
      }
      var opts = settings && settings.options ? settings.options : {};
      var params = settings && settings.params ? settings.params : {};
      this.options = _.extend({}, this.defaults, opts);
      this.model.set(params);
      this.listeners();
      this.collection.fetch().done(function() {
        this.render()
      }.bind(this));
    },

    listeners: function() {
      // Model listeners
      this.model.on('change:filters', function(){
        this.model.set('slug', null);
        this.model.set('page', 0);
        this.render();
      }.bind(this));

      this.model.on('change:slug', function(){
        this.render();
        Backbone.Events.trigger('Route/update', 'slug', this.model.get('slug'));
      }.bind(this));

      // Backbone listeners
      Backbone.Events.on('Route/go',this.routerGo.bind(this));
      Backbone.Events.on('Filters/change', function(filters){
        this.model.set('filters', _.clone(filters));
      }.bind(this));
    },

    cache: function() {
      this.$htmlbody = $('html,body');
      this.$listItems = this.$el.find('.m-faqs-list');
      this.$paginationContainer = this.$el.find('.m-faqs-pagination');
    },

    render: function() {
      this.model.set('page', this.getPage());
      this.$el.html(this.template({
        baseurl: window.gfw_howto.baseurl,
        list: this.collection.getFaqs(this.model.attributes),
        pagination: this.model.attributes.pagination
      }));
      this.cache();

      if (this.model.get('pagination')) {
        this.initPaginate();
      }
      this.toggleFaq();
    },

    initPaginate: function(){
      // pagination
      if (this.collection.getCount() > this.model.get('itemsOnPage')) {
        this.$paginationContainer.pagination({
          items: this.collection.getCount(),
          itemsOnPage: this.model.get('itemsOnPage'),
          currentPage: this.model.get('page') + 1,
          displayedPages: 3,
          selectOnClick: false,
          prevText: ' ',
          nextText: ' ',
          onPageClick: _.bind(function(page, e){
            e && e.preventDefault();
            this.model.set('slug', null);
            this.model.set('page', page - 1);
            this.render()
            this.$paginationContainer.pagination('drawPage', page);
            this.$htmlbody.animate({
              scrollTop: 0,
            },250);

          }, this )
        });
      }
      Backbone.Events.trigger('Route/update', 'page', this.model.get('page'));
    },

    // Events
    onClickFaq: function(e) {
      var is_link = !!$(e.target).closest('a').length;
      var $parent = $(e.currentTarget).parent();
      if (!is_link) {
        if ($parent.hasClass('-selected')) {
          this.model.set('slug', null);
        } else {
          this.model.set('slug', $parent.data('slug'));
        }
      }
    },

    toggleFaq: function() {
      var slug = this.model.get('slug');
      if (!!slug) {
        var $current = this.$listItems.children('li[data-slug="'+slug+'"]');
        this.$listItems.children('li').removeClass('-selected');
        $current.addClass('-selected');

        this.$htmlbody.animate({
          scrollTop: (!!$current) ? $current.offset().top : 0,
        },250);
      }
    },

    getPage: function() {
      if (!!this.model.get('slug') && !this.model.get('page')) {
        return this.collection.getPageFromSlug(this.model.get('filters'), this.model.get('slug'), this.model.get('itemsOnPage'));
      }
      return this.model.get('page') || 0;
    },


    // ROUTER GO
    routerGo: function(params) {
      if (!!params) {
        this.model.set({
          slug: params.slug,
          page: params.page
        }, { silent: true });
      }
    },


  });

})(this);
