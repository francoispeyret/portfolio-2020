
import objectNoLimit from "../common/utils";

class Asteroid {
    constructor(_, size, position) {
        this._ = _;
        this.pos = position;
        this.seed = Math.floor(this._.random(1, 3));
        this.vel = this._.createVector(this._.random(1.8, -1.8), this._.random(1.8, -1.8));
        this.w = size;
        this.spawnAnimation = 20;
        this.angle = this._.random(0, this._.TWO_PI);
        this.angleVel = this._.random(-this._.QUARTER_PI / 30, this._.QUARTER_PI / 30);
    }

    update() {
        this.angle += this.angleVel;

        if (this.spawnAnimation > 1)
            this.spawnAnimation--;
        this.pos.add(this.vel);

        objectNoLimit(this);
    }

    show() {
        this._.push();
            this._.translate(this.pos.x, this.pos.y);
            this._.rotate(this.angle);
            this.asteroidShape();
        this._.pop();
    }

    asteroidShape() {
        /*if (debug) {
            this._.noFill();
            this._.stroke(255, 0, 0);
            this._.strokeWeight(1);
            this._.circle(0, 0, this.w, this.w);
        }*/
        const alpha = this._.map(this.spawnAnimation, 20, 1, 0, 255);
        this._.stroke(255, alpha);
        this._.strokeWeight(2);
        this._.noFill();

        this._.push();
        this._.beginShape();
        this._.translate(-this.w / 2, -this.w / 2);
        if (this.w == 30) {
            if (this.seed == 1) {
                this._.vertex(4, 7);
                this._.vertex(20, 5);
                this._.vertex(23, 15);
                this._.vertex(15, 25);
                this._.vertex(5, 20);
            } else if (this.seed == 2) {
                this._.vertex(0, 7);
                this._.vertex(6, 2);
                this._.vertex(20, 5);
                this._.vertex(23, 15);
                this._.vertex(18, 18);
                this._.vertex(12, 22);
                this._.vertex(5, 20);
            }
        } else if (this.w == 50) {
            if (this.seed == 1) {
                this._.vertex(8, 10);
                this._.vertex(22, 13);
                this._.vertex(40, 9);
                this._.vertex(50, 15);
                this._.vertex(40, 25);
                this._.vertex(45, 35);
                this._.vertex(45, 45);
                this._.vertex(30, 45);
                this._.vertex(16, 40);
                this._.vertex(5, 25);
            } else if (this.seed == 2) {
                this._.vertex(8, 7);
                this._.vertex(20, 5);
                this._.vertex(40, 9);
                this._.vertex(50, 25);
                this._.vertex(45, 45);
                this._.vertex(30, 35);
                this._.vertex(16, 40);
                this._.vertex(5, 25);
            }
        } else if (this.w == 100) {
            if (this.seed == 1) {
                this._.vertex(22, 7);
                this._.vertex(40, 12);
                this._.vertex(60, 9);
                this._.vertex(75, 35);
                this._.vertex(65, 65);
                this._.vertex(40, 80);
                this._.vertex(20, 80);
                this._.vertex(14, 60);
                this._.vertex(16, 40);
                this._.vertex(10, 19);
            } else if (this.seed == 2) {
                this._.vertex(60, 9);
                this._.vertex(75, 35);
                this._.vertex(80, 75);
                this._.vertex(55, 70);
                this._.vertex(40, 75);
                this._.vertex(14, 60);
                this._.vertex(16, 40);
                this._.vertex(22, 5);
            }
        }
        this._.endShape(this._.CLOSE);
        this._.pop();
    }
}

export default Asteroid;
