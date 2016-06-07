---
title: Why do different data layers contradict each other or not overlap exactly?
published: True
tags: [gfw]
categories: [faqs]
layout: post
---

<div class="content">
	<p>Different data sets measure different things and are derived using different methodologies. Such differences can lead to results that may manifest as contradictory layers on the GFW platform. In some cases, a lack of available high-quality data may cause a greater margin of error for certain data sets.</p>

	<ul>
	  <li><p><strong>Intact Forest Landscapes vs. tree cover:</strong> These data sets measure different things. “Tree cover” shows all 30 × 30 meter areas that meet a minimum threshold of tree cover (25% canopy cover), whereas “Intact Forest Landscapes” only shows forests that show no significant signs of human activity (see the <a href="http://data.globalforestwatch.org/" target="_blank">Open data Portal</a> for specifics).</p>

	  <p>Users may find instances where tree cover does not fall within the boundaries of intact forest landscapes. This is because the Intact Forest Landscapes layer is based on MODIS (250 meter resolution satellite imagery), which is known to overestimate low tree cover densities, whereas the tree cover layer is based on Landsat (30 meter resolution satellite imagery). As a result, the tree cover layer may not show tree cover in an area that is covered by an intact forest landscape polygon.</p></li>

	  <li><p><strong>Google base map vs. boundary of country data sets:</strong> In some cases, country data sets do not line up with the Google base map and data may appear outside the country boundary. Not all country data sets are derived using the same base map and therefore there may be a slight degree of incongruence.</p></li>
	</ul>
</div>