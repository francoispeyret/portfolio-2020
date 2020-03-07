class Asteroid {
    constructor(size, position) {
        this.pos = position;
        this.seed = Math.floor(random(1, 3));
        this.vel = createVector(random(1.8, -1.8), random(1.8, -1.8));
        this.w = size;
        this.spawnAnimation = 20;
        this.angle = random(0, TWO_PI);
        this.angleVel = random(-QUARTER_PI / 30, QUARTER_PI / 30);
    }

    update() {
        this.angle += this.angleVel;

        if (this.spawnAnimation > 1)
            this.spawnAnimation--;
        this.pos.add(this.vel);

        objectNoLimit(this);
    }

    show() {
        push();
            translate(this.pos.x, this.pos.y);
            rotate(this.angle);
            this.asteroidShape();
        pop();
    }

    asteroidShape() {
        if (debug) {
            noFill();
            stroke(255, 0, 0);
            strokeWeight(1);
            circle(0, 0, this.w, this.w);
        }
        const alpha = map(this.spawnAnimation, 20, 1, 0, 255);
        stroke(255, alpha);
        strokeWeight(2);
        noFill();
    
        push();
        beginShape();
        translate(-this.w / 2, -this.w / 2);
        if (this.w == 30) {
            if (this.seed == 1) {
                vertex(4, 7);
                vertex(20, 5);
                vertex(23, 15);
                vertex(15, 25);
                vertex(5, 20);
            } else if (this.seed == 2) {
                vertex(0, 7);
                vertex(6, 2);
                vertex(20, 5);
                vertex(23, 15);
                vertex(18, 18);
                vertex(12, 22);
                vertex(5, 20);
            }
        } else if (this.w == 50) {
            if (this.seed == 1) {
                vertex(8, 10);
                vertex(22, 13);
                vertex(40, 9);
                vertex(50, 15);
                vertex(40, 25);
                vertex(45, 35);
                vertex(45, 45);
                vertex(30, 45);
                vertex(16, 40);
                vertex(5, 25);
            } else if (this.seed == 2) {
                vertex(8, 7);
                vertex(20, 5);
                vertex(40, 9);
                vertex(50, 25);
                vertex(45, 45);
                vertex(30, 35);
                vertex(16, 40);
                vertex(5, 25);
            }
        } else if (this.w == 100) {
            if (this.seed == 1) {
                vertex(22, 7);
                vertex(40, 12);
                vertex(60, 9);
                vertex(75, 35);
                vertex(65, 65);
                vertex(40, 80);
                vertex(20, 80);
                vertex(14, 60);
                vertex(16, 40);
                vertex(10, 19);
            } else if (this.seed == 2) {
                vertex(60, 9);
                vertex(75, 35);
                vertex(80, 75);
                vertex(55, 70);
                vertex(40, 75);
                vertex(14, 60);
                vertex(16, 40);
                vertex(22, 5);
            }
        }
        endShape(CLOSE);
        pop();
    }
}