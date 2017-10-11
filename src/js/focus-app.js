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
    focus.setupRWDViews();
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
    
    html.classList.add('focus-js');
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
    home.classList.add('home-link');
    home.addEventListener('click', focus.onHome);

    focus.view.nav = nav;
  },
  
  setupEvents: function()
  {
    window.addEventListener('scroll', debounce(focus.onScroll, 120));
  },
  
  onMenu: function(e)
  {
    focus.toggleMenu();
  },
  
  toggleMenu: function()
  {
    focus.view.nav.classList.toggle('open');
  },

  onHome: function()
  {
    window.location.href = './';
  },
  
  onScroll: function(e)
  {
    let scroll = window.scrollY;
    if (0 === scroll)
    {
      focus.view.html.classList.remove(focus.view.scrolledClass);
      return;
    }

    focus.view.html.classList.add(focus.view.scrolledClass);
  },

  setupRWDViews: function()
  {
    let rwd = document.querySelectorAll('.rwd-view');
    if (!rwd || 0 === rwd.length) { return; }

    RWDView.setup(rwd);
  },
  
};

module.exports = focus;
