import Explosion from '../classes/explosion';

class ExplosionsController {
    constructor(_) {
        this._ = _;
        this.explosions = [];
    }

    show() {
        for (let i = 0; i < this.explosions.length; i++) {
            this.explosions[i].show();
        }
    }

    update() {
        for (let i = 0; i < this.explosions.length; i++) {
            this.explosions[i].update();
            if(this.explosions[i].lifeAnimation < -100) {
                this.explosions.splice(i, 1);
            }
        }
    }

    createExplosion(position, size) {
        this.explosions.push(
            new Explosion(this._, position, size)
        );
    }

}

export default ExplosionsController;