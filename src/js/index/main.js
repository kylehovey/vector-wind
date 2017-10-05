$(() => {
  // Create the application
  window.app = new App();

  /*
   * Listeners
   */
  $(window).resize(e => {
    app.vectorField.resize();
  });

  /*
   * Animation loop
   */
  setInterval(() => {
    app.vectorField.progress();
  }, 100);
});
