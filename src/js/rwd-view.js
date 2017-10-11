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
    view.addEventListener('click', onSelectControl);
  });
}

function onSelectControl(e)
{
  let control = e.target;
  if ('button' !== control.tagName.toLowerCase()) { return; }

  e.stopPropagation();
  let modeIndex = Number(control.getAttribute(RWDView.selectors.index));
  //let view = getViewFrame(control);

  let view = getViewContainer(control);
  if (view) { setViewMode(view, modeIndex); }
}

function getViewFrame(element)
{
  let view = getViewContainer(element);
  if (!view) { return; }

  return view.querySelector('.' + RWDView.selectors.frame);
}

function getViewContainer(element)
{
  let target = element, isContainer, parent;
  if (!element) { return; }

  do
  {
    parent = target.parentNode;
    if (!parent) { break; }

    isContainer = parent.classList &&
                  parent.classList.contains(RWDView.selectors.container);
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
    if (view.classList && view.classList.contains(mode))
    {
      view.classList.remove(mode);
    }
  });
}

const RWDView = {

  viewModes:  ['rwd-mobile', 'rwd-tablet', 'rwd-desktop'],
  selectors:  {
    container:  'rwd-view',
    frame:      'rwd-view-frame',
    index:      'data-index'
  },

  setup: function(container)
  {
    RWDView.container = container;

    setupViewControls();
    console.log('RWD View setup completed.');
  }
};

module.exports = RWDView;
