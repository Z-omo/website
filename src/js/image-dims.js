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

  selectors: {
    attr: 'data-dims'
  },

  setup()
  {
    if (!this.resizeHandler)
    {
      this.resizeHandler = this.onResize.bind(this);
      window.addEventListener('resize', this.resizeHandler);
    }
    
    this.process();
  },

  onResize()
  {
    if (true === this.resizing) { return; }
    
    setTimeout(this.process.bind(this), 200); // debounced.
    this.resizing = true;
  },

  process()
  {
    let images = this.findImages();
    if (!images || 0 === images.length) { return; }

    let imageData = this.getImageData(images);
    this.setImageDims(imageData);
    this.resizing = false;
  },

  findImages()
  {
    let images = DOM.getAll(`img[${this.selectors.attr}]`);
    return images;
  },

  getImageData(imgs)
  {
    let imageData = [];

    imgs.forEach(img => {
      let dims = this.getDefinedDims(img);
      this.addComputedDims(dims);
      imageData.push(dims);
    });
    
    return imageData;
  },

  getDefinedDims(img)
  {
    let values = img.getAttribute(this.selectors.attr).split(',');
    let dims = {
      element:   img,
      defWidth:  Number(values[0]),
      defHeight: Number(values[1])
    };

    return dims;
  },

  addComputedDims(dims)
  {
    dims.parent = DOM.parent(dims.element);
    let rect = dims.parent.getBoundingClientRect();

    dims.width = rect.width;
    dims.ratio = Number((dims.defHeight / dims.defWidth).toFixed(2));
    dims.height = Math.floor(dims.ratio * dims.width);
  },

  setImageDims(imageData)
  {
    imageData.forEach(image => {
      image.element.setAttribute('height', image.height);
    });
  }
};

export default imgDims
