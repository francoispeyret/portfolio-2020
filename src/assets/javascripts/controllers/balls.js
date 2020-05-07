
import Ball from "../classes/ball";

class BallsController {
    constructor(_) {
        this.balls = [];
        for (let i = 0; i < 33; i++) {
            this.balls[i] = new Ball(_);
        }
    }

    show() {
        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].show();
        }
    }

    update() {
        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].update();
        }
    }

}

export default BallsController;