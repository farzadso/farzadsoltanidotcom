---
title: 'Introduction to Implementing Google Maps in Oracle APEX Applications'
excerpt: 'In this post I will be presenting an introduction on how to begin implementing Google Maps and the Google Maps API in your applications.'
coverImage: '/assets/blog/implementing-google-maps-oracle-apex/cover.jpeg'
date: '2017-02-07T05:35:07.322Z'
author:
  name: Farzad Soltani
  picture: '/assets/blog/authors/farzad.jpeg'
ogImage:
  url: '/assets/blog/implementing-google-maps-oracle-apex/cover.jpeg'
---

In this post I will be presenting an introduction on how to begin implementing Google Maps and the Google Maps API in your applications.

Well, I’m going to dive right in. This introduction is going to be quite short, but I think it will give you a good overview of how you can implement complex map functionalities in your pages.

So what you need to do is create a  page that contains a region of type **Static Content**.

![Maps](/assets/blog/implementing-google-maps-oracle-apex/maps1.jpeg)

Place the following markup in its source:

```html
<!DOCTYPE html>
<html>

<head>
 <title>Simple Map</title>
 <meta name="viewport" content="initial-scale=1.0">
 <meta charset="utf-8">
 <style>
 /* Always set the map height explicitly to define the size of the div * element that contains the map. */
 
 #map {
 height: 100%;
 }
 /* Optional: Makes the sample page fill the window. */
 
 html,
 body {
 height: 100%;
 margin: 0;
 padding: 0;
 }
 
 #mapp .t-Region-body {
 height: 600px !important;
 }
 </style>
</head>

<body>
 <div id="map"></div>
 <script>
 var map;

 function initMap() {
 map = new google.maps.Map(document.getElementById('map'), {
 center: {
 lat: -34.397,
 lng: 150.644
 },
 zoom: 8
 });
 }
 </script>
 <script src="https://maps.googleapis.com/maps/api/js?key=MY_GOOGLE_APP_KEY&callback=initMap" async defer></script>
</body>

</html>
```

Notice that in the ending `<script>` tag right before the closing `</body>` tag, I have written `MY_GOOGLE_APP_KEY`. A Google API Key must be obtained and placed instead of `MY_GOOGLE_APP_KEY`.

In order to obtain a Google API Key, refer to [https://console.developers.google.com/apis/credentials](https://console.developers.google.com/apis/credentials) and get your hands on a KEY by signing up for a free one using your Gmail account.

![Maps 2](/assets/blog/implementing-google-maps-oracle-apex/maps2.jpeg)

What we’re going to do in this example, is ask the user to allow access to their current location via the browser, and to relocate the map view to their current location and also show the longitude and latitude values in two simple page items.

The next step is creating these two items, which in my case are called `P4_LATITUDE` and `P4_LONGITUDE`. Also there’s going to be a button which I called `FIND_LOCATION`.

![Lat lon buttons](/assets/blog/implementing-google-maps-oracle-apex/lat-lot-buttons.png)

Create a dynamic action on the `FIND_LOCATION` button, which is triggered on the **Click** event. Create a *true action* for this dynamic action which executes the JavaScript code below:

```js
var map = new google.maps.Map(document.getElementById('map'), {
 center: {lat: -34.397, lng: 150.644},
 zoom: 15
});
var infoWindow = new google.maps.InfoWindow({map: map});

// Try HTML5 geolocation.
if (navigator.geolocation) {
 navigator.geolocation.getCurrentPosition(function(position) {
 var pos = {
 lat: position.coords.latitude,
 lng: position.coords.longitude
 };
 $('#P4_LATITUDE').val(position.coords.latitude);
 $('#P4_LONGITUDE').val(position.coords.longitude);

 infoWindow.setPosition(pos);
 infoWindow.setContent('Location found.');
 map.setCenter(pos);
 }, function() {
 handleLocationError(true, infoWindow, map.getCenter());
 });
} else {
 // Browser doesn't support Geolocation
 handleLocationError(false, infoWindow, map.getCenter());
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
 infoWindow.setPosition(pos);
 infoWindow.setContent(browserHasGeolocation ?
 'Error: The Geolocation service failed.' :
 'Error: Your browser doesn\'t support geolocation.');
}
```

In the above code, you must replace `P4_LATITUDE` and `P4_LONGITUDE` with the names you chose for your two items above.

In addition, it’s wise to add some custom CSS to the map region. What I did was give the region a static ID with the value of `mapp` and added this CSS.

```css
#map {
 height: 100%;
}
#mapp .t-Region-body {
 height: 600px !important;
}
```

This is what the end result looks like (you can click on any of the images to open it in a new tab) :

![Map Demo](/assets/blog/implementing-google-maps-oracle-apex/map-demo.jpeg)

Note that when using the geolocation API and especially when you’re running your page in Google Chrome, the address from which you run your page must be secure (HTTPS). If you’re running local, then no worries as your localhost is considered secure. If you’re testing on http://apex.oracle.com there are no issues too. If you have problems due to being on HTTP and not HTTPS, try another browser like Mozilla Firefox for testing or run chrome with the following parameters to override the check for being run from a secure location:

```bash
--unsafely-treat-insecure-origin-as-secure="http://example.com"

—user-data-dir=/test/profile/
```

Here is the link to a working demo of the method above :

[https://apex.oracle.com/pls/apex/f?p=9468:4](https://apex.oracle.com/pls/apex/f?p=9468:4)

I hope you enjoyed reading this blog post. In the near future I will post about more features that can be played around with.

As always, don’t hesitate to contact me for any technical issues/questions/requests.

Till next time.
