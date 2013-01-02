# Creating a jQuery Plugin for a User Inteface Control

## tl;dr

This repository walks through the process of creating a jQuery plugin that transforms a DOM element into a pre-styled toggle switch.

## Project Page

Read the API documentation for the plugin and see live examples at <a href='http://vail130.github.com/Basic-Toggle-Switch/' target='_blank'>http://vail130.github.com/Basic-Toggle-Switch/</a>.

## Determining Structure and Style of the Switch

For quick prototyping of some HTML and CSS, I like to use a site like <a href='http://jsbin.com' target='_blank'>JSBin</a> and <a href='http://jsfiddle.net' target='_blank'>jsFiddle</a>. I settled on the following HTML:

```html
<a href='#' class='bts-switch'>
  <span class='bts-label bts-label-off'>Off</span>
  <span class='bts-label bts-label-on'>On</span>
  <i class='bts-toggle'></i>
</a>
```

I decided that calling the initializing method `basicToggleSwitch()` would replace the DOM element in the selection with this HTML. As written, this plugin is intended to initialize a jQuery selection of just one DOM element. Inspired by Bootstrap's JS plugins, I also decided to add the ability to start the switch out with its state being "on", using the following data attribute `data-state='on'` in the original HTML that gets replaced. This functionality can help developers avoid having to write a one-off initialization method for a controller (in Spine) or a view (in Backbone) to turn the switch on when it renders.

### Plugin Image Assets

As written, this plugin does not use any image assets, but sometimes that's the easiest way to increase cross-browser compatibility. With a plugin that creates a user interface control, you always want to give the developer the ability to modify styles to their liking, so a separate SASS, LESS, or CSS file is better than embedding the style programmatically or dynamically adding style elements to the HEAD. However, image assets are a different story, and extra files will only make the integration process more tedious. For that reason, you may want to embed images into the HTML or CSS as base64 strings. Here is how to do that, using Python and the terminal (for Mac).

First, create your image asset and save it as a PNG, JPEG, or GIF file. Make sure you know your full system file path for the image. Then, open the terminal and use the following example:

```shell
Vail-Golds-MacBook-Pro:~ vailgold$ python
Python 2.6.1 (r261:67515, Jun 24 2010, 21:47:49) 
[GCC 4.2.1 (Apple Inc. build 5646)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import base64
>>> with open('/Users/vailgold/Desktop/photo.jpeg', 'rb') as f:
...     data = f.read()
... 
>>> data64 = base64.b64encode(data)
>>> with open('/Users/vailgold/Desktop/photo.txt', 'wb') as f:
...     f.write(data64)
... 
>>> exit()
```

Now, `~/Desktop/photo.txt` will contain the base64 string for `~/Desktop/photo.jpeg`. To embed this image into HTML or CSS, use these examples:

```html
<img src="data:image/jpeg;base64,[Insert Base64 Encoded String Here]" />
```

```css
span {
  background-image: url("data:image/jpeg;base64,[Insert Base64 Encoded String Here]");
}
```

*Note: There are cases where a static image asset is more beneficial than an embedded base64 string. The file size of a base64 string is about 133% of the size of its corresponding image file, but embedding the base64 string decreases the overall number of HTTP requests. In cases where the asset gets reused multiple times or the asset's file size is very large, a static image may be better.

## Structuring the jQuery Plugin Code

The jQuery website provides some important <a href='http://docs.jquery.com/Plugins/Authoring' target='_blank'>Plugin Authoring Guidelines</a> that I would urge you to read or at least skim through before starting to write the code. There is a summary of best practices at the bottom of the page. Based on these guidelines and the code template provided, the following are the main programming considerations for this plugin:

* Placing the plugin's code in a closure
* Defining the plugin's API methods
* Assigning a namespace in jQuery.fn for the plugin

### Closure

All the closure does is define a function that gets called immediately, passing in the global `jQuery` object in as the `$` argument.

### API Methods

Except for `init`, each method is primarily a chain of method calls on the context object (`this`), which represents the current jQuery selection. Only the `active` and `state` methods return something other than `this`: the `state` method returns the string representation of the switch's state, and the `active` method returns a boolean representation of the switch's state. 

The `init` method does all the work of setting up the plugin. It can be called with or without the string `'init'` as the first argument of the plugin's jQuery method and an optional object literal argument, which only determines the initial state of the switch, overriding the data attribute of the initial HTML. You can look through the code to see what it actually does, but note that it creates a new DOM element programmatically and returns that jQuery object instead of `this`, making the new object the context for the other plugin methods in a chain of method calls. It is very important to outline this kind of behavior in the documentation for the plugin so that other developers can use the switch easily and successfully.

### jQuery.fn Namespace

I've accounted for three conditions where the developer may call this plugin's method:

1. The first argument is a valid string name of one of the plugin's API methods, in which case we call that method and pass it any other arguments.
2. The first argument is an object or `undefined`, in which case we call the `init` method with all of the arguments.
3. Any other condition fails with a jQuery.error object.


