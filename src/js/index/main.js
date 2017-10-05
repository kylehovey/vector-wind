$(() => {
  // Create the application
  window.app = new App();

  /*
   * Listeners
   */
  $(window).resize(e => {
    app.vectorField.resize();
  });

  $("#enter-equation").on('keydown', e => {
    // If enter key
    if (e.which === 13) {
      try {
        app.vectorField.setField(eval($(e.target).val()));
      } catch (err) {
        console.log(err);
      }
    }
  });

  $("#enter-width").on('keydown', e => {
    // If enter key
    if (e.which === 13) {
      app.vectorField.setWidth(eval($(e.target).val()));
    }
  });

  /*
   * Animation loop
   */
  setInterval(() => {
    app.vectorField.progress();
  }, 1);
});
