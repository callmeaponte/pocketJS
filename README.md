pocketJS
========
The mini jQuery-like library. I wanted to see how many features I could fit into around 1kb of code (after minification). Loosely based off of ki.js (https://github.com/dciccale/ki.js), with more features added.



Installation
============
To install, simply include the script anywhere on your page:
```
<script src="pocket.min.js"></script>
```



Usage
=====

### Selecting elements
To select an element, pass any valid CSS selector into $():
```
$('#button')
$('.list')
$('a')
$('#wrapper ul > li:first-child')
```


### Selecting a descendant element
You can find a descendant element in the current set of matched elements by using the find() method:
```
$('.list').find('.item')
```
... Note that passing any falsy value will simply return an empty array.


### Wrapping DOM elements
You can also pass any DOM object into $():
```
$(document)
```


### Executing a function when the DOM is ready
Passing a function to $() ensures that it will not run until the DOM is ready:
```
$(function(){
  console.log('The DOM is ready!');
})
```


### Adding an event listener
To add an event listener, use the on() method. Pass the event name and callback as arguments:
```
$('#button').on('click', buttonHandler);
```


### Removing an event listener
To remove an event listener, use the off() method. Pass the event name and callback as arguments:
```
$('#button').off('click', buttonHandler);
```

To remove **all** event listeners for an event, omit the callback argument:
```
$('#button').off('click');
```


### Triggering an event
To trigger an event, use the trigger() method. Pass the event name as an argument:
```
$('#button').trigger('click');
```


### Sending an AJAX GET request
To send an AJAX GET request, use the get() utility method. Pass the url and callback as arguments:
```
$.get('someurl.php', callbackFunction);
```


### Sending an AJAX POST request
To send an AJAX POST request, use the post() utility method. Pass the url, data, and callback as arguments:
```
$.post('someurl.php', 'hello world', callbackFunction);
```



### Looping through elements
To loop through each element in a returned collection of elements, use the each() method. Note that the value of _this_ points to the current element in the loop:
```
$('a').each(function() {
  console.log(this.href);
});
```


### Checking if a class exists
To check if a class exists, pass the class name to the hasClass method:
```
$('a').hasClass('link');
```


### Toggling a class
To toggle a class, use the toggle() method:
```
$('a').toggle('link');
```


### Toggling display
To toggle the display of an element, call the toggle() method without passing any arguments:
```
$('a').toggle();
```


### Modifying text/html
To modify the text or html of an element, use the html() method:
```
$('a').html('click me');
```


### Chaining methods
PocketJS supports the chaining of methods, which means the following is possible:
```
$('a').html('click me').toggle('active');
```



Browser Support
===============
Chrome 8+, Firefox 3.6+, Safari 5.1+, Opera 11.5+, IE10+
