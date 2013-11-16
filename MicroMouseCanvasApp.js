window.addEventListener('load', eventWindowLoaded, false);

function eventWindowLoaded() {
	canvasApp();
}

function canvasSupport() {
  	return Modernizr.canvas;
}

function canvasApp() {
	if (!canvasSupport()) {
			 return;
  	} else {
	    var theCanvas = document.getElementById('canvas');
	    var context = theCanvas.getContext('2d');
	}

	/*** Applications constants ***/
	// Pixel to cm ratio
	const PIXEL_CM = 3; 

	// Square Dimensions (cm)
	const WALL_WIDTH = 1.2;
	const SQ_WIDTH = 18;
	const SQ_HEIGHT = 18;
	
	// Maze Dimensions (squares)
	const MAZE_WIDTH = 16;
	const MAZE_HEIGHT = 16;

	// Bounds Constants
	const N = 0;
	const E = 10;
	const S = 20;
	const W = 30;


	/* Makes inheritance simpler (1 line compared to 3). Also gives inherited classes a parent attribute, with which they can reference their parent class. 
	 Stolen from: http://phrogz.net/JS/classes/OOPinJS2.html
	*/
	Function.prototype.inheritsFrom = function( parentClassOrObject ){ 
		if ( parentClassOrObject.constructor == Function ) 
		{ 
			//Normal Inheritance 
			this.prototype = new parentClassOrObject;
			this.prototype.constructor = this;
			this.prototype.parent = parentClassOrObject.prototype;
		} 
		else 
		{ 
			//Pure Virtual Inheritance 
			this.prototype = parentClassOrObject;
			this.prototype.constructor = this;
			this.prototype.parent = parentClassOrObject;
		} 
		return this;
	}

	/* Sets default value of an argument arg to val.
	 Stolen from: http://stackoverflow.com/questions/894860/set-a-default-parameter-value-for-a-javascript-function
	 Specifically Tom Ritter for the basic functionality, and Camilo Martin for the encapsulation.
	*/
	function defaultFor(arg, val) { 
		return typeof arg !== 'undefined' ? arg : val; 
	}


	function Square(x, y, width, height, bounds) {
		this.x = defaultFor(x, 0);
		this.y = defaultFor(y, 0);
		this.width = defaultFor(width, SQ_WIDTH*PIXEL_CM);
		this.height = defaultFor(height, SQ_HEIGHT*PIXEL_CM);
		this.bounds = defaultFor(bounds, []);
	}

	function Grid(widthInSquares, heightInSquares) {
		this.widthInSq = defaultFor(widthInSquares, MAZE_WIDTH);
		this.heightInSq = defaultFor(heightInSquares, MAZE_HEIGHT);
		this.grid = makeGrid();

		function makeGrid() {
			var grid = [];
			for (var y = 0; y < this.heightInSq; ++y) {
				grid.push([]);
				for (var x = 0; x < this.widthInSq; ++x) {
					grid[y].push(new Square());
				}
			}
		}
	}

	/* A Grid of width w and height h will have a grid array of width 2*w+1 and height 2*h+1. This is because for each Square in the grid, there are adjacent wall points, e.g. for a 2x2 grid the second row (grid[1]) has 3 wall points and 2 path points ((2+1)+2 = 2*(2)+1 = 5) as shown in the example below. 

	The type of a Square can be determined by the parity of its indices (y, x) as follows: 
		(even, even): "corner"
		(even, odd):  "hwall"
		(odd, even):  "vwall"
		(odd, odd):   "path"
	Wall points (hwall or vwall) can also be open (i.e. not have a wall) and have the type "owall".

	 An example 2x2 grid: 
	 	grid = 
		 	[["corner", "hwall", "corner", "hwall", "corner"],
			 ["vwall" , "path" , "owall" , "path" , "vwall" ],
			 ["corner", "hwall", "corner", "owall", "corner"],
			 ["vwall" , "path" , "owall" , "path" , "vwall" ],
			 ["corner", "hwall", "corner", "hwall", "corner"]];
	 or a more visual representation:
		 grid = 
		 	[['+', '-', '+', '-', '+'],
		 	 ['|', ' ', '=', ' ', '|'],
		 	 ['+', '-', '+', '=', '+'],
		 	 ['|', ' ', '=', ' ', '|'],
		 	 ['+', '-', '+', '-', '+']];
	 where '+' is "corner", '-' is "hwall", '|' is "vwall", '=' is "owall".
	*/
	function Grid2(width, height) {
		this.width = width;
		this.height = height;
		this.grid = makeGrid();

		function makeGrid() {
			var grid = [];
			for (var y=0; y < width*2+1; ++y) {
				grid.push([])
				for (var x=0; x < height*2+1; ++x) {
					// (even, even)
					if (y%2 == 0 && x%2 == 0)
						grid[y].push(new CornerPoint());
					// (even, odd)
					else if (y%2 == 0)
						grid[y].push(new HWallPoint());
					// (odd, even)
					else if (x%2 == 0)
						grid[y].push(new VWallPoint());
					// (odd, odd)
					else
						grid[y].push(new PathPoint());
				}
			}
			return grid;
		}
	}

	Grid.prototype.generateMaze = function(width, height) {
		// Needs to generate a maze based on MicroMouse rules.
	}

	// Application variables
	var theGrid = new Grid(16, 16);

	function run() {
		
	}

	// Application Loop
	const FPS = 30;
	const intervalTime = 1000/FPS;
	
	function appLoop() {
		window.setTimeout(appLoop, intervalTime);
		run();
	}
}

