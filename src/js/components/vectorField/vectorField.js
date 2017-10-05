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
   * @param {Number} ageProbability Probability that a particle will fade each cycle
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
   * Set the width of the window in coordinate space
   * @parameter {Number} width Width in coordinate space
   */
  setWidth(width) {
    this._parameters.width = width;
    this.resize();
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
      intensity : _.random(0, 100, true)
    });
  }

  /**
   * Populate the particle field
   */
  populate() {
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
          particle.intensity / 100
        })`);
      });
  }

  /**
   * Advance one step further
   */
  progress() {
    this._particles = this._particles.map(particle => {
      if (particle.intensity > this._parameters.killPoint) {
        // Find vector at particle location
        let { x, y } = particle.location;
        const [ Vx, Vy ] = this._parameters.vectorMap(x, y);

        // Move vector
        x += Vx * this._parameters.epsilon;
        y -= Vy * this._parameters.epsilon;

        // Update location
        particle.location = { x, y };

        // Diminish particle
        if (_.random(0, 1, true) > this._parameters.ageProbability) {
          particle.diminish(this._parameters.falloff);
        }

        return particle;
      } else {
        return this._createParticle();
      }
    });

    // Draw particles
    this.drawParticles();
  }
};
