---
title: Can I publish my GFW Map Builder application using my own domain?
published: True
tags: [map-builder]
categories: [faqs]
layout: post
---

<div class="content">
	<p>Yes, you can. By default all GFW Map Builder applications will be hosted under http://my.gfw-mapbuilder.org. However, GFW Map Builder is published under <a href="https://opensource.org/licenses/MIT" target="_blank">MIT</a> license and you can copy the code and host it on your own domain. To do this, copy the <a href="http://my.gfw-mapbuilder.org/v1.latest/index.html" target="_blank">index.html</a>, <a href="http://my.gfw-mapbuilder.org/v1.latest/report.html" target=" blank">report.html</a>, and <a href="http://my.gfw-mapbuilder.org/v1.latest/resources.js" target="_blank">resources.js</a> from our online repository and store them on a webserver of your choice.</p>
  <p>We save custom drawn features and uploaded shapefile in a feature service. For this to work, the application will need to logon to our server using a special token. We can generate such token for you but will need to know the domain (e.g. <a href="http://www.globalforestwatch.org" target=" blank">www.globalforestwatch.org</a>) of your new website. Please send us these details in an email to <a href="mailto:mapbuilder@globalforestwatch.org">mapbuilder@globalforestwatch.org</a>.</p>

  <p> Once, everything is configured, you will need to re-register the application on the updated domain with ArcGIS Online. </p>
</div>
