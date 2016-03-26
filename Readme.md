# Scoped QuerySelectorAll

A replacement for querySelectorAll, that allows scoped queries like popular libraries. Only 735 bytes minimized (402 bytes gzipped) 

## Usage

```javascript
// equal to document.querySelectorAll('.myclass')
var results = query('.myclass');

// scoped to a particular element
var results = query('.myclass', parentElement);

// Supports direct child selector from the scoped element, this will select all divs that are immediate children
var results = query('> div', parentElement);
```

## Install

The module works as CommonJS module, AMD module or as a global variable. It is available from npm, bower or you can add the file in the dist folder directly to the page and use it as a global variable.

```bat
// npm
npm install scoped-queryselectorall
// bower
bower install scoped-queryselectorall
// global
lski.query
```

## Why 

`Element.querySelectorAll` probably does not work the way you think it does as it behaves differently to popular libraries such as jQuery. Imagine the following situation:

```html
<body>
	<div id="parentElement">
		<div class="outerChild">
			<div class="innerChild">
			</div>
		</div>
	</div>
</body>
```

```javascript
var parentElement = document.getElementById('parentElement');
```

When using `$('div div', parentElement)` or `$(parentElement).find('div div')` the library will look for any div elements that are descendants of another div that is also a descendant of `parentElement`. This seems logical and would result in the single innerDiv div being found.

However `parentElement.querySelectorAll('div div')` doesnt do that, it looks for ANY div inside of a div throughout the document, then excludes those divs that are not descendants of the parentElement. Meaning that both the outerDiv and the innerDiv are returned, as the outerDiv also has a div as a parent, even though thats the parentElement itself.

## Build

To build the distribution files, at the command line follow run the following commands. The first command installs required node modules if not already loaded and then run the build.

```bat
npm install
npm run build
```

## Test

To run the tests in the browser, at the command line follow run the following commands. The first command installs required node modules if not already loaded and then open a browser and run the tests.

```bat
npm install
npm test
```

## Notes

This is a very simple API to patch the unexpected behaviour with `Element.querySelectorAll` and it uses `document.querySeletorAll()` internally so you are limited to the same selectors as you would have natively in the browser.

It does not patch complex selectors missing in earlier browsers (e.g. IE8). If you require a selector library that shims those selectors I recommend [Sizzle](https://sizzlejs.com/) which is the selector library used in jQuery (although doesnt have any dependencies on jQuery) and has amazing support for older browsers.