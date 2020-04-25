
import objectNoLimit from "../common/utils";

class Loot {
    constructor(_, pos) {
        this._   = _;
        this.pos = this._.createVector(
            pos.x,
            pos.y
        );
        this.vel = this._.createVector(
            this._.randomGaussian(.3, -.3),
            this._.randomGaussian(.3, -.3)
        );
        this.angle    = this._.random(0, this._.TWO_PI);
        this.angleVel = this._.random(-this._.QUARTER_PI / 30, this._.QUARTER_PI / 30);
        this.w        = 30;
        this.width    = 30;
    }

    show() {
        this._.noFill();
        this._.stroke(255);
        this._.strokeWeight(2);
        this._.push();
        this._.translate(this.pos.x, this.pos.y);
        this._.rotate(this.angle);
        this._.rect(-15, -15, 30, 30);
        this._.rect(-8, -15, 16, 30);
        this._.pop();
    }

    update() {
        this.angle += this.angleVel;
        this.pos.add(this.vel);
        objectNoLimit(this);
    }
}

export default Loot;
