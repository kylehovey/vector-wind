class DrawingBoard {
  /**
   * Construct a DrawingBoard
   * @param {Object} options object
   * @param {String} options.canvasId ID of canvas element
   * @param {Array} options.center Center of coordinate space
   * @param {Number} options.width Width of window in coordinate space
   *  (height in coordinate space is calculated based upon aspect ratio)
   */
  constructor(options) {
    // Store copy of options
    this._parameters = JSON.parse(JSON.stringify(options));

    // Get canvas
    [ this._canvas ] = $(`#${this._parameters.canvasId}`);

    // Create context
    this._ctx = this._canvas.getContext("2d");

    // Resize canvas
    this.resize();
  }

  /**
   * Resize the canvas
   */
  resize() {
    // Set canvas width
    this._ctx.canvas.width = window.innerWidth;
    this._ctx.canvas.height = window.innerHeight;

    // Update internal state
    this._width = window.innerWidth;
    this._height = window.innerHeight;
    this._pixelCenter = [
      this._width,
      this._height
    ].map(x => x/2);

    // Update size of coordinate space
    this._parameters.height = this._parameters.width * this._height/this._width;
    this._parameters.unitsPerPixel = this._parameters.width / this._width;
  }

  /**
   * Clear the canvas
   */
  clear() {
    this._ctx.clearRect(0, 0, this._width, this._height);
  }

  /**
   * Get a random point from within our coordinate space
   * @return {Array}
   */
  getRandomPoint() {
    return [
      _.random(-this._parameters.width/2, this._parameters.width/2, true),
      _.random(-this._parameters.height/2, this._parameters.height/2, true)
    ];
  }

  /**
   * Given some [x, y] from the origin, determine location pixel-wise
   * @param {Number} x Horizontal coordinate (coordinate space)
   * @param {Number} y Vertical coordinate (coordinate space)
   * @return {Array}
   */
  _toPixels(x, y) {
    // Easier values for center
    const [ cX, cY ] = this._pixelCenter;

    return [
      Math.round(cX + x / this._parameters.unitsPerPixel),
      Math.round(cY - y / this._parameters.unitsPerPixel)
    ];
  }

  /**
   * Draw a rectangle on the board
   * @param {Number} x Starting horizontal coordinate (pixel space)
   * @param {Number} y Starting vertical coordinate (pixel space)
   * @param {Number} width Width of rectangle (pixel space)
   * @param {Number} height Height of rectangle (pixel space)
   * @param {String} color Color of rectangle
   */
  _drawRectangle(x, y, width, height, color) {
    // Begin path
    this._ctx.beginPath();

    // Draw rectangle
    this._ctx.rect(x, y, width, height);
    this._ctx.fillStyle = color;
    this._ctx.fill();

    // Close path
    this._ctx.closePath();
  }

  /**
   * Draw a particle on the board
   * @param {Number} x Horizontal location (coordinate space)
   * @param {Number} y Vertical location (coordinate space)
   * @param {String} color Particle color
   * @param {Number} size Particle width and height
   */
  drawParticle(x, y, color = "#000", size = 2) {
    // Determine location in pixel space
    const [ cX, cY ] = this._toPixels(x, y);

    // Draw square centered at that location
    this._drawRectangle(cX - size/2, cY - size/2, size, size, color);
  }

  /**
   * Fill the board with a given color
   * @param {String} color Color to fill
   */
  fill(color) {
    this._drawRectangle(0, 0, this._width, this._height, color);
  }
};
