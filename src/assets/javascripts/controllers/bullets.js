import Explosion from '../classes/explosion';

class BulletsController {
    constructor(_) {
        this._ = _;
        this.bullets = [];
    }

    show() {
        this._.fill(255);
        this._.noStroke();
        for (let b = 0; b < this.bullets.length; b++) {
            this._.rect(this.bullets[b].pos.x, this.bullets[b].pos.y, 6, 6);
        }
    }

    update(asteroidsController, lootsController, explosionsController) {
        for (let b = 0; b < this.bullets.length; b++) {

            this.bullets[b].pos.add(this.bullets[b].target);

            if (this.bulletOutOfView(this.bullets[b])) {
                this.bulletRemove(b);
                b--;
            }

            let asteroids = asteroidsController.asteroids;

            for (let a = 0; a < asteroids.length; a++) {
                if (typeof this.bullets[b] !== 'undefined') {
                    if (asteroids[a].pos.dist(this.bullets[b].pos) <= asteroids[a].w / 2) {
                        explosionsController.createExplosion(asteroids[a].pos,asteroids[a].w);
                        asteroidsController.asteroidSubdivide(asteroids[a], lootsController);
                        //scoreAddAmount(asteroids[a].w, asteroids[a].pos);
                        asteroids.splice(a, 1);
                        this.bulletRemove(b);
                        break;
                    }
                }
            }

            let loots = lootsController.loots;

            for (let o = 0; o < loots.length; o++) {
                if (typeof this.bullets[b] !== 'undefined') {
                    if (loots[o].pos.dist(this.bullets[b].pos) <= loots[o].w / 1.5) {
                        explosionsController.createExplosion(loots[o].pos,loots[o].w);
                        //asteroidCrashSound.play();
                        //scoreAddAmount(125, loots[o].pos);
                        loots.splice(o, 1);
                        this.bulletRemove(b);
                        break;
                    }
                }
            }
        }        
    }

    bulletOutOfView(bullet) {
        return  bullet.pos.x + 6 < 0 ||
                bullet.pos.x - 6 > this._.width ||
                bullet.pos.y + 6 < 0 ||
                bullet.pos.y - 6 > this._.height;
    }

    bulletRemove(index) {
        this.bullets.splice(index, 1);
    }

    fire(cursor) {
        this.bullets.push({
            pos: 
                this._.createVector(cursor.pos.x, cursor.pos.y),
            target: 
                this._.createVector(
                    this._.mouseX - cursor.pos.x,
                    this._.mouseY - cursor.pos.y
                ).limit(20)
        });
    }

}

export default BulletsController;