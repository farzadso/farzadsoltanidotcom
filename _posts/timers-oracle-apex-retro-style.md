---
title: 'Timers in Oracle APEX – Retro Style!'
excerpt: 'I’m back with another plugin. A customer of mine had a requirement to show a classy timer on a form so that the people filling in the forms knew how much time they had been spending filling in the super long form. I initially did it precisely for that case, but they liked it too much and wanted the timers on a whole lot of pages.'
coverImage: '/assets/blog/timers-oracle-apex-retro-style/cover.jpeg'
date: '2017-03-14T05:35:07.322Z'
author:
  name: Farzad Soltani
  picture: '/assets/blog/authors/farzad.jpeg'
ogImage:
  url: '/assets/blog/timers-oracle-apex-retro-style/cover.jpeg'
---

I’m back with another plugin. A customer of mine had a requirement to show a classy timer on a form so that the people filling in the forms knew how much time they had been spending filling in the super long form. I initially did it precisely for that case, but they liked it too much and wanted  the timers on a whole lot of pages. That’s what pushed me to turn it into a simple plugin so that our other developers with less knowledge of JavaScript/jQuery could benefit from it too.

(Come to think of it, just telling them how it worked would have consumed much less time, but I went with making the plugin anyway.)

The idea and copyright comes from Xdan a.k.a Valeriy’s jQuery Plugin called **flipcountdown**. You can visit his GitHub repository via this link [https://github.com/xdan/flipcountdown/](https://github.com/xdan/flipcountdown/) for more information and also the complete documentation to implement any feature that I already haven’t.

So the jQuery library is a must, and since our Oracle APEX applications have the library embedded by default. Therefore there’s no problem in that area.

After downloading the plugin, which you can find the link at the bottom of this post, import it into your application. Afterwards, in any page and in any region, create a `Page Item` and set its type to `APEX Flip CountDown`.

In the Settings section you are prompted to choose some options. The image below shows all the available options and I will explain them one by one underneath the photo.

![Timer Settings](/assets/blog/timers-oracle-apex-retro-style/timer-settings.png)

## Counter Mode

When set to `Yes`, all options other than `Size` and `Start From` become disabled. This is what you will be seeing:

![Timer Counter Mode](/assets/blog/timers-oracle-apex-retro-style/Timer-Counter-Mode.png)

You can choose a number for the counter to start from, or simply leave it empty for it to start from 1.

When this option is set to `No` the counter mode is disabled and you get a simple clock displayed.

## Size

The `Size` option is always visible when in **Counter**, **Clock** or **Countdown** mode and sets the size of the Retro Flip Countdown timers. The available options are `Large`, `Medium`, `Small` and `Extra Small`.

## Show Hour / Minute / Second

Setting any combination of these changes the visuals of the clock. If all of them are set to `No` you get nothing. Setting them all to `Yes` displays the hour, minute and second of the current time. Note that these options only work in the clock mode, and not in the counter and countdown modes.

## Time Format

When displaying a clock you can choose between a 12 or 24 hour time format.

## Count to Date?

This is what actually sets the plugin on countdown mode. You can choose from a certain date and time in the future and the timers will start counting down to the given time. It’s a good option to show a timer for when a specific offer will end. A space between the date and time is absolutely necessary. A valid format is:

```js
M/DD/YYYY HH:MM:SS

For example : 4/21/2017 18:46:23
```

## Date

When `Count to Date` is set to `Yes` this text field becomes visible and this is the date you set for the countdown timers to count to.

You can visit this link to see a working demo of the plugin :

[https://apex.oracle.com/pls/apex/f?p=9468:8](https://apex.oracle.com/pls/apex/f?p=9468:8)

And for downloading the plugin itself visit my GitHub repository:

[https://github.com/farzadso/APEX-Flip-CountDown](https://github.com/farzadso/APEX-Flip-CountDown)
