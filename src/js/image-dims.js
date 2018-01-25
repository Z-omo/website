/**
 * Module to handle exact dimensions of image tags.
 *
 * @package     ZLibrary
 * @author      Colin Tester <office@z-omo.com>
 * 
 * This file forms part of the installed @package and should not be copied 
 * and/or distributed without the written consent from the file's author.
 *
 * @copyright: Please see: <https://en.wikipedia.org/wiki/Berne_Convention>
 *
 * This file and its @package are under version control.
 */
"user strict";

import DOM from './dom-man';

const imgDims = {

  resizing: false,

  selectors: {
    attr: 'data-dims'
  },

  setup()
  {
    if (!this.resizeHandler)
    {
      this.resizeHandler = onResize;
      window.addEventListener('resize', this.resizeHandler);
    }
    
    processDims();
  }
};

export default imgDims;


function onResize()
{
  if (true === imgDims.resizing) { return; }
  
  setTimeout(processDims, 200); // debounced.
  imgDims.resizing = true;
}

function processDims()
{
  const images = findImages();
  if (!images || 0 === images.length) { return; }

  const imageData = getImageData(images);
  setImageDims(imageData);
  imgDims.resizing = false;
}

function findImages()
{
  const images = DOM.getAll(`img[${imgDims.selectors.attr}]`);
  return images;
}

function getImageData(imgs)
{
  const imageData = [];

  imgs.forEach(img => {
    let dims = getDefinedDims(img);
    addComputedDims(dims);
    imageData.push(dims);
  });
  
  return imageData;
}

function getDefinedDims(img)
{
  const values = img.getAttribute(imgDims.selectors.attr).split(',');
  const dims = {
    element:   img,
    defWidth:  Number(values[0]),
    defHeight: Number(values[1])
  };

  return dims;
}

function addComputedDims(dims)
{
  dims.parent = DOM.parent(dims.element);
  const rect = dims.parent.getBoundingClientRect();

  dims.width = (rect.width > dims.defWidth)
    ? dims.defWidth
    : Math.round(rect.width);

  dims.ratio = Number((dims.defHeight / dims.defWidth).toFixed(2));
  dims.height = Math.floor(dims.ratio * dims.width);
}

function setImageDims(imageData)
{
  imageData.forEach(image => {
    DOM.setStyle({
      width: image.width + 'px',
      height: image.height + 'px'
    }, image.element);
  });
}
