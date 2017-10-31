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
'use strict';

export default {

  addClass(className, element)
  {
    if (!element) { return; }
    if (element.classList)
    {
      element.classList.add(className);
    } else {
      element.className = element.className + ' ' + className;
    }
  },

  hasClass(className, element)
  {
    return (element.classList && element.classList.contains(className));
  },

  toggleClass(className, element)
  {
    element.classList.toggle(className);
  },

  removeClass(className, element)
  {
    if (element.classList)
    {
      element.classList.remove(className);
    } else {
      element.className = element.className
        .replace( new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    if ('' === element.className) { element.removeAttribute('class'); }
  },
  
  hasAttr(attrName, element)
  {
    return element.getAttribute(attrName);
  },

  tagIS(tagName, element)
  {
    if (!element) { return; }
    return element.tagName.toLowerCase() === tagName.toLowerCase();
  },
  
  getAll(selector, element = document)
  {
    let nodes = element.querySelectorAll(selector);
    if (!nodes || 0 === nodes.length) { return; }
  
    // convert NodeList to an Array, otherwise IE throws error on forEach:
    return Array.prototype.slice.call(nodes);
  },

  add(element, container)
  {
    container.appendChild(element);
  },

  prepend(element, container)
  {
    container.insertBefore(element, container.firstChild);
  },

  parent(element, selector)
  {
    if (!element) { return; }
    let target = element;
    let found;
    let parent;
    
    do
    {
      parent = target.parentNode;
      if (!parent) { break; }

      found = !selector || this.hasClass(selector, parent);
      target = parent;
    } while (!found && parent);
  
    return parent;
  },

  viewDims(element)
  {
    let dims;

    if (!element )
    {
      dims = {
        top:    window.pageYOffset,
        width:  window.innerWidth,
        height: window.innerHeight,
        bottom: window.pageYOffset + window.innerHeight
      };

    } else {

      dims = element.getBoundingClientRect();
    }
    
    return dims;
  }
}
