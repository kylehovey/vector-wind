class App {
  constructor() {
    this.vectorField = new VectorField({
      /* ==== Drawing Board Options ===== */
      canvasId : "vector-canvas",
      center : [0, 0],
      width : 15,

      /* ===== Vector Field Options ===== */
      particleCount : 5000,
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
      epsilon : 0.002,
      falloff : 0.97,
      fade : 0.05,
      ageProbability : 0.8,
      killPoint : 15,
      vectorMap : (x,y) => [10*Math.cos(x)*Math.sin(y), 10*Math.sin(x)*Math.cos(y)] 
    });
  }
};
