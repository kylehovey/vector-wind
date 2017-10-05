class VectorField extends DrawingBoard {
  /**
   * Construct a VectorField
   * @param {Object} options object
   * @param {Number} options.particleCount Amount of particles to have alive at
   *  any given time
   * @param {Object} options.particleColor Color of wind particles
   *  (uses { r, g, b } structure)
   * @param {Object} options.backgroundColor Color of background
   *  (uses { r, g, b } structure)
   * @param {Number} epsilon Differential unit used for Euler's Method
   * @param {Number} falloff Particle intensity multiplier (happens each cycle)
   *  (should be between 0 and 1)
   * @param {Number} fade Alpha value of color drawn over canvas each cycle
   * @param {Number} options.killpoint Particle intensity that corresponds
   *  to death
   * @param {Function} options.vectorMap Given (x, y), return an Array
   *  representing the vector at that point
   */
  constructor(options) {
    // Create drawing board and store options
    super(options);

    // Create particles
    this.populate();

    // Draw the initial background with no alpha
    this._drawBackground(1);

    // Progress one unit
    this.progress();
  }

  /**
   * Change the vector field
   * @param {Function} vectorMap Given (x, y), return an Array representing
   *  the vector at that point
   */
  setField(vectorMap) {
    this._parameters.vectorMap = vectorMap;
  }

  /**
   * Generate a new particle
   * @return {Particle}
   */
  _createParticle() {
    // Get a random point
    const [ x, y ] = this.getRandomPoint();

    // Construct and return particle
    return new Particle({
      location : { x, y },
      intensity : 1
    });
  }

  /**
   * Populate the particle field
   */
  populate() {
    // TODO
    this._particles = _
      .range(this._parameters.particleCount)
      .map(discard => this._createParticle());
  }

  /**
   * Kill off all particles
   */
  killAll() {
    this._particles = [];
  }

  /**
   * Draw the background
   * @param {Number} alpha Alpha channel value
   */
  _drawBackground(alpha = this._parameters.fade) {
    // Draw background
    this.fill(`rgba(${
      this._parameters.backgroundColor.r
    }, ${
      this._parameters.backgroundColor.g
    }, ${
      this._parameters.backgroundColor.b
    }, ${
      alpha
    })`);
  }

  /**
   * Draw the particles
   */
  drawParticles() {
    // Draw the background
    this._drawBackground();

    // Draw the particles
    this._particles
      .forEach(particle => {
        const { x, y} = particle.location;
        this.drawParticle(x, y, `rgba(${
          this._parameters.particleColor.r
        }, ${
          this._parameters.particleColor.g
        }, ${
          this._parameters.particleColor.b
        }, ${
          particle.intensity
        })`);
      });
  }

  /**
   * Advance one step further
   */
  progress() {
    // TODO
    this.drawParticles();
  }
};
