function Point(type) {
	this.type = type;
}

Point.prototype.print = function() {
	console.log(this.type);
}

/* A Grid of width w and height h will have a grid array of width 2*w+1 and height 2*h+1. This is because for each point in the grid, there are adjacent wall points, e.g. for a 2x2 grid, the second row (grid[1]) has 3 wall points and 2 path points ((2+1)+2 = 2*(2)+1 = 5) as shown in the example below. 

The type of a point can be determined by the parity of its indices (y, x) as follows: 
	(even, even): "corner"
	(even, odd):  "hwall"
	(odd, even):  "vwall"
	(odd, odd):   "path"
Wall points (hwall or vwall) can also be open and have the type "owall".

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
function Grid(width, height) {
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
					grid[y].push(new Point('corner'));
				// (even, odd)
				else if (y%2 == 0)
					grid[y].push(new Point('hwall'));
				// (odd, even)
				else if (x%2 == 0)
					grid[y].push(new Point('vwall'));
				// (odd, odd)
				else
					grid[y].push(new Point('path'));
			}
		}
		return grid;
	}
}

var grid = new Grid(2, 2);