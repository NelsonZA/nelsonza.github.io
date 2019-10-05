//Ship ship;
let ships = [];
let scalar = 2;
let asteroids = [];
let lasers = [];
let totalAsteroids = 5;
let isGameOver = false;

function setup() {
	createCanvas(1000, 1000);

	//ship = new Ship();
	ships.push(new Ship());

	for (let i = 0; i < totalAsteroids; i++) {
		asteroids.push(new Asteroid(null, -1));
	}
}

function draw() {
	// logic

	if (!isGameOver) {
		for (let ship of ships) {
			ship.turn();
			ship.update();
			ship.edges();
		}

		for (let asteroid of asteroids) {
			asteroid.update();
			asteroid.edges();
		}

		for (let i = ships.length - 1; i >= 0; i--) {
			for (let j = asteroids.length - 1; j >= 0; j--) {
				if (ships[i].hits(asteroids[j])) {
					isGameOver = true;
					//ships.removeElementAt(i);
					//asteroids.removeElementAt(j);
					//gameOver();
					//ship.setColor();
					//println("I hit asteroid index: " + i);
				} else {
					//ship.setColor();
				}
			}
		}

		for (let laser of lasers) {
			laser.update();
		}
		//laser hit asteroid
		for (let i = lasers.length - 1; i >= 0; i--) {
			for (let j = asteroids.length - 1; j >= 0; j--) {
				if (lasers[i].hits(asteroids[j])) {
					let minSize = asteroids[j].r;
					if (minSize > 30) {
						let newAsteroids = asteroids[j].breakup();
						asteroids.push(newAsteroids[0]);
						asteroids.push(newAsteroids[1]);
					}
					asteroids.splice(j, 1);
					lasers.splice(i, 1);
					break;
				}
			}
		}
		// delete offscreen bullet
		for (let i = lasers.length - 1; i >= 0; i--) {
			if (lasers[i].pos.x > width) {
				lasers.splice(i, 1);
			} else if (lasers[i].pos.x < 0) {
				lasers.splice(i, 1);
			} else if (lasers[i].pos.y > height) {
				lasers.splice(i, 1);
			} else if (lasers[i].pos.y < 0) {
				lasers.splice(i, 1);
			}
		}

		if (asteroids.length < totalAsteroids) {
			asteroids.push(new Asteroid(null, -1));
		}
	} else if (isGameOver) {
		gameOver();
	}

	// draw
	background(0);
	frameRate(60);

	if (!isGameOver) {
		for (let laser of lasers) {
			laser.show();
		}
		for (let asteroid of asteroids) {
			asteroid.show();
		}
		for (let ship of ships) {
			ship.show();
		}
		showScore();
	} else if (isGameOver) {
		//showGameOver();
	}
}

function gameOver() {
	ships = [];
	asteroids = [];
	lasers = [];
	isGameOver = false;
	ships = [];
	scalar = 2;
	asteroids = [];
	lasers = [];
	totalAsteroids = 5;
	isGameOver = false;
	setup();
}

function showScore() {
	fill(255);
	textSize(64);
	noStroke();
	for (let ship of ships) {
		text('Score: ' + ship.score, 10, 70);
	}
}

function showGameOver() {
	fill(255, 0, 0);
	textSize(64);
	noStroke();
	text('Game Over!', width / 2 - 192, height / 2);
}

function keyPressed() {
	for (let ship of ships) {
		if (keyCode == 32) {
			ship.isShooting = true;
			//if (frameCount % 2 == 0) {
			lasers.push(new Laser(ship.pos, ship.heading));
			//}
		} else if (keyCode == 39) {
			ship.setRotation(0.1);
		} else if (keyCode == 37) {
			ship.setRotation(-0.1);
		} else if (keyCode == 38) {
			ship.boosting(true);
		}
	}
}

function keyReleased() {
	for (let ship of ships) {
		if (keyCode == 39 || keyCode == 37) {
			ship.setRotation(0);
		}
		if (keyCode == 38) {
			ship.boosting(false);
		}
		if (keyCode == 32) {
		}
	}
}
