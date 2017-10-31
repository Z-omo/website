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
'use strict';

import DOM from './dom-man';
import imageDims from './image-dims';

const Lazlo = {

  selectors: {
    resource:     'data-lazlo',
    resourceAttr: 'data-lazlo-attr',
    defaultAttr:  'src',
    watching:     'lazlo',
    loading:      'lazlo-loading',
    loaded:       'lazlo-loaded'
  },
  watching: [],
  loaded: [],
  viewPort: null,
  watchCount: 0,

  resetClient()
  {
    console.log('Lazlo => resetClient');
    window.removeEventListener('scroll', this.scrollHandler);
    imageDims.resetClient();
  },

  watch(elements)
  {
    if (!elements || 0 === elements.lenth) { return; }

    imageDims.setup();
    this.setupWatch();
    this.addToWatch(elements);
    this.checkView();
  },

  setupWatch()
  {
    if (this.scrollHandler) { return; }
    this.scrollHandler = this.onScroll.bind(this)
    window.addEventListener('scroll', this.scrollHandler);

    this.loadedHandler = this.onResourceLoaded.bind(this);
  },

  onScroll()
  {
    if (true === this.checking) { return; }

    setTimeout(this.checkView.bind(this), 200); // debounced.
    this.checking = true;
  },

  addToWatch(elements)
  {
    elements.forEach(element => {
      if (DOM.hasAttr(this.selectors.resource, element))
      {
        this.watching.push(element);
        this.watchCount += 1;
        DOM.addClass(this.selectors.watching, element);
      }
    });
  },

  checkView()
  {
    this.viewPort = DOM.viewDims();
    let waiting = [];

    let remaining = this.watching.filter(element => {
      return !(this.isWithinView(element) && waiting.push(element));
    });

    this.watching = remaining;
    this.checking = false;

    if (0 === waiting.length) { return; }
    this.processLoading(waiting);
  },

  isWithinView(element)
  {
    let dims = DOM.viewDims(element);
    return dims.top <= this.viewPort.height && dims.bottom >= 0;
  },

  processLoading(elements)
  {
    elements.forEach(element => {
      DOM.addClass(this.selectors.loading, element);

      let resource = element.getAttribute(this.selectors.resource);
      if (!resource) { return; }
      
      let attr = element.getAttribute(this.selectors.resourceAttr) ||   
        this.selectors.defaultAttr;
      if (this.selectors.defaultAttr === attr)
      {
        element.addEventListener('load', this.loadedHandler);
      }
      
      element.setAttribute(attr, resource);

      if (this.selectors.defaultAttr === attr)
      {
        this.prepareSrcSet(element);
      } else {
        this.setAsLoaded(element);
      }
    })
  },

  prepareSrcSet(element)
  {
    let attr = 'data-srcset';
    let srcSet = element.getAttribute(attr);
    let sources = [element];

    if (!srcSet)
    {
      let parent = DOM.parent(element, 'image');
      if (!parent) { return; }
      sources = DOM.getAll(`source[${attr}]`, parent);
      if (!sources) { return; }
    }
    
    sources.forEach(source => {
      source.setAttribute('srcset', source.getAttribute(attr));
      source.removeAttribute(attr);
    });

    if (window.picturefill)
    {
      window.picturefill({ elements: [element], reevaluate: true });
    }
  },

  onResourceLoaded(e)
  {
    let element = e.target;

    element.removeEventListener('load', this.loadedHandler);
    this.setAsLoaded(element);

    if ('IMG' === element.nodeName) { this.removeImageDims(element); }
  },

  setAsLoaded(element)
  {
    DOM.removeClass(this.selectors.loading, element);
    element.removeAttribute(this.selectors.resource);
    element.removeAttribute(this.selectors.resourceAttr);

    DOM.addClass(this.selectors.loaded, element);
    this.loaded.push(element);

    if (this.watchCount === this.loaded.length) { this.standDown(); }
  },

  removeImageDims(element)
  {
    if (!DOM.hasAttr('data-dims', element)) { return; }

    element.removeAttribute('data-dims');
    element.removeAttribute('height');
  },

  standDown()
  {
    window.removeEventListener('scroll', this.scrollHandler);
    this.scrollHandler = null;
    this.loadedHandler = null;
    console.log('Lazlo has stood down.');
  }
};

export default Lazlo
