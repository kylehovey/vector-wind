class Particle {
  /**
   * Construct a Particle
   * @param {Object} options object
   * @param {Object} options.location Location of particle in coordinate space
   *  (uses { x, y } structure)
   * @param {Number} options.intensity Current intensity value
   */
  constructor(options) {
    this.location = options.location;
    this.intensity = options.intensity;
  }

  /**
   * Make particle fade a little bit
   * @param {Number} falloff Falloff rate
   */
  diminish(falloff) {
    this.intensity *= falloff;
  }

  /**
   * Move particle
   * @param {Object} push Push vector
   *  (uses { x, y } structure)
   */
  move(push) {
    this.location.x += push.x;
    this.location.y += push.y;
  }
}
