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
'use strict';

const DOM = require('./dom-man.js');

function setupViewControls()
{
  RWDView.container.forEach(function(view) {
    buildViewControls(view);
    view.addEventListener('click', onSelectControl);
  });
}

function buildViewControls(container)
{
  let controls = document.createElement('div');
  DOM.addClass(RWDView.selectors.controls, controls);

  RWDView.viewModes.forEach(function(mode, index)
  {
    let button = document.createElement('button');
    setButtonText(mode, button);
    button.setAttribute('data-index', index);
    DOM.add(button, controls);

    if (DOM.hasClass(mode, container)) { activateControl(button); }
  });

  DOM.prepend(controls, container);
}

function setButtonText(text, button)
{
  text = text.replace('rwd-', '');
  text = text.toLowerCase().replace(/\b[a-z]/g, function(letter)
  {
    return letter.toUpperCase();
  });

  console.log('text: ', text);
  
  button.innerHTML = text;
}

function onSelectControl(e)
{
  let control = e.target;
  if ('button' !== control.tagName.toLowerCase()) { return; }

  e.stopPropagation();
  let modeIndex = Number(control.getAttribute(RWDView.selectors.index));

  let view = getViewContainer(control);
  if (view) { setViewMode(view, modeIndex); }
  activateControl(control);
}

function activateControl(control)
{
  if (RWDView.activeControl)
  {
    DOM.removeClass(RWDView.selectors.active, RWDView.activeControl);
  }

  DOM.addClass(RWDView.selectors.active, control);
  RWDView.activeControl = control;
}

function getViewFrame(element)
{
  let frame = element.querySelector('.' + RWDView.selectors.frame);
  if (!frame) { frame = buildFrame(element); }
  return frame;
}

function buildFrame(element)
{
  let device = element.querySelector('.' + RWDView.selectors.device);
  if (!device) { device = element; }

  let frame = document.createElement('iframe');
  DOM.add(frame, device);
  DOM.addClass(RWDView.selectors.frame, frame);

  return frame;
}

function getViewContainer(element)
{
  let target = element, isContainer, parent;
  if (!element) { return; }

  do
  {
    parent = target.parentNode;
    if (!parent) { break; }

    isContainer = DOM.hasClass(RWDView.selectors.container, parent);
    target = parent;

  } while (!isContainer && parent);

  return parent;  
}

function setViewMode(view, index)
{
  let mode = RWDView.viewModes[index];
  if (!mode) { return; }

  resetViewMode(view);
  DOM.addClass(mode, view);
}

function resetViewMode(view)
{
  RWDView.viewModes.forEach(function(mode)
  {
    if (DOM.hasClass(mode, view)) { DOM.removeClass(mode, view); }
  });
}

function setupView()
{
  RWDView.container.forEach(function(view) {
    let frame = getViewFrame(view);
    if (!frame) { return; }

    let url = view.getAttribute(RWDView.selectors.frameURL);
    if (!url) { return; }
    
    frame.setAttribute('src', url);    
  });
}

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

const RWDView = {

  viewModes:  ['rwd-mobile', 'rwd-tablet', 'rwd-desktop'],
  selectors:  {
    container:  'rwd-view',
    controls:   'rwd-view-controls',
    active:     'active',
    device:     'rwd-device',
    frame:      'rwd-view-frame',
    index:      'data-index',
    frameURL:   'data-src'
  },

  setup: function(container)
  {
    RWDView.container = container;

    setupViewControls();
    //setupView();
    console.log('RWD View setup completed.');
  }
};

module.exports = RWDView;
