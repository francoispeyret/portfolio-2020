import * as p5 from "p5";
import * as p5moduleSound from  "p5/lib/addons/p5.sound";

import Cursor from "./classes/cursor";
import Gravity from "./classes/gravity";
import Ui from "./classes/ui";

import AsteroidsController from './controllers/asteroids';
import BallsController from "./controllers/balls";
import BulletsController from "./controllers/bullets";
import ExplosionsController from './controllers/explosions';
import LootsController from './controllers/loots';
import ScoresController from './controllers/scores';
import SoundController from './controllers/sounds';
import LevelsController from './controllers/levels';

let s = (_) => {
    //----------------------------//
    //        GAME OVERLAY        //
    //----------------------------//
    let debug   = false,
        cursor  = null,
        gravity = null,
        ui      = null,

        ballsController      = null,
        bulletsController    = null,
        asteroidsController  = null,
        explosionsController = null,
        lootsController      = null,
        soundController      = null,
        scoresController     = null,
        levelsController     = null,

        gameStarted = false,
        gameResume  = false,
        lifeMax     = 3;

    document.querySelector('#play-start').addEventListener('click', () => {
        gameStarted = true;
        document.querySelector('#home').classList.add('started');
        if(soundController.sound)
            soundController.soundInit();
        else
            soundController.soundMute();
    });


    _.preload = () => {
        soundController = new SoundController(_);
    };

    _.setup = () => {
        let canvas = _.createCanvas(_.windowWidth - 20, _.windowHeight);
        canvas.parent('p5-holder');
        _.frameRate(60);

        cursor = new Cursor(_),
        gravity = new Gravity(_),
        ui = new Ui(_),
        ballsController = new BallsController(_),
        bulletsController = new BulletsController(_, soundController),
        asteroidsController = new AsteroidsController(_, soundController),
        explosionsController = new ExplosionsController(_),
        lootsController = new LootsController(_),
        scoresController = new ScoresController(_),
        levelsController = new LevelsController(_);

    };

    _.draw = () => {
        // game not init or BREAKPOINT for Mobile Devices
        if (!gameStarted || _.width < 769) {
            return;
        }

        _.clear();
        _.textFont('Proxima');

        // INTERFACE
        if(cursor.life > 0) {

            // SCORING $$$
            ui.show(cursor, levelsController, scoresController);

            // \\ INTERFACE
            // STAGE ANNONCEMENT
            levelsController.show();
            levelsController.update(asteroidsController);
            if (levelsController.animationInProgress()) {
                return;
            }
        }
        _.push();

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

                        explosionsController.createExplosion(
                            asteroidsController.asteroids[a].pos,
                            asteroidsController.asteroids[a].w
                            );

                        asteroidsController.asteroidSubdivide(asteroidsController.asteroids[a],lootsController);
                        asteroidsController.asteroids.splice(a, 1);
                        break;
                    }
                }
                for (let o = 0; o < lootsController.loots.length; o++) {
                    if (cursor.pos.dist(lootsController.loots[o].pos) < lootsController.loots[o].w) {
                        soundController.cursorLootSound.play();
                        scoresController.scoreCreate(250, lootsController.loots[o].pos);
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

        gravity.show(_);
        gravity.update(asteroidsController.asteroids);


        // LOOTS
        lootsController.show();
        lootsController.update();

        // ASTEROIDS
        asteroidsController.show();
        asteroidsController.update(cursor, levelsController, bulletsController);

        // BULLETS
        bulletsController.show();
        bulletsController.update(asteroidsController, lootsController, explosionsController, scoresController);

        // EXPLOSIONS
        explosionsController.show();
        explosionsController.update();

        // SCORES
        scoresController.show();
        scoresController.update();

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
        if (levelsController.animationInProgress()) {
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
};

const P5 = new p5(s);
