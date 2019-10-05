class Ship {
	constructor() {
		this.pos;
		this.r;
		this.heading;
		// 90degrees (right) = PI / 2 (PI/2radians)
		this.rotation;
		this.velocity;
		this.isBoosting;
		this.wasHit = false;
		this.score = 0;
		this.shootCoolDown = 1;
		this.shootCoolDownTimer;
		this.isShooting = false;
		this.frontShip;
		this.pos = createVector(width / 2, height / 2);
		this.frontShip = createVector(0, -this.r);
		this.r = 20 * scalar * 0.75;
		this.heading = 0;
		this.rotation = 0;
		this.velocity = createVector(0, 0);
		this.isBoosting = false;
	}

	boosting(b) {
		this.isBoosting = b;
	}

	boost() {
		let force = p5.Vector.fromAngle(this.heading); ///////////
		force.mult(0.3);
		this.velocity.add(force);
	}

	update() {
		if (this.isBoosting) {
			this.boost();
		}
		this.pos.add(this.velocity);
		this.velocity.mult(0.98);
		this.frontShip.x = float(0 + this.pos.x);
		this.frontShip.y = float(-this.r + this.pos.y);

		if (this.shootCoolDownTimer > 0) {
			this.shootCoolDownTimer -= 0.2;
		}

		if (this.shootCoolDownTimer < 0) {
			this.shootCoolDownTimer = 0;
		}

		if (this.isShooting) {
			this.shootCoolDownTimer = this.shootCoolDown;
			this.isShooting = false;
		}
	}

	show() {
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.heading + PI / 2);
		fill(0);
		strokeWeight(3);
		if (!this.wasHit) {
			stroke(0, 255, 0);
		} else if (this.wasHit) {
			stroke(255, 0, 0);
		}
		//stroke(0, 255, 0);
		triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
		stroke(0, 255, 0);
		strokeWeight(12);
		point(0, -this.r);
		pop();
	}

	setRotation(angle) {
		this.rotation = angle;
	}

	turn() {
		this.heading += this.rotation;
	}

	edges() {
		if (this.pos.x > width + this.r) {
			this.pos.x = -this.r;
		} else if (this.pos.x < -this.r) {
			this.pos.x = width + this.r;
		}
		if (this.pos.y > height + this.r) {
			this.pos.y = -this.r;
		} else if (this.pos.y < -this.r) {
			this.pos.y = height + this.r;
		}
	}

	hits(a) {
		let d = dist(this.pos.x, this.pos.y, a.pos.x, a.pos.y);
		if (d < this.r + a.r) {
			return true;
		}
		return false;
	}

	setColor() {
		if (!this.wasHit) {
			this.wasHit = true;
		} else if (wasHit) {
			this.wasHit = false;
		}
	}
}
