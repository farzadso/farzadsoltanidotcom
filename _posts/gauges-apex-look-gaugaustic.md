---
title: 'Gauges in APEX can look Gaugaustic!'
excerpt: 'Oracle APEX is a very suitable RAD tool for quickly creating efficient database-centric web applications. We all know that and that’s what we mostly use it for. I’ve come across some comments here and...'
coverImage: '/assets/blog/gauges-apex-look-gaugaustic/cover.png'
date: '2017-04-15T05:35:07.322Z'
author:
  name: Farzad Soltani
  picture: '/assets/blog/authors/farzad.jpeg'
ogImage:
  url: '/assets/blog/gauges-apex-look-gaugaustic/cover.png'
---

Oracle APEX is a very suitable RAD tool for quickly creating efficient database-centric web applications. We all know that and that’s what we mostly use it for. I’ve come across some comments here and there about using APEX as a replacement for dashboards. Ever since the introduction of Oracle JET Charts in APEX 5.1+, having interactive dashboards is not far-fetched anymore. Although Oracle JET provides a whole lot of functionality, it’s no very complete. Based on the requirement I had which needed Dynamic gauges to be created, I decided to integrate the D3 JavaScript library into APEX. After doing so, I created an APEX plugin for these gauges for public use. I intend on introducing this plugin in this blog post.

It is noteworthy that this plugin is a replica of the D3 Liquid Fill Gauge plugin in the D3 gallery. You can find information of how it works in this link : [http://bl.ocks.org/brattonc/5e5ce9beee483220e2f6](http://bl.ocks.org/brattonc/5e5ce9beee483220e2f6)

After downloading the plugin (you can find download links at the bottom of this post), import it into your application and add a new item to any region of choice and set its type to **APEX D3 Liquid Gauge**.

## Gauges’ Settings

After you create the item, you are confronted to set some settings. I will explain the settings below:

![D3 Gauge Settings](/assets/blog/gauges-apex-look-gaugaustic/d3-gauge-settings.jpeg)

### Type

Define the type of source used for the value shown on the gauge. Options include “From Input” and “From Query”.

### Percent (Input)

You see this option when you set Type to “From Input”. You can enter a number to be shown on the gauge.

### Percent (SQL Query)

You see this option when you set Type to “From Query”. You can enter a SQL query that returns a single value.

### Height

Set the height of the gauges. The value is based on pixels, therefore an integer will suffice.

### Theme

Choose from 3 preset themes. Theme 3 is the default theme. Setting the colours will override any colours in the themes.

### Circle Colour

Set the colour of the circle. Using the color picker simplifies the process of choosing a colour.

### Text Colour

Set the colour of the text. Using the color picker simplifies the process of choosing a colour.

### Wave Text Colour

Set the colour of the wave text inside the gauge. Using the color picker simplifies the process of choosing a colour.

### Wave Colour

Set the colour of the wave. Using the color picker simplifies the process of choosing a colour.

#### Additional Settings

Note that this plugin is a dynamic plugin reacts to the `click` event. To use this functionality all that you need to due is specify a SQL query that returns a single value in the `List of Values` property of the plugin. Clicking on the item will fetch new data from the query you define and update the plugin using AJAX.

![Dynamic Gauges SQL Query](/assets/blog/gauges-apex-look-gaugaustic/dynamic-gauges-sql-query.jpeg)

I guess that’s all there is to it. To view a live working example of the plugin click on the link below :

[https://apex.oracle.com/pls/apex/f?p=9468:11](https://apex.oracle.com/pls/apex/f?p=9468:11)

To download the plugin visit my GitHub repository :

[https://github.com/farzadso/APEX-D3-Liquid-Gauge](https://github.com/farzadso/APEX-D3-Liquid-Gauge)
