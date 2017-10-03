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

const focus = {

  view: {
    smallViewEM: 39
  },

  init: function()
  {
    focus.setViewParams();

    if (true === focus.view.smallView)
    {
      focus.setJSMode();
      focus.setupMenu();  
    }
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
  },

  setupMenu: function()
  {
    let nav = document.querySelector('#menu');
    if (!nav) { return; }

    let menu = document.createElement('span');
    nav.appendChild(menu);
    menu.id = 'menuBtn';
    menu.addEventListener('click', focus.onMenu);

    focus.view.nav = nav;
  },
  
  onMenu: function(e)
  {
    focus.toggleMenu();
  },
  
  toggleMenu: function()
  {
    focus.view.nav.classList.toggle('open');
  },
  
};

module.exports = focus;
