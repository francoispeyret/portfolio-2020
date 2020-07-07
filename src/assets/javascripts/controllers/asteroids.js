
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
        if(typeof size === 'undefined')
            return console.error('asteroidCreate has size undefined');

        let position;
        if (typeof origin !== 'undefined') {
            position = this._.createVector(origin.x, origin.y);
        } else {
            const borderSpawn = Math.floor(this._.random(0,4));
            const offsetDiv   = 3; // high is less

            position    = this._.createVector(0,0);
            switch (borderSpawn) {
                case 0:
                    position.set(
                        this._.random(this._.width, this._.width + this._.width/offsetDiv),
                        this._.random(0, this._.height)
                    );
                    break;
                case 1:
                    position.set(
                        this._.random(-this._.width/offsetDiv, 0),
                        this._.random(0, this._.height)
                    );
                    break;
                case 2:
                    position.set(
                        this._.random(0, this._.width),
                        this._.random(-this._.height/offsetDiv, 0)
                    );
                    break;
                case 3:
                    position.set(
                        this._.random(0, this._.width),
                        this._.random(this._.height, this._.height + this._.height/offsetDiv)
                    );
                    break;
            }
        }
        this.asteroids.push(
            new Asteroid(this._, size, position)
        );
    }

    asteroidRemove(index) {
        if(typeof index === 'undefined')
            return console.error('asteroidRemove has index undefined');
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

            switch (rand) {
                case 1:
                    randShape = 30;
                    break;
                case 2:
                    randShape = 50;
                    break;
                case 3:
                    randShape = 100;
                    break;
            }
            this.asteroidCreate(randShape);
        }
    }

}

export default AsteroidsController;
