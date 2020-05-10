
import Asteroid from "../classes/asteroid";

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

    update(cursor, levelsController, bulletsController) {
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
                        this.soundController.asteroidSpawnSound.play();
                    }
                } else {
                    // LEVEL STAGE UP
                    levelsController.levelUpStage(bulletsController);
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

    asteroidRemove(index) {
        this.asteroids.splice(index, 1);
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

        lootsController.lootCreate(asteroidBefore.pos);

        this.asteroidCreate(randShape, asteroidBefore.pos),
        this.asteroidCreate(randShape, asteroidBefore.pos);
    }

    asteroidsSpawn(levelController) {
        const asteroidsLength = this._.map(levelController.level, 1, 3, 2, 6);
        for (let a = 0; a < asteroidsLength; a++) {
            let randShape, rand = Math.floor(this._.random(1, 4));

            if (rand === 1) {
                randShape = 30;
            } else if (rand === 2) {
                randShape = 50;
            } else if (rand === 3) {
                randShape = 100;
            }
            this.asteroidCreate(randShape);
        }
    }

}

export default AsteroidsController;