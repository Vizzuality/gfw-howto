(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};
  root.app.Collection = root.app.Collection || {};

  // Model for getting the data
  root.app.Collection.SearchCollection = Backbone.Collection.extend({
    url: baseurl + '/json/search.json',
    parse: function(response) {
      // Remove the categories that you don't want to search in
      return _.compact(_.map(response, function(item) {
        return (item.category != 'blogs') ? item : null;
      }))
    }
  });

  // View for display results
  root.app.View.SearchView = Backbone.View.extend({

    events: {
      'focus #search-input' : 'search',
      'keyup #search-input' : 'search',
      'click #search-close' : 'removeResults'
    },

    resultsTemplate: HandlebarsTemplates['search'],

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      
      // Check if it's home page
      if(!!this.options.is_home) {
        this.$el.parents('.m-aside').hide();
        return;
      };

      this.collection = new root.app.Collection.SearchCollection();
      this.collection.fetch().done(function(){
        this.cache();
        this.initFuse();
      }.bind(this));
    },

    cache: function() {
      this.searchIndex = 0;
      this.$searchInput = this.$el.find('#search-input');
      this.$searchClose = this.$el.find('#search-close');
      this.$searchResults = this.$el.find('#search-results');

    },

    initFuse: function() {
      var json = this.collection.toJSON();
      this.fuse = new Fuse(json, {
        caseSensitive: false,
        includeScore: false,
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        keys: ['title','content','category','tags']
      });
    },

    search: function(e) {
      var val = $(e.currentTarget).val();
      switch(e.keyCode) {
        case 13:
          this.selectResult();
        break;
        case 27:
          this.removeResults();
        break;
        case 38:
          this.indexResults('up');
        break;
        case 40:
          this.indexResults('down');
        break;
        default:
          (!!val) ? this.setResults(val) : this.removeResults();
          this.highlightResults();
      }
    },

    indexResults: function(direction) {
      if (!!this.resultsLength) {
        switch(direction) {
          case 'up':
            (this.searchIndex != 0) ? this.searchIndex-- : this.searchIndex = 0;
          break;
          case 'down':
            (this.searchIndex < this.resultsLength - 1) ? this.searchIndex++ : this.searchIndex = this.resultsLength - 1;
          break;
        }
      }
      this.highlightResults();
    },

    highlightResults: function() {
      this.$searchResults.children('li').removeClass('-highlight');
      this.$searchResults.children('li').eq(this.searchIndex).addClass('-highlight');
    },

    selectResult: function() {
      var href = this.$searchResults.children('li').eq(this.searchIndex).children('a').attr('href');
      window.location = href;
    },

    setResults: function(val) {
      this.results = this.parseResults(val);
      this.resultsLength = this.results.length + _.flatten(_.pluck(_.flatten(this.results), 'posts')).length;
      
      this.$searchResults.addClass('-active').html(this.resultsTemplate({ 
        results: (!!this.resultsLength) ? this.results.slice(0,4) : null 
      }));
      // svg addClass
      this.$searchClose.addClass('-active');
    },

    parseResults: function(val) {
      return _.map(_.groupBy(this.fuse.search(val), 'category'), function(group, key){
        var key_slugify = key.replace(/\s/g, '_');

        if (!!key_slugify) {
          var category_info = window.gfw_howto.categories[key_slugify];
          category_info.url = window.gfw_howto.baseurl + /categories/ + this.slugify(category_info.slug);

          return {
            category_info: category_info,
            posts: _.first(group,5),
          } 
        }

      }.bind(this));
    },

    removeResults: function() {
      this.searchIndex = 0;
      this.results = this.fuse.search('');
      this.$searchInput.val('');
      this.$searchResults.removeClass('-active').html(this.resultsTemplate({ results: []}));
      // svg removeClass
      this.$searchClose.removeClass('-active');
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
