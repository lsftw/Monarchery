
// container for entities
function Container(width, height) {
	this.width = width;
	this.height = height;
	this.entities = [];
	this.entitiesToAdd = [];
	//this.entitiesToRemove = [];
	this.keysDown = [];
}

Container.prototype.addEntity = function (entity) {
	this.entitiesToAdd.push(entity);
};

Container.prototype.draw = function (context) {
	for (var i = 0; i < this.entities.length; i++) {
		this.entities[i].draw(context);
	}
};

Container.prototype.update = function () {
	this.handleUserInput();

	// TODO remove entities
	this.entities.forEach(function(entity) {
		entity.update();
	});
	this.entitiesToAdd.forEach(function(entity) {
		entity.update();
	});
	this.entities.push(...this.entitiesToAdd);
	this.entitiesToAdd = [];

	this.keepEntitiesInBounds();
	this.removeEntitiesOutsideBounds();
	this.handleCollisions();
};

Container.prototype.handleUserInput = function () {
	this.entities.forEach(function(entity) {
		if (entity.listenToKeys) {
			// TODO handling should be done by the entity
			var moveSpeed = 10;
			// left right
			if (this.keysDown[37]) {
				entity.vx = -moveSpeed;
			} else if (this.keysDown[39]) {
				entity.vx = moveSpeed;
			} else {
				entity.vx = 0;
			}
			// up down
			if (this.keysDown[38]) {
				entity.vy = -moveSpeed;
			} else if (this.keysDown[40]) {
				entity.vy = moveSpeed;
			} else {
				entity.vy = 0;
			}
			// f
			if (this.keysDown[70]) {
				if (entity.vx != 0 || entity.vy != 0) {
					var projectile = Entities.makeProjectile({
						px: entity.px, py: entity.py,
						vx: entity.vx *2, vy: entity.vy *2,
						team: entity.team,
						damage: 10
					});
					this.addEntity(projectile);
				}
			}
		}
	}, this);
};

Container.prototype.keepEntitiesInBounds = function () {
	this.entities.forEach(function(entity) {
		if (entity.keepInBounds) {
			if (entity.px < 0) {
				entity.px = 0;
			} else if (entity.px + entity.sx > this.width) {
				entity.px = this.width - entity.sx;
			}
			if (entity.py < 0) {
				entity.py = 0;
			} else if (entity.py + entity.sy > this.height) {
				entity.py = this.height - entity.sy;
			}
		}
	}, this);
};

Container.prototype.removeEntitiesOutsideBounds = function () {
	var before = this.entities.length;
	for (var i = 0; i < this.entities.length; i++) {
		if (!this.insideBounds(this.entities[i])) {
			this.entities.splice(i, 1);
			i--; // fix array indices
		}
	}
	//var after = this.entities.length;
	//console.log(after);
};

Container.prototype.insideBounds = function(entity) {
	var outsideBounds = entity.px < 0 || entity.py < 0 ||
		entity.px > this.width || entity.py > this.height;
	return !outsideBounds;
};

// currently handles collideable entity vs health entity damage logic
Container.prototype.handleCollisions = function() {
	var collideableEntities = this.entities.filter((entity) => entity.hasCollision);
	collideableEntities.forEach(function(entity1) {
		this.entities.forEach(function(entity2) {
			if (entity1 != entity2 && entity2.health > 0 && entity1.team != entity2.team) {
				// TODO check if collided
				console.log(entity1.name + ' hits ' + entity2.name);
				entity2.health -= entity1.damage;
				console.log(entity2.health);
			}
		}, this);
	}, this);
};
