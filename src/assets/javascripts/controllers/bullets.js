import Explosion from '../classes/explosion';

class BulletsController {
    constructor(_, soundController) {
        this._ = _;
        this.bullets = [];
        this.soundController = soundController;
    }

    show() {
        this._.fill(255);
        this._.noStroke();
        for (let b = 0; b < this.bullets.length; b++) {
            this._.rect(this.bullets[b].pos.x-3, this.bullets[b].pos.y-3, 6, 6);
        }
    }

    update(asteroidsController, lootsController, explosionsController, scoresController) {
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
                        scoresController.scoreCreate(asteroids[a].w, asteroids[a].pos);
                        //scoreAddAmount(asteroids[a].w, asteroids[a].pos);
                        asteroidsController.asteroidRemove(a);
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
                        this.soundController.asteroidCrashSound.play();
                        scoresController.scoreCreate(125, loots[o].pos);
                        //scoreAddAmount(125, loots[o].pos);
                        lootsController.lootRemove(o);
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