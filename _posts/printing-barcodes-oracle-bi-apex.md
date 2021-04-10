---
title: 'Printing Barcodes Using Oracle BI Publisher and Oracle APEX'
excerpt: 'I came across a user requirement today. The requirement was to print out some numbers as barcodes using our printing server (Oracle BI Publisher). There were many different proposed ways...'
coverImage: '/assets/blog/printing-barcodes-oracle-bi-apex/cover.png'
date: '2017-01-30T05:35:07.322Z'
author:
  name: Farzad Soltani
  picture: '/assets/blog/authors/farzad.jpeg'
ogImage:
  url: '/assets/blog/printing-barcodes-oracle-bi-apex/cover.png'
---


I came across a user requirement today. The requirement was to print out some numbers as barcodes using our printing server (Oracle BI Publisher).

There were many different proposed ways when I googled, but the best one I stumbled upon was the **Font Mapping** option in the BI Publisher Administration Panel.

I accessed the admin panel via the URL below (the port number or hostname may vary based on your installation):

```bash
http://localhost:9704/xmlpserver/
```

Logged in with admin privileges.

![Login](/assets/blog/printing-barcodes-oracle-bi-apex/1.jpeg)

Opened up the administration panel in the top-right corner:

![Administration](/assets/blog/printing-barcodes-oracle-bi-apex/2.jpeg)

Entered the Font Mappings settings:

![Font Mapping](/assets/blog/printing-barcodes-oracle-bi-apex/3.jpeg)

Then I added these two templates for both RTF and PDF :

![Templates](/assets/blog/printing-barcodes-oracle-bi-apex/4.jpeg)

These mappings can be added by clicking the **Add Font Mapping** button and entering the following details:

![Mappings](/assets/blog/printing-barcodes-oracle-bi-apex/5.jpeg)

Base Font is the name of the font which can be retrieved from checking the font name in Microsoft Office Word. This font must be present in the following folder:

```bash
C:\Windows\fonts
```

**Target Font Type** is set to Truetype for .ttf fonts.

**Target Font** is the font file itself which is physically located in the directory below:

```bash
ORACLE_HOME/common/fonts
```

Where ORACLE_HOME is the directory which you have installed your BI server in.

You can add any desired font to the directory above and by stopping and starting your server you can choose it in the select list. Now you can render barcodes in your reports.

If you also want previews in BI Publisher Desktop for Microsoft Office Word (when you are building your report templates for importing in Oracle APEX) you must add your desired font in your system font folder and also edit the `xdo.cfg` file which is located in the directory where you installed Oracle BI Publisher Desktop for Microsoft Office Word. In my case:

```bash
C:\Program Files\Oracle\BI Publisher\BI Publisher Desktop\Template Builder for Word\config
```

Initially `xdo.cfg` doesn’t exist. Well it does, it’s just called `xdo_example.cfg` and you can easily rename it to `xdo.cfg`. Open it up with your editor of choice and this line at the bottom:

```html
<font family="Code 128" style="normal" weight="normal">
  <truetype path="C:\Users\me\Desktop\128R00.TTF" />
</font>
```

![xdo.cfg](/assets/blog/printing-barcodes-oracle-bi-apex/7.jpeg)

The `family` is the same as `Base Font` and the `path` is the directory where you have your font file (.ttf) located.

Afterwards, using the preview function in BI Publisher Desktop will render the provided font(s).

![Preview](/assets/blog/printing-barcodes-oracle-bi-apex/8.jpeg)

Whilst creating fields and tables in your report layout, make sure you set your font to the barcode font you have installed in `C:\Windows\fonts`. It will look like this:

![Fonts](/assets/blog/printing-barcodes-oracle-bi-apex/9.jpeg)

All that needs to be done now is to import the created `.rtf` file in your application in APEX in the `Shared Components` section in `Report Layouts`:

![Report Layouts](/assets/blog/printing-barcodes-oracle-bi-apex/10.jpeg)

Now based on your Report Query you can print out PDF files which have barcodes instead of numbers based on whatever font file you choose (being free or paid).

I hope this post solves a problem of yours.

Until next time.

***

UPDATE 07/02/2017 :

After testing the above methods on our production environment, I realized that some sort of rendering has to happen for the barcodes on the application server. In order for this to happen, if you’re using Oracle BI Publisher 10g or older version, you’d need a java app deployed to do to this.

But if you’re using Oracle BI Publisher 11g or newer versions, you’re in luck. The Oracle team has included the required  bits and pieces which you had to manually add and testing it was a big pain. Luckily in our case, we were using Oracle BI Publisher 11g and the road which we had to move on was much more paved.

So what should be done? To be honest, nothing super complicated. You only need to add a little property to the fields that are going to be rendered as barcodes in BI Publisher for Desktop in Microsoft Office (when you’re building your report template).

Here’s the little line of code you need to add :

```xml
<?format-barcode:FIELD_NAME;'code128a'?>
```

Note that `FIELD_NAME` should be replaced with whatever you’re calling you’re field (generally specified when creating your report query and the resulting `xml` file).

Here’s a screenshot of what it looks like:

![Barcode Field Properties](/assets/blog/printing-barcodes-oracle-bi-apex/barcode_field_properties.jpeg)

Now, what is that `code128a` part? That tells the xmlpserver which algorithm to use for rendering the font (if you’re asking yourself what the **xmlpserver** is, in short, it’s the component Oracle APEX uses to render its reports using Oracle BI).

So what other options exist?

| Font file     | Supported algorithms(barcode_type)  |
| :------------ | ----------------------------------: |
| 128R00.TTF    | code128a, code128b and code128c     |
| B39R00.TTF    | code39, code39mod43                 |
| UPCR00.TTF    | upca, upce                          |

Where do these fonts come from? They’re all bundled with Oracle BI Publisher 11g, they exist internally and no setting up is required.
