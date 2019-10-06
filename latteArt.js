var Arc, Circle, Canvas, Elipse, Line, Polygon, Rectangle, Regular, Text;

document.addEventListener("DOMContentLoaded", function(){

	function __Canvas(id, d){
		var canvas = document.getElementById(id);

		var context = "Unsupported";
		if(canvas.getContext)
			context = canvas.getContext(d);
		else
			document.getElementById(id).innerHtml("Canvas not supported");
		this.context = context;

		this.shapes = [];
		this.width = canvas.width;
		this.height = canvas.height;

		this.update = ()=>{
			this.context.clearRect(0,0,this.width,this.height);
			for(var s of this.shapes)
				s.__draw__();
		};
	}

	Canvas = new __Canvas("latte-art-container","2d");

	if(Canvas.context == "Unsupported")
		return;

	const DEFAULTS = {
		x: 0,
		y: 0,
		width: 30,
		height: 30,
		alpha: 1,
		color: "#000000",
		style: "solid",
		lineWidth: 2,
		radius: 25,
		startAngle: 0,
		endAngle: Math.PI
	};


	Rectangle = function(options, height, op){
		if(typeof options != "object"){
			let w = options;
			options = {
				width: w
			};
		}else
			options = options || {};

		options.width = options.width || (op && op.width) || DEFAULTS.width;
		options.height = options.height || height || (op && op.height) || DEFAULTS.height;
		options.color = options.color || (op && op.color) || DEFAULTS.color;
		options.alpha = options.alpha || (op && op.alpha) || DEFAULTS.alpha;
		options.x = options.x || (op && op.x) || DEFAULTS.x;
		options.y = options.y || (op && op.y) || DEFAULTS.y;
		options.style = options.style || (op && op.style) || DEFAULTS.style;
		options.lineWidth = options.lineWidth || (op && op.lineWidth) || DEFAULTS.lineWidth;

		let PROPERTIES = ['alpha','color','height','lineWidth','style','width','x','y'];

		this.__draw__ = ()=>{
			Canvas.context.beginPath();
			Canvas.context.globalAlpha = options.alpha;
			
			if(options.style == "solid"){
				Canvas.context.fillStyle = options.color;
				Canvas.context.fillRect(options.x, options.y, options.width, options.height);
			}else if(options.style == "stroke"){
				Canvas.context.lineWidth = options.lineWidth;
				Canvas.context.strokeStyle = options.color;
				Canvas.context.strokeRect(options.x, options.y, options.width, options.height);
			}

			Canvas.context.globalAlpha = 1;
			Canvas.context.closePath();
		}

		///Accessors

		this.getX = ()=>{
			return options.x;
		}

		this.getY = ()=>{
			return options.y;
		}

		this.getWidth = ()=>{
			return options.width;
		}

		this.getHeight = ()=>{
			return options.height;
		}

		this.getColor = ()=>{
			return options.color;
		}

		this.getAlpha = ()=>{
			return options.alpha;
		}

		this.get = (key)=>{
			return options[key];
		}

		///Mutators

		this.set = (key,value)=>{
			if(!PROPERTIES.includes(key) || options[key] == value) return;
			options[key] = value;
			Canvas.update();
		}

		this.setAlpha = (alpha)=>{
			if(alpha == options.alpha) return;
			options.alpha = alpha;
			Canvas.update();
		}

		this.setColor = (color)=>{
			if(color == options.color) return;
			options.color = color;
			Canvas.update();
		}

		this.setDimensions = (width,height)=>{
			if(width == options.width && height == options.height) return;
			options.width = width;
			options.height = height;
			Canvas.update();
		}

		this.setHeight = (height)=>{
			if(height == options.height) return;
			options.height = height;
			Canvas.update();
		}

		this.setPosition = (x,y)=>{
			if(x == options.x && y == options.y) return;
			options.x = x;
			options.y = y;
			Canvas.update();
		}

		this.setWidth = (width)=>{
			if(width == options.width) return;
			options.width = width;
			Canvas.update();
		}

		///Misc

		this.draw = ()=>{
			Canvas.shapes.push(this);
			this.__draw__();
		}

		this.moveZ = (amt)=>{
			amt = amt || 1;
			let pos = Canvas.shapes.indexOf(this);
			Canvas.shapes.splice(pos, 1);
			Canvas.shapes.splice(pos + amt, 0, this)
			Canvas.update();
		}

		this.getProperties = ()=>{
			return PROPERTIES;
		}
	}

	Circle = function(options,op){
		if(typeof options != "object"){
			let r = options;
			options = {
				radius: r
			};
		}else
			options = options || {};

		options.radius = options.radius || (op && op.radius) || DEFAULTS.radius;
		options.color = options.color || (op && op.color) || DEFAULTS.color;
		options.alpha = options.alpha || (op && op.alpha) || DEFAULTS.alpha;
		options.x = options.x || (op && op.x) || DEFAULTS.x;
		options.y = options.y || (op && op.y) || DEFAULTS.y;
		options.style = options.style || (op && op.style) || DEFAULTS.style;
		options.lineWidth = options.lineWidth || (op && op.lineWidth) || DEFAULTS.lineWidth;

		let PROPERTIES = ['alpha','color','lineWidth','radius','style','x','y'];

		this.__draw__ = ()=>{
			Canvas.context.beginPath();
			Canvas.context.globalAlpha = options.alpha;

			Canvas.context.arc(options.x, options.y, options.radius, 0, 2*Math.PI);

			Canvas.context.closePath();
			
			if(options.style == "solid"){
				Canvas.context.fillStyle = options.color;
				Canvas.context.fill();
			}else if(options.style == "stroke"){
				Canvas.context.lineWidth = options.lineWidth;
				Canvas.context.strokeStyle = options.color;
				Canvas.context.stroke();
			}

			Canvas.context.globalAlpha = 1;
			
		}

		///Accessors

		this.get = (key)=>{
			return options[key];
		}

		this.getAlpha = ()=>{
			return options.alpha;
		}

		this.getColor = ()=>{
			return options.color;
		}

		this.getRadius = ()=>{
			return options.radius;
		}

		this.getX = ()=>{
			return options.x;
		}

		this.getY = ()=>{
			return options.y;
		}

		///Mutators

		this.set = (key,value)=>{
			if(!PROPERTIES.includes(key) || options[key] == value) return;
			options[key] = value;
			Canvas.update();
		}

		this.setAlpha = (alpha)=>{
			if(alpha == options.alpha) return;
			options.alpha = alpha;
			Canvas.update();
		}

		this.setColor = (color)=>{
			if(color == options.color) return;
			options.color = color;
			Canvas.update();
		}

		this.setRadius = (radius)=>{
			if(radius == options.radius) return;
			options.radius = radius;
			Canvas.update();
		}

		this.setPosition = (x,y)=>{
			if(x == options.x && y == options.y) return;
			options.x = x;
			options.y = y;
			Canvas.update();
		}

		///Misc

		this.draw = ()=>{
			Canvas.shapes.push(this);
			this.__draw__();
		}

		this.moveZ = (amt)=>{
			amt = amt || 1;
			let pos = Canvas.shapes.indexOf(this);
			Canvas.shapes.splice(pos, 1);
			Canvas.shapes.splice(pos + amt, 0, this)
			Canvas.update();
		}

		this.getProperties = ()=>{
			return PROPERTIES;
		}
	}

	Elipse = function(options,yRadius,op){
		if(typeof options != "object"){
			let r = options;
			options = {
				xRadius: r
			};
		}else
			options = options || {};

		options.xRadius = options.xRadius || (op && op.xRadius) || DEFAULTS.radius;
		options.yRadius = options.yRadius || (op && op.yRadius) || DEFAULTS.radius;
		options.angle = options.angle || (op && op.angle) || DEFAULTS.startAngle;
		options.color = options.color || (op && op.color) || DEFAULTS.color;
		options.alpha = options.alpha || (op && op.alpha) || DEFAULTS.alpha;
		options.x = options.x || (op && op.x) || DEFAULTS.x;
		options.y = options.y || (op && op.y) || DEFAULTS.y;
		options.style = options.style || (op && op.style) || DEFAULTS.style;
		options.lineWidth = options.lineWidth || (op && op.lineWidth) || DEFAULTS.lineWidth;

		let PROPERTIES = ['alpha','angle','color','lineWidth','style','x','xRadius','y','yRadius'];

		this.__draw__ = ()=>{
			Canvas.context.beginPath();
			Canvas.context.globalAlpha = options.alpha;

			Canvas.context.ellipse(options.x, options.y, options.xRadius, options.yRadius, -options.angle, 0, 2*Math.PI);

			Canvas.context.closePath();
			
			if(options.style == "solid"){
				Canvas.context.fillStyle = options.color;
				Canvas.context.fill();
			}else if(options.style == "stroke"){
				Canvas.context.lineWidth = options.lineWidth;
				Canvas.context.strokeStyle = options.color;
				Canvas.context.stroke();
			}

			Canvas.context.globalAlpha = 1;
			
		}

		///Accessors

		this.get = (key)=>{
			return options[key];
		}

		this.getAlpha = ()=>{
			return options.alpha;
		}

		this.getAngle = ()=>{
			return options.angle;
		}

		this.getColor = ()=>{
			return options.color;
		}

		this.getRadius = (angle)=>{
			return Math.sqrt(Math.pow(options.xRadius*Math.cos(options.angle),2) + Math.pow(options.yRadius*Math.sin(options.angle),2));
		}

		this.getX = ()=>{
			return options.x;
		}

		this.getXRadius = ()=>{
			return options.xRadius;
		}

		this.getY = ()=>{
			return options.y;
		}

		this.getYRadius = ()=>{
			return options.yRadius;
		}

		///Mutators

		this.set = (key,value)=>{
			if(!PROPERTIES.includes(key) || options[key] == value) return;
			options[key] = value;
			Canvas.update();
		}

		this.setAlpha = (alpha)=>{
			if(alpha == options.alpha) return;
			options.alpha = alpha;
			Canvas.update();
		}

		this.setAngle = (angle)=>{
			if(angle == options.angle) return;
			options.angle = angle;
			Canvas.update();
		}

		this.setColor = (color)=>{
			if(color == options.color) return;
			options.color = color;
			Canvas.update();
		}

		this.setPosition = (x,y)=>{
			if(x == options.x && y == options.y) return;
			options.x = x;
			options.y = y;
			Canvas.update();
		}

		///Misc

		this.draw = ()=>{
			Canvas.shapes.push(this);
			this.__draw__();
		}

		this.moveZ = (amt)=>{
			amt = amt || 1;
			let pos = Canvas.shapes.indexOf(this);
			Canvas.shapes.splice(pos, 1);
			Canvas.shapes.splice(pos + amt, 0, this)
			Canvas.update();
		}

		this.getProperties = ()=>{
			return PROPERTIES;
		}
	}

	Arc = function(options,startAngle,endAngle,op){
		if(typeof options != "object"){
			let r = options;
			options = {
				radius: r
			};
		}else
			options = options || {};

		options.radius = options.radius || (op && op.radius) || DEFAULTS.radius;
		options.startAngle = options.startAngle || startAngle || (op && op.startAngle) || DEFAULTS.startAngle;
		options.endAngle = options.endAngle || endAngle || (op && op.endAngle) || DEFAULTS.endAngle;
		options.color = options.color || (op && op.color) || DEFAULTS.color;
		options.alpha = options.alpha || (op && op.alpha) || DEFAULTS.alpha;
		options.x = options.x || (op && op.x) || DEFAULTS.x;
		options.y = options.y || (op && op.y) || DEFAULTS.y;
		options.style = options.style || (op && op.style) || DEFAULTS.style;
		options.lineWidth = options.lineWidth || (op && op.lineWidth) || DEFAULTS.lineWidth;
		options.connect = options.connect || (op && op.connect) || false;

		let PROPERTIES = ['alpha','color','connect','endAngle','lineWidth','radius','startAngle','style','x','y'];

		this.__draw__ = ()=>{
			Canvas.context.beginPath();
			Canvas.context.globalAlpha = options.alpha;

			Canvas.context.arc(options.x, options.y, options.radius, -options.startAngle, -options.endAngle, true);

			if(!options.connect)
				Canvas.context.moveTo(options.x+Math.cos(options.startAngle)*options.radius, options.y+Math.sin(options.startAngle)*options.radius)

			Canvas.context.closePath();
			
			if(options.style == "solid"){
				Canvas.context.fillStyle = options.color;
				Canvas.context.fill();
			}else if(options.style == "stroke"){
				Canvas.context.lineWidth = options.lineWidth;
				Canvas.context.strokeStyle = options.color;
				Canvas.context.stroke();
			}

			Canvas.context.globalAlpha = 1;
			
		}

		///Accessors

		this.get = (key)=>{
			return options[key];
		}

		this.getAlpha = ()=>{
			return options.alpha;
		}

		this.getColor = ()=>{
			return options.color;
		}

		this.getRadius = ()=>{
			return options.radius;
		}

		this.getX = ()=>{
			return options.x;
		}

		this.getY = ()=>{
			return options.y;
		}

		///Mutators

		this.set = (key,value)=>{
			if(!PROPERTIES.includes(key) || options[key] == value) return;
			options[key] = value;
			Canvas.update();
		}

		this.setAlpha = (alpha)=>{
			if(alpha == options.alpha) return;
			options.alpha = alpha;
			Canvas.update();
		}

		this.setColor = (color)=>{
			if(color == options.color) return;
			options.color = color;
			Canvas.update();
		}

		this.setRadius = (radius)=>{
			if(radius == options.radius) return;
			options.radius = radius;
			Canvas.update();
		}

		this.setPosition = (x,y)=>{
			if(x == options.x && y == options.y) return;
			options.x = x;
			options.y = y;
			Canvas.update();
		}

		///Misc

		this.draw = ()=>{
			Canvas.shapes.push(this);
			this.__draw__();
		}

		this.moveZ = (amt)=>{
			amt = amt || 1;
			let pos = Canvas.shapes.indexOf(this);
			Canvas.shapes.splice(pos, 1);
			Canvas.shapes.splice(pos + amt, 0, this)
			Canvas.update();
		}

		this.getProperties = ()=>{
			return PROPERTIES;
		}
	}

	ElipseArc = function(options,yRadius,startAngle,endAngle,op){
		if(typeof options != "object"){
			let r = options;
			options = {
				xRadius: r
			};
		}else
			options = options || {};

		options.xRadius = options.xRadius || (op && op.xRadius) || DEFAULTS.radius;
		options.yRadius = options.yRadius || (op && op.yRadius) || DEFAULTS.radius;
		options.angle = options.angle || (op && op.angle) || DEFAULTS.startAngle;
		options.color = options.color || (op && op.color) || DEFAULTS.color;
		options.alpha = options.alpha || (op && op.alpha) || DEFAULTS.alpha;
		options.x = options.x || (op && op.x) || DEFAULTS.x;
		options.y = options.y || (op && op.y) || DEFAULTS.y;
		options.style = options.style || (op && op.style) || DEFAULTS.style;
		options.lineWidth = options.lineWidth || (op && op.lineWidth) || DEFAULTS.lineWidth;
		options.startAngle = options.startAngle || startAngle || (op && op.startAngle) || DEFAULTS.startAngle;
		options.endAngle = options.endAngle || endAngle || (op && op.endAngle) || DEFAULTS.endAngle;
		options.connect = options.connect || (op && op.connect) || false;

		let PROPERTIES = ['alpha','angle','color','lineWidth','style','x','xRadius','y','yRadius'];

		this.__draw__ = ()=>{
			Canvas.context.beginPath();
			Canvas.context.globalAlpha = options.alpha;

			Canvas.context.ellipse(options.x, options.y, options.xRadius, options.yRadius, -options.angle, -options.startAngle, -options.endAngle);

			if(!options.connect)
				Canvas.context.moveTo(options.x+Math.cos(options.startAngle+options.angle)*options.xRadius, options.y+Math.sin(options.startAngle+options.angle)*options.yRadius)

			Canvas.context.closePath();
			
			if(options.style == "solid"){
				Canvas.context.fillStyle = options.color;
				Canvas.context.fill();
			}else if(options.style == "stroke"){
				Canvas.context.lineWidth = options.lineWidth;
				Canvas.context.strokeStyle = options.color;
				Canvas.context.stroke();
			}

			Canvas.context.globalAlpha = 1;
			
		}

		///Accessors

		this.get = (key)=>{
			return options[key];
		}

		this.getAlpha = ()=>{
			return options.alpha;
		}

		this.getAngle = ()=>{
			return options.angle;
		}

		this.getColor = ()=>{
			return options.color;
		}

		this.getRadius = (angle)=>{
			return Math.sqrt(Math.pow(options.xRadius*Math.cos(angle),2) + Math.pow(options.yRadius*Math.sin(angle),2));
		}

		this.getX = ()=>{
			return options.x;
		}

		this.getXRadius = ()=>{
			return options.xRadius;
		}

		this.getY = ()=>{
			return options.y;
		}

		this.getYRadius = ()=>{
			return options.yRadius;
		}

		///Mutators

		this.set = (key,value)=>{
			if(!PROPERTIES.includes(key) || options[key] == value) return;
			options[key] = value;
			Canvas.update();
		}

		this.setAlpha = (alpha)=>{
			if(alpha == options.alpha) return;
			options.alpha = alpha;
			Canvas.update();
		}

		this.setAngle = (angle)=>{
			if(angle == options.angle) return;
			options.angle = angle;
			Canvas.update();
		}

		this.setColor = (color)=>{
			if(color == options.color) return;
			options.color = color;
			Canvas.update();
		}

		this.setPosition = (x,y)=>{
			if(x == options.x && y == options.y) return;
			options.x = x;
			options.y = y;
			Canvas.update();
		}

		///Misc

		this.draw = ()=>{
			Canvas.shapes.push(this);
			this.__draw__();
		}

		this.moveZ = (amt)=>{
			amt = amt || 1;
			let pos = Canvas.shapes.indexOf(this);
			Canvas.shapes.splice(pos, 1);
			Canvas.shapes.splice(pos + amt, 0, this)
			Canvas.update();
		}

		this.getProperties = ()=>{
			return PROPERTIES;
		}
	}

	Regular = function(options,radius,op){
		if(typeof options != "object"){
			let c = options;
			options = {
				count: c
			};
		}else
			options = options || {};

		options.count = options.count || (op && op.count) || 3;
		options.angle = options.angle || (op && op.angle) || DEFAULTS.startAngle;
		options.radius = options.radius || radius || (op && op.radius) || DEFAULTS.radius;
		options.color = options.color || (op && op.color) || DEFAULTS.color;
		options.alpha = options.alpha || (op && op.alpha) || DEFAULTS.alpha;
		options.x = options.x || (op && op.x) || DEFAULTS.x;
		options.y = options.y || (op && op.y) || DEFAULTS.y;
		options.style = options.style || (op && op.style) || DEFAULTS.style;
		options.lineWidth = options.lineWidth || (op && op.lineWidth) || DEFAULTS.lineWidth;

		let PROPERTIES = ['alpha','angle','color','count','lineWidth','radius','style','x','y'];

		this.__draw__ = ()=>{
			Canvas.context.beginPath();
			Canvas.context.globalAlpha = options.alpha;

			let step = Math.PI*2/options.count;
			Canvas.context.moveTo(options.x+Math.cos(options.angle)*options.radius,options.y+Math.sin(options.angle)*options.radius)
			for(let x=0; x<options.count; x++)
				Canvas.context.lineTo(options.x+Math.cos(step*x+options.angle)*options.radius,options.y+Math.sin(step*x+options.angle)*options.radius)

			Canvas.context.closePath();
			
			if(options.style == "solid"){
				Canvas.context.fillStyle = options.color;
				Canvas.context.fill();
			}else if(options.style == "stroke"){
				Canvas.context.lineWidth = options.lineWidth;
				Canvas.context.strokeStyle = options.color;
				Canvas.context.stroke();
			}

			Canvas.context.globalAlpha = 1;
			
		}

		///Accessors

		this.get = (key)=>{
			return options[key];
		}

		this.getAlpha = ()=>{
			return options.alpha;
		}

		this.getAngle = ()=>{
			return options.angle;
		}

		this.getColor = ()=>{
			return options.color;
		}

		this.getCount = ()=>{
			return options.count;
		}

		this.getRadius = ()=>{
			return options.radius;
		}

		this.getX = ()=>{
			return options.x;
		}

		this.getY = ()=>{
			return options.y;
		}

		///Mutators

		this.set = (key,value)=>{
			if(!PROPERTIES.includes(key) || options[key] == value) return;
			options[key] = value;
			Canvas.update();
		}

		this.setAlpha = (alpha)=>{
			if(alpha == options.alpha) return;
			options.alpha = alpha;
			Canvas.update();
		}

		this.setAngle = (angle)=>{
			if(angle == options.angle) return;
			options.angle = angle;
			Canvas.update();
		}

		this.setColor = (color)=>{
			if(color == options.color) return;
			options.color = color;
			Canvas.update();
		}

		this.setRadius = (radius)=>{
			if(radius == options.radius) return;
			options.radius = radius;
			Canvas.update();
		}

		this.setPosition = (x,y)=>{
			if(x == options.x && y == options.y) return;
			options.x = x;
			options.y = y;
			Canvas.update();
		}

		///Misc

		this.draw = ()=>{
			Canvas.shapes.push(this);
			this.__draw__();
		}

		this.moveZ = (amt)=>{
			amt = amt || 1;
			let pos = Canvas.shapes.indexOf(this);
			Canvas.shapes.splice(pos, 1);
			Canvas.shapes.splice(pos + amt, 0, this)
			Canvas.update();
		}

		this.getProperties = ()=>{
			return PROPERTIES;
		}
	}

	Line = function(options,point2,op){
		if(Array.isArray(options)){
			let s = options;
			options = {
				start: s
			};
		}else
			options = options || {};

		options.start = options.start || (op && op.start) || [0,0];
		options.end = options.end || point2 || (op && op.end) || [1,1];
		options.color = options.color || (op && op.color) || DEFAULTS.color;
		options.alpha = options.alpha || (op && op.alpha) || DEFAULTS.alpha;
		options.lineWidth = options.lineWidth || (op && op.lineWidth) || DEFAULTS.lineWidth;

		let PROPERTIES = ['alpha','color','end','lineWidth','start'];

		this.__draw__ = ()=>{
			Canvas.context.beginPath();
			Canvas.context.globalAlpha = options.alpha;

			Canvas.context.moveTo(options.start[0],options.start[1]);
			Canvas.context.lineTo(options.end[0],options.end[1]);

			Canvas.context.closePath();
			
			Canvas.context.lineWidth = options.lineWidth;
			Canvas.context.strokeStyle = options.color;
			Canvas.context.stroke();

			Canvas.context.globalAlpha = 1;
			
		}

		///Accessors

		this.get = (key)=>{
			return options[key];
		}

		this.getAlpha = ()=>{
			return options.alpha;
		}

		this.getColor = ()=>{
			return options.color;
		}

		this.getEnd = ()=>{
			return options.end;
		}

		this.getStart = ()=>{
			return options.start;
		}

		///Mutators

		this.set = (key,value)=>{
			if(!PROPERTIES.includes(key) || options[key] == value) return;
			options[key] = value;
			Canvas.update();
		}

		this.setAlpha = (alpha)=>{
			if(alpha == options.alpha) return;
			options.alpha = alpha;
			Canvas.update();
		}

		this.setColor = (color)=>{
			if(color == options.color) return;
			options.color = color;
			Canvas.update();
		}

		this.setEnd = (point)=>{
			if(point == options.end) return;
			options.end = point;
			Canvas.update();
		}

		this.setStart = (point)=>{
			if(point == options.start) return;
			options.start = point;
			Canvas.update();
		}

		///Misc

		this.draw = ()=>{
			Canvas.shapes.push(this);
			this.__draw__();
		}

		this.moveZ = (amt)=>{
			amt = amt || 1;
			let pos = Canvas.shapes.indexOf(this);
			Canvas.shapes.splice(pos, 1);
			Canvas.shapes.splice(pos + amt, 0, this)
			Canvas.update();
		}

		this.getProperties = ()=>{
			return PROPERTIES;
		}
	}

	Polygon = function(options,op){
		if(Array.isArray(options)){
			let p = options;
			options = {
				points: p
			};
		}else
			options = options || {points: []};

		options.points = options.points || (op && op.points) || [];
		options.color = options.color || (op && op.color) || DEFAULTS.color;
		options.alpha = options.alpha || (op && op.alpha) || DEFAULTS.alpha;
		options.style = options.style || (op && op.style) || DEFAULTS.style;
		options.lineWidth = options.lineWidth || (op && op.lineWidth) || DEFAULTS.lineWidth;
		options.offset = options.offset || (op && op.offset) || {};
		options.x = options.x || (op && op.x) || DEFAULTS.x;
		options.y = options.y || (op && op.y) || DEFAULTS.y;

		let PROPERTIES = ['alpha','color','lineWidth','offset','points','style'];

		this.__draw__ = ()=>{
			Canvas.context.beginPath();
			Canvas.context.globalAlpha = options.alpha;

			Canvas.context.moveTo(options.points[0][0]+options.x,options.points[0][1]+options.y)
			for(let x=0; x<options.points.length; x++)
				Canvas.context.lineTo(options.points[x][0]+options.x,options.points[x][1]+options.y)

			Canvas.context.closePath();
			
			if(options.style == "solid"){
				Canvas.context.fillStyle = options.color;
				Canvas.context.fill();
			}else if(options.style == "stroke"){
				Canvas.context.lineWidth = options.lineWidth;
				Canvas.context.strokeStyle = options.color;
				Canvas.context.stroke();
			}

			Canvas.context.globalAlpha = 1;
			
		}

		///Accessors

		this.get = (key)=>{
			return options[key];
		}

		this.getAlpha = ()=>{
			return options.alpha;
		}

		this.getColor = ()=>{
			return options.color;
		}

		this.getPoint = (index)=>{
			return options.points[index];
		}

		this.getPoints = ()=>{
			return options.points;
		}

		///Mutators

		this.set = (key,value)=>{
			if(!PROPERTIES.includes(key) || options[key] == value) return;
			options[key] = value;
			Canvas.update();
		}

		this.setAlpha = (alpha)=>{
			if(alpha == options.alpha) return;
			options.alpha = alpha;
			Canvas.update();
		}

		this.setColor = (color)=>{
			if(color == options.color) return;
			options.color = color;
			Canvas.update();
		}

		this.addPoint = (point)=>{
			options.points.push(point);
			Canvas.update();
		}

		this.removePoint = (index)=>{
			if(Array.isArray(index)){
				for(let x=0; x<options.points.length; x++)
					if(options.points[x][0] == index[0] && options.points[x][1] == index[1]){
						options.points.splice(x,1);
						break;
					}
			}else
				options.points.splice(index,1);
			Canvas.update();
		}

		this.setPosition = (x,y)=>{
			if(x == options.x && y == options.y) return;
			options.x = x;
			options.y = y;
			Canvas.update();
		}

		///Misc

		this.draw = ()=>{
			Canvas.shapes.push(this);
			this.__draw__();
		}

		this.moveZ = (amt)=>{
			amt = amt || 1;
			let pos = Canvas.shapes.indexOf(this);
			Canvas.shapes.splice(pos, 1);
			Canvas.shapes.splice(pos + amt, 0, this)
			Canvas.update();
		}

		this.getProperties = ()=>{
			return PROPERTIES;
		}
	}

	Text = function(options,op){
		if(typeof options != "object"){
			let t = options;
			options = {
				text: t
			};
		}else
			options = options || {};

		options.text = options.text || (op && op.text) || "Default";
		options.color = options.color || (op && op.color) || DEFAULTS.color;
		options.alpha = options.alpha || (op && op.alpha) || DEFAULTS.alpha;
		options.x = options.x || (op && op.x) || DEFAULTS.x;
		options.y = options.y || (op && op.y) || DEFAULTS.y;
		options.style = options.style || (op && op.style) || DEFAULTS.style;
		options.lineWidth = options.lineWidth || (op && op.lineWidth) || DEFAULTS.lineWidth;
		options.font = options.font || (op && options.font) || "1em Helvetica";

		Canvas.context.font = options.font;
		options.width = Canvas.context.measureText(options.text).width;
		options.height = Canvas.context.measureText(options.text).height;

		let PROPERTIES = ['alpha','color','font','lineWidth','style','text','x','y'];

		this.__draw__ = ()=>{
			Canvas.context.beginPath();
			Canvas.context.globalAlpha = options.alpha;

			Canvas.context.font = options.font;
			
			if(options.style == "solid"){
				Canvas.context.fillStyle = options.color;
				Canvas.context.fillText(options.text,options.x,options.y);
			}else if(options.style == "stroke"){
				Canvas.context.lineWidth = options.lineWidth;
				Canvas.context.strokeStyle = options.color;
				Canvas.context.strokeText(options.text,options.x,options.y);
			}

			Canvas.context.closePath();
			Canvas.context.globalAlpha = 1;
			
		}

		///Accessors

		this.get = (key)=>{
			return options[key];
		}

		this.getAlpha = ()=>{
			return options.alpha;
		}

		this.getColor = ()=>{
			return options.color;
		}

		this.getHeight = ()=>{
			return options.height;
		}

		this.getText = ()=>{
			return options.text;
		}

		this.getWidth = ()=>{
			return options.width;
		}

		this.getX = ()=>{
			return options.x;
		}

		this.getY = ()=>{
			return options.y;
		}

		///Mutators

		this.set = (key,value)=>{
			if(!PROPERTIES.includes(key) || options[key] == value) return;
			options[key] = value;
			Canvas.update();
		}

		this.setAlpha = (alpha)=>{
			if(alpha == options.alpha) return;
			options.alpha = alpha;
			Canvas.update();
		}

		this.setColor = (color)=>{
			if(color == options.color) return;
			options.color = color;
			Canvas.update();
		}

		this.setText = (text)=>{
			if(text == options.text) return;
			options.text = text;
			Canvas.update();
		}

		this.setPosition = (x,y)=>{
			if(x == options.x && y == options.y) return;
			options.x = x;
			options.y = y;
			Canvas.update();
		}

		///Misc

		this.draw = ()=>{
			Canvas.shapes.push(this);
			this.__draw__();
		}

		this.moveZ = (amt)=>{
			amt = amt || 1;
			let pos = Canvas.shapes.indexOf(this);
			Canvas.shapes.splice(pos, 1);
			Canvas.shapes.splice(pos + amt, 0, this)
			Canvas.update();
		}

		this.getProperties = ()=>{
			return PROPERTIES;
		}
	}
});