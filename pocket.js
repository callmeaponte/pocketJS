/*
  PocketJS v1.1

  (c) 2014 Andrew Aponte (@callMeMrAponte)
  Released under the MIT license
*/

!function(document, classList, addEventListener, array) {
	// if a CSS selector is passed, it will retrieve the specified element(s) from the DOM
	// if a DOM object is passed, it will return a Pocket object with the DOM object(s) wrapped inside
	// if a function is passed, it will execute the function on DOM ready (or immediately if DOM is already interactive)
	$ = function(args) {
		return /^f/.test(args) ? (!/e/.test(document.readyState) ? document[addEventListener]('DOMContentLoaded', args) : args()) : new Pocket(args);
	};

	function Pocket(args) {
		// The apply function is called on the Array.prototype.push method to store an array-like collection of the results on the Pocket object
		array.push.apply(this, document.querySelectorAll(args));
	}

	Pocket.prototype = {
		length: array.length,

		on: function(event, callback) {
			// Loop through each element, and add an event listener
			this.each(function(el) { el[addEventListener](event, callback) });
			return this;
		},

		off: function(event, callback) {
			if (!callback) {
				// If no callback is passed in, then we will remove ALL events from the element(s)
				this.each(function(el) {
					// The only way to effectively remove all events is to replace the element with a clone of itself
					var clone = el.cloneNode(true);
					el.parentNode.replaceChild(clone, el);
				});
			} else {
				this.each(function(el) { el.removeEventListener(event, callback) });
			}
			return this;
		},

		each: function(callback) {
			array.forEach.call(this, function(el){ callback.call(el, el) });
			return this;
		},

		toggle: function(className) {
			className ? this.each(function(el){ el[classList].toggle(className); }) : this.each(function(el){ el.style.display === 'none' ? el.style.display = 'block' : el.style.display = 'none'; }) ;
			return this;
		},

		html: function(html) {
			this.each(function(el) { el.innerHTML = html; });
			return this;
		},

		// if the splice method is present, an array-like object is returned
		splice: array.splice
	};
}(document, 'classList', 'addEventListener', [])
