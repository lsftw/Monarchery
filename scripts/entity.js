
function Entity(propertyMap) {
	var defaultValues = {
		// spatial
		sx: 10,
		sy: 30,
		px: 50,
		py: 50,
		vx: 0,
		vy: 0,
		// graphical
		imageName: '',
		//image: null,
		// game-specific
		team: 0,
		health: 0,
		// entity-specific (here until inheritance is properly implemented)
		damage: 0,
		// special handling flags
		listenToKeys: false,
		keepInBounds: false,
		collideable: false // TODO rename, means projectile atm
	};
	for (var property in defaultValues) {
		if (isUndefined(propertyMap) || isUndefined(propertyMap[property])) {
			this[property] = defaultValues[property];
		}
	}
	for (var property in propertyMap) {
		this[property] = propertyMap[property];
	}
}

Entity.prototype.draw = function (context) {
	var image = this.getImage();
	//drawRectangle(context, this.px, this.py, this.sx, this.sy);
	if (image) {
		context.drawImage(image, this.px, this.py, this.sx, this.sy);
	}
};

Entity.prototype.update = function () {
	this.px += this.vx;
	this.py += this.vy;
};

Entity.prototype.getImage = function () {
	return Images.getImage(this.imageName);
};

function drawRectangle(context, x, y, width, height) {
	context.beginPath();
	context.rect(x, y, width, height);
	context.stroke();
}
