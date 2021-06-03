function Snake(acc, scl) {
	this.acceleration = acc;
	this.scl = scl;
	this.position = {x: 0, y: 0};
	this.speed = {x: this.acceleration, y: 0};
	this.total = 0;
	this.tail = [];
	this.directions = {
		up: {x: 0, y: -this.acceleration},
		down: {x: 0, y: this.acceleration},
		left: {x: -this.acceleration, y: 0},
		right: {x: this.acceleration, y: 0}
	};
}

Snake.prototype.grow = function () {
	this.total++;
}

Snake.prototype.eat = function (foodPos) {
	return dist(this.position.x, this.position.y, foodPos.x, foodPos.y) < 1
}

Snake.prototype.reset = function () {
	this.total = 0;
	this.tail = [];
}

Snake.prototype.changeDirection = function (direction) {
	if (direction == 'up' && (this.speed != this.directions.down || this.tail.length == 0))
		this.speed = this.directions.up;
	else if (direction == 'down' && (this.speed != this.directions.up || this.tail.length == 0))
		this.speed = this.directions.down;
	else if (direction == 'left' && (this.speed != this.directions.right || this.tail.length == 0))
		this.speed = this.directions.left;
	else if (direction == 'right' && (this.speed != this.directions.left || this.tail.length == 0))
		this.speed = this.directions.right;
}

Snake.prototype.isSelfEating = function () {
	for (let i = 0; i < this.tail.length; i++)
		if (dist(this.position.x, this.position.y, this.tail[i].x, this.tail[i].y) < 1) return true;
	return false;
}

Snake.prototype.update = function () {
	for (let i = 0; i < this.tail.length - 1; i++) this.tail[i] = this.tail[i + 1];
	this.tail[this.total - 1] = this.position;

	this.position = {
		x: constrain(this.position.x + this.speed.x * this.scl, 0, width - this.scl),
		y: constrain(this.position.y + this.speed.y * this.scl, 0, height - this.scl)
	};
}

Snake.prototype.show = function () {
	fill(255);
	rect(this.position.x, this.position.y, this.scl, this.scl);
	for (let i = 0; i < this.total; i++)
		rect(this.tail[i].x, this.tail[i].y, this.scl, this.scl);
}