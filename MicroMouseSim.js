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
	this.grid = makeGrid(this.widthInSq, this.heightInSq);

	function makeGrid(widthInSq, heightInSq) {
		var grid = [];
		for (var y = 0; y < heightInSq; ++y) {
			grid.push([]);
			for (var x = 0; x < widthInSq; ++x) {
				grid[y].push(new Square());
				console.log("Pushing new Square");
			}
		}
		return grid;
	}
}

var theGrid = new Grid(16, 16);