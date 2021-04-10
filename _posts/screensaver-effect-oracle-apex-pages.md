---
title: 'Screensaver Effect in Oracle APEX Pages'
excerpt: 'Well, I’m back again, with a little feature that adds add an interesting screensaver effect to your pages and somehow brings them to life. Ever wanted to have that inactive sign-out timer? Well this post may help you achieve that.'
coverImage: '/assets/blog/screensaver-effect-oracle-apex-pages/cover.png'
date: '2017-02-04T05:35:07.322Z'
author:
  name: Farzad Soltani
  picture: '/assets/blog/authors/farzad.jpeg'
ogImage:
  url: '/assets/blog/screensaver-effect-oracle-apex-pages/cover.png'
---

Well, I’m back again, with a little feature that adds an interesting screensaver effect to your pages and somehow brings them to life.

Ever wanted to have that inactive sign-out timer? Well this post may help you achieve that.

All you need to do is include a JavaScript file (.js) in your application any way that you host your external files. This file must include the code below:

```js
var timeoutID;
 
function setup() {
 this.addEventListener("mousemove", resetTimer, false);
 this.addEventListener("mousedown", resetTimer, false);
 this.addEventListener("keypress", resetTimer, false);
 this.addEventListener("DOMMouseScroll", resetTimer, false);
 this.addEventListener("mousewheel", resetTimer, false);
 this.addEventListener("touchmove", resetTimer, false);
 this.addEventListener("MSPointerMove", resetTimer, false);
 
 startTimer();
}
setup();
 
function startTimer() {
 // wait 2 seconds before calling goInactive
 timeoutID = window.setTimeout(goInactive, 20000);
}
 
function resetTimer(e) {
 window.clearTimeout(timeoutID);
 goActive();
}
 
function goInactive() {
 // do something 
}
 
function goActive() {
 // do something
 startTimer();
}
```

What happens in the above block of code is quite simple, some event listeners are added on `mousemove`, `mousedown`, `keypress`, `DOMMouseScroll`, `mousewheel`, `touchmove` and `MSPointerMove` events. This covers almost all the events that are needed to be checked for going in and out of an inactive state.

Now all that is needed to be done is for you to add some code for something to happen when the user is considered to be **Inactive** or **Active**.

What I chose in my case was adding a screensaver effect for the screen to dim a little using Andy Wermke’s jQuery plugin for dimming effects. You can visit his page on Github [here](https://github.com/andywer/jquery-dim-background).

So after including his jQuery plugin (by adding `jquery.dim-background.min.js` to my static files, which can be downloaded from [here](/static/jquery.dim-background.zip), this is the code I added to the above block of code:

```js
function goInactive() {
 $('body').dimBackground();
}
 
function goActive() {
 $('body').undim();
 startTimer();
}
```

You can also change the time before going idle, by changing 20000 milliseconds (20 seconds) to any number of your desire:

```js
timeoutID = window.setTimeout(goInactive, 20000);
```

Another modification I made was to check whether I was on the login page or not as I didn’t want this fade effect to happen on it. You can add the entire code in the following condition statement (Note: based on the theme you use, the class `t-PageBody–login` may differ):

```js
if(!$('body').hasClass('t-PageBody--login')) {
 ...

 //Your code goes here

 ...
}
```

Another option is to sign out from the application if left idle for more than a couple of minutes even before session time-out.

You can view an example of the plugin in the link below. The timer is set on 2 seconds:

[https://apex.oracle.com/pls/apex/f?p=9468:5](https://apex.oracle.com/pls/apex/f?p=9468:5)

If you have any feedback or opinions, feel free to contact me.

Till next time.
