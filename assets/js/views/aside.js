(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};
  root.app.Model = root.app.Model || {};

  // View for display results
  root.app.View.AsideView = Backbone.View.extend({

    el: '#asideView',

    events: {
      'click .toggle-themes' : 'toggleThemes'
    },

    submenuTemplate: HandlebarsTemplates['aside-submenu'],

    model: new (Backbone.Model.extend({
      defaults: {
        collapsed: true
      }
    })),

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      this.setListeners();
      this.cache();

      // inits
      this.toggleThemes();
      this.highlight();
    },

    cache: function() {
      // html vars
      this.$asideThemeView = $('#asideThemeView');
      this.$contentThemeNames = $('#contentThemeView > li');

      // model vars
      this.model.set(this.options.model);
      this.model.set('themes',this.$asideThemeView.find('li'));
    },

    setListeners: function() {
      this.model.on('change:id', this.getData.bind(this));
    },

    // Themes behaviour
    toggleThemes: function() {
      if (! !!this.model.get('id')) {
        if (this.model.get('collapsed')) {
          var arr = _.union(
            _.first(this.model.get('themes'), 4),
            [$('<li>').addClass('toggle-themes').html('. . .')]
          );
          this.renderThemes(arr);
        } else {
          var arr = this.model.get('themes');
          this.renderThemes(arr);
        }
        this.model.set('collapsed', !this.model.get('collapsed'));
      }
    },

    renderThemes: function(arr) {
      this.$asideThemeView.html(this.parseThemes(arr));
    },

    parseThemes: function(arr) {
      return _.reduce(arr, function(memo, item){
        return memo + $(item)[0].outerHTML;
      }, '');
    },

    highlight: function() {
      if (!!this.model.get('id')) {
        var $el = this.$el.find('#aside-'+this.model.get('id'));
        $el.addClass('-active');
        if ($el.hasClass('-theme')) {
          $el.parent().append(this.submenuTemplate({ submenu: this.model.get('submenu') }));
        }
      }
    },

    getData: function() {
      var submenu =  _.compact(_.map(this.$contentThemeNames, function(el) {
        if ($(el).hasClass('-active')) {
          return {
            title: $(el).data('title'),
            id: $(el).data('id')
          }
        }
      }));
      this.model.set('submenu', submenu);
    },

  });

})(this);
