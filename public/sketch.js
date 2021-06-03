const width = 900, height = 600, scl = 30;

let snake, food, dead = false;

function pickLocation() {
	const cols = Math.floor(width / scl);
	const rows = Math.floor(height / scl);
	return {
		x: Math.floor(random(cols)) * scl,
		y: Math.floor(random(rows)) * scl
	};
}

function setup() {
	frameRate(7);
	const canvas = createCanvas(width, height);
	const mainNodeDOM = canvas.parent();
	canvas.parent('canvas-container');
	mainNodeDOM.remove();
	// strokeWeight(0);
	food = pickLocation();
	snake = new Snake(1, scl);
	textSize(20);
}

function keyPressed() {
	if (keyCode == UP_ARROW) snake.changeDirection('up');
	else if (keyCode == DOWN_ARROW) snake.changeDirection('down');
	else if (keyCode == LEFT_ARROW) snake.changeDirection('left');
	else if (keyCode == RIGHT_ARROW) snake.changeDirection('right');
}

function draw() {
	background(34)
	snake.update();
	snake.show();

	if (snake.isSelfEating()) snake.reset();

	if (snake.eat(food)) {
		snake.grow();
		food = pickLocation();
	}
	text(`Total ${snake.tail.length}`, 30, 40);
	fill(255, 0, 85);
	rect(food.x, food.y, scl, scl);
}
