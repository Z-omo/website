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

import DOM from './dom-man.js';
import RWDView from './rwd-view.js';

const focus = {

  view: {
    smallViewEM:    39,
    scrolledClass:  'js-scrolled'
  },

  init()
  {
    setViewParams();
    setJSMode();    
    if (true === focus.view.smallView) { setupMobileMenu(); }

    setupEvents();
    if (false === focus.view.smallView) { setupRWDViews(); }
  }
}

export default focus

function setViewParams()
{
  let boundary = document.querySelector('.boundary');
  if (!boundary) { return; }

  let compStyle = window.getComputedStyle(boundary);
  let regexNumeric = /^\d+/;
  let vpWidth = Number(regexNumeric.exec(compStyle.width));
  let vpFontSize = Number(regexNumeric.exec(compStyle.fontSize));
  let vpMobileMax = focus.view.smallViewEM * vpFontSize;

  focus.view.smallView = vpWidth < vpMobileMax;
}

function setJSMode()
{
  let html = document.querySelector('html');
  if (!html) { return; }

  DOM.addClass('focus-js', html);
  focus.view.html = html;
}

function setupMobileMenu()
{
  let nav = document.querySelector('#menu');
  if (!nav) { return; }

  let menu = document.createElement('span');
  nav.appendChild(menu);
  menu.id = 'menuBtn';
  menu.addEventListener(
    'click', () => DOM.toggleClass('open', focus.view.nav)
  );

  let home = document.createElement('span');
  nav.appendChild(home);
  DOM.addClass('home-link', home);
  home.addEventListener('click', () => window.location.href = './');

  focus.view.nav = nav;
}

function setupEvents()
{
  window.addEventListener('scroll', onScroll);
}

function onScroll()
{
  if (!focus.view.scrolling)
  {
    if (window.requestAnimationFrame)
    {
      window.requestAnimationFrame(requestScrollCheck);
    } else {
      setTimeout(requestScrollCheck, 200);
    }
  }

  focus.view.scrolling = true;
}

function requestScrollCheck()
{
  setScrollState();
  focus.view.scrolling = false;
}

function setScrollState()
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
}

function setupRWDViews()
{
  let nodes = document.querySelectorAll('.rwd-view');
  if (!nodes || 0 === nodes.length) { return; }

  // convert NodeList to an Array, otherwise IE throws error on forEach:
  let rwd = Array.prototype.slice.call(nodes);
  RWDView.setup(rwd, focus.view.smallView);
}
