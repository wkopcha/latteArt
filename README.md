# LatteArt v2!
Why? Because, in my opinion, LatteArt v1 is poorly written and it could be so much better (for example, arbitrarily only supporting 1 canvas, which must have the id 'latte-art-container'). Additionally, file names and capitalization will be changed to fit js conventions better<br>
LatteArt v1 will still be available (if you want to use it for some reason), along with the examples and documentation, in the LatteArt v1 folder

# What is LatteArt?
LatteArt is a basic JavaScript graphics library that wraps the procedural style of the Canvas API in a more object oriented direction. Any shape created is automatically added to the canvas and its properties are remembered between redraws

# Documentation
For LatteArt v2, just scroll down for the basic reference!<br>
For LatteArt v1: See help.html inside the LatteArt v1 folder for documentation and example.html for an example use

# Examples
Check out the examples folder for some simple uses of the library

# Getting Started
In order to use LatteArt, make sure you have LatteArt linked in your HTML page. This can be as simple as putting the latte-art.js file in the same directory as your HTML file and putting ```<script src='./latte-art.js'></script>``` in the head tag<br>
The next step is to get the canvas object for the canvas you would like to use. Simply use the ```LatteArt.getCanvas('canvasId')``` function to get your canvas of choice via its id. This function either returns a valid canvas object if everything sets up correctly, or ```false``` if the canvas fails to be set up (such as giving a nonexistant id), so make sure you check that the canvas was returned!
## The Canvas Object
There are a couple properties on the canvas object returned that may be helpful.<br>
<dl>
	<dt>.width & .height</dt>
	<dd>These variables contain the width & height of the canvas automatically detected from the width & height of the canvas. It is strongly recommended to not modify these values and still use pixel measurements for the canvas element for the best functionality</dd>
	<dt>.clearColor</dt>
	<dd>A simple color string that LatteArt uses to clear the canvas before drawing</dd>
	<dt>.draw()</dt>
	<dd>Calling this function clears the canvas then draws all added shapes on top</dd>
	<dt>.shapes</dt>
	<dd>An array of all the shapes currently being drawn to the canvas when draw is called. Modifying this property will affect what is drawn to the canvas</dd>
	<dt>.context</dt>
	<dd>If for some reason you would like to bypass the LatteArt canvas library, the canvas object supplies the Context2D object for use</dd>
</dl>
There are also several shape creation functions<br>
## Shapes
Before showing off each shape, there are some properties (almost) all shapes have, which will be listed here for simplicity:
<dl>
	<dt>.x & .y</dt>
	<dd>These are the x & y coordinates of the shape from the top left corner of the canvas. Positive x is right & positive y is down</dd>
	<dt>.style</dt>
	<dd>This is used to set the style of the shape before drawing. In most cases, this will be a color string (such as "green" or "#00ff00")</dd>
	<dt>.isHollow</dt>
	<dd>This property tells whether or not the shape should be drawn hollow (as an outline). Lines should always have this property as true</dd>
	<dt>.lineWidth, .lineJoin, & .lineCap</dt>
	<dd>These properties describe how the outline should be rendered if the shape is hollow</dd>
	<dt>.visible</dt>
	<dd>A simple property that tells if a shape should be drawn. Can be used to hide shapes without removing them from the shapes array</dd>
	<dt>.remove()</dt>
	<dd>Removes the shape from the shapes array. Returns true if the shape was successfully removed, false if the shape is not in the array</dd>
	<dt>.add()</dt>
	<dd>Adds the shape to the shapes array. Returns true if the shape was successfully added, false if the shape is already in the array</dd>
	<dt>.moveZ(offset)</dt>
	<dd>Moves the shape offset positions forwards or backwards in the "z" direction (this changes the order in which the shapes are drawn). Use a negative offset to move earlier in the draw order (behind other shapes) or a positive offset to move later in the draw order (after other shapes). Offset is automatically bounded to moving shapes within the current shapes array limit</dd>
</dl>
Now for the shapes themselves. Each shape can be constructed with either a specific set of arguments or by passing an object with the properties set in key-value pairs. Additionally, for any shape, .draw() can be called directly on the shape to just redraw that single shape - but this will not remove the previous drawing! Finally, the shape creation functions (called on the canvas object acquired earlier) both returns the shape object and adds the shape to the shapes array to draw. If a shape property is not set, the global default for that property will be used
### Rectangle
Position measured from top left corner
<dl>
	<dt>canvas.createRect(x, y, width, height) or canvas.createRect(options)</dt>
	<dd>Creates a rectangle with the given properties</dd>
	<dt>.width & .height</dt>
	<dd>The width & height of the rectangle</dd>
</dl>
### Circle
Position measured from center
<dl>
	<dt>canvas.createCircle(x, y, radius) or canvas.createCircle(options)</dt>
	<dd>Creates a circle with the given properties</dd>
	<dt>.radius</dt>
	<dd>The radius of the circle</dd>
</dl>
### Elipse
Position measured from center
<dl>
	<dt>canvas.createElipse(x, y, xRadius, yRadius) or canvas.createElipse(options)</dt>
	<dd>Creates a circle with the given properties</dd>
	<dt>.xRadius</dt>
	<dd>The radius of the x direction of the elipse</dd>
	<dt>.yRadius</dt>
	<dd>The radius of the y direction of the elipse</dd>
	<dt>.angle</dt>
	<dd>The angle of rotation of the elipse, in radians</dd>
</dl>
### Arc
Position measured from center of circle the arc is drawn along. Arcs are hollow by default and therefore have a different default hollow global than other shapes
<dl>
	<dt>canvas.createArc(x, y, radius, startAngle, endAngle) or canvas.createArc(options)</dt>
	<dd>Creates a circle with the given properties</dd>
	<dt>.radius</dt>
	<dd>The radius of the arc</dd>
	<dt>.startAngle</dt>
	<dd>The radian measurement of where the arc starts</dd>
	<dt>.endAngle</dt>
	<dd>The radian measurement of where the arc ends</dd>
	<dt>.connect</dt>
	<dd>A boolean value that states whether to connect the two edges of the arc</dd>
</dl>
### Elipse Arc
Position measured from center of elipse the arc is drawn along. Elipse Arcs are hollow by default and therefore share their default hollow global with Arcs
<dl>
	<dt>canvas.createElipseArc(x, y, xRadius, yRadius, startAngle, endAngle) or canvas.createElipseArc(options)</dt>
	<dd>Creates a circle with the given properties</dd>
	<dt>.xRadius</dt>
	<dd>The radius of the x direction of the arc</dd>
	<dt>.yRadius</dt>
	<dd>The radius of the y direction of the arc</dd>
	<dt>.angle</dt>
	<dd>The angle of rotation of the elipse the arc is drawn along, in radians</dd>
	<dt>.startAngle</dt>
	<dd>The radian measurement of where the arc starts</dd>
	<dt>.endAngle</dt>
	<dd>The radian measurement of where the arc ends</dd>
	<dt>.connect</dt>
	<dd>A boolean value that states whether to connect the two edges of the arc</dd>
</dl>
### Regular Polygon
Position measured from center. A regular polygon of the specified number of sides
<dl>
	<dt>canvas.createRegular(x, y, sideCount, radius) or canvas.createRegular(options)</dt>
	<dd>Creates a regular polygon with the given properties</dd>
	<dt>.sideCount</dt>
	<dd>The number of sides the regular polygon should have</dd>
	<dt>.radius</dt>
	<dd>The radius of the circle</dd>
	<dt>.angle</dt>
	<dd>The angle of rotation of the polygon, in radians</dd>
</dl>
### Polygon
Position offset added to the coordinates of each point. A collection of connected points
<dl>
	<dt>canvas.createRegular(x, y, points) or canvas.createRegular(options)</dt>
	<dd>Creates a polygon with the given properties</dd>
	<dt>.points</dt>
	<dd>The array of points that will draw the polygon. Points should be an array of x-y coordinate pairs (e.g. [[0,1], [1,1], [1,0]] for a simple triangle)</dd>
</dl>
### Line
The x & y properties of a Line are not used and .isHollow should not be set (LatteArt will automatically set it to true). A line segment between 2 coordinate pairs
<dl>
	<dt>canvas.createLine(x1, y1, x2, y2) or canvas.createLine(options)</dt>
	<dd>Creates a polygon with the given properties</dd>
	<dt>.start</dt>
	<dd>The starting coordinate pair of the line, should be a 2-element array representing the x & y coordinates</dd>
	<dt>.end</dt>
	<dd>The ending coordinate pair of the line, should be a 2-element array representing the x & y coordinates</dd>
	<dt>.style</dt>
	<dd>This is used to set the style of the shape before drawing. In most cases, this will be a color string (such as "green" or "#00ff00")</dd>
</dl>
### Text
<dl>
	<dt>canvas.createText(x, y, text) or canvas.createText(options)</dt>
	<dd>Creates a text object with the given properties</dd>
	<dt>.text</dt>
	<dd>The text to be rendered</dd>
	<dt>.font</dt>
	<dd>The font to be used</dd>
	<dt>.textAlign & .textBaseLine</dt>
	<dd>The horizontal alignment and position relative to the baseline of the text</dd>
	<dt>.direction</dt>
	<dd>Direction of the text. Left to right ("ltr") or right to left ("rtl")</dd>
	<dt>.kerning</dt>
	<dd>The space between letters</dd>
</dl>
## Global Defaults
The LatteArt.defaults object holds the default values used for any unassigned properties. By modifying this object, you can set your own global defaults
LatteArt.defaults Property | Default Value
--- | ---
.x | 0
.y | 0
.style | '#000'
.isHollow | false
.lineWidth | 2
.lineJoin | ''
.lineCap | ''
.visible | true
.width | 25
.height | 25
.radius | 25
.xRadius | 25
.yRadius | 25
.angle | 0
.startAngle | 0
.endAngle | Math.PI
.arcIsHollow | true
.arcConnect | false
.sideCount | 3
.points | [[0, 0], [25, 0], [0, 25]]
.start | [0, 0]
.end | [25, 25]
.text.font | '1em sans-serif'
.text.align | 'start'
.text.baseline | 'alphabetic'
.text.direction | 'inherit'
.text.kerning | 'auto'