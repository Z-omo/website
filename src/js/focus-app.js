/**
 * Focus app – mediator for website.com
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

const debounce = require('lodash.debounce');
const DOM = require('./dom-man.js');
const RWDView = require('./rwd-view.js');

const focus = {

  view: {
    smallViewEM:    39,
    scrolledClass:  'js-scrolled'
  },

  init: function()
  {
    focus.setViewParams();
    focus.setJSMode();    
    if (true === focus.view.smallView) { focus.setupMobileMenu(); }

    focus.setupEvents();
    if (false === focus.view.smallView) { focus.setupRWDViews(); }
  },

  setViewParams: function()
  {
    let boundary = document.querySelector('.boundary');
    if (!boundary) { return; }

    let compStyle = window.getComputedStyle(boundary);
    let regexNumeric = /^\d+/;
    let vpWidth = Number(regexNumeric.exec(compStyle.width));
    let vpFontSize = Number(regexNumeric.exec(compStyle.fontSize));
    let vpMobileMax = focus.view.smallViewEM * vpFontSize;

    focus.view.smallView = vpWidth < vpMobileMax;
  },

  setJSMode: function()
  {
    let html = document.querySelector('html');
    if (!html) { return; }

    DOM.addClass('focus-js', html);
    focus.view.html = html;
  },

  setupMobileMenu: function()
  {
    let nav = document.querySelector('#menu');
    if (!nav) { return; }

    let menu = document.createElement('span');
    nav.appendChild(menu);
    menu.id = 'menuBtn';
    menu.addEventListener('click', focus.onMenu);

    let home = document.createElement('span');
    nav.appendChild(home);
    DOM.addClass('home-link', home);
    home.addEventListener('click', focus.onHome);

    focus.view.nav = nav;
  },

  setupEvents: function()
  {
    //window.addEventListener('scroll', debounce(focus.onScroll, 80));
    window.addEventListener('scroll', focus.onScroll);
  },

  onMenu: function()
  {
    focus.toggleMenu();
  },

  toggleMenu: function()
  {
    DOM.toggleClass('open', focus.view.nav);
  },

  onHome: function()
  {
    window.location.href = './';
  },

  onScroll: function()
  {
    if (!focus.view.scrolling)
   {
      if (window.requestAnimationFrame)
      {
        window.requestAnimationFrame(function()
        {
          focus.requestScrollCheck();
        });
      } else {
        setTimeout(function() { focus.requestScrollCheck() }, 200);
      }
    }

    focus.view.scrolling = true;
  },

  requestScrollCheck: function()
  {
    focus.setScrollState();
    focus.view.scrolling = false;
  },
  
  setScrollState: function()
  {
    let scroll = window.pageYOffset;

    if (0 === scroll)
    {
      DOM.removeClass(focus.view.scrolledClass, focus.view.html);
      focus.view.scrolled = false;
      return;
    }

    if (!focus.view.scrolled)
    {
      DOM.addClass(focus.view.scrolledClass, focus.view.html);
    }
    
    focus.view.scrolled = true;
  },

  setupRWDViews: function()
  {
    let nodes = document.querySelectorAll('.rwd-view');
    if (!nodes || 0 === nodes.length) { return; }

    // convert NodeList to an Array, otherwise IE throws error on forEach:
    let rwd = Array.prototype.slice.call(nodes);
    RWDView.setup(rwd, focus.view.smallView);
  }
};

module.exports = focus;
