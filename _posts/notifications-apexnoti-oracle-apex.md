---
title: 'Notifications Done Right – ApexNoti – Oracle APEX Browser Notifications'
excerpt: 'Ever wanted to have proper looking “browser” notifications? Well this plugin might help you out. You might have seen these notifications before when something goes wrong with a certain browser extension (e.g. it crashes)....'
coverImage: '/assets/blog/notifications-apexnoti-oracle-apex/cover.png'
date: '2017-03-05T05:35:07.322Z'
author:
  name: Farzad Soltani
  picture: '/assets/blog/authors/farzad.jpeg'
ogImage:
  url: '/assets/blog/notifications-apexnoti-oracle-apex/cover.png'
---

Ever wanted to have proper looking “browser” notifications? Well this plugin might help you out. You might have seen these notifications before when something goes wrong with a certain browser extension (e.g. it crashes). Or sometimes when a new extension is added.

This plugin uses the Notification interface from the Notification API in your browser. Most modern browsers support it, but just in case, I have added a photo below for both Desktop and Mobile browsers and its extensive support. (Although there’s no IE support – who uses IE anyway?)

## Browser Compatibility for the Notifications API

![Mobile Support](/assets/blog/notifications-apexnoti-oracle-apex/MobileSupport.jpeg)

![Desktop Support](/assets/blog/notifications-apexnoti-oracle-apex/DesktopSupport.jpeg)

The entire documentation for the Notification interface can be found in the link below :

[https://developer.mozilla.org/en-US/docs/Web/API/notification](https://developer.mozilla.org/en-US/docs/Web/API/notification)

Now what this plugin does is that it includes custom code for getting the notification to popup. The plugin is of **Dynamic Action** type, that means you have to call it via some sort of dynamic action triggering event. This is what the end result looks like :

![Notification Examples](/assets/blog/notifications-apexnoti-oracle-apex/Notification-Examples.jpeg)

What needs to be done now is to download the plugin, import it into your application in the **Shared Components => Plugins** section. The final step is to Create a dynamic action on any event and choose **ApexNoti** as the True/False action. Afterwards there are some required and some optional settings you have to fill in and then you’re all good to go.

Here’s an image of the available options. I will explain them each in the section below:

![Dynamic Actions Settings](/assets/blog/notifications-apexnoti-oracle-apex/DA-Settings.jpeg)

### Error Type (Optional)

There are two options, `Alert` and `Console`. This setting checks whether or not your browser is compatible with notifications. If it is then nothing will happen. In the case of your browser not being compatible with notification, by choosing `Alert` you will receive a simple JavaScript alert that says your browser isn’t compatible and by selecting `Console` this message gets printed in the browser console.

### Title (Required)

The title option sets the title of the notification as it is clear by its name.

### Icon (Optional)

The icon option displays an icon (image) in the notification itself. I have included a default image in the plugin itself so that it doesn’t look empty if you don’t set anything in the icon field. You can set a link to any image you desire. You can also choose an image uploaded in your application’s Static Application Files.

### Body (Required)

This option sets the message of the notification itself.

### Link (Optional)

Using this optional setting, you can set a link for when the user clicks on the notification itself. The link is opened in a new tab in the browser so that it doesn’t interrupt the user’s current page. Be sure to include the protocol in your link (`http://……` or `https://…`).

### Timeout (Optional)

This text field accepts values with a unit of milliseconds. For instance, if you enter 3000 as the value for this option, the produced notification automatically gets dismissed in 3 seconds.

Now all that’s left is a download link for the plugin itself. You can visit my GitHub repo below and download it from there:

[https://github.com/farzadso/ApexNoti--Oracle-APEX-Browser-Notifications](https://github.com/farzadso/ApexNoti--Oracle-APEX-Browser-Notifications)

Here’s a link to the plugin on apex.world too:

[https://apex.world/ords/f?p=100:700](https://apex.world/ords/f?p=100:700)

Last but not least, here’s a working example of the plugin itself on `apex.oracle.com`:

[https://apex.oracle.com/pls/apex/f?p=9468:6](https://apex.oracle.com/pls/apex/f?p=9468:6)

More functionality might be added to this plugin in future updates.
