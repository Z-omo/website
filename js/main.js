/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*****************************!*\
  !*** ./src/js/bootstrap.js ***!
  \*****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * Bootstrap JavaScript file for website.com\n *\n * @package     Website\n * @author      Colin Tester <office@z-omo.com>\n * \n * This file forms part of the installed @package and should not be copied \n * and/or distributed without the written consent from the file's author.\n *\n * @copyright: Please see: <https://en.wikipedia.org/wiki/Berne_Convention>\n *\n * This file and its @package are under version control.\n */\n__webpack_require__(/*! ../sass/bootstrap.sass */ 1);\n \nconst focus = __webpack_require__(/*! ./focus-app.js */ 6);\nfocus.init();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9qcy9ib290c3RyYXAuanM/YmUwYSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEJvb3RzdHJhcCBKYXZhU2NyaXB0IGZpbGUgZm9yIHdlYnNpdGUuY29tXG4gKlxuICogQHBhY2thZ2UgICAgIFdlYnNpdGVcbiAqIEBhdXRob3IgICAgICBDb2xpbiBUZXN0ZXIgPG9mZmljZUB6LW9tby5jb20+XG4gKiBcbiAqIFRoaXMgZmlsZSBmb3JtcyBwYXJ0IG9mIHRoZSBpbnN0YWxsZWQgQHBhY2thZ2UgYW5kIHNob3VsZCBub3QgYmUgY29waWVkIFxuICogYW5kL29yIGRpc3RyaWJ1dGVkIHdpdGhvdXQgdGhlIHdyaXR0ZW4gY29uc2VudCBmcm9tIHRoZSBmaWxlJ3MgYXV0aG9yLlxuICpcbiAqIEBjb3B5cmlnaHQ6IFBsZWFzZSBzZWU6IDxodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9CZXJuZV9Db252ZW50aW9uPlxuICpcbiAqIFRoaXMgZmlsZSBhbmQgaXRzIEBwYWNrYWdlIGFyZSB1bmRlciB2ZXJzaW9uIGNvbnRyb2wuXG4gKi9cbnJlcXVpcmUoJy4uL3Nhc3MvYm9vdHN0cmFwLnNhc3MnKTtcbiBcbmNvbnN0IGZvY3VzID0gcmVxdWlyZSgnLi9mb2N1cy1hcHAuanMnKTtcbmZvY3VzLmluaXQoKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9ib290c3RyYXAuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///0\n");

/***/ }),
/* 1 */
/*!*********************************!*\
  !*** ./src/sass/bootstrap.sass ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9zYXNzL2Jvb3RzdHJhcC5zYXNzP2Y5NmQiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zYXNzL2Jvb3RzdHJhcC5zYXNzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///1\n");

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/*!*****************************!*\
  !*** ./src/js/focus-app.js ***!
  \*****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/**\n * Focus app – mediator for website.com\n *\n * @package     Focus\n * @author      Colin Tester <office@z-omo.com>\n * \n * This file forms part of the installed @package and should not be copied \n * and/or distributed without the written consent from the file's author.\n *\n * @copyright: Please see: <https://en.wikipedia.org/wiki/Berne_Convention>\n *\n * This file and its @package are under version control.\n */\n\nconst focus = {\n\n  view: {\n    smallViewEM: 39\n  },\n\n  init: function()\n  {\n    focus.setViewParams();\n\n    if (true === focus.view.smallView)\n    {\n      focus.setJSMode();\n      focus.setupMenu();  \n    }\n  },\n\n  setViewParams: function()\n  {\n    let boundary = document.querySelector('.boundary');\n    if (!boundary) { return; }\n    \n    let compStyle = window.getComputedStyle(boundary);\n    let regexNumeric = /^\\d+/;\n    let vpWidth = Number(regexNumeric.exec(compStyle.width));\n    let vpFontSize = Number(regexNumeric.exec(compStyle.fontSize));\n    let vpMobileMax = focus.view.smallViewEM * vpFontSize;\n\n    focus.view.smallView = vpWidth < vpMobileMax;\n  },\n  \n  setJSMode: function()\n  {\n    let html = document.querySelector('html');\n    if (!html) { return; }\n    \n    html.classList.add('focus-js');\n  },\n\n  setupMenu: function()\n  {\n    let nav = document.querySelector('#menu');\n    if (!nav) { return; }\n\n    let menu = document.createElement('span');\n    nav.appendChild(menu);\n    menu.id = 'menuBtn';\n    menu.addEventListener('click', focus.onMenu);\n\n    focus.view.nav = nav;\n  },\n  \n  onMenu: function(e)\n  {\n    focus.toggleMenu();\n  },\n  \n  toggleMenu: function()\n  {\n    focus.view.nav.classList.toggle('open');\n  },\n  \n};\n\nmodule.exports = focus;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9qcy9mb2N1cy1hcHAuanM/YTMxYSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEZvY3VzIGFwcCDigJMgbWVkaWF0b3IgZm9yIHdlYnNpdGUuY29tXG4gKlxuICogQHBhY2thZ2UgICAgIEZvY3VzXG4gKiBAYXV0aG9yICAgICAgQ29saW4gVGVzdGVyIDxvZmZpY2VAei1vbW8uY29tPlxuICogXG4gKiBUaGlzIGZpbGUgZm9ybXMgcGFydCBvZiB0aGUgaW5zdGFsbGVkIEBwYWNrYWdlIGFuZCBzaG91bGQgbm90IGJlIGNvcGllZCBcbiAqIGFuZC9vciBkaXN0cmlidXRlZCB3aXRob3V0IHRoZSB3cml0dGVuIGNvbnNlbnQgZnJvbSB0aGUgZmlsZSdzIGF1dGhvci5cbiAqXG4gKiBAY29weXJpZ2h0OiBQbGVhc2Ugc2VlOiA8aHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQmVybmVfQ29udmVudGlvbj5cbiAqXG4gKiBUaGlzIGZpbGUgYW5kIGl0cyBAcGFja2FnZSBhcmUgdW5kZXIgdmVyc2lvbiBjb250cm9sLlxuICovXG5cbmNvbnN0IGZvY3VzID0ge1xuXG4gIHZpZXc6IHtcbiAgICBzbWFsbFZpZXdFTTogMzlcbiAgfSxcblxuICBpbml0OiBmdW5jdGlvbigpXG4gIHtcbiAgICBmb2N1cy5zZXRWaWV3UGFyYW1zKCk7XG5cbiAgICBpZiAodHJ1ZSA9PT0gZm9jdXMudmlldy5zbWFsbFZpZXcpXG4gICAge1xuICAgICAgZm9jdXMuc2V0SlNNb2RlKCk7XG4gICAgICBmb2N1cy5zZXR1cE1lbnUoKTsgIFxuICAgIH1cbiAgfSxcblxuICBzZXRWaWV3UGFyYW1zOiBmdW5jdGlvbigpXG4gIHtcbiAgICBsZXQgYm91bmRhcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm91bmRhcnknKTtcbiAgICBpZiAoIWJvdW5kYXJ5KSB7IHJldHVybjsgfVxuICAgIFxuICAgIGxldCBjb21wU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShib3VuZGFyeSk7XG4gICAgbGV0IHJlZ2V4TnVtZXJpYyA9IC9eXFxkKy87XG4gICAgbGV0IHZwV2lkdGggPSBOdW1iZXIocmVnZXhOdW1lcmljLmV4ZWMoY29tcFN0eWxlLndpZHRoKSk7XG4gICAgbGV0IHZwRm9udFNpemUgPSBOdW1iZXIocmVnZXhOdW1lcmljLmV4ZWMoY29tcFN0eWxlLmZvbnRTaXplKSk7XG4gICAgbGV0IHZwTW9iaWxlTWF4ID0gZm9jdXMudmlldy5zbWFsbFZpZXdFTSAqIHZwRm9udFNpemU7XG5cbiAgICBmb2N1cy52aWV3LnNtYWxsVmlldyA9IHZwV2lkdGggPCB2cE1vYmlsZU1heDtcbiAgfSxcbiAgXG4gIHNldEpTTW9kZTogZnVuY3Rpb24oKVxuICB7XG4gICAgbGV0IGh0bWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdodG1sJyk7XG4gICAgaWYgKCFodG1sKSB7IHJldHVybjsgfVxuICAgIFxuICAgIGh0bWwuY2xhc3NMaXN0LmFkZCgnZm9jdXMtanMnKTtcbiAgfSxcblxuICBzZXR1cE1lbnU6IGZ1bmN0aW9uKClcbiAge1xuICAgIGxldCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWVudScpO1xuICAgIGlmICghbmF2KSB7IHJldHVybjsgfVxuXG4gICAgbGV0IG1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbmF2LmFwcGVuZENoaWxkKG1lbnUpO1xuICAgIG1lbnUuaWQgPSAnbWVudUJ0bic7XG4gICAgbWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZvY3VzLm9uTWVudSk7XG5cbiAgICBmb2N1cy52aWV3Lm5hdiA9IG5hdjtcbiAgfSxcbiAgXG4gIG9uTWVudTogZnVuY3Rpb24oZSlcbiAge1xuICAgIGZvY3VzLnRvZ2dsZU1lbnUoKTtcbiAgfSxcbiAgXG4gIHRvZ2dsZU1lbnU6IGZ1bmN0aW9uKClcbiAge1xuICAgIGZvY3VzLnZpZXcubmF2LmNsYXNzTGlzdC50b2dnbGUoJ29wZW4nKTtcbiAgfSxcbiAgXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZvY3VzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvanMvZm9jdXMtYXBwLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///6\n");

/***/ })
/******/ ]);