function RectBuilding(row, col, baseWidth, baseHeight, height) {
	this.baseWidth = baseWidth;
	this.baseHeight = baseHeight;
	this.height = height;
	this.points = [];
	this.segments = [];
	this.x = row * 100;
	this.z = col * 100;
	this.build();
}

RectBuilding.prototype.build = function() {
	var X = this.x;
	var Y = 0;
	var Z = this.z;
	var BW = this.baseWidth;
	var BH = this.baseHeight;
	var H = this.height;
	this.points = [
		new Point({x:X-BW/2,y:Y,z:Z-BH/2}),
		new Point({x:X+BW/2,y:Y,z:Z-BH/2}),
		new Point({x:X-BW/2,y:Y-H,z:Z-BH/2}),
		new Point({x:X-BW/2,y:Y,z:Z+BH/2}),
		new Point({x:X+BW/2,y:Y-H,z:Z-BH/2}),
		new Point({x:X-BW/2,y:Y-H,z:Z+BH/2}),
		new Point({x:X+BW/2,y:Y,z:Z+BH/2}),
		new Point({x:X+BW/2,y:Y-H,z:Z+BH/2}),
	];
	this.segments = [
		new Segment(this.points[0],this.points[1]),
		new Segment(this.points[0],this.points[2]),
		new Segment(this.points[0],this.points[3]),
		new Segment(this.points[1],this.points[4]),
		new Segment(this.points[1],this.points[6]),
		new Segment(this.points[2],this.points[5]),
		new Segment(this.points[2],this.points[4]),
		new Segment(this.points[3],this.points[5]),
		new Segment(this.points[3],this.points[6]),
		new Segment(this.points[4],this.points[7]),
		new Segment(this.points[5],this.points[7]),
		new Segment(this.points[6],this.points[7]),
	];
}

RectBuilding.prototype.render = function(g, camera) {
	WorldGrid.prototype.render.call(this, g, camera);
}

function WorldGrid(row, col) {
	this.row = row;
	this.col = col
	this.points = [];
	this.segments = [];
	this.build();
}

WorldGrid.prototype.build = function(){
	//Basic terrain (ground)
	for( var i = 0; i < this.row; ++i) {
		for (var j = 0; j < this.col; ++j) {
			var tx = i * 100;
			var ty = (j < 20 && j > 5) ? 250 : 0;
			var tz = j * 100;
			this.points.push(new Point({x:tx, y:ty, z:tz}));
		}
	}
	for (var i = 0; i < this.row; ++i) {
		for (var j=0;j < this.col; ++j) {
			if(i+1 < this.row)this.segments.push(new Segment(this.points[i * this.col + j], this.points[(i+1) * this.col + j]));
			if(j+1 < this.col)this.segments.push(new Segment(this.points[i * this.col + j], this.points[i * this.col + j+1]));
		}
	}
}

WorldGrid.prototype.render = function(g, camera) {
	for(var i=0;i<this.points.length;++i) {
		camera.computePointProjection(this.points[i]);
	}
	for(var i=0;i<this.segments.length;++i){
		this.segments[i].renderSegment(g);
	}
	this.renderBuildings(g);
}

WorldGrid.prototype.solidRectangle = function(x1, y1, z1, x2, y2, z2) {
    points = [];
    points.push(new Point(x1 * 100, y1 * 100, z1 * 100));
    points.push(new Point(x1 * 100, y1 * 100, z2 * 100));
    points.push(new Point(x1 * 100, y2 * 100, z1 * 100));
    points.push(new Point(x1 * 100, y2 * 100, z2 * 100));
    points.push(new Point(x2 * 100, y1 * 100, z1 * 100));
    points.push(new Point(x2 * 100, y1 * 100, z2 * 100));
    points.push(new Point(x2 * 100, y2 * 100, z1 * 100));
    points.push(new Point(x2 * 100, y2 * 100, z2 * 100));

    for (var i = 0; i < points.length; i++) {
    	for (var j = 0; j < points.length; j++) {
    		if (points[i].pos.x == points[j].pos.x ||
    			points[i].pos.y == points[j].pos.y ||
    			points[i].pos.z == points[z].pos.z) {
    			var segment = new Segment(points[i], points[j]);
    			segment.renderSegment(this.graph);
    		}
    	}
    }
};

WorldGrid.prototype.renderBuildings = function(g) {
	this.graph = g;
	//this.solidRectangle(0, 0, 0, 5, 5, 20);
};




var command = {};

document.addEventListener("DOMContentLoaded",function(){
	g = document.getElementById("display").getContext('2d');
	var camera = new Camera({x:0, y:-100, z:1000});
	var wgrid = new WorldGrid(70, 30);
	var rectbuilding = [];
	//rectbuilding.push(new RectBuilding(10, 10, 400, 400, 800));
	document.addEventListener("keydown", function(e) {
		if(e.which==38){command['MOVE'] = true;}
		if(e.which==65){command['X'] = true;}
		if(e.which==87){command['Y'] = true;}
		if(e.which==68){command['Z'] = true;}
		if(e.which==40){command['ZZ'] = true;}
	});
	document.addEventListener("keyup", function(e) {
		if(e.which==38){command['MOVE'] = false;}
		if(e.which==65){command['X'] = false;}
		if(e.which==87){command['Y'] = false;}
		if(e.which==68){command['Z'] = false;}
		if(e.which==40){command['ZZ'] = false;}

	});
	setInterval(function(){
		if(command['MOVE']){camera.pos = Spardiac.add(camera.pos, Spardiac.scalarProduct(camera.n, 10));}
		if(command['X']){
			//camera.setNormal(Spardiac.rotateX(camera.n,4/180*Math.PI));
			camera.rotateX(4/180*Math.PI);
		}
		if(command['Y']){
			//camera.setNormal(Spardiac.rotateY(camera.n,4/180*Math.PI));
			camera.rotateY(4/180*Math.PI);
		}
		if(command['Z']){
			//camera.setNormal(Spardiac.rotateZ(camera.n,4/180*Math.PI));
			camera.rotateZ(-4/180*Math.PI);

		}
		if(command['ZZ']){
			//camera.setNormal(Spardiac.rotateZ(camera.n,-4/180*Math.PI));
			camera.rotateZ(4/180*Math.PI);

		}
		g.clearRect(0,0,1000,600);
		wgrid.render(g, camera);
		for(var i=0;i<rectbuilding.length;++i){
			rectbuilding[i].render(g,camera);
		}
	},1000/60);
})