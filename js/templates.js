this["HandlebarsTemplates"] = this["HandlebarsTemplates"] || {};
this["HandlebarsTemplates"]["blog"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "    <li>\n      <div class=\"img -"
    + alias2(alias1((depth0 != null ? depth0.categories : depth0), depth0))
    + "\"></div>\n      <a href=\""
    + alias2(alias1((depth0 != null ? depth0.link : depth0), depth0))
    + "\" target=\"_blank\">\n        <h3>"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</h3>\n        <p>"
    + ((stack1 = alias1((depth0 != null ? depth0.description : depth0), depth0)) != null ? stack1 : "")
    + "</p>\n      </a>\n    </li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<ul>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.blogposts : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\n<div class=\"m-blog-link\">\n  <a target=\"_blank\" href=\"http://blog.globalforestwatch.org/\">\n    <svg class=\"icon\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-f-blog\"></use></svg>\n    Read our blog\n  </a>\n</div>\n";
},"useData":true});
this["HandlebarsTemplates"]["faqs"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "    \n    <li data-app=\""
    + alias2(alias1((depth0 != null ? depth0.category : depth0), depth0))
    + "\" data-order=\""
    + alias2(alias1((depth0 != null ? depth0.order : depth0), depth0))
    + "\">\n      <h3 class=\"toggle\">\n        <span class=\"title\">"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</span>\n        <div class=\"m-apps-tag -inline\">\n          <ul>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.tags_info : depth0),{"name":"each","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "          </ul>\n        </div>\n        <span class=\"arrow\"><svg><use xlink:href=\"#icon-arrowdown\"></use></svg></span>\n      </h3>\n      <div class=\"content m-faqs-content\">\n        "
    + ((stack1 = alias1((depth0 != null ? depth0.content : depth0), depth0)) != null ? stack1 : "")
    + "\n      </div>\n    </li>\n    \n";
},"2":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "              <li><a class=\""
    + alias2(alias1((depth0 != null ? depth0.slug : depth0), depth0))
    + "\" href=\""
    + alias2(alias1((depth0 != null ? depth0.url : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</a></li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<ul class=\"m-faqs-list\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\n<ul class=\"m-faqs-pagination\"></ul>\n";
},"useData":true});
this["HandlebarsTemplates"]["googlegroups"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "      <li>\n        <h3><a href=\""
    + alias2(alias1((depth0 != null ? depth0.link : depth0), depth0))
    + "\" target=\"_blank\">"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</a></h3>\n        <p>"
    + alias2(alias1((depth0 != null ? depth0.pubDate : depth0), depth0))
    + "</p>\n        <p>"
    + alias2(alias1((depth0 != null ? depth0.description : depth0), depth0))
    + "</p>\n      </li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"col -w100\">\n  <header>\n    <h2 class=\"-bold\">MOST POPULAR QUESTIONS</h2>\n  </header>\n  <ul class=\"ranking-list\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.discussions : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "  </ul>\n  <a class=\"link\" href=\"https://groups.google.com/forum/#!forum/globalforestwatch\" target=\"_blank\">VISIT GFW FORUM > ></a>\n</div>";
},"useData":true});
this["HandlebarsTemplates"]["search"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.results : depth0),{"name":"each","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"2":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "    <li><a href=\""
    + alias2(alias1((depth0 != null ? depth0.url : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</a></li>\n";
},"4":function(depth0,helpers,partials,data) {
    return "    <li>No data available</li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.results : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "\n";
},"useData":true});
this["HandlebarsTemplates"]["slider"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=this.escapeExpression;

  return "    <li class=\"item\" data-index=\""
    + alias1(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">"
    + alias1(this.lambda(depth0, depth0))
    + "</li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<ul>\n  <li class=\"item -arrow\" data-direction=\"left\"><svg><use xlink:href=\"#icon-arrowleft\"></use></svg></li>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.pages : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "  <li class=\"item -arrow\" data-direction=\"right\"><svg><use xlink:href=\"#icon-arrowright\"></use></svg></li>\n</ul>\n\n";
},"useData":true});