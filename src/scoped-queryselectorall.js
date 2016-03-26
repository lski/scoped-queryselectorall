/*! scoped-queryselectorall */
/* global define */
(function(root, factory) {

	"use strict";

	if (typeof define === 'function' && define.amd) {

		define([], function() {
			return (root.lski = root.lski || {}).query = factory();
		});
	}
	else if (typeof module === 'object' && module.exports) {

		module.exports = factory();
	}
	else {
		(root.lski = root.lski || {}).query = factory();
	}

} (this, function() {

	"use strict";

    var count = 1,
        seed = new Date().getTime();

    return query;
	
	/**
	 * A scope-able querySelectorAll 
	 * selector
	 * selector, element
	 */
	function query(selector) {
		
		var results = [],
			secondArg = arguments[1];
		
		// If not a scoped element (undefined or null)
        if (secondArg == null) {
			
            results = document.querySelectorAll(selector);
        }
		// If second arg is an element then use that to scope the query
		else if(secondArg instanceof Element) {
			
			var element = secondArg;

			// Create a unique name/value pair so there are no colisions
			var id = _createSelectorAttr();

			// Add a searchable element attribute
			element.setAttribute(id.name, id.value);

			// Query using the new attribute as the scope
			results = element.querySelectorAll('[' + id.name + '="' + id.value + '"] ' + selector);

			// Clean up the element
			element.removeAttribute(id.name);
		}

        return results;
    }

	/**
	 * 
	 */
	function _createSelectorAttr() {
		// create new info for next element (incrementing count)
		return {
			name: 'data-' + seed + '-selector-id',
			value: count++
		};
	};
	
}))