# Vector Wind
An HTML5 canvas utility for visualizing vector fields inspired from [this Reddit post](https://www.reddit.com/r/math/comments/73mtdr/meeting_point_of_a_vector_field_vy_y_cosy/).

An example can be found [here](https://kylehovey.github.io/vectorwind/) on my site. Equations can be entered using JavaScript syntax (plain eval is used) and the width of the window can also be modified.

## About
The goal of this project is to create a wind-like vector field like the ones found on [Windy](https://windy.com).

## Project goals:
- The visualizer should work for any screen size
- All elements will use component-based OOP
- There will be one main vector-field component that will support on-the-fly updating by supplying a lambda via a class method

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
