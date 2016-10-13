---
title: Can I publish my GFW Map Builder application using my own domain?
published: True
tags: [map-builder]
categories: [faqs]
layout: post
---

<div class="content">
	<p>Yes, you can. By default all GFW Map Builder applications will be hosted under http://my.gfw-mapbuilder.org. However, GFW Map Builder is published under <a href="https://opensource.org/licenses/MIT" target="_blank">MIT</a> license and you can copy the code and host it on your own domain. To do this, copy the <a href="https://github.com/wri/gfw-mapbuilder/blob/master/src/index.jade" target="_blank">index.html</a> and <a href="https://github.com/wri/gfw-mapbuilder/blob/master/src/resources.js" target="_blank">resource.js</a> files from Github and store them on a webserver of your choice.</p>
  <p> Afterwards you will need to re-register the application on the updated domain with ArcGIS Online. </p>
</div>
