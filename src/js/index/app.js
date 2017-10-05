class App {
  constructor() {
    this.vectorField = new VectorField({
      /* ==== Drawing Board Options ===== */
      canvasId : "vector-canvas",
      center : [0, 0],
      width : 1,

      /* ===== Vector Field Options ===== */
      particleCount : 4000,
      particleColor : {
        r : 102,
        g : 198,
        b : 228
      },
      backgroundColor : {
        r : 24,
        g : 97,
        b : 152
      },
      epsilon : 0.001,
      falloff : 0.95,
      fade : 0.1,
      ageProbability : 0.4,
      killPoint : 20,
      vectorMap : (x, y) => [-5 * y,  5 * y * Math.cos(y)]
    });
  }
};
