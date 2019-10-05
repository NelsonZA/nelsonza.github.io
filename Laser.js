class Laser {
	constructor(s_pos, angle) {
		this.pos;
		this.velocity;
		this.pos = createVector(s_pos.x, s_pos.y);
		this.velocity = p5.Vector.fromAngle(angle); /////////////
		this.velocity.mult(10);
	}

	update() {
		this.pos.add(this.velocity);
	}

	show() {
		push();
		stroke(178, 0, 255);
		strokeWeight(6);
		point(this.pos.x, this.pos.y);
		pop();
	}

	hits(asteroid) {
		let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
		if (d < asteroid.r) {
			for (let ship of ships) {
				ship.score += 10;
			}
			// println(ship.score);
			return true;
		}
		return false;
	}
}
