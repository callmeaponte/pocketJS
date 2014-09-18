/*
  PocketJS v1.4

  (c) 2014 Andrew Aponte (@callMeMrAponte)
  Released under the MIT license
*/

!function(document, classList, addEventListener, array, each, nullType) {
	// if a CSS selector is passed, it will retrieve the specified element(s) from the DOM
	// if a DOM object is passed, it will return a Pocket object with the DOM object(s) wrapped inside
	// if a function is passed, it will execute the function on DOM ready (or immediately if DOM is already interactive)
	$ = function(args) {
		return /^fu/.test(args) ? (!/e/.test(document.readyState) ? document[addEventListener]('DOMContentLoaded', args) : args()) : new Pocket(args);
	};

	$.get = function(url, callback) {
		ajax('get', url, nullType, callback);
	};

	$.post = function(url, data, callback) {
		ajax('post', url, data, callback);
	};

	// Internal helper function for executing get/post requests
	function ajax(type, url, data, callback) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) callback(xhr)
		};
		xhr.open(type, url);
		xhr.send(data);
	};

	function Pocket(args) {
		// The apply function is called on the Array.prototype.push method to store an array-like collection of the results on the Pocket object
		array.push.apply(this, args ? args.nodeType ? [args] : document.querySelectorAll(args) : nullType);
	}

	Pocket.prototype = {
		// Set default length, when array-like object is returned, it will update automatically
		length: 0,

		on: function(event, callback) {
			// Loop through each element, and add an event listener
			return this[each](function(el) { el[addEventListener](event, callback) });
		},

		off: function(event, callback) {
			return callback ? this[each](function(el) { el.removeEventListener(event, callback) }) : 
				// If no callback is passed in, then we will remove ALL events from the element(s)
				this[each](function(el) {
					// The only way to effectively remove all events is to replace the element with a clone of itself
					var clone = el.cloneNode(true);
					el.parentNode.replaceChild(clone, el);
				})
		},

		each: function(callback) {
			array.forEach.call(this, function(el){ callback.call(el, el) });
			return this;
		},

		toggle: function(className) {
			// Toggle the class name if passed
			// If no argument was passed, toggle the display
			return className ? this[each](function(el){ el[classList].toggle(className); }) :
							   this[each](function(el){ el.style.display == 'none' ? el.style.display = 'block' : el.style.display = 'none'; }) ;
		},

		html: function(html) {
			return this[each](function(el) { el.innerHTML = html; });
		},

		hasClass: function(className) {
			return array.some.call(this, function(el) {
				return el.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(el.className)
			});
		},

		find: function(selector) {
			return new Pocket(selector);
		},

		trigger: function(eventName) {
			var event = new Event(eventName);
			this[each](function(el) { el.dispatchEvent(event); });
		},

		// if the splice method is present, an array-like object is returned
		splice: array.splice
	};
}(document, 'classList', 'addEventListener', [], 'each')
