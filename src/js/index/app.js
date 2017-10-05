class App {
  constructor() {
    this.vectorField = new VectorField({
      /* ==== Drawing Board Options ===== */
      canvasId : "vector-canvas",
      center : [0, 0],
      width : 1,

      /* ===== Vector Field Options ===== */
      particleCount : 1000,
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
      epsilon : 0.01,
      falloff : 0.9,
      fade : 0.1,
      killPoint : 0.01,
      vectorMap : (x, y) => [y, -x]
    });
  }
};
