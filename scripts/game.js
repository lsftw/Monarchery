
// in ms
var UPDATE_INTERVAL = 50;

var canvas = $("#gameCanvas")[0];

var container = new Container(canvas.width, canvas.height);

//var keysDown = [];

function getGraphicsContext() {
	return canvas.getContext("2d");
}

function clearCanvas(context) {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function draw(context) {
	clearCanvas(context);
	container.draw(context);
}

function update() {
	container.update();
}

function initializeControls() {
	$(document).keydown(function(e) {
		var keyCode = e.keyCode;
		container.keysDown[keyCode] = true;
	});
	$(document).keyup(function(e) {
		var keyCode = e.keyCode;
		container.keysDown[keyCode] = false;
	});
}

function gameStep() {
	var context = getGraphicsContext();
	update();
	draw(context);
}

function initializeLevel() {
	var player = Entities.makePlayer({px:95,py:50,sx:15,sy:15,team:1});
	container.addEntity(player);
	var ally = Entities.makeArcher({px:150,py:50,sx:15,sy:15,team:1});
	container.addEntity(ally);
	var enemy = Entities.makeArcher({px:95,py:150,sx:15,sy:15,team:2});
	container.addEntity(enemy);
}

function initializeGame() {
	initializeControls();

	initializeLevel();

	// TODO gameStep should have delta time parameter
	setInterval("gameStep()", UPDATE_INTERVAL);
}

initializeGame();
