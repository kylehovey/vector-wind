$(() => {
  // Create the application
  window.app = new App();

  /*
   * Listeners
   */
  $(window).resize(e => {
    app.vectorField.resize();
  });
});
