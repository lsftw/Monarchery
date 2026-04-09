
// Provides implementations of various entities
// TODO use inheritance and constructors instead
var Entities = {
	// TODO: don't override attributes if present?
	// should specify team
	makePlayer: function (propertyMap) {
		var player = new Entity(propertyMap);
		player.name = 'player';
		player.health = 1000;
		player.listenToKeys = true;
		player.keepInBounds = true;
		player.imageName = 'bow.png';
		player.team = -1;
		return player;
	},
	// should specify team
	makeArcher: function (propertyMap) {
		var archer = new Entity(propertyMap);
		archer.name = 'archer'
		archer.health = 100;
		archer.keepInBounds = true;
		archer.imageName = 'bow.png';
		archer.team = getRandomNumber(1, 999999999);
		return archer;
	},
	// should specify damage, should specify team
	makeProjectile: function (propertyMap) {
		var projectile = new Entity(propertyMap);
		projectile.name = 'projectile';
		projectile.imageName = 'projectile.png';
		projectile.sx = 8;
		projectile.sy = 8;
		projectile.hasCollision = true;
		projectile.damage = 10;
		projectile.team = -1; // TODO currently all belong to player
		return projectile;
	}
};
