import * as p5 from "p5";
import * as p5moduleSound from  "p5/lib/addons/p5.sound";

import Cursor from "./classes/cursor";
import Asteroid from "./classes/asteroid";
import Ball from "./classes/ball";
import Explosion from "./classes/explosion";

let s = (_) => {
    //----------------------------//
    //        GAME OVERLAY        //
    //----------------------------//
    let debug = false,
        sound = false,
        cursor,
        cursorFireSound,
        balls      = [],
        bullets    = [],
        explosions = [],
        asteroids  = [],
        asteroidSpawnSound,
        asteroidCrashSound,
        cursorDamageSound,
        ultimateDelay = 30,
        scoring = 0,
        scoreText = [],
        gameStarted = false,
        gameResume = false,
        startingAnimation = 90,
        lifeMax = 5,
        level = 1,
        levelAnimation = 180,
        levelAsteroidsMaximum = 12;

    document.querySelector('#play-start').addEventListener('click', () => {
        gameStarted = true;
        document.querySelector('#home').classList.add('started');
        if(sound)
            soundInit();
    });

    document.querySelector('.sound').addEventListener('click', () => {
        if(sound) {
            soundMute();
            document.querySelector('.sound').classList.remove('active');
        } else {
            soundInit();
            document.querySelector('.sound').classList.add('active');
        }
        sound = !sound;
    });

    _.preload = () => {
        _.soundFormats('mp3', 'ogg');
        cursorFireSound    = _.loadSound('/assets/sounds/laser-beam.mp3');
        cursorDamageSound  = _.loadSound('/assets/sounds/cursor-damage.mp3');
        asteroidSpawnSound = _.loadSound('/assets/sounds/asteroid-spawn.mp3');
        asteroidCrashSound = _.loadSound('/assets/sounds/asteroid-explode.mp3');
    };

    _.setup = () => {
        let canvas = _.createCanvas(innerWidth - 4, innerHeight);
        canvas.parent('p5-holder');

        cursor = new Cursor(_);

        for (let i = 0; i < 33; i++) {
            balls[i] = new Ball(_);
        }

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
            _.text('€' + scoring, 25, 140);
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
                _.rect(25 + (o * 15), 93, 8, 18);
            }
            _.stroke(255);
            _.noFill();

            for (let s = 0; s < scoreText.length; s++) {
                const amoutFontSize = _.map(scoreText[s].amount, 40, 100, 14, 22),
                      amoutOpacity = _.map(scoreText[s].life, 100, 0, 255, 150);

                _.fill(255, amoutOpacity);
                _.textSize(amoutFontSize);
                _.text('+' + scoreText[s].amount, scoreText[s].pos.x, scoreText[s].pos.y);
                scoreText[s].pos.add(_.createVector(0, -0.5));

                scoreText[s].life--;
                if (scoreText[s].life <= 0) {
                    scoreText.splice(s, 1);
                    s--;
                }
            }

            // \\ INTERFACE
            // STAGE ANNONCEMENT
            if (levelAnimation > 1) {
                _.fill(255);
                const levelTextSize = _.map(levelAnimation, 180, 1, 0, 48);
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
                const scalingAnimation = _.map(startingAnimation, 90, 1, 0, 1),
                    translateAnimationX = _.map(startingAnimation, 90, 1, _.width / 2, 0),
                    translateAnimationY = _.map(startingAnimation, 90, 1, _.height / 2, 0);

                _.translate(translateAnimationX, translateAnimationY);
                _.scale(scalingAnimation, scalingAnimation);
            }
        }


        // BALLS
        for (let i = 0; i < balls.length; i++) {
            balls[i].show();
            balls[i].update();
        }
        _.noFill();

        // CURSOR
        cursor.show();

        if(cursor.life > 0) {
            // CURSOR - CHECK COLISION
            if (cursor.dammageAnimationCount < 1) {
                for (let a = 0; a < asteroids.length; a++) {
                    if (cursor.pos.dist(asteroids[a].pos) < asteroids[a].w / 2) {
                        cursor.life--;
                        cursor.dammageAnimationCount = 90;
                        cursorDamageSound.play();
                        asteroidSubdivide(asteroids[a]);
                        asteroids.splice(a, 1);
                        a--;
                        break;
                    }
                }
            } else {
                cursor.dammageAnimationCount--;
            }
        } else {
            if (_.frameCount % 20 === 0 && asteroids.length) {
                asteroidSubdivide(asteroids[0]);
                asteroids.splice(0, 1);
            }
        }


        // ASTEROIDS
        for (let a = 0; a < asteroids.length; a++) {
            asteroids[a].update();
            asteroids[a].show();
        }

        // ASTEROIDS SPAWN
        if(cursor.life > 0) {
            if (_.frameCount % 360 === 0) {
                if (asteroids.length > 0) {

                    // Fix the asteroids jam if player is inactive
                    if (asteroids.length < levelAsteroidsMaximum) {
                        let asteroidNewOne = asteroidCreate(100);
                        asteroids.push(asteroidNewOne);
                        asteroidSpawnSound.play();
                    }
                } else {
                    // LEVEL STAGE UP
                    levelUpStage();
                }
            }
        }

        // BULLETS

        _.fill(255);
        _.noStroke();
        for (let b = 0; b < bullets.length; b++) {
            _.rect(bullets[b].pos.x, bullets[b].pos.y, 6, 6);
            bullets[b].pos.add(bullets[b].target);
            if (
                bullets[b].pos.x + 6 < 0 ||
                bullets[b].pos.x - 6 > _.width ||
                bullets[b].pos.y + 6 < 0 ||
                bullets[b].pos.y - 6 > _.height
            ) {
                bullets.splice(b, 1);
                b--;
            }

            for (let a = 0; a < asteroids.length; a++) {
                if (typeof bullets[b] !== 'undefined') {
                    if (asteroids[a].pos.dist(bullets[b].pos) <= asteroids[a].w / 2) {
                        asteroidSubdivide(asteroids[a]);
                        scoreAddAmount(asteroids[a].w, asteroids[a].pos);
                        asteroids.splice(a, 1);
                        a--;
                        bullets.splice(b, 1);
                        b--;
                        break;
                    }
                }
            }
        }


        // EXPLOSIONS
        for (let i = 0; i < explosions.length; i++) {
            explosions[i].show();
            explosions[i].update();
            if(explosions[i].lifeAnimation < -100) {
                explosions.splice(i, 1);
            }
        }

        _.pop();

        if (gameResume === true) {
            _.fill(255, 50);
            _.rect(0, 0, _.width, _.height);
        }
    };

    window.addEventListener('mousedown', (e) => {
        if (gameResume === true) {
            resumeGame();
            return;
        }
        if (cursor.dammageAnimationCount > 1) {
            return;
        }
        if (e.target.id === 'header' || e.target.id === 'home' || e.target.id === 'skills' || e.target.id === 'contact' || e.target.id === 'footer') {
            if (levelAnimation > 1 || startingAnimation > 1) {
                return;
            }
            e.preventDefault();
            cursorFireSound.play();
            cursor.clickedAnimationCount = 45;

            bullets.push({
                pos: _.createVector(cursor.pos.x, cursor.pos.y),
                target: _.createVector(_.mouseX - cursor.pos.x, _.mouseY - cursor.pos.y).limit(12.5)
            });
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 17) {
            ultimateDelay = true;
            e.preventDefault();
            return false;
        }
    });

    window.addEventListener('blur', (e) => {
        resumeGame();
    });

    function resumeGame() {
        gameResume = !gameResume;
        document.querySelector('#home').classList.add('resumed');
        if (gameResume === true) {
            document.querySelector('#home').classList.add('resumed');
            _.noLoop();
        } else {
            document.querySelector('#home').classList.remove('resumed');
            _.loop();
        }
        _.resizeCanvas(window.innerWidth - 4, window.innerHeight)
    }

    window.addEventListener('resize',
        _.resizeCanvas(window.innerWidth - 4, window.innerHeight)
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
            asteroids.push(asteroidCreate(randShape));
        }
    }

    function asteroidSubdivide(asteroidBefore) {
        explosions.push(new Explosion(_,asteroidBefore.pos,asteroidBefore.w));
        asteroidCrashSound.play();

        let randShape;
        if (asteroidBefore.w === 30) {
            // pouf
            return;
        } else if (asteroidBefore.w === 50) {
            randShape = 30;
        } else if (asteroidBefore.w === 100) {
            randShape = 50;
        }

        let asteroidOne = asteroidCreate(randShape, asteroidBefore.pos),
            asteroidTwo = asteroidCreate(randShape, asteroidBefore.pos);

        asteroids.push(asteroidOne);
        asteroids.push(asteroidTwo);

    }

    function asteroidCreate(size, origin) {
        let position;
        if (typeof origin !== 'undefined') {
            position = _.createVector(origin.x, origin.y);
        } else {
            position = _.createVector(_.random(0, _.width), _.random(0, _.height));
        }
        return new Asteroid(_, size, position);
    }

    function scoreAddAmount(amount, asteroidPosition) {
        if (amount > 0) {
            scoring += amount;
            let scoreTextPos = _.createVector(asteroidPosition.x, asteroidPosition.y);
            scoreTextPos.add(_.createVector(_.random(-40, 40), _.random(40, -40)))
            scoreText.push({
                pos: scoreTextPos,
                amount: amount,
                life: amount
            });
        }
    }

    function levelUpStage() {
        level++;
        levelAnimation = 180;
        levelAsteroidsMaximum = _.map(level, 1, 3, 8, 25);
        bullets = [];
    }

    function soundInit() {
        // CURSOR LASER SOUND
        cursorFireSound.amp(0.5);
        // CURSOR DAMAGE
        cursorDamageSound.amp(0.33);
        // ASTEROID SPAWN
        asteroidSpawnSound.amp(1);
        // ASTEROID CRASH
        asteroidCrashSound.amp(0.5);
    }

    function soundMute() {
        // CURSOR LASER SOUND
        cursorFireSound.amp(0);
        // CURSOR DAMAGE
        cursorDamageSound.amp(0);
        // ASTEROID SPAWN
        asteroidSpawnSound.amp(0);
        // ASTEROID CRASH
        asteroidCrashSound.amp(0);
    }
};
const P5 = new p5(s);
