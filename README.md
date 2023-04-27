# LatteArt v2!
Why? Because, in my opinion, LatteArt v1 is poorly written and it could be so much better (for example, arbitrarily only supporting 1 canvas, which must have the id 'latte-art-container'). Additionally, file names and capitalization will be changed to fit js conventions better

LatteArt v1 will still be available (if you want to use it for some reason), along with the examples and documentation, in the LatteArt v1 folder

# What is LatteArt?
LatteArt is a basic JavaScript graphics library that wraps the procedural style of the Canvas API in a more object oriented direction. Any shape created is automatically added to the canvas and its properties are remembered between redraws

# Documentation
For LatteArt v2, just scroll down for the basic reference!

For LatteArt v1, see help.html inside the LatteArt v1 folder for documentation and example.html for an example use

# Examples
Check out the examples folder for some simple uses of the library

# Getting Started
In order to use LatteArt, make sure you have LatteArt linked in your HTML page. This can be as simple as putting the latte-art.js file in the same directory as your HTML file and putting ```<script src='./latte-art.js'></script>``` in the head tag

The next step is to get the canvas object for the canvas you would like to use. Simply use the ```LatteArt.getCanvas('canvasId')``` function to get your canvas of choice via its id. This function either returns a valid canvas object if everything sets up correctly, or ```false``` if the canvas fails to be set up (such as giving a nonexistant id), so make sure you check that the canvas was returned!
## The Canvas Object
There are a couple properties on the canvas object returned that may be helpful:

Property | Use
--- | ---
```.width``` | The width of the canvas element detected from the HTML. Strongly recommended to not change this value
```.height``` | The height of the canvas element detected from the HTML. Strongly recommended to not change this value
```.clearColor``` | A simple color string that LatteArt uses to clear the canvas before drawing
```.draw()``` | Calling this function clears the canvas then draws all added shapes on top
```.shapes``` | An array of all the shapes currently being drawn to the canvas when draw is called. Modifying this property will affect what is drawn to the canvas
```.context``` | If for some reason you would like to bypass the LatteArt canvas library, the canvas object supplies the Context2D object for use

There are also several shape creation functions
## Shapes
Before showing off each shape, there are some properties (almost) all shapes have, which will be listed here for simplicity. These properties are possible to set via the options argument

Property | Use
--- | ---
```.x``` | The x coordinate of the shape from the top left corner of the canvas. Positive is right
```.y``` | The y coordinate of the shape from the top left corner of the canvas. Positive is down
```.style``` | This is used to set the style of the shape before drawing. In most cases, this will be a color string (such as ```"green"``` or ```"#00ff00"```)
```.isHollow``` | This property tells whether or not the shape should be drawn hollow (as an outline). Lines should always have this property as ```true``` (see Lines later)
```.lineWidth``` | The width of the line outlining the shape when it is hollow
```.lineJoin``` | The style of the joins in the outline when the shape is hollow, can be ```"round"```, ```"bevel"```, or ```"miter"```
```.lineCap``` | The style of the end of a line (if hollow), can be ```"butt"```, ```"round"```, or ```"square"```
```.visible``` | A simple property that tells if a shape should be drawn. Can be used to hide shapes without removing them from the shapes array
```.remove()``` | Removes the shape from the shapes array. Returns ```true``` if the shape was successfully removed, ```false``` if the shape is not in the array
```.add()``` | Adds the shape to the shapes array. Returns ```true``` if the shape was successfully added, ```false``` if the shape is already in the array
```.moveZ(offset)``` | Moves the shape ```offset``` positions forwards or backwards in the "z" direction (this changes the order in which the shapes are drawn). Use a negative offset to move earlier in the draw order (behind other shapes) or a positive offset to move later in the draw order (after other shapes). Offset is automatically bounded to moving shapes within the current shapes array limit
```.draw()``` | This will redraw only the shape, however it will not remove the previous drawing

Now for the shapes themselves. Each shape can be constructed with either a specific set of arguments or by passing an object with the properties set in key-value pairs. Additionally, the shape creation functions (called on the canvas object acquired earlier) both return the shape object and add the shape to the shapes array to draw. If a shape property is not set, the global default for that property will be used
### Rectangle
Position measured from top left corner

Constructed with either ```canvas.createRect(x, y, width, height)``` or ```canvas.createRect(options)```

Property | Use
--- | ---
```.width``` | The width of the rectangle
```.height``` | The height of the rectangle

### Circle
Position measured from center

Constructed with either ```canvas.createCircle(x, y, radius)``` or ```canvas.createCircle(options)```

Property | Use
--- | ---
```.radius``` | The radius of the circle

### Elipse
Position measured from center

Constructed with either ```canvas.createElipse(x, y, xRadius, yRadius)``` or ```canvas.createElipse(options)```

Property | Use
--- | ---
```.xRadius``` | The radius of the x direction of the elipse
```.yRadius``` | The radius of the y direction of the elipse
```.angle``` | The angle of rotation of the elipse, in radians

### Arc
Position measured from center of circle the arc is drawn along. Arcs are hollow by default and therefore have a different default hollow global than other shapes

Constructed with either ```canvas.createArc(x, y, radius, startAngle, endAngle)``` or ```canvas.createArc(options)```

Property | Use
--- | ---
```.radius``` | The radius of the arc
```.startAngle``` | The radian measurement of where the arc starts
```.endAngle``` | The radian measurement of where the arc ends
```.connect``` | A boolean value that states whether to connect the two edges of the arc

### Elipse Arc
Position measured from center of elipse the arc is drawn along. Elipse Arcs are hollow by default and therefore share their default hollow global with Arcs

Constructed with either ```canvas.createElipseArc(x, y, xRadius, yRadius, startAngle, endAngle)``` or ```canvas.createElipseArc(options)```

Property | Use
--- | ---
```.xRadius``` | The radius of the x direction of the arc
```.yRadius``` | The radius of the y direction of the arc
```.angle``` | The angle of rotation of the elipse the arc is drawn along, in radians
```.startAngle``` | The radian measurement of where the arc starts
```.endAngle``` | The radian measurement of where the arc ends
```.connect``` | A boolean value that states whether to connect the two edges of the arc

### Regular Polygon
Position measured from center. A regular polygon of the specified number of sides

Constructed with either ```canvas.createRegular(x, y, sideCount, radius)``` or ```canvas.createRegular(options)```

Property | Use
--- | ---
```.sideCount``` | The number of sides the regular polygon should have
```.radius``` | The radius of the circle
```.angle``` | The angle of rotation of the polygon, in radians

### Polygon
Position offset added to the coordinates of each point. A collection of connected points

Constructed with either ```canvas.createRegular(x, y, points)``` or ```canvas.createRegular(options)```

Property | Use
--- | ---
```.points``` | The array of points that will draw the polygon. Points should be an array of x-y coordinate pairs (e.g. ```[[0,1], [1,1], [1,0]]``` for a simple triangle)

### Line
The ```.x``` & ```.y``` properties of a Line are not used and ```.isHollow``` should be set to true or not be set (LatteArt will automatically set it to ```true```). A line segment between 2 coordinate pairs

Constructed with either ```canvas.createLine(x1, y1, x2, y2)``` or ```canvas.createLine(options)```

Property | Use
--- | ---
```.start``` | The starting coordinate pair of the line, should be a 2-element array representing the x & y coordinates
```.end``` | The ending coordinate pair of the line, should be a 2-element array representing the x & y coordinates

### Text
Constructed with either ```canvas.createText(x, y, text)``` or ```canvas.createText(options)```

Property | Use
--- | ---
```.text``` | The text to be rendered
```.font``` | The font to be used
```.textAlign & .textBaseLine``` | The horizontal alignment and position relative to the baseline of the text
```.direction``` | Direction of the text. Left to right (```"ltr"```) or right to left (```"rtl"```)
```.kerning``` | The space between letters

## Global Defaults
The LatteArt.defaults object holds the default values used for any unassigned properties. By modifying this object, you can set your own global defaults

LatteArt.defaults Property | Default Value
--- | ---
.x | ```0```
.y | ```0```
.style | ```'#000'```
.isHollow | ```false```
.lineWidth | ```2```
.lineJoin | ```''```
.lineCap | ```''```
.visible | ```true```
.width | ```25```
.height | ```25```
.radius | ```25```
.xRadius | ```25```
.yRadius | ```25```
.angle | ```0```
.startAngle | ```0```
.endAngle | ```Math.PI```
.arcIsHollow | ```true```
.arcConnect | ```false```
.sideCount | ```3```
.points | ```[[0, 0], [25, 0], [0, 25]]```
.start | ```[0, 0]```
.end | ```[25, 25]```
.text.font | ```'1em sans-serif'```
.text.align | ```'start'```
.text.baseline | ```'alphabetic'```
.text.direction | ```'inherit'```
.text.kerning | ```'auto'```