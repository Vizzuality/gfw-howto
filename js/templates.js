this["HandlebarsTemplates"] = this["HandlebarsTemplates"] || {};
this["HandlebarsTemplates"]["slider"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=this.escapeExpression;

  return "    <li class=\"item\" data-index=\""
    + alias1(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">"
    + alias1(this.lambda(depth0, depth0))
    + "</li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "\n<ul>\n  <li class=\"item -arrow\" data-direction=\"left\"><svg><use xlink:href=\"#icon-arrowleft\"></use></svg></li>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.pages : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "  <li class=\"item -arrow\" data-direction=\"right\"><svg><use xlink:href=\"#icon-arrowright\"></use></svg></li>\n</ul>\n\n";
},"useData":true});