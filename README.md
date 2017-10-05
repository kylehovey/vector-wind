# Vector Wind
An HTML5 canvas utility for visualizing vector fields inspired from [this Reddit post](https://www.reddit.com/r/math/comments/73mtdr/meeting_point_of_a_vector_field_vy_y_cosy/).

An example can be found [here](https://kylehovey.github.io/vectorwind/index.html) on my site. Equations can be entered using JavaScript syntax (plain eval is used) and the width of the window can also be modified.

## About
The goal of this project is to create a wind-like vector field like the ones found on [Windy](https://windy.com).

## Project goals:
- The visualizer should work for any screen size
- All elements will use component-based OOP
- There will be one main vector-field component that will support on-the-fly updating by supplying a lambda via a class method

## Editing
This project uses some boilerplate code I maintain in [another repository](https://github.com/kylehovey/node-express-boilerplate). Setting up the development environment for this project is pretty much the same as it is over there. In short:

1. Get Node.js installed
2. Install `gulp`
3. Clone this repository
4. `cd` into the repo and run `npm install`
5. Run the app using `npm start` then navigate to [http://localhost:3000](http://localhost:3000) to view the app

All code that is unique to this project is located in `src`. The code you would probably want to change is inside of `src/js`. All components of the app are defined in `src/js/components`. When in doubt, just open a dev console on the home page and play around with the global `app` object. It contains the `VectorField` instance that will have methods for changing the field parameters.

Everything is set up such that, if you change any parameter state in the `VectorField` class, the view should automatically start using the new values.

## Contributing
If you have any suggestions, feel free to submit an issue or pull request my way. I would love to see this project grow and evolve!

## Class Heirarchy
- Vector Field
  - (is a) Drawing Board
    - (can):
      - draw rectangles
  - (knows):
    - particle count
    - falloff
    - die-off value for particles
    - center coordinates (vector space units)
    - window size (vector space units)
    - vector map (R2 -> R2)
    - epsilon or dt value
  - (can):
    - move forward one step
    - update vector map (takes lambda)
      - Example: `(x, y) => [y, -x]`
  - (has some) Particles
    - (knows) location, lifeForce
