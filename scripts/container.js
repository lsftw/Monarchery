
// container for entities
function Container(width, height) {
	this.width = width;
	this.height = height;
	this.entities = [];
	this.entitiesToAdd = [];
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
};

Container.prototype.insideBounds = function(entity) {
	var outsideBounds = entity.px < 0 || entity.py < 0 ||
		entity.px > this.width || entity.py > this.height;
	return !outsideBounds;
};

function areEntitiesColliding(entity1, entity2) {
	var left1 = entity1.px;
	var right1 = entity1.px + entity1.sx;
	var top1 = entity1.py;
	var bottom1 = entity1.py + entity1.sy;
	var left2 = entity2.px;
	var right2 = entity2.px + entity2.sx;
	var top2 = entity2.py;
	var bottom2 = entity2.py + entity2.sy;

	var horizontallyContained = 
		(left1 >= left2 && left1 <= right2) || 
		(right1 >= left2 && right1 <= right2);
	var verticallyContained = 
		(top1 >= top2 && top1 <= bottom2) || 
		(bottom1 >= top2 && bottom1 <= bottom2);

	return horizontallyContained && verticallyContained;
}

// currently handles collideable entity vs health entity damage logic
Container.prototype.handleCollisions = function() {
	var collideableEntities = this.entities.filter((entity) => entity.hasCollision);
	collideableEntities.forEach(function(entity1) {
		this.entities.forEach(function(entity2) {
			if (entity1 != entity2 && entity2.health > 0 && entity1.team != entity2.team && areEntitiesColliding(entity1, entity2)) {
				console.log(entity1.name + ' hits ' + entity2.name);
				entity2.health -= entity1.damage;
				console.log(entity2.health);
				// TODO remove projectile after collision
			}
		}, this);
	}, this);
};
