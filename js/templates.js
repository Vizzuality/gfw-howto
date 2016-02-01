this["HandlebarsTemplates"] = this["HandlebarsTemplates"] || {};
this["HandlebarsTemplates"]["slider"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<div>\n  "
    + this.escapeExpression(((helper = (helper = helpers.test || (depth0 != null ? depth0.test : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"test","hash":{},"data":data}) : helper)))
    + "\n</div>\n";
},"useData":true});