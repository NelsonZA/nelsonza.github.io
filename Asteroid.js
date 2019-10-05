class Asteroid {
	constructor(p, rS) {
		this.pos;
		this.r;
		this.total;
		this.offset = [];
		this.velocity;
		this.oSize;
		if (p != null) {
			this.pos = p.copy();
		} else {
			this.pos = createVector(random(width), random(height));
			for (let ship of ships) {
				let d = dist(this.pos.x, this.pos.y, ship.pos.x, ship.pos.y);
				do {
					this.pos = createVector(random(width), random(height));
				} while (d < this.r + ship.r);
			}
		}
		if (rS != -1) {
			this.r = rS * 0.5;
			//oSize = 80;
		} else if (rS == -1) {
			this.r = random(15, 50) * scalar;
			//oSize = 20;
		}
		this.total = floor(random(5, 15));
		for (let i = 0; i < this.total; i++) {
			this.offset[i] = random(-this.r * 0.25, this.r * 0.25);
		}
		this.velocity = p5.Vector.random2D(); /////////////
		this.velocity.mult(3);
	}

	update() {
		this.pos.add(this.velocity);
	}

	show() {
		push();
		translate(this.pos.x, this.pos.y);
		fill(0);
		strokeWeight(3);
		stroke(255, 216, 0);
		beginShape();
		for (let i = 0; i < this.total; i++) {
			let angle = map(i, 0, this.total, 0, TWO_PI);
			let rO = this.r + this.offset[i];
			let x = rO * cos(angle);
			let y = rO * sin(angle);
			vertex(x, y);
		}
		endShape(CLOSE);
		pop();
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

	breakup() {
		let newA = [];
		newA.push(new Asteroid(this.pos, this.r));
		newA.push(new Asteroid(this.pos, this.r));
		return newA;
	}
}
