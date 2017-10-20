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

const DOM = {

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
  },
  
  tagIS(tagName, element)
  {
    if (!element) { return; }
    return element.tagName.toLowerCase() === tagName.toLowerCase();
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

      found = !selector || DOM.hasClass(selector, parent);
      target = parent;
    } while (!found && parent);
  
    return parent;
  }
};

export default DOM;
