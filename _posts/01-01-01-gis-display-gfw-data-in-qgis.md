---
layout: post
title: Display GFW Data in QGIS
published: True
description: ""
thumbnail: "/assets/images/gis/gis-display-gfw-data-in-qgis/thumbnail.png"
imagepath: "/assets/images/gis/gis-display-gfw-data-in-qgis"
categories: [gis]
tags: [odp]
mobile: false
star: True
order: 9
---


<div id="desktopContent" class="content">
  <p>This tutorial is for new or beginning GIS users who would like to use free, open source GIS software to make a custom display of Global Forest Watch (GFW) data. Also see our <a href="{{site.sub_url}}/gis/gis-spatial-analysis-in-qgis.html">tutorial</a> covering basic analyses with spatial data in QGIS.</p>
  <h3>Download QGIS and Global Forest Watch Data</h3>
  <ol>
    <li>Download and install QGIS from the QGIS project <a href="http://www.qgis.org/en/site/forusers/download.html" target="_blank">website</a>. QGIS is available for a variety of systems, including Windows, Mac OS X, and Linux.</li>
    <li>
      If downloading QGIS for Windows:
      <ul class="-lower-alpha">
        <li>Select GIS Standalone Installer.</li>
        <li>Select 32 bit or 64 bit. (To determine which version to download, click start, right-click computer, click properties. 32-bit or 64-bit operating system will be indicated under system type.)</li>
        <li>Follow standard installation instructions.</li>
      </ul>
    </li>
    <li>
      Download an example dataset from GFW. All of GFW’s datasets can be found on the GFW <a href="http://data.globalforestwatch.org/" target="_blank">Open Data Portal</a>.
      <ul class="-lower-alpha">
        <li>
          For this tutorial, download the Democratic Republic of Congo’s <a href="http://data.globalforestwatch.org/datasets/535eb1335c4841b0bff272b78e2cc2f4_6?uiTab=metadata" target="_blank">Forest Titles data</a>.
          
          <ul class="-lower-roman">
            <li>This data is forest concession data, which represents areas where selected logging is permitted.</li>
            <li>If you have your own spatial data, you can also use that in place of GFW data for this tutorial.</li>
          </ul>
        </li>
        <li>See <a href="{{site.sub_url}}/download-data/download-data-from-the-open-data-portal.html">data download tutorial</a> for further instructions, if needed.</li>
      </ul>
    </li>
  </ol>

  <h3>Use QGIS to Display Data</h3>
  <p>This section will explain how to open, view and visually customize data. You will familiarize yourself with some of the visualization tools in QGIS.</p>
  <ol>
    <li>Open QGIS from the start panel.</li>
    <li>
      Open the example data by navigating to the folder with the downloaded Forest Titles data in the Browser Panel on the left.
      <p><img src="{{site.sub_url}}{{page.imagepath}}/desktop/panel.jpg"/></p>
    </li>
    <li>
      Display the Forest Titles data by dragging the file into the Layers Panel (below the Browser Panel) or display area (to the right).
      <ul class="-lower-alpha">
        <li>
          Polygons for forest titles and associated information are displayed.
          <p><img src="{{site.sub_url}}{{page.imagepath}}/desktop/polygons.jpg"/></p>
        </li>
      </ul>
    </li>
    <li>
      Move the display by selecting the pan map tool in the toolbar at the top of the QGIS window. Click and drag the mouse in the display area to adjust the view of the polygons.
      <p><img src="{{site.sub_url}}{{page.imagepath}}/desktop/icon_hand.jpg"/></p>
    </li>
    <li>
      Zoom into a specific polygon by selecting the Zoom In tool in the toolbar at the top of the QGIS window. 
      <p><img src="{{site.sub_url}}{{page.imagepath}}/desktop/icon_zoom.jpg"/></p>
      <ul class="-lower-alpha">
        <li>
          Revert back to previous zoom level by clicking the Zoom Last tool. 
          <p><img src="{{site.sub_url}}{{page.imagepath}}/desktop/icon_last.jpg"/></p>
        </li>
      </ul>
    </li>
    <li>
      To see information about the polygons, such as who owns them and which province they are located in, open the data’s attribute table. 
      <ul class="-lower-alpha">
        <li>
          Right click on the data layer in the Layers Panel and select Open Attribute Table. 
          <ul class="-lower-roman">
            <li>This table contains rows of information that are associated with polygons in the data. Each row belongs to one polygon in the data.</li>
          </ul>
        </li>
        <li>
          To see information about a specific polygon, click a number on the far left of the attribute table to highlight the row. 
          <p><img src="{{site.sub_url}}{{page.imagepath}}/desktop/attribute.jpg"/></p>
        </li>
        <li>
          Minimize the table to view a highlighted polygon in yellow. This polygon is associated with the information in the highlighted row. 
          <ul class="-lower-roman">
            <li>If the highlighted polygon is difficult to see, click the Zoom Map to Selected Rows button to adjust the view. Click the Zoom Last tool to return to the pervious zoom level.</li>
            <p><img src="{{site.sub_url}}{{page.imagepath}}/desktop/icon_selected.jpg"/></p>
          </ul>
        </li>
        <li>
          To unselect the polygon, maximize the attribute table and click the Unselect All button at the top of the table. Close the attribute table.
          <p><img src="{{site.sub_url}}{{page.imagepath}}/desktop/icon_unselected.jpg"/></p>
        </li>
      </ul>
    </li>
    <li>
      Adjust the visual appearance of the data and other settings by right clicking on the layer in the Layers Panel and selecting Properties. Review each of the following tabs to see which properties can be adjusted. 
      <p><img src="{{site.sub_url}}{{page.imagepath}}/desktop/properties.jpg"/></p>
      <ul class="-lower-alpha">
        <li>General: Change layer name (just for this QGIS session) and view where the data is saved.</li>
        <li>
          Style: adjust colors, patterns, and transparency.
          <ul class="-lower-roman">
            <li>Adjust colors in the color dropdown, or</li>
            <li>Click fill, then click simple fill to adjust additional parameters, such as border color and width.</li>
          </ul>
        </li>
        <li>
          Label: add labels to shapefile.
          <ul class="-lower-roman">
            <li>Select Show Labels for this Layer from the first dropdown.</li>
            <li>Select “Type” from the second dropdown to label titles by type.</li>
            <li>Select your preferred font and size.</li>
            <li>Click apply to see your changes. Adjust font and size to your liking.</li>
          </ul>
        </li>
      </ul>
    </li>
    <li>
      If some contextual information is desired, such as a base map or administrative outlines, try:
      <ul class="-lower-alpha">
        <li>The QGIS basemaps plugin <a href="http://plugins.qgis.org/plugins/quick_map_services/" target="_blank">QuickMapServices</a>.</li>
        <li>Country boundaries from <a href="http://www.gadm.org/" target="_blank">Global Administrative Areas</a> or websites like <a href="http://www.diva-gis.org/" target="_blank">GIS DIVA</a>.</li>
      </ul>
    </li>
  </ol>
</div>



<div id="mobileContent" class="content">
</div>
