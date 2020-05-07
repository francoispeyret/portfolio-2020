import * as p5 from "p5";
import * as p5moduleSound from  "p5/lib/addons/p5.sound";

import Cursor from "./classes/cursor";
import Explosion from "./classes/explosion";
import BallsController from "./controllers/balls";
import BulletsController from "./controllers/bullets";
import AsteroidsController from './controllers/asteroids';
import ExplosionsController from './controllers/explosions';
import LootsController from './controllers/loots';
import SoundController from './controllers/sounds';

let s = (_) => {
    //----------------------------//
    //        GAME OVERLAY        //
    //----------------------------//
    let debug = false,
        sound = false,
        cursor,
        ballsController      = null,
        bulletsController    = null,
        asteroidsController  = null,
        explosionsController = null,
        lootsController      = null,
        soundController      = null,
        explosions = [],
        scoring = 0,
        scoreText = [],
        gameStarted = false,
        gameResume = false,
        startingAnimation = 90,
        lifeMax = 3,
        level = 1,
        levelAnimation = 90;

    document.querySelector('#play-start').addEventListener('click', () => {
        gameStarted = true;
        document.querySelector('#home').classList.add('started');
        if(sound)
        soundController.soundInit();
        else
        soundController.soundMute();
    });

    document.querySelector('.sound').addEventListener('click', () => {
        if(sound) {
            soundController.soundMute();
            document.querySelector('.sound').classList.remove('active');
        } else {
            soundController.soundInit();
            document.querySelector('.sound').classList.add('active');
        }
        sound = !sound;
    });

    _.preload = () => {
        soundController = new SoundController(_);
    };

    _.setup = () => {
        let canvas = _.createCanvas(_.windowWidth - 20, _.windowHeight);
        canvas.parent('p5-holder');
        _.frameRate(30);

        cursor = new Cursor(_),
        ballsController = new BallsController(_),
        bulletsController = new BulletsController(_),
        asteroidsController = new AsteroidsController(_, soundController),
        explosionsController = new ExplosionsController(_),
        lootsController = new LootsController(_);

    };

    _.draw = () => {
        _.clear();

        // BREAKPOINT for Mobile Devices
        if (_.width < 769)
            return;

        _.clear();
        _.textFont('Proxima');

        if (!gameStarted) {
            return;
        }

        // INTERFACE
        if(cursor.life > 0) {

            // SCORING $$$

            _.noStroke();
            _.fill(255);
            _.textAlign(_.LEFT);
            _.textSize(28);
            _.text('€' + scoring, 25, 110);
            _.textSize(14);
            _.text('LVL' + level, 25, 160);

            // LIFEs
            _.noFill();
            _.stroke(255);
            for (let o = 0; o < lifeMax; o++) {
                if (o < cursor.life) {
                    _.fill(255);
                } else {
                    _.noFill();
                }
                _.rect(25 + (o * 15), 121, 8, 18);
            }
            _.stroke(255);
            _.noFill();

            for (let s = 0; s < scoreText.length; s++) {
                const amoutFontSize = _.map(scoreText[s].amount, 40, 100, 14, 22);

                _.noStroke();
                _.fill(255, scoreText[s].life/2);
                _.textSize(amoutFontSize);
                _.text('+' + scoreText[s].amount, scoreText[s].pos.x, scoreText[s].pos.y);
                scoreText[s].pos.add(_.createVector(0, -0.5));

                scoreText[s].life-=6;
                if (scoreText[s].life <= 0) {
                    scoreText.splice(s, 1);
                    s--;
                }
            }

            // \\ INTERFACE
            // STAGE ANNONCEMENT
            if (levelAnimation > 1) {
                _.fill(255);
                const levelTextSize = _.map(levelAnimation, 90, 1, 0, 48);
                _.textSize(levelTextSize);
                _.textAlign(_.CENTER);
                _.text('LEVEL' + level, _.width / 2, _.height / 2);
                levelAnimation--;
                if (levelAnimation <= 1) {
                    asteroidsSpawn();
                }
                return;
            }


        }
        _.push();
        if(cursor.life > 0) {
            // animation scaling

            if (startingAnimation > 1) {
                startingAnimation--;
                const  scalingAnimation = _.map(startingAnimation, 90, 1, 0, 1),
                    translateAnimationX = _.map(startingAnimation, 90, 1, _.width / 2, 0),
                    translateAnimationY = _.map(startingAnimation, 90, 1, _.height / 2, 0);

                _.translate(translateAnimationX, translateAnimationY);
                _.scale(scalingAnimation, scalingAnimation);
            }
        }

        // BALLS
        ballsController.show();
        ballsController.update();

        _.noFill();

        // CURSOR
        cursor.show();

        if(cursor.life > 0) {
            // CURSOR - CHECK COLISION
            if (cursor.dammageAnimationCount < 1) {
                for (let a = 0; a < asteroidsController.asteroids.length; a++) {
                    if (cursor.pos.dist(asteroidsController.asteroids[a].pos) < asteroidsController.asteroids[a].w / 2) {
                        cursor.life--;
                        cursor.dammageAnimationCount = 90;
                        soundController.cursorDamageSound.play();
                        explosions.push(new Explosion(_,asteroidsController.asteroids[a].pos,asteroidsController.asteroids[a].w));
                        asteroidsController.asteroidSubdivide(asteroidsController.asteroids[a],lootsController);
                        asteroidsController.asteroids.splice(a, 1);
                        break;
                    }
                }
                for (let o = 0; o < lootsController.loots.length; o++) {
                    if (cursor.pos.dist(lootsController.loots[o].pos) < lootsController.loots[o].w) {
                        soundController.cursorLootSound.play();
                        scoreAddAmount(250, lootsController.loots[o].pos);
                        lootsController.loots.splice(o, 1);
                        if(cursor.life < lifeMax) {
                            cursor.life++;
                        }
                        break;
                    }
                }
            } else {
                cursor.dammageAnimationCount--;
            }
        } else {
            if (_.frameCount % 20 === 0 && asteroidsController.asteroids.length) {
                
                explosionsController.createExplosion(
                    asteroidsController.asteroids[0].pos,
                    asteroidsController.asteroids[0].w
                    );
                asteroidsController.asteroidSubdivide(asteroidsController.asteroids[0],lootsController);
                asteroidsController.asteroids.splice(0, 1);
            }
            if (_.frameCount % 20 === 10 && lootsController.loots.length) {
                explosionsController.createExplosion(
                    lootsController.loots[0].pos,
                    lootsController.loots[0].w
                    );
                soundController.asteroidCrashSound.play();
                lootsController.loots.splice(0, 1);
            }
        }


        // LOOTS
        lootsController.show();
        lootsController.update();

        // ASTEROIDS
        asteroidsController.show();
        asteroidsController.update(cursor);

        // BULLETS
        bulletsController.show();
        bulletsController.update(asteroidsController, lootsController, explosionsController);

        // EXPLOSIONS
        explosionsController.show();
        explosionsController.update();

        _.pop();

        if (gameResume === true) {
            _.fill(255, 50);
            _.rect(0, 0, _.width, _.height);
        }
    };

    window.addEventListener('mousedown', (e) => {
        if (gameStarted === false) {
            return;
        }
        if (gameResume === true) {
            resumeGame();
            return;
        }
        if (cursor.dammageAnimationCount > 1) {
            return;
        }
        if (levelAnimation > 1 || startingAnimation > 1) {
            return;
        }
        e.preventDefault();
        soundController.cursorFireSound.play();
        cursor.clickedAnimationCount = 45;

        bulletsController.fire(cursor);
    });

    window.addEventListener('blur', (e) => {
        resumeGame();
    });

    function resumeGame() {
        if (gameStarted) {
            gameResume = !gameResume;
            document.querySelector('#home').classList.add('resumed');
            if (gameResume === true) {
                document.querySelector('#home').classList.add('resumed');
                _.noLoop();
            } else {
                document.querySelector('#home').classList.remove('resumed');
                _.loop();
            }
            _.resizeCanvas(_.windowWidth - 20, _.windowHeight);
        }
    }

    window.addEventListener('resize',
        _.resizeCanvas(_.windowWidth - 20, _.windowHeight)
    );


    function asteroidsSpawn() {
        const asteroidsLength = _.map(level, 1, 3, 2, 6);
        for (let a = 0; a < asteroidsLength; a++) {
            let randShape, rand = Math.floor(_.random(1, 4));

            if (rand === 1) {
                randShape = 30;
            } else if (rand === 2) {
                randShape = 50;
            } else if (rand === 3) {
                randShape = 100;
            }
            asteroidsController.asteroidCreate(randShape);
        }
    }

    function scoreAddAmount(amount, asteroidPosition) {
        if (amount > 0) {
            scoring += amount;
            let scoreTextPos = _.createVector(asteroidPosition.x, asteroidPosition.y);
            scoreTextPos.add(_.createVector(_.random(-40, 40), _.random(40, -40)))
            scoreText.push({
                pos: scoreTextPos,
                amount: amount,
                life: 505
            });
        }
    }

    function levelUpStage() {
        level++;
        levelAnimation = 90;
        levelAsteroidsMaximum = _.map(level, 1, 3, 8, 25);
        bulletsController = new BulletsController(_);
    }

};
const P5 = new p5(s);
