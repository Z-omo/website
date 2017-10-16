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

  addClass: function(className, element)
  {
    if (!element) { return; }
    element.classList.add(className);
  },

  hasClass: function(className, element)
  {
    return (element.classList && element.classList.contains(className));
  },

  toggleClass: function(className, element)
  {
    element.classList.toggle(className);
  },

  removeClass: function(className, element)
  {
    element.classList.remove(className);
  },
  
  tagIS: function(tagName, element)
  {
    if (!element) { return; }
    return element.tagName.toLowerCase() === tagName.toLowerCase();
  },
  
  add: function(element, container)
  {
    container.appendChild(element);
  },

  prepend: function(element, container)
  {
    container.insertBefore(element, container.firstChild);
  }
};

module.exports = DOM;
