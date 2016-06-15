---
layout: post
title: Spatial Analysis in QGIS
published: True
description: ""
thumbnail: "/assets/images/gis/gis-spatial-analysis-in-qgis/thumbnail.png"
imagepath: "/assets/images/gis/gis-spatial-analysis-in-qgis"
categories: [gis]
tags: []
mobile: false
star: True
order: 9
---


<div id="desktopContent" class="content">
  <p>This tutorial will cover how to run a buffer analysis to create equidistant areas around features. This is a two-step process that involves reprojecting the data and running the buffer tool.</p>
  <p>A buffer analysis can help answer a number of spatial questions. For example, having a buffer around a river, intact forest, or other ecologically sensitive area can help identify and prioritize land for protection. Buffering an ecological feature can help mitigate the negative effects of human development, such as pollution.</p>
  <h3>Download Data</h3>
  <ol>
    <li>
      If you haven’t done so already, download an example dataset from GFW. All of GFW’s datasets can be found on the GFW <a href="http://data.globalforestwatch.org/" target="_blank">Open Data Portal</a>.
      <ul class="-lower-alpha">
        <li>
          For this tutorial, download the Democratic Republic of Congo’s <a href="http://data.globalforestwatch.org/datasets/535eb1335c4841b0bff272b78e2cc2f4_6?uiTab=metadata" target="_blank">Forest Titles data</a>.
          <ul class="-lower-roman">
            <li>This data is forest concession data, which represents areas where selected logging is permitted.</li>
            <li>If you have your own spatial data, you can also use that in place of GFW data for this tutorial.</li>
          </ul>
        </li>
        <li>See <a href="{{site.baseurl}}/download-data/download-data-from-the-open-data-portal.html">data download tutorial</a> for further instructions, if needed.</li>
      </ul>
    </li>
  </ol>

  <h3>Project Data</h3>
  <p><a href="http://resources.esri.com/help/9.3/arcgisengine/dotnet/89b720a5-7339-44b0-8b58-0f5bf2843393.htm" target="_blank">Projections</a> determine how 3D data are adjusted to a 2D map. All GFW data is in the projection WGS84, which is a global projection that is good for displaying global web-based data. However, when running an analysis that requires accurate distance measures, the data must be reprojected.</p>
  <ol>
    <li>Open a QGIS session and add the Forest Titles data to your map.</li>
    <li>
      Before you reproject, check the current projection of the Forest Titles data. Right click on the data in the layer panel and click Properties.
      <ul class="-lower-alpha">
        <li>In the General tab, the coordinate system is displayed under Coordinate Reference System.</li>
        <li>Close the Properties window.</li>
      </ul>
    </li>
    <li>
      Reproject the Forest Titles data by clicking the Vector dropdown menu at the top of the screen, Data Management Tools, and Define Current Projection.
      <p><img src="{{site.baseurl}}{{page.imagepath}}/desktop/define_coordinate.jpg"/></p>
    </li>
    <li>Click Choose under Output Spatial Reference System to choose a new projection.</li>
    <li>
      In the filter bar, type “World Eckert.”
      <ul class="-lower-alpha">
        <li>This will help you find World Eckert IV, which is a common projection that our GIS team uses. If you have a preferred projection for your area, you can search for that here as well.</li>
        <p><img src="{{site.baseurl}}{{page.imagepath}}/desktop/coordinate.jpg"/></p>
      </ul>
    </li>
    <li>Scroll down and select “World_Eckert_IV” And click OK.</li>
    <li>Click OK again to apply the selected projection.</li>
  </ol>

  <h3>Buffer Data</h3>
  <ol>
    <li>
      To run the buffer analysis, click on the Vector dropdown menu, then Geoprocessing Tools, then Buffers.
      <p><img src="{{site.baseurl}}{{page.imagepath}}/desktop/buffer.jpg"/></p>
    </li>
    <li>Select the forest titles layer from the drop down.</li>
    <li>The segments to approximate field increases the smoothness of the output polygons. Leave it at the default for now and increase it if the results are not smooth enough.</li>
    <li>In buffer distance field, type “10000” to run a 10km (10,000m) buffer.</li>
    <li>Leave dissolve buffer results unchecked. This will merge buffer polygons that overlap each other.</li>
    <li>Select the output shapefile location.</li>
    <li>
      Your results will automatically display in the results window.
      <p><img src="{{site.baseurl}}{{page.imagepath}}/desktop/buffer_results.jpg"/></p>
    </li>
  </ol>

  <h3>Next Steps</h3>
  <p>There are a number of vector geoprocessing analyses that can be run with QGIS. Explore the other geoprocessing tools available for analysis, such as dissolve. Take a look at the QGIS <a href="http://docs.qgis.org/2.8/en/docs/training_manual/vector_analysis/index.html" target="_blank">documentation</a>, especially on vector analysis, to learn more.</p>
</div>



<div id="mobileContent" class="content">
</div>
