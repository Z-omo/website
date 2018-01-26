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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Browser DOM manager: provides helper functions for DOM manipulation.
 *
 * @package     Focus-App
 * @author      Colin Tester <office@z-omo.com>
 * 
 * This file forms part of the installed @package and should not be copied 
 * and/or distributed without the written consent from the file's author.
 *
 * @copyright: Please see: <https://en.wikipedia.org/wiki/Berne_Convention>
 *
 * This file and its @package are under version control.
 */


Object.defineProperty(exports, "__esModule", {
  value: true
});
var DOM = {

  html: document.querySelector('html'),
  body: document.querySelector('body'),
  customEvents: null,

  addClass: function addClass(className, element) {
    if (!element) {
      return;
    }
    if (element.classList) {
      var classNames = className.trim().split(' ').forEach(function (name) {
        return element.classList.add(name);
      });

      // Would prefer the following but IE does not support multiple arguments.
      // element.classList.add(...classNames);
    } else {

      var _classNames = element.className ? element.className + ' ' : '';
      _classNames += className;
      element.className = _classNames;
    }
  },
  hasClass: function hasClass(className, element) {
    if (element.classList) {
      return element.classList && element.classList.contains(className);
    } else {

      var regexName = new RegExp('[\w\s]*' + className + '[\s\w]*');
      return regexName.test(element.className);
    }
  },
  toggleClass: function toggleClass(className, element) {
    element.classList.toggle(className);
  },
  removeClass: function removeClass(className, element) {
    if (!element) {
      return;
    }

    if (element.classList) {
      element.classList.remove(className);
    } else {
      element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    if ('' === element.className) {
      element.removeAttribute('class');
    }
  },
  hide: function hide(elements) {
    if (Array !== elements.constructor) {
      elements = [elements];
    }
    elements.forEach(function (e) {
      return e.style.display = 'none';
    });
  },
  show: function show(elements) {
    if (Array !== elements.constructor) {
      elements = [elements];
    }
    elements.forEach(function (e) {
      return e.style.display = '';
    });
  },
  setStyle: function setStyle(rules, element) {
    for (var prop in rules) {
      if (rules.hasOwnProperty(prop)) {
        element.style[prop] = rules[prop];
      }
    }
  },
  setAttrs: function setAttrs(attrs, element) {
    for (var prop in attrs) {
      if (attrs.hasOwnProperty(prop)) {
        element.setAttribute(prop, attrs[prop]);
      }
    }
  },
  hasAttr: function hasAttr(attrName, element) {
    return element.getAttribute(attrName);
  },
  tagIs: function tagIs(tagName, element) {
    if (!element) {
      return;
    }
    return element.tagName.toLowerCase() === tagName.toLowerCase();
  },
  getAll: function getAll(selector) {
    var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

    var nodes = element.querySelectorAll(selector);
    if (!nodes || 0 === nodes.length) {
      return;
    }

    /*
     * convert NodeList to an Array, otherwise IE throws error on a
     * subsequent forEach:
     */
    return Array.prototype.slice.call(nodes);
  },
  add: function add(element, container) {
    container.appendChild(element);
  },
  prepend: function prepend(element, container) {
    container.insertBefore(element, container.firstChild);
  },
  parent: function parent(element, selector) {
    if (!element) {
      return;
    }
    var target = element;
    var found = void 0;
    var parent = void 0;

    do {
      parent = target.parentNode;
      if (!parent) {
        break;
      }

      found = !selector || this.hasClass(selector, parent);
      target = parent;
    } while (!found && parent);

    return parent;
  },
  viewDims: function viewDims(element) {
    var dims = void 0;

    if (!element) {
      dims = {
        top: window.pageYOffset,
        width: window.innerWidth,
        height: window.innerHeight,
        bottom: window.pageYOffset + window.innerHeight
      };
    } else {

      dims = element.getBoundingClientRect();
    }

    return dims;
  },
  trigger: function trigger(eventName, element, data) {
    var event = getCustomEvent(eventName, data);
    if (!event) {
      throw new Error('Unable to trigger custom event: ' + eventName);
    }

    element.dispatchEvent(event);
  }
};

exports.default = DOM;


function getCustomEvent(eventName, data) {
  if (DOM.customEvents && DOM.customEvents[eventName]) {
    return DOM.customEvents[eventName];
  }

  var event = createCustomEvent(eventName, data);

  registerCustomEvent(eventName, event);
  return event;
}

function createCustomEvent(eventName, data) {
  if ('function' !== typeof window.CustomEvent) {
    CustomEvent.prototype = window.Event.prototype;
  }

  var event = new CustomEvent(eventName, data && { detail: data });
  return event;
}

/*
 * Polyfill code gleaned from MDN: 
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
 */
function CustomEvent(event, params) {
  params = params || {
    bubbles: false, cancelable: false, detail: undefined
  };

  var evt = document.createEvent('CustomEvent');
  evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);

  return evt;
}

function registerCustomEvent(eventName, event) {
  if (null === DOM.customEvents) {
    DOM.customEvents = {};
  }
  DOM.customEvents[eventName] = event;
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
module.exports = __webpack_require__(1);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Bootstrap JavaScript file for colintester.com
 *
 * @package     Website
 * @author      Colin Tester <office@z-omo.com>
 * 
 * This file forms part of the installed @package and should not be copied 
 * and/or distributed without the written consent from the file's author.
 *
 * @copyright: Please see: <https://en.wikipedia.org/wiki/Berne_Convention>
 *
 * This file and its @package are under version control.
 */


var _focusApp = __webpack_require__(4);

var _focusApp2 = _interopRequireDefault(_focusApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(1);
__webpack_require__(8);

_focusApp2.default.init();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Focus app – mediator for colintester.com
 *
 * @package     Focus
 * @author      Colin Tester <office@z-omo.com>
 * 
 * This file forms part of the installed @package and should not be copied 
 * and/or distributed without the written consent from the file's author.
 *
 * @copyright: Please see: <https://en.wikipedia.org/wiki/Berne_Convention>
 *
 * This file and its @package are under version control.
 */


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domMan = __webpack_require__(0);

var _domMan2 = _interopRequireDefault(_domMan);

var _Lazlo = __webpack_require__(5);

var _Lazlo2 = _interopRequireDefault(_Lazlo);

var _rwdView = __webpack_require__(7);

var _rwdView2 = _interopRequireDefault(_rwdView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var focus = {

  view: {
    smallViewEM: 39,
    scrolledClass: 'js-scrolled'
  },

  init: function init() {
    setViewParams();
    setJSMode();
    if (true === focus.view.smallView) {
      setupMobileMenu();
    }

    setupEvents();
    setupLazyLoad();
    if (false === focus.view.smallView) {
      setupRWDViews();
    }
  }
};

exports.default = focus;


function setViewParams() {
  var boundary = document.querySelector('.boundary');
  if (!boundary) {
    return;
  }

  var compStyle = window.getComputedStyle(boundary);
  var regexNumeric = /^\d+/;
  var vpWidth = Number(regexNumeric.exec(compStyle.width));
  var vpFontSize = Number(regexNumeric.exec(compStyle.fontSize));
  var vpMobileMax = focus.view.smallViewEM * vpFontSize;

  focus.view.smallView = vpWidth < vpMobileMax;
}

function setJSMode() {
  _domMan2.default.addClass('focus-js', _domMan2.default.html);
}

function setupMobileMenu() {
  var nav = document.querySelector('#menu');
  if (!nav) {
    return;
  }

  var menu = document.createElement('span');
  nav.appendChild(menu);
  menu.id = 'menuBtn';
  menu.addEventListener('click', function () {
    return _domMan2.default.toggleClass('open', focus.view.nav);
  });

  // let home = document.createElement('span');
  // nav.appendChild(home);
  // DOM.addClass('home-link', home);
  // home.addEventListener('click', () => window.location.href = './');

  focus.view.nav = nav;
}

function setupEvents() {
  window.addEventListener('scroll', onScroll);
}

function onScroll() {
  if (!focus.view.scrolling) {
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(requestScrollCheck);
    } else {
      setTimeout(requestScrollCheck, 200);
    }
  }

  focus.view.scrolling = true;
}

function requestScrollCheck() {
  setScrollState();
  focus.view.scrolling = false;
}

function setScrollState() {
  var scroll = window.pageYOffset;

  if (0 === scroll) {
    _domMan2.default.removeClass(focus.view.scrolledClass, _domMan2.default.html);
    focus.view.scrolled = false;
    return;
  }

  if (!focus.view.scrolled) {
    _domMan2.default.addClass(focus.view.scrolledClass, _domMan2.default.html);
  }

  focus.view.scrolled = true;
}

function setupLazyLoad() {
  var toLoad = _domMan2.default.getAll('[data-lazlo]');
  if (!toLoad) {
    return;
  }

  _Lazlo2.default.watch(toLoad);
}

function setupRWDViews() {
  var rwd = _domMan2.default.getAll('.rwd-view');
  if (!rwd) {
    return;
  }

  _rwdView2.default.setup(rwd, focus.view.smallView);
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * ES6 class to handle the lazy loading of content.
 *
 * @package     Focus
 * @author      Colin Tester <office@z-omo.com>
 * 
 * This file forms part of the installed @package and should not be copied 
 * and/or distributed without the written consent from the file's author.
 *
 * @copyright: Please see: <https://en.wikipedia.org/wiki/Berne_Convention>
 *
 * This file and its @package are under version control.
 */


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domMan = __webpack_require__(0);

var _domMan2 = _interopRequireDefault(_domMan);

var _imageDims = __webpack_require__(6);

var _imageDims2 = _interopRequireDefault(_imageDims);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Lazlo = {

  devMode: false,

  selectors: {
    resource: 'data-lazlo',
    legacy: 'data-original',
    resourceAttr: 'data-lazlo-attr',
    defaultAttr: 'src',
    watching: 'lazlo',
    loading: 'lazlo-loading',
    loaded: 'lazlo-loaded',
    completed: 'lazlo-completed'
  },

  watching: [],
  loaded: [],
  viewPort: null,
  watchCount: 0,

  watch: function watch(elements) {
    this.resetState();

    elements = elements || this.getResources();
    if (!elements || 0 === elements.length) {
      return;
    }

    _imageDims2.default.setup();
    this.setupWatch();
    this.addToWatch(elements);
    this.checkView();
  },


  resetState: function resetState() {
    this.watching = [];
    this.loaded = [];
    this.watchCount = 0;
  },

  getResources: function getResources() {
    var selector = '[' + this.selectors.resource + ']';

    // legacy support:
    if (this.selectors.legacy) {
      selector += ',[' + this.selectors.legacy + ']';
    }

    var toWatch = _domMan2.default.getAll(selector);
    return toWatch;
  },

  setupWatch: function setupWatch() {
    if (this.scrollHandler) {
      return;
    }
    this.scrollHandler = this.onScroll.bind(this);
    window.addEventListener('scroll', this.scrollHandler);

    this.loadedHandler = this.onResourceLoaded.bind(this);
  },
  onScroll: function onScroll() {
    if (true === this.checking) {
      return;
    }

    setTimeout(this.checkView.bind(this), 200); // debounced.
    this.checking = true;
  },
  addToWatch: function addToWatch(elements) {
    this.watching = elements.map(this.prepareLazloItem);
    this.watchCount = this.watching.length;
  },


  prepareLazloItem: function prepareLazloItem(item) {
    _domMan2.default.addClass(Lazlo.selectors.watching, item);
    return item;
  },

  checkView: function checkView() {
    var _this = this;

    this.viewPort = _domMan2.default.viewDims();
    var waiting = [];

    var remaining = this.watching.filter(function (element) {
      return !(_this.isWithinView(element) && waiting.push(element));
    });

    this.watching = remaining;
    this.checking = false;

    if (true === Lazlo.devMode) {
      console.log('Lazlo status: watchCount: %s, waiting: %s, remaining: %s', this.watchCount, waiting.length, remaining.length);
    }

    if (this.watchCount === this.loaded.length) {
      this.standDown();
    }

    if (0 === waiting.length) {
      return;
    }
    this.processLoading(waiting);
  },
  isWithinView: function isWithinView(element) {
    var dims = _domMan2.default.viewDims(element);

    // is element visible (width and height) and within the view:
    return 0 < dims.width &&
    //0 < dims.height &&
    dims.top <= this.viewPort.height && dims.bottom >= 0;
  },
  processLoading: function processLoading(elements) {
    var _this2 = this;

    var selectors = this.selectors;
    this.rwdImages = []; // reset for counting

    elements.forEach(function (element) {
      _domMan2.default.addClass(selectors.loading, element);

      var resource = element.getAttribute(selectors.resource) || selectors.legacy && element.getAttribute(selectors.legacy);
      if (!resource) {
        return;
      }

      if ('noscript' === resource) {
        _this2.processNoscriptLoading(element);
      } else {
        _this2.processElementLoading(element, resource);
      }
    });

    if (0 < this.rwdImages.length && window.picturefill) {
      window.picturefill({ elements: this.rwdImages, reevaluate: true });
    }
  },


  processNoscriptLoading: function processNoscriptLoading(element) {
    var noscript = element.querySelector('noscript');
    if (!noscript) {
      return;
    }

    var content = noscript.textContent;
    noscript.insertAdjacentHTML('beforebegin', content);

    var rwdImages = _domMan2.default.getAll('img[srcset], picture img', element);
    if (rwdImages) {
      this.rwdImages = this.rwdImages.concat(rwdImages);
    }

    this.setAsLoaded(element);
  },

  processElementLoading: function processElementLoading(element, resource) {
    var selectors = this.selectors;
    var attr = element.getAttribute(selectors.resourceAttr) || selectors.defaultAttr;

    if (selectors.defaultAttr === attr) {
      element.addEventListener('load', this.loadedHandler);
    }

    element.setAttribute(attr, resource);

    if (selectors.defaultAttr === attr && _domMan2.default.tagIs('img', element)) {
      this.prepareSrcSet(element);
    } else {
      this.setAsLoaded(element);
    }
  },
  prepareSrcSet: function prepareSrcSet(element) {
    var attr = 'data-srcset';
    var srcSet = element.getAttribute(attr);
    var sources = [element];

    if (!srcSet) {
      var parent = _domMan2.default.parent(element, 'image');
      if (!parent) {
        return;
      }
      sources = _domMan2.default.getAll('source[' + attr + ']', parent);
      if (!sources) {
        return;
      }
    }

    sources.forEach(function (source) {
      source.setAttribute('srcset', source.getAttribute(attr));
      source.removeAttribute(attr);
    });

    this.rwdImages.push(element);
  },
  onResourceLoaded: function onResourceLoaded(e) {
    var element = e.target;

    element.removeEventListener('load', this.loadedHandler);
    this.setAsLoaded(element);

    //if (DOM.tagIs('img', element)) { this.removeImageDims(element); }
  },
  setAsLoaded: function setAsLoaded(element) {
    var selectors = this.selectors;

    _domMan2.default.removeClass(selectors.loading, element);
    element.removeAttribute(selectors.resource);
    element.removeAttribute(selectors.resourceAttr);

    if (selectors.legacy) {
      element.removeAttribute(selectors.legacy);
    }

    _domMan2.default.addClass(selectors.loaded, element);
    this.loaded.push(element);

    var parent = _domMan2.default.parent(element);
    if (parent) {
      _domMan2.default.addClass(selectors.completed, parent);
    }
  },
  removeImageDims: function removeImageDims(element) {
    if (!_domMan2.default.hasAttr('data-dims', element)) {
      return;
    }

    element.removeAttribute('data-dims');
    element.removeAttribute('height');
  },
  standDown: function standDown() {
    window.removeEventListener('scroll', this.scrollHandler);
    this.scrollHandler = null;
    this.loadedHandler = null;

    if (true === Lazlo.devMode) {
      console.log('Lazlo has stood down.');
    }
  }
};

exports.default = Lazlo;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Module to handle exact dimensions of image tags.
 *
 * @package     ZLibrary
 * @author      Colin Tester <office@z-omo.com>
 * 
 * This file forms part of the installed @package and should not be copied 
 * and/or distributed without the written consent from the file's author.
 *
 * @copyright: Please see: <https://en.wikipedia.org/wiki/Berne_Convention>
 *
 * This file and its @package are under version control.
 */
"user strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domMan = __webpack_require__(0);

var _domMan2 = _interopRequireDefault(_domMan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var imgDims = {

  resizing: false,

  selectors: {
    attr: 'data-dims'
  },

  setup: function setup() {
    if (!this.resizeHandler) {
      this.resizeHandler = onResize;
      window.addEventListener('resize', this.resizeHandler);
    }

    processDims();
  }
};

exports.default = imgDims;


function onResize() {
  if (true === imgDims.resizing) {
    return;
  }

  setTimeout(processDims, 160); // debounced.
  imgDims.resizing = true;
}

function processDims() {
  var images = findImages();
  if (!images || 0 === images.length) {
    return;
  }

  var imageData = getImageData(images);
  setImageDims(imageData);
  imgDims.resizing = false;
}

function findImages() {
  var images = _domMan2.default.getAll('img[' + imgDims.selectors.attr + ']');
  return images;
}

function getImageData(imgs) {
  var imageData = imgs.map(function (img) {
    var dims = getDefinedDims(img);
    addComputedDims(dims);
    return dims;
  });

  return imageData;
}

function getDefinedDims(img) {
  var values = img.getAttribute(imgDims.selectors.attr).split(',');
  var dims = {
    element: img,
    defWidth: Number(values[0]),
    defHeight: Number(values[1])
  };

  return dims;
}

function addComputedDims(dims) {
  dims.parent = _domMan2.default.parent(dims.element);
  var rect = dims.parent.getBoundingClientRect();

  dims.width = rect.width > dims.defWidth ? dims.defWidth : Math.round(rect.width);

  dims.ratio = Number((dims.defHeight / dims.defWidth).toFixed(2));
  dims.height = Math.floor(dims.ratio * dims.width);
}

function setImageDims(imageData) {
  imageData.forEach(function (image) {
    // DOM.setStyle({
    //   width: image.width + 'px',
    //   height: image.height + 'px'
    // }, image.element);

    _domMan2.default.setAttrs({
      width: image.width,
      height: image.height
    }, image.element);
  });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Module to handle input and control of RWD frame views.
 *
 * @package     Focus-App
 * @author      Colin Tester <office@z-omo.com>
 * 
 * This file forms part of the installed @package and should not be copied 
 * and/or distributed without the written consent from the file's author.
 *
 * @copyright: Please see: <https://en.wikipedia.org/wiki/Berne_Convention>
 *
 * This file and its @package are under version control.
 */
'user strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domMan = __webpack_require__(0);

var _domMan2 = _interopRequireDefault(_domMan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RWDView = {
  viewModes: ['rwd-mobile', 'rwd-tablet', 'rwd-desktop'],

  selectors: {
    container: 'rwd-view',
    controls: 'rwd-view-controls',
    active: 'active',
    device: 'rwd-device',
    frame: 'rwd-view-frame',
    index: 'data-index',
    frameURL: 'data-src'
  },

  setup: function setup(container) {
    RWDView.container = container;
    setupViewControls();
    //setupView();
  }
};

function buildViewControls(container) {
  var controls = document.createElement('div');
  _domMan2.default.addClass(RWDView.selectors.controls, controls);

  RWDView.viewModes.forEach(function (mode, index) {
    var button = document.createElement('button');
    setButtonText(mode, button);
    button.setAttribute('data-index', index);
    _domMan2.default.add(button, controls);

    if (_domMan2.default.hasClass(mode, container)) {
      activateControl(button);
    }
  });

  _domMan2.default.prepend(controls, container);
}

function setupViewControls() {
  RWDView.container.forEach(function (view) {
    buildViewControls(view);
    setupRWDTitle(view);
    view.addEventListener('click', onSelectControl);
  });
}

function setButtonText(text, button) {
  text = text.replace('rwd-', '');
  text = text.toLowerCase().replace(/\b[a-z]/g, function (letter) {
    return letter.toUpperCase();
  });
  button.innerHTML = text;
}

function onSelectControl(e) {
  var control = e.target;
  if ('button' !== control.tagName.toLowerCase()) {
    return;
  }

  e.stopPropagation();
  var modeIndex = Number(control.getAttribute(RWDView.selectors.index));

  //let view = getViewContainer(control);
  var view = _domMan2.default.parent(control, RWDView.selectors.container);
  if (view) {
    setViewMode(view, modeIndex);
  }
  activateControl(control);
}

function activateControl(control) {
  if (RWDView.activeControl) {
    _domMan2.default.removeClass(RWDView.selectors.active, RWDView.activeControl);
  }

  _domMan2.default.addClass(RWDView.selectors.active, control);
  RWDView.activeControl = control;
}

function setupRWDTitle(view) {
  var box = _domMan2.default.parent(view, 'boxed');
  if (!box) {
    return;
  }

  var hilite = box.querySelector('.hilite');
  if (!hilite) {
    return;
  }

  hilite.textContent = '3';
  box.querySelector('.plural').textContent = 's';
}

function setViewMode(view, index) {
  var mode = RWDView.viewModes[index];
  if (!mode) {
    return;
  }

  resetViewMode(view);
  _domMan2.default.addClass(mode, view);
}

function resetViewMode(view) {
  RWDView.viewModes.forEach(function (mode) {
    if (_domMan2.default.hasClass(mode, view)) {
      _domMan2.default.removeClass(mode, view);
    }
  });
}

// function buildFrame(element)
// {
//   let device = getViewDevice(element);
//   if (!device) { device = element; }

//   let frame = document.createElement('iframe');
//   DOM.add(frame, device);
//   DOM.addClass(RWDView.selectors.frame, frame);

//   return frame;
// }

// function getViewDevice(view) {
//   return view.querySelector('.' + RWDView.selectors.device);
// }

// @TODO: rewrite so that element passed could be identified as container.

// function getViewFrame(element)
// {
//   let frame = element.querySelector('.' + RWDView.selectors.frame);
//   //if (!frame) { frame = buildFrame(element); }
//   return frame;
// }


// function setupView()
// {
//   RWDView.container.forEach(function(view) {
//     let frame = getViewFrame(view);
//     if (!frame) { return; }

//     console.log('frame: ', frame);
//     let barWidth = frame.offsetWidth - frame.clientWidth;
//     console.log('barWidth: ', barWidth);

//     if (0 < barWidth)
//     {
//       let device = getViewDevice(view);
//       if (!device) { return; }

//       let frameWidth = 100 * ((frame.offsetWidth + barWidth) / device.offsetWidth);
//       //frame.setAttribute('style', 'width: ' + frameWidth + '%;');
//     }
//     // let url = view.getAttribute(RWDView.selectors.frameURL);
//     // if (!url) { return; }

//     // frame.setAttribute('src', url);    
//   });
//}

// function setMobileAgent(targetWindow)
// {
//   let agent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.0 Mobile/14G60 Safari/602.1';
//   if (agent === targetWindow.parent.navigator.userAgent) { return; }

//   let agentProp = { get: function(){ return agent; }};

//   try {
//     Object.defineProperty(targetWindow.parent.navigator, 'userAgent', agentProp);
//   } catch (e) {
//     targetWindow.parent.navigator = Object.create(navigator, { userAgent: agentProp });
//   }
//}

exports.default = RWDView;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! picturefill - v3.0.2 - 2016-02-12
 * https://scottjehl.github.io/picturefill/
 * Copyright (c) 2016 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
 */
/*! Gecko-Picture - v1.0
 * https://github.com/scottjehl/picturefill/tree/3.0/src/plugins/gecko-picture
 * Firefox's early picture implementation (prior to FF41) is static and does
 * not react to viewport changes. This tiny module fixes this.
 */
!function(e){var t=navigator.userAgent;e.HTMLPictureElement&&/ecko/.test(t)&&t.match(/rv\:(\d+)/)&&RegExp.$1<45&&addEventListener("resize",function(){var t,n=document.createElement("source"),r=function(e){var t,r,i=e.parentNode;"PICTURE"===i.nodeName.toUpperCase()?(t=n.cloneNode(),i.insertBefore(t,i.firstElementChild),setTimeout(function(){i.removeChild(t)})):(!e._pfLastSize||e.offsetWidth>e._pfLastSize)&&(e._pfLastSize=e.offsetWidth,r=e.sizes,e.sizes+=",100vw",setTimeout(function(){e.sizes=r}))},i=function(){var e,t=document.querySelectorAll("picture > img, img[srcset][sizes]");for(e=0;e<t.length;e++)r(t[e])},s=function(){clearTimeout(t),t=setTimeout(i,99)},a=e.matchMedia&&matchMedia("(orientation: landscape)"),o=function(){s(),a&&a.addListener&&a.addListener(s)};return n.srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",/^[c|i]|d$/.test(document.readyState||"")?o():document.addEventListener("DOMContentLoaded",o),s}())}(window),/*! Picturefill - v3.0.2
 * http://scottjehl.github.io/picturefill
 * Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt;
 *  License: MIT
 */
function(i,s,a){"use strict";function o(e){return" "===e||"\t"===e||"\n"===e||"\f"===e||"\r"===e}function c(){N=!1,O=i.devicePixelRatio,W={},B={},b.DPR=O||1,U.width=Math.max(i.innerWidth||0,z.clientWidth),U.height=Math.max(i.innerHeight||0,z.clientHeight),U.vw=U.width/100,U.vh=U.height/100,A=[U.height,U.width,O].join("-"),U.em=b.getEmValue(),U.rem=U.em}function u(e,t,n,r){var i,s,a,o;return"saveData"===T.algorithm?e>2.7?o=n+1:(s=t-n,i=Math.pow(e-.6,1.5),a=s*i,r&&(a+=.1*i),o=e+a):o=n>1?Math.sqrt(e*t):e,o>n}function l(e){var t,n=b.getSet(e),r=!1;"pending"!==n&&(r=A,n&&(t=b.setRes(n),b.applySetCandidate(t,e))),e[b.ns].evaled=r}function d(e,t){return e.res-t.res}function f(e,t,n){var r;return!n&&t&&(n=e[b.ns].sets,n=n&&n[n.length-1]),r=h(t,n),r&&(t=b.makeUrl(t),e[b.ns].curSrc=t,e[b.ns].curCan=r,r.res||Z(r,r.set.sizes)),r}function h(e,t){var n,r,i;if(e&&t)for(i=b.parseSet(t),e=b.makeUrl(e),n=0;n<i.length;n++)if(e===b.makeUrl(i[n].url)){r=i[n];break}return r}function p(e,t){var n,r,i,s,a=e.getElementsByTagName("source");for(n=0,r=a.length;n<r;n++)i=a[n],i[b.ns]=!0,(s=i.getAttribute("srcset"))&&t.push({srcset:s,media:i.getAttribute("media"),type:i.getAttribute("type"),sizes:i.getAttribute("sizes")})}function m(e,t){function n(t){var n,r=t.exec(e.substring(d));if(r)return n=r[0],d+=n.length,n}function r(){var e,n,r,a,o,c,u,l,d,h=!1,p={};for(a=0;a<s.length;a++)o=s[a],c=o[o.length-1],u=o.substring(0,o.length-1),l=parseInt(u,10),d=parseFloat(u),G.test(u)&&"w"===c?((e||n)&&(h=!0),0===l?h=!0:e=l):K.test(u)&&"x"===c?((e||n||r)&&(h=!0),d<0?h=!0:n=d):G.test(u)&&"h"===c?((r||n)&&(h=!0),0===l?h=!0:r=l):h=!0;h||(p.url=i,e&&(p.w=e),n&&(p.d=n),r&&(p.h=r),r||n||e||(p.d=1),1===p.d&&(t.has1x=!0),p.set=t,f.push(p))}for(var i,s,a,c,u,l=e.length,d=0,f=[];;){if(n(V),d>=l)return f;i=n(Q),s=[],","===i.slice(-1)?(i=i.replace(F,""),r()):function(){for(n(q),a="",c="in descriptor";;){if(u=e.charAt(d),"in descriptor"===c)if(o(u))a&&(s.push(a),a="",c="after descriptor");else{if(","===u)return d+=1,a&&s.push(a),void r();if("("===u)a+=u,c="in parens";else{if(""===u)return a&&s.push(a),void r();a+=u}}else if("in parens"===c)if(")"===u)a+=u,c="in descriptor";else{if(""===u)return s.push(a),void r();a+=u}else if("after descriptor"===c)if(o(u));else{if(""===u)return void r();c="in descriptor",d-=1}d+=1}}()}}function v(e){var t,n,r,i,s,a,c=/^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,u=/^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;for(n=function(e){function t(){i&&(s.push(i),i="")}function n(){s[0]&&(a.push(s),s=[])}for(var r,i="",s=[],a=[],c=0,u=0,l=!1;;){if(""===(r=e.charAt(u)))return t(),n(),a;if(l){if("*"===r&&"/"===e[u+1]){l=!1,u+=2,t();continue}u+=1}else{if(o(r)){if(e.charAt(u-1)&&o(e.charAt(u-1))||!i){u+=1;continue}if(0===c){t(),u+=1;continue}r=" "}else if("("===r)c+=1;else if(")"===r)c-=1;else{if(","===r){t(),n(),u+=1;continue}if("/"===r&&"*"===e.charAt(u+1)){l=!0,u+=2;continue}}i+=r,u+=1}}}(e),r=n.length,t=0;t<r;t++)if(i=n[t],s=i[i.length-1],function(e){return!!(c.test(e)&&parseFloat(e)>=0)||(!!u.test(e)||("0"===e||"-0"===e||"+0"===e))}(s)){if(a=s,i.pop(),0===i.length)return a;if(i=i.join(" "),b.matchesMedia(i))return a}return"100vw"}s.createElement("picture");var g,w,A,b={},y=!1,E=function(){},C=s.createElement("img"),S=C.getAttribute,x=C.setAttribute,L=C.removeAttribute,z=s.documentElement,M={},T={algorithm:""},R=navigator.userAgent,P=/rident/.test(R)||/ecko/.test(R)&&R.match(/rv\:(\d+)/)&&RegExp.$1>35,I="currentSrc",H=/\s+\+?\d+(e\d+)?w/,_=/(\([^)]+\))?\s*(.+)/,k=i.picturefillCFG,D="font-size:100%!important;",N=!0,W={},B={},O=i.devicePixelRatio,U={px:1,in:96},$=s.createElement("a"),j=!1,q=/^[ \t\n\r\u000c]+/,V=/^[, \t\n\r\u000c]+/,Q=/^[^ \t\n\r\u000c]+/,F=/[,]+$/,G=/^\d+$/,K=/^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,Y=function(e,t,n,r){e.addEventListener?e.addEventListener(t,n,r||!1):e.attachEvent&&e.attachEvent("on"+t,n)},J=function(e){var t={};return function(n){return n in t||(t[n]=e(n)),t[n]}},X=function(){var e=/^([\d\.]+)(em|vw|px)$/,t=function(){for(var e=arguments,t=0,n=e[0];++t in e;)n=n.replace(e[t],e[++t]);return n},n=J(function(e){return"return "+t((e||"").toLowerCase(),/\band\b/g,"&&",/,/g,"||",/min-([a-z-\s]+):/g,"e.$1>=",/max-([a-z-\s]+):/g,"e.$1<=",/calc([^)]+)/g,"($1)",/(\d+[\.]*[\d]*)([a-z]+)/g,"($1 * e.$2)",/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi,"")+";"});return function(t,r){var i;if(!(t in W))if(W[t]=!1,r&&(i=t.match(e)))W[t]=i[1]*U[i[2]];else try{W[t]=new Function("e",n(t))(U)}catch(e){}return W[t]}}(),Z=function(e,t){return e.w?(e.cWidth=b.calcListLength(t||"100vw"),e.res=e.w/e.cWidth):e.res=e.d,e},ee=function(e){if(y){var t,n,r,i=e||{};if(i.elements&&1===i.elements.nodeType&&("IMG"===i.elements.nodeName.toUpperCase()?i.elements=[i.elements]:(i.context=i.elements,i.elements=null)),t=i.elements||b.qsa(i.context||s,i.reevaluate||i.reselect?b.sel:b.selShort),r=t.length){for(b.setupRun(i),j=!0,n=0;n<r;n++)b.fillImg(t[n],i);b.teardownRun(i)}}};i.console&&console.warn,I in C||(I="src"),M["image/jpeg"]=!0,M["image/gif"]=!0,M["image/png"]=!0,M["image/svg+xml"]=s.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),b.ns=("pf"+(new Date).getTime()).substr(0,9),b.supSrcset="srcset"in C,b.supSizes="sizes"in C,b.supPicture=!!i.HTMLPictureElement,b.supSrcset&&b.supPicture&&!b.supSizes&&function(e){C.srcset="data:,a",e.src="data:,a",b.supSrcset=C.complete===e.complete,b.supPicture=b.supSrcset&&b.supPicture}(s.createElement("img")),b.supSrcset&&!b.supSizes?function(){var e="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",t=s.createElement("img"),n=function(){2===t.width&&(b.supSizes=!0),w=b.supSrcset&&!b.supSizes,y=!0,setTimeout(ee)};t.onload=n,t.onerror=n,t.setAttribute("sizes","9px"),t.srcset=e+" 1w,data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw== 9w",t.src=e}():y=!0,b.selShort="picture>img,img[srcset]",b.sel=b.selShort,b.cfg=T,b.DPR=O||1,b.u=U,b.types=M,b.setSize=E,b.makeUrl=J(function(e){return $.href=e,$.href}),b.qsa=function(e,t){return"querySelector"in e?e.querySelectorAll(t):[]},b.matchesMedia=function(){return i.matchMedia&&(matchMedia("(min-width: 0.1em)")||{}).matches?b.matchesMedia=function(e){return!e||matchMedia(e).matches}:b.matchesMedia=b.mMQ,b.matchesMedia.apply(this,arguments)},b.mMQ=function(e){return!e||X(e)},b.calcLength=function(e){var t=X(e,!0)||!1;return t<0&&(t=!1),t},b.supportsType=function(e){return!e||M[e]},b.parseSize=J(function(e){var t=(e||"").match(_);return{media:t&&t[1],length:t&&t[2]}}),b.parseSet=function(e){return e.cands||(e.cands=m(e.srcset,e)),e.cands},b.getEmValue=function(){var e;if(!g&&(e=s.body)){var t=s.createElement("div"),n=z.style.cssText,r=e.style.cssText;t.style.cssText="position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",z.style.cssText=D,e.style.cssText=D,e.appendChild(t),g=t.offsetWidth,e.removeChild(t),g=parseFloat(g,10),z.style.cssText=n,e.style.cssText=r}return g||16},b.calcListLength=function(e){if(!(e in B)||T.uT){var t=b.calcLength(v(e));B[e]=t||U.width}return B[e]},b.setRes=function(e){var t;if(e){t=b.parseSet(e);for(var n=0,r=t.length;n<r;n++)Z(t[n],e.sizes)}return t},b.setRes.res=Z,b.applySetCandidate=function(e,t){if(e.length){var n,r,i,s,a,o,c,l,h,p=t[b.ns],m=b.DPR;if(o=p.curSrc||t[I],c=p.curCan||f(t,o,e[0].set),c&&c.set===e[0].set&&((h=P&&!t.complete&&c.res-.1>m)||(c.cached=!0,c.res>=m&&(a=c))),!a)for(e.sort(d),s=e.length,a=e[s-1],r=0;r<s;r++)if(n=e[r],n.res>=m){i=r-1,a=e[i]&&(h||o!==b.makeUrl(n.url))&&u(e[i].res,n.res,m,e[i].cached)?e[i]:n;break}a&&(l=b.makeUrl(a.url),p.curSrc=l,p.curCan=a,l!==o&&b.setSrc(t,a),b.setSize(t))}},b.setSrc=function(e,t){var n;e.src=t.url,"image/svg+xml"===t.set.type&&(n=e.style.width,e.style.width=e.offsetWidth+1+"px",e.offsetWidth+1&&(e.style.width=n))},b.getSet=function(e){var t,n,r,i=!1,s=e[b.ns].sets;for(t=0;t<s.length&&!i;t++)if(n=s[t],n.srcset&&b.matchesMedia(n.media)&&(r=b.supportsType(n.type))){"pending"===r&&(n=r),i=n;break}return i},b.parseSets=function(e,t,n){var r,i,s,a,o=t&&"PICTURE"===t.nodeName.toUpperCase(),c=e[b.ns];(void 0===c.src||n.src)&&(c.src=S.call(e,"src"),c.src?x.call(e,"data-pfsrc",c.src):L.call(e,"data-pfsrc")),(void 0===c.srcset||n.srcset||!b.supSrcset||e.srcset)&&(r=S.call(e,"srcset"),c.srcset=r,a=!0),c.sets=[],o&&(c.pic=!0,p(t,c.sets)),c.srcset?(i={srcset:c.srcset,sizes:S.call(e,"sizes")},c.sets.push(i),(s=(w||c.src)&&H.test(c.srcset||""))||!c.src||h(c.src,i)||i.has1x||(i.srcset+=", "+c.src,i.cands.push({url:c.src,d:1,set:i}))):c.src&&c.sets.push({srcset:c.src,sizes:null}),c.curCan=null,c.curSrc=void 0,c.supported=!(o||i&&!b.supSrcset||s&&!b.supSizes),a&&b.supSrcset&&!c.supported&&(r?(x.call(e,"data-pfsrcset",r),e.srcset=""):L.call(e,"data-pfsrcset")),c.supported&&!c.srcset&&(!c.src&&e.src||e.src!==b.makeUrl(c.src))&&(null===c.src?e.removeAttribute("src"):e.src=c.src),c.parsed=!0},b.fillImg=function(e,t){var n,r=t.reselect||t.reevaluate;e[b.ns]||(e[b.ns]={}),n=e[b.ns],(r||n.evaled!==A)&&(n.parsed&&!t.reevaluate||b.parseSets(e,e.parentNode,t),n.supported?n.evaled=A:l(e))},b.setupRun=function(){j&&!N&&O===i.devicePixelRatio||c()},b.supPicture?(ee=E,b.fillImg=E):function(){var e,t=i.attachEvent?/d$|^c/:/d$|^c|^i/,n=function(){var i=s.readyState||"";r=setTimeout(n,"loading"===i?200:999),s.body&&(b.fillImgs(),(e=e||t.test(i))&&clearTimeout(r))},r=setTimeout(n,s.body?9:99),a=z.clientHeight,o=function(){N=Math.max(i.innerWidth||0,z.clientWidth)!==U.width||z.clientHeight!==a,a=z.clientHeight,N&&b.fillImgs()};Y(i,"resize",function(e,t){var n,r,i=function(){var s=new Date-r;s<t?n=setTimeout(i,t-s):(n=null,e())};return function(){r=new Date,n||(n=setTimeout(i,t))}}(o,99)),Y(s,"readystatechange",n)}(),b.picturefill=ee,b.fillImgs=ee,b.teardownRun=E,ee._=b,i.picturefillCFG={pf:b,push:function(e){var t=e.shift();"function"==typeof b[t]?b[t].apply(b,e):(T[t]=e[0],j&&b.fillImgs({reselect:!0}))}};for(;k&&k.length;)i.picturefillCFG.push(k.shift());i.picturefill=ee,"object"==typeof e&&"object"==typeof e.exports?e.exports=ee:void 0!==(r=function(){return ee}.call(t,n,t,e))&&(e.exports=r),b.supPicture||(M["image/webp"]=function(e,t){var n=new i.Image;return n.onerror=function(){M[e]=!1,ee()},n.onload=function(){M[e]=1===n.width,ee()},n.src=t,"pending"}("image/webp","data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))}(window,document)}]);