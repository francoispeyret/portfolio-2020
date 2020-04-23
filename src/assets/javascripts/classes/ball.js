
import objectNoLimit from "../common/utils";

class Ball {
    constructor(_) {
        this._ = _;
        this.pos = this._.createVector(
            this._.random(0, this._.width),
            this._.random(0, this._.height)
            );
        this.w   = Math.floor(this._.random(2, 12));
        this.vel = this._.createVector(
            this._.randomGaussian(.75, -.75),
            this._.randomGaussian(.75, -.75)
            );
    }

    show() {
        this._.stroke(255, this._.map(this.w, 2, 16, 15, 70));
        this._.strokeWeight(this.w);
        this._.point(this.pos.x, this.pos.y);
    }

    update() {
        this.pos.add(this.vel);
        objectNoLimit(this);
    }
}

export default Ball;
