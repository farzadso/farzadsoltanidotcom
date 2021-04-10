---
title: 'Checkboxes in Interactive Reports – Passing them via AJAX – Oracle APEX'
excerpt: 'Having multiple details for a master table on a single page is pain. Imagine if each of those details each has another detail or two. It’s a chain of never ending suffering. Especially when you’re doing it all on a single page and all the in...'
coverImage: '/assets/blog/checkboxes-interactive-reports-ajax-apex/cover.jpeg'
date: '2017-03-14T05:35:07.322Z'
author:
  name: Farzad Soltani
  picture: '/assets/blog/authors/farzad.jpeg'
ogImage:
  url: '/assets/blog/checkboxes-interactive-reports-ajax-apex/cover.jpeg'
---

Having multiple details for a master table on a single page is pain. Imagine if each of those details each has another detail or two. It’s a chain of never ending suffering. Especially when you’re doing it all on a single page and all the interactivity is done via simple Interactive Reports and popup Forms. A problem that usually arises is that when you want to delete/update multiple rows in an interactive report and use checkboxes for selecting those rows, once the page is submitted you lose control of which rows you had selected. This can all be implemented using Branches and Page Load Dynamic Actions, but why go through all the hassle?

What I’m going to propose in this post is using **AJAX** (which beautifully stands for **A**synchronous **Ja**vaScript and **X**ML) for deleting rows selected using the checkboxes.

Although I must note that none of this was possible without the help of Roel Hartman and Maxime Tremblay in the [APEX slack channel](https://orclapex.slack.com/).

The first step is to create a table called `CHECKBOX_TABLE`. This is a much simpler version of the EMP table which has a SRL column (short for serial) for storing primary keys and a NAME column which stores the name of the employee.

This is the SQL for creating such a table:

```sql
CREATE TABLE "CHECKBOX_TABLE"
   ("SRL" NUMBER NOT NULL ENABLE,
    "NAME" VARCHAR2(50),
    CONSTRAINT "CHECKBOX_TABLE_PK"
    PRIMARY KEY ("SRL")
    USING INDEX  ENABLE
   )
/
```

After creating the table, we’ll create an Interactive Report on the table using the following select statement:

```sql
select 
CHECKBOX_TABLE.SRL as SRL,
CHECKBOX_TABLE.NAME as NAME,
APEX_ITEM.CHECKBOX2(p_idx => 1, 
                    p_value => SRL,
                    p_attributes => 'class="boxes"') AS SELECTOR
 from CHECKBOX_TABLE CHECKBOX_TABLE
```

We’ve rendered our checkboxes using the APEX_ITEM.CHECKBOX2 function. The checkboxes have an ID of 1 (representing the APEX APPLICATION Global Variable 1, referenced by APEX_APPLICATION.G_F01) and their values are set according to the ID of each employee (SRL). In the attributes section a class called `boxes` has been added to each checkbox so that we can easily reference it in our jQuery selector.

The next step is to create the process which actually deletes the rows we have selected. The code for the process is as below:

```sql
BEGIN
 FOR I IN 1..APEX_APPLICATION.G_F01.COUNT 
 LOOP
 DELETE CHECKBOX_TABLE
 WHERE SRL = APEX_APPLICATION.G_F01(I);
 END LOOP;
 htp.p('{ "message": "' || APEX_APPLICATION.G_F01.COUNT || ' rows deleted" }');
END;
```

It’s a simple PL/SQL which deletes the rows based by looping through the G_F01 array (selected checkboxes). I will explain the htp.p section in a bit.

So where the issue? If I set this code/process as a normal process in my page’s processing section and get it to run when I press a specific button, it runs perfectly. The page gets submitted via that specific button, the process gets run and when the page reloads the selected rows are deleted. But what if I insert the same code in a dynamic action and get the action to Execute PL/SQL Code? Fail! It won’t run because the G_F01 hasn’t been submitted.

So how can we run the above code in a dynamic action and also set and then pass the values of the G_F01 array to the server? That’s where AJAX jumps in.

In order to get it to work, we must move the PL/SQL code’s point of processing to AJAX Callback. I’ll be calling it DELETE_ROWS. You can see how I’ve defined it in the image below:

![AJAX Callback](/assets/blog/checkboxes-interactive-reports-ajax-apex/ajax-callback.png)

Let’s create a button and a Dynamic Action on that button which executes some JavaScript and then refreshes the interactive report region. This is the JavaScript code :

```js
var f01_array = [];

/* Push the values of each checkbox in the above array */
$('.boxes:checked').each(function() {
    f01_array.push($(this).val());
});

/* Run the AJAX process to delete the rows and pass the F01 array */
apex.server.process( "DELETE_ROWS",
 { f01 : f01_array },
 { success : function(data){
     alert(data.message);
   }
 }
);
```

Here’s an image of how it’s all laid out:

![JS Code](/assets/blog/checkboxes-interactive-reports-ajax-apex/javascript-code.png)

What happens in the code above is that a simple JavaScript array has been defined called f01_array. We will be pushing the values of the checkboxes into this array one by one as they are checked. Afterwards we call the apex.server.process JavaScript API  to run the DELETE_ROWS process we created by passing its name to it. We also populate the global f01 array by passing the f01_array to it. As Roel pointed out, lots of people (including me) don’t know that these arrays can be populated in the apex.server.process function.

In the end when the AJAX call is successful and gets the response returned after running the PL/SQL block, it shows the number of rows deleted through an alert prompt. This data is sent back using this bit of code:

```sql
htp.p('{ "message": "' || APEX_APPLICATION.G_F01.COUNT || ' rows deleted" }');
```

We’re passing a JSON string containing the number of rows deleted.

It is also stated in the API documentation for the pOptions Object that we can pass to apex.server.process that :

See jQuery documentation of jQuery.ajax for these supported
options: accepts, dataType, beforeSend, contents,
converters, dataFilter, headers, complete, statusCode,
error, success. The dataType option defaults to json.

Visiting http://api.jquery.com/jquery.ajax/ reveals that we can set our dataType as text to prevent any issues when not returning JSON in our PL/SQL using:

```json
{ dataType : "text" }
```

That’s all there is to it. You can visit the link below to see a working example :

[https://apex.oracle.com/pls/apex/f?p=9468:7](https://apex.oracle.com/pls/apex/f?p=9468:7)

## Update – Add Select All Checkboxes in Column Heading

I have received a few emails regarding how I implemented the Select All checkbox in the column header so I decided to update this blog post to document how it’s done for future use. All that needs to be done is to create a checkbox instead of its heading which has an onclick event that selects all the other checkboxes. The code is as following:

```html
<input type="Checkbox" onclick="$f_CheckFirstColumn(this)">
```

I also recommend not letting the users do any actions on this certain column, as clicking on the column heading could cause the filter menu to open. This image shows all the required settings:

![Select All](/assets/blog/checkboxes-interactive-reports-ajax-apex/select-all-checkboxes.png)

**Note:** When using Universal Theme this functionality doesn’t work and it is some sort of a semi-bug. The reason is that the column header and column rows are two separate `<table>` tags. What needs to be done is to edit your interactive report’s Attributes and set its Heading’s `Fixed To` to `None`.

![Headings](/assets/blog/checkboxes-interactive-reports-ajax-apex/attributes-fixed-to.png)

If any questions exist feel free to contact me via email. If you’re more of a twitter fan, you can find my twitter handle at the bottom of the page in the footer.
