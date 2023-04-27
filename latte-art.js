// Written by Wyatt Kopcha
// this object holds the entirety of the LatteArt library, though it does not always need to be directly interacted with
// unfortunately for anyone trying to comprehend this (and future me), there is a lot of functions creating other functions as objects :)
const LatteArt = {

	// the global defaults used for each shape when a property is unspecified
	// exists here to easily change what the defaults are to make some stuff easier (like lineJoin, style, etc)
	defaults: {
		// common
		x: 0,
		y: 0,
		style: '#000',
		isHollow: false,
		lineWidth: 2,
		lineJoin: '', // stick with the previous
		lineCap: '', // stick with the previous
		visible: true,

		// rect
		width: 25,
		height: 25,

		// circle/elipse
		radius: 25,
		xRadius: 35,
		yRadius: 25,

		// rotation
		angle: 0,

		// arc
		startAngle: 0,
		endAngle: Math.PI,
		arcIsHollow: true,
		arcConnect: false,

		// regular
		sideCount: 3,

		// polygon
		points: [[0, 0], [25, 0], [0, 25]],

		// line
		start: [0, 0],
		end: [25, 25],

		// text
		text: {
			font: '1em sans-serif',
			align: 'start',
			baseline: 'alphabetic',
			direction: 'inherit',
			kerning: 'auto'
		}
	},

	// creates a Canvas object for the canvas element with the given id
	getCanvas(canvasId) {

		// check if the attribution has been printed yet, print if not
		if(!this.printed) {
			console.log('Graphics powered by LatteArt');
			this.printed = true;
		}

		// the actual canvas object being created
		let canvas = new function Canvas(){
			// find the canvas specified
			let canvas = document.querySelector(`canvas#${canvasId}`);

			// if the canvas does not exist, dont continue the setup and fail out
			this.ok = false;
			if(!canvas) {
				console.log(`Could not find canvas with id ${canvasId}`);
				return;
			}

			// get the context for drawing and set some helpful parameters
			this.context = canvas.getContext('2d');
			this.width = canvas.width;
			this.height = canvas.height;

			// array to keep hold of all shapes being drawn
			// shapes need to be removed from this array for them to stop being drawn, or have their visible property set to false
			this.shapes = [];

			// function to manually draw the shapes in the canvas to the canvas
			this.draw = () => {
				this.context.clearRect(0, 0, this.width, this.height);
				if(this.clearColor) {
					this.context.fillStyle = this.clearColor;
					this.context.fillRect(0, 0, this.width, this.height);
				}
				for(let shape of this.shapes)
					if(shape.visible) {
						if(shape.isHollow) {
							this.context.lineWidth = shape.lineWidth;
							this.context.lineJoin = shape.lineJoin;
							this.context.lineCap = shape.lineCap;
							this.context.strokeStyle = shape.style;
						} else
							this.context.fillStyle = shape.style;
						shape.draw();
					}
			};

			this.clearColor = '';


			// **** SHAPES ****

			// RECTANGLE
			this.createRect = (options, y, width, height) => {
				// if not using the object method, convert to the object method
				if(typeof(options) != 'object')
					options = {
						x: options,
						y: y,
						width: width,
						height: height
					};
				// defaults
				commonDefaults(options);
				options.width ??= LatteArt.defaults.width,
				options.height ??= LatteArt.defaults.height;
				// create the rectangle object
				let rect = new function Rectangle(ctx) {
					this.width = options.width;
					this.height = options.height;

					this.draw = () => {
						if(this.isHollow)
							ctx.strokeRect(this.x, this.y, this.width, this.height);
						else
							ctx.fillRect(this.x, this.y, this.width, this.height);
					};
				} (this.context);
				// properties & functions common across all shapes
				giveShapeCommonProperties(rect, options);

				// add it to the shapes array
				this.shapes.push(rect);
				return rect;
			};
			// here ends the explanation for shapes, they should (for the most part) all follow this pattern
			// if one of them makes a big departure from this pattern, there will be comments again

			// CIRCLE
			this.createCircle = (options, y, radius) => {
				if(typeof(options) != 'object')
					options = {
						x: options,
						y: y,
						radius: radius
					};
				commonDefaults(options);
				options.radius ??= LatteArt.defaults.radius;
				let circ = new function Circle(ctx) {
					this.radius = options.radius;

					this.draw = () => {
						ctx.beginPath();
						ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
						ctx.closePath();

						if(this.isHollow)
							ctx.stroke();
						else
							ctx.fill();
					};
				} (this.context);
				giveShapeCommonProperties(circ, options);
				this.shapes.push(circ);
				return circ;
			};

			// ELIPSE
			this.createElipse = (options, y, xRadius, yRadius) => {
				if(typeof(options) != 'object')
					options = {
						x: options,
						y: y,
						xRadius: xRadius,
						yRadius: yRadius
					};
				commonDefaults(options);
				options.xRadius ??= LatteArt.defaults.xRadius;
				options.yRadius ??= LatteArt.defaults.yRadius;
				options.angle ??= LatteArt.defaults.angle;
				let elip = new function Elipse(ctx) {
					this.xRadius = options.xRadius;
					this.yRadius = options.yRadius;
					this.angle = options.angle;

					this.draw = () => {
						ctx.beginPath();
						ctx.ellipse(this.x, this.y, this.xRadius, this.yRadius, -this.angle, 0, 2 * Math.PI);
						ctx.closePath();

						if(this.isHollow)
							ctx.stroke();
						else
							ctx.fill();
					}
				} (this.context);
				giveShapeCommonProperties(elip, options);
				this.shapes.push(elip);
				return elip;
			};

			// ARC
			this.createArc = (options, y, radius, startAngle, endAngle) => {
				if(typeof(options) != 'object')
					options = {
						x: options,
						y: y,
						radius: radius,
						startAngle: startAngle,
						endAngle: endAngle
					};
				// arcs have a different hollow default
				options.isHollow ??= LatteArt.defaults.arcIsHollow;
				commonDefaults(options);
				options.radius ??= LatteArt.defaults.radius;
				options.startAngle ??= LatteArt.defaults.startAngle;
				options.endAngle ??= LatteArt.defaults.endAngle;
				options.connect ??= LatteArt.defaults.arcConnect;
				let arc = new function Arc(ctx) {
					this.radius = options.radius;
					this.startAngle = options.startAngle;
					this.endAngle = options.endAngle;
					this.connect = options.connect;

					this.draw = () => {
						ctx.beginPath();
						ctx.arc(this.x, this.y, this.radius, -this.startAngle, -this.endAngle, true);
						if(!this.connect && this.isHollow)
							ctx.moveTo(
								this.x + Math.cos(this.startAngle) * this.radius,
								this.y + Math.sin(this.startAngle) * this.radius
							);
						ctx.closePath();

						if(this.isHollow)
							ctx.stroke();
						else
							ctx.fill();
					};
				} (this.context);
				giveShapeCommonProperties(arc, options);
				this.shapes.push(arc);
				return arc;
			};

			// ELIPSE ARC
			this.createElipseArc = (options, y, xRadius, yRadius, startAngle, endAngle) => {
				if(typeof(options) != 'object')
					options = {
						x: options,
						y: y,
						xRadius: xRadius,
						yRadius: yRadius,
						startAngle: startAngle,
						endAngle: endAngle
					};
				// arcs have a different hollow default
				options.isHollow ??= LatteArt.defaults.arcIsHollow;
				commonDefaults(options);
				options.xRadius ??= LatteArt.defaults.xRadius;
				options.yRadius ??= LatteArt.defaults.yRadius;
				options.angle ??= LatteArt.defaults.angle;
				options.startAngle ??= LatteArt.defaults.startAngle;
				options.endAngle ??= LatteArt.defaults.endAngle;
				options.connect ??= LatteArt.defaults.arcConnect;
				let earc = new function ElipseArc(ctx) {
					this.xRadius = options.xRadius;
					this.yRadius = options.yRadius;
					this.angle = options.angle;
					this.startAngle = options.startAngle;
					this.endAngle = options.endAngle;
					this.connect = options.connect;

					this.draw = () => {
						ctx.beginPath();
						ctx.ellipse(this.x, this.y, this.xRadius, this.yRadius, -this.angle, -this.startAngle, -this.endAngle, true);
						if(!this.connect)
							ctx.moveTo(
								this.x + Math.cos(this.startAngle + this.angle) * this.xRadius,
								this.y + Math.sin(this.startAngle + this.angle) * this.yRadius
							);
						ctx.closePath();

						if(this.isHollow)
							ctx.stroke();
						else
							ctx.fill();
					};
				} (this.context);
				giveShapeCommonProperties(earc, options);
				this.shapes.push(earc);
				return earc;
			};

			// REGULAR polygons
			// this shape works by basically making a circle with a low resolution and connecting the points
			this.createRegular = (options, y, sideCount, radius) => {
				if(typeof(options) != 'object')
					options = {
						x: options,
						y: y,
						sideCount: sideCount,
						radius: radius
					};
				commonDefaults(options);
				options.sideCount ??= LatteArt.defaults.sideCount;
				options.radius ??= LatteArt.defaults.radius;
				options.angle ??= LatteArt.defaults.angle;
				let poly = new function Regular(ctx) {
					this.sideCount = options.sideCount;
					this.radius = options.radius;
					this.angle = options.angle;

					this.draw = () => {
						ctx.beginPath();

						let step = Math.PI*2/this.sideCount;
						ctx.moveTo(this.x + Math.cos(this.angle) * this.radius, this.y + Math.sin(this.angle) * this.radius);
						for(let x = 0; x < this.sideCount; x++)
							ctx.lineTo(
								this.x + Math.cos(step * x + this.angle) * this.radius,
								this.y + Math.sin(step * x + this.angle) * this.radius
							);

						ctx.closePath();

						if(this.isHollow)
							ctx.stroke();
						else
							ctx.fill();
					};
				} (this.context);
				giveShapeCommonProperties(poly, options);
				this.shapes.push(poly);
				return poly;
			}

			// arbitrary POLYGON
			// whatever points you want
			this.createPolygon = (options, y, points) => {
				if(typeof(options) != 'object')
					options = {
						x: options,
						y: y,
						points: points
					};
				commonDefaults(options);
				options.points ??= LatteArt.defaults.points;
				let poly = new function Polygon(ctx) {
					this.points = options.points;

					this.draw = () => {
						ctx.beginPath();
						ctx.moveTo(this.points[0][0] + this.x, this.points[0][1] + this.y);
						for(let x = 0; x < this.points.length; x++)
							ctx.lineTo(this.points[x][0] + this.x, this.points[x][1] + this.y);
						ctx.closePath();

						if(this.isHollow)
							ctx.stroke();
						else
							ctx.fill();
					};
				} (this.context);
				giveShapeCommonProperties(poly, options);
				this.shapes.push(poly);
				return poly;
			}

			// LINE
			this.createLine = (options, y1, x2, y2) => {
				if(typeof(options) != 'object')
					options = {
						start: options && y1 ? [options, y1] : null,
						end: x2 && y2 ? [x2, y2] : null
					};
				// Lines are special and don't share like any options
				options.start ??= LatteArt.defaults.start;
				options.end ??= LatteArt.defaults.end;
				options.style ??= LatteArt.defaults.style;
				options.lineWidth ??= LatteArt.defaults.lineWidth;
				options.lineJoin ??= LatteArt.defaults.lineJoin;
				options.lineCap ??= LatteArt.defaults.lineCap;
				options.visible ??= LatteArt.defaults.visible;
				let line = new function Line(ctx) {
					this.start = options.start;
					this.end = options.end;
					// needed for proper rendering in canvas.draw()
					// changing will invalidate line styles but easy fix: don't change it
					this.isHollow = true;

					this.draw = () => {
						if(!this.isHollow)
							this.isHollow = true;
						ctx.strokeStyle = this.style;
						ctx.beginPath();
						ctx.moveTo(this.start[0], this.start[1]);
						ctx.lineTo(this.end[0], this.end[1]);
						ctx.closePath();
						ctx.stroke();
					};
				} (this.context);
				giveShapeCommonProperties(line, options);
				this.shapes.push(line);
				return line;
			};

			// TEXT
			this.createText = (options, y, string) => {
				if(typeof(options) != 'object')
					options = {
						x: options,
						y: y,
						text: string
					};
				commonDefaults(options);
				options.text ??= '';
				options.font ??= LatteArt.defaults.text.font;
				options.textAlign ??= LatteArt.defaults.text.align;
				options.textBaseline ??= LatteArt.defaults.text.baseline;
				options.direction ??= LatteArt.defaults.text.direction;
				options.kerning ??= LatteArt.defaults.text.kerning;
				let text = new function Text(ctx) {
					this.text = options.text;
					this.font = options.font;
					this.textAlign = options.textAlign;
					this.textBaseline = options.textBaseline;
					this.direction = options.direction;
					this.kerning = options.kerning;

					this.draw = () => {
						ctx.font = this.font;
						ctx.textAlign = this.textAlign;
						ctx.textBaseline = this.textBaseline;
						ctx.direction = this.direction;
						ctx.kerning = this.kerning;
						if(this.isHollow)
							ctx.strokeText(this.text, this.x, this.y);
						else
							ctx.fillText(this.text, this.x, this.y);
					}
				} (this.context);
				giveShapeCommonProperties(text, options);
				this.shapes.push(text);
				return text;
			};


			// **** SHAPES DONE ****

			let giveShapeCommonProperties = (shape, options) => {
				shape.x = options.x;
				shape.y = options.y;
				shape.style = options.style;
				shape.isHollow = options.isHollow;
				shape.lineWidth = options.lineWidth;
				shape.lineJoin = options.lineJoin;
				shape.lineCap = options.lineCap;
				shape.visible = options.visible;

				shape.remove = () => {
					let pos = this.shapes.indexOf(shape);
					if(pos == -1)
						return false;
					this.shapes.splice(pos, 1);
					return true;
				}

				shape.add = () => {
					let pos = this.shapes.indexOf(shape);
					if(pos != -1)
						return false;
					this.shapes.push(shape);
					return true;
				}

				shape.moveZ = (offset) => {
					offset ??= 1;
					let pos = this.shapes.indexOf(shape);
					if(pos + offset < 0)
						offset = -pos;
					else if(pos + offset >= this.shapes.length)
						offset = this.shapes.length - 1 - pos;
					this.shapes.splice(pos, 1);
					this.shapes.splice(pos + offset, 0, shape);
				}
			}

			function commonDefaults(options) {
				options.x ??= LatteArt.defaults.x,
				options.y ??= LatteArt.defaults.y,
				options.style ??= LatteArt.defaults.style,
				options.isHollow ??= LatteArt.defaults.isHollow,
				options.lineWidth ??= LatteArt.defaults.lineWidth,
				options.lineJoin ??= LatteArt.defaults.lineJoin, // stick with the previous
				options.lineCap ??= LatteArt.defaults.lineCap, // stick with the previous
				options.visible ??= LatteArt.defaults.visible;
				return options;
			}


			// finish setting up
			this.ok = true;
		}();

		// return the canvas if the canvas set up correct, false if the canvas failed to set up
		return canvas.ok ? canvas : false;
	}
};