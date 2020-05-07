
import Asteroid from "../classes/asteroid";
import Loot from "../classes/loot";

class AsteroidsController {
    constructor(_, soundController) {
        this._ = _;
        this.soundController = soundController;
        this.asteroids = [];
        this.levelAsteroidsMaximum = 12;
    }

    show() {
        
        for (let a = 0; a < this.asteroids.length; a++) {
            this.asteroids[a].show();
        }
    }

    update(cursor) {
        for (let a = 0; a < this.asteroids.length; a++) {
            this.asteroids[a].update();
        }
        // ASTEROIDS SPAWN
        if(cursor.life > 0) {
            if (this._.frameCount % 360 === 0) {
                if (this.asteroids.length > 0) {

                    // Fix the asteroids jam if player is inactive
                    if (this.asteroids.length < this.levelAsteroidsMaximum) {
                        this.asteroidCreate(100);
                        //asteroidSpawnSound.play();
                    }
                } else {
                    // LEVEL STAGE UP
                    //levelUpStage();
                }
            }
        }
    }

    asteroidCreate(size, origin) {
        let position;
        if (typeof origin !== 'undefined') {
            position = this._.createVector(origin.x, origin.y);
        } else {
            position = this._.createVector(this._.random(0, this._.width), this._.random(0, this._.height));
        }
        this.asteroids.push(new Asteroid(this._, size, position));
    }

    asteroidSubdivide(asteroidBefore, lootsController) {
        this.soundController.asteroidCrashSound.play();

        let randShape;
        if (asteroidBefore.w === 30) {
            // pouf
            return;
        } else if (asteroidBefore.w === 50) {
            randShape = 30;
        } else if (asteroidBefore.w === 100) {
            randShape = 50;
        }

        const lootRand = this._.random(0,5);
        if(lootRand > 2) {
            lootsController.loots.push(
                new Loot(this._, asteroidBefore.pos)
            );
        }

        this.asteroidCreate(randShape, asteroidBefore.pos),
        this.asteroidCreate(randShape, asteroidBefore.pos);
    }

}

export default AsteroidsController;