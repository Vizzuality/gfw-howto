---
title: How can I edit metadata?
published: True
tags: [map-builder]
categories: [faqs]
layout: post
---

<div class="content">
	<p>For any feature layer (ie: a Shapefile, KML or GeoJSON that you uploaded to ArcGIS Online or a single layer you registered with ArcGIS Online), GFW Map Builder will take metadata from the ArcGIS Online item. You need to have an organizational account and <a href="https://doc.arcgis.com/en/arcgis-online/share-maps/metadata.htm" target="_blank">enable metadata</a> for your organization to make use of this feature. GFW Map Builder will use the following metadata elements if available:</p>

  <table>
  <thead>
    <tr>
       <th><strong>GFW Map Builder Metadata</strong></th>
       <th><strong>Location in ArcGIS Online metadata editor</strong></th>
    </tr>
  </thead>
    <tbody>
      <tr><th>Title</th><td>Resources/ Citation/ Title & Dates/ Title</td></tr>
      <tr><th>Subtitle</th> <td> 	Resources/ Citation/ Title & Dates/ Alternate Title</td></tr>
      <tr><th>Keywords</th> <td>	Resources/ Keywords/ Tags/ Tags</td></tr>
      <tr><th>Function</th> <td> 	Resources/ Detail/ Description/ Purpose</td></tr>
      <tr><th>Resolution</th> <td> 	Resource/Details/ Resolution/ Distance + Distance Units</td></tr>
      <tr><th>Geographic coverage</th> <td>  	Resource/ Extent/ Description/ Extent Description</td></tr>
      <tr><th>Source</th> <td> 	Quality/ Linage/ Data Source/ Description/ Source Description</td></tr>
      <tr><th>Frequency of updates</th> <td> Resources/ Maintenance/Frequency/Custom Frequency</td></tr>
      <tr><th>Date of content</th> <td> n/a*</td></tr>
      <tr><th>Cautions</th> <td> 	Resources/ Constraints/ General/ Use Limitations</td></tr>
      <tr><th>License</th> <td> Resources/ Constraints/ Legal / Use Limitations</td></tr>
      <tr><th>Overview / Description</th> <td> Resources/ Detail/ Description/ Description</td></tr>
      <tr><th>Citation</th> <td> 	Resources/ Citation/ Other/ Other Detail</td></tr>
      <tr><th>Other</th> <td> 	Resources/ Detail/ Description/ Supplemental Information</td></tr>
      <tr><th>Learn</th> <td> more 	Resource/ Citation/ URLs/ Online Resource/ URL</td></tr>
      <tr><th>Download data</th> <td>	Distribution/ Transfer Option/ Online Resource/ URL</td></tr>
    </tbody>
  </table>

  <p>* Currently not supported in ArcGIS Online</p>
  <p>If you don't want to use extended metadata or have a public account and cannot edit metadata, GFW Map Builder will use the standard ArcGIS Online title, summary, description, keyword and copyright fields which are exposed for every ArcGIS Online item.</p>

  <p>If you use dynamic map layers or entire webservices, Map Builder will not be able to access metadata registered with ArcGIS Online. Instead, it will search for metadata in the mapservice itself.  Metadata in map services are limited to title, description and copyright. Make sure to fill out these fields for every layer before you publish a service on your own server.</p>
</div>
