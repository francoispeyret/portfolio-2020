
//----------------------------//
//        GAME OVERLAY        //
//----------------------------//
let debug = false,
    cursor,
    cursorFireSound,
    balls = [],
    bullets = [],
    asteroids = [],
    asteroidSpawnSound,
    asteroidCrashSound,
    ultimateDelay = 30,
    scoring = 0,
    scoreText = [],
    gameStarted = false,
    gameResume = false,
    startingAnimation = 90,
    lifeMax = 5,
    level = 1,
    levelAnimation = 180,
    levelAsteroidsMaxium = 12;

const buttonStart = document.querySelector('#play-start');

buttonStart.addEventListener('click', () => {
    gameStarted = true;
    document.querySelector('#home').classList.add('started');
    soundInit();
});

function preload() {
    soundFormats('mp3', 'ogg');
    cursorFireSound     = loadSound('assets/sounds/lazer-beam');
    asteroidSpawnSound  = loadSound('assets/sounds/asteroid-spawn');
    asteroidCrashSound  = loadSound('assets/sounds/asteroid-explode');
}

function setup() {
    var canvas = createCanvas(innerWidth - 4, innerHeight);
    canvas.parent('p5-holder');

    cursor = {
        pos: createVector(width/2, height/2),
        w: 15,
        wMax: 15,
        clickedAnimationCount: 45,
        ultimateAnimationCount: 45,
        dammageAnimationCount: 0,
        life: 5
    };

    for(let i = 0; i < 33; i++) {
        balls[i] = {
            pos: createVector(random(0, width), random(0, height)),
            w: Math.floor(random(2, 12)),
            vel: createVector(randomGaussian(.75,-.75), randomGaussian(.75,-.75))
        };
    }

}

function draw() {
    clear();

	// BREAKPOINT for Mobile Devices
	if(width < 769) 
        return;
        
    clear();
    textFont('Proxima');

    if(!gameStarted) {
        return;
    }

    // INTERFACE

    // SCORING $$$
    
    noStroke();
    fill(255);
    textAlign(LEFT);
    textSize(28);
    text('€'+scoring, 25, 140);
    textSize(14);
    text('LVL'+level, 25, 160);
    
    // LIFEs
    noFill();
    stroke(255);
    for(let o = 0; o < lifeMax; o++ ) {
        if( o < cursor.life) {
            fill(255);
        } else {
            noFill();
        }
        rect(25 + (o*15),93,8,18);
    }
    stroke(255);
    noFill();

    for(let s = 0; s < scoreText.length; s++) {
        const   amoutFontSize = map(scoreText[s].amout, 40, 100, 14, 22),
                amoutOpacity = map(scoreText[s].life, 100, 0, 255, 150);

        fill(255, amoutOpacity);
        textSize(amoutFontSize);
        text('+'+scoreText[s].amout, scoreText[s].pos.x, scoreText[s].pos.y);
        scoreText[s].pos.add(createVector(0,-0.5));

        scoreText[s].life--;
        if(scoreText[s].life <= 0) {
            scoreText.splice(s, 1);
            s--;
        }
    }

    // \\ INTERFACE
    // STAGE ANNONCEMENT
    if(levelAnimation > 1) {
        fill(255);
        const levelTextSize = map(levelAnimation, 180, 1, 0, 48);
        textSize(levelTextSize);
        textAlign(CENTER);
        text('LEVEL'+level, width/2, height/2);
        levelAnimation--;
        if(levelAnimation <= 1) {
            asteroidsSpawn();
        }
        return;
    }

    

    // animation scaling
    push();

    if(startingAnimation > 1) {
        startingAnimation--;
        const   scalingAnimation = map(startingAnimation, 90, 1, 0, 1),
                translateAnimationX = map(startingAnimation, 90, 1, width/2, 0),
                translateAnimationY = map(startingAnimation, 90, 1, height/2, 0);

        translate(translateAnimationX, translateAnimationY);
        scale(scalingAnimation, scalingAnimation);
    }

    
    // BALLS
    for(let i = 0; i < balls.length; i++) {
        stroke(255, map(balls[i].w, 2, 16, 15, 70));
        strokeWeight(balls[i].w);
        point(balls[i].pos.x, balls[i].pos.y);

        balls[i].pos.add(balls[i].vel);

        objectNoLimit(balls[i]);
    }
    noFill();

    // CURSOR
    let angle = createVector(width / 2, 0).heading();
    if(mouseX != 0 || mouseY != 0) {
        let vel = createVector(mouseX - cursor.pos.x, mouseY - cursor.pos.y).div(100);
            mag = (vel.mag() / 6).toFixed(1);

        if( cursor.w - mag > 5) {
            cursor.w -= mag;
        }
        if( cursor.w < cursor.wMax ) {
            cursor.w += .5;
        }
        if(cursor.clickedAnimationCount > 0) {
            cursor.clickedAnimationCount--;
        }
        if(cursor.clickedAnimationCount >= 44 && typeof cursorFireSound !== 'undefined') {
            
            cursorFireSound.play();
        }

        if(cursor.pos.dist(createVector(mouseX, mouseY)) > 42) {
            cursor.pos.add(vel);
        }
        angle = createVector(mouseX - cursor.pos.x, mouseY - cursor.pos.y).heading();
    }
        
    noStroke();
    const cursorOpacity = map(sin(cursor.dammageAnimationCount/2),0,1,255,55);
    fill(255, cursorOpacity);
    push();
        translate(cursor.pos.x, cursor.pos.y);
        rotate(angle);
        beginShape();
            vertex(0, 0);
            vertex(-20, 10);
            vertex(-20, -10);
        endShape(CLOSE);
        
        if(ultimateDelay == true) {
            cursor.ultimateAnimationCount--;
            const ultimateDistance = map(cursor.ultimateAnimationCount, 45, 0, 0, width*1.5);
            
            beginShape();
                vertex(0, 0);
                vertex(4, -3);
                vertex(ultimateDistance, -60);
                vertex(ultimateDistance+50, -50);
                vertex(ultimateDistance+100, -20);
                vertex(ultimateDistance+115, 0);
                vertex(ultimateDistance+100, 20);
                vertex(ultimateDistance+50, 50);
                vertex(ultimateDistance, 60);
                vertex(4, 3);
            endShape(CLOSE);

            if(cursor.ultimateAnimationCount < 0) {
                cursor.ultimateAnimationCount = 45;
                ultimateDelay = false;
            }
        }
    pop();
    
    if(cursor.clickedAnimationCount > 0) {
        const cursorClickedSize = map(cursor.clickedAnimationCount, 45, 1, 0, cursor.w + 80);
        noFill();
        strokeWeight(2);
        stroke(255, map(cursorClickedSize, cursor.w, cursor.w + 80, 255, 0));
        circle(cursor.pos.x, cursor.pos.y, cursorClickedSize);
        
    }

    // CURSOR - CHECK COLISION
    if(cursor.dammageAnimationCount < 1) {
        for(let a = 0; a < asteroids.length; a++) {
            if(cursor.pos.dist(asteroids[a].pos) < asteroids[a].w / 2) {
                cursor.life--;
                cursor.dammageAnimationCount = 180;
                asteroidSubdivise(asteroids[a]);
                asteroids.splice(a, 1);
                a--;
                break;
            }
        }
    } else {
        cursor.dammageAnimationCount--;
    }


    // ASTEROIDS
    for(let a = 0; a < asteroids.length; a++) {
        asteroids[a].angle += asteroids[a].angleVel;
        push();
            translate(asteroids[a].pos.x, asteroids[a].pos.y);
            rotate(asteroids[a].angle);
            asteroidShape(asteroids[a].w, asteroids[a].seed, asteroids[a].spawnAnimation);
        pop();
        
        if(asteroids[a].spawnAnimation > 1)
            asteroids[a].spawnAnimation--;
        asteroids[a].pos.add(asteroids[a].vel);

        objectNoLimit(asteroids[a]);
    }

    // ASTEROIDS SPAWN
    if(frameCount % 360 == 0) {
        if( asteroids.length > 0) {

            // Fix the asteroids jam if player is inactive
            if( asteroids.length < levelAsteroidsMaxium) {
                let asteroidNewOne = asteroidCreate(100);
                asteroids.push(asteroidNewOne);
                asteroidSpawnSound.play();
            }
        } else {
            // LEVEL STAGE UP
            levelUpStage();
        }
    }

    // BULLETS
    
    fill(255);
    noStroke();
    for(let b = 0; b < bullets.length; b++) {
        rect(bullets[b].pos.x, bullets[b].pos.y, 6, 6);
        bullets[b].pos.add(bullets[b].target);
        if(
            bullets[b].pos.x + 6 < 0 || 
            bullets[b].pos.x - 6 > width ||
            bullets[b].pos.y + 6 < 0 ||
            bullets[b].pos.y - 6 > height
            ) {
                bullets.splice(b, 1);
                b--;
            }

        for(let a = 0; a < asteroids.length; a++) {
            if(typeof bullets[b] != 'undefined') {
                if(asteroids[a].pos.dist(bullets[b].pos) <= asteroids[a].w / 2) {
                    asteroidSubdivise(asteroids[a]);
                    scoreAddAmout(asteroids[a].w, asteroids[a].pos);
                    asteroids.splice(a, 1);
                    a--;
                    bullets.splice(b, 1);
                    b--;
                    break;
                }
            }
        }
    }

    pop();

    // @todo : finish the remuse state.
    if(gameResume == true) {
        fill(255,50);
        rect(0,0,width, height);
    }
}

window.addEventListener('mousedown', (e) => {
    if(gameResume == true) {
        remuseGame();
        return;
    }
    if(cursor.dammageAnimationCount > 1) {
        return;
    }
    if(e.target.id === 'header' || e.target.id === 'home' || e.target.id === 'skills' || e.target.id === 'contact' || e.target.id === 'footer') {
        if(levelAnimation > 1 || startingAnimation > 1) {
            return;
        }
        e.preventDefault();
        //cursorFireSound.play();
        cursor.clickedAnimationCount = 45;
            
        bullets.push({
            pos: createVector(cursor.pos.x, cursor.pos.y),
            target: createVector(mouseX - cursor.pos.x, mouseY - cursor.pos.y).limit(12.5)
        });
    }
});

window.addEventListener('keydown', (e) => {
    if(e.keyCode == 17) {
        ultimateDelay = true;
        e.preventDefault();
        return false;
    }
});

window.addEventListener('blur', (e) => {
    remuseGame();
});

function remuseGame() {
    gameResume = !gameResume;
    document.querySelector('#home').classList.add('resumed');
    if(gameResume == true) {
        document.querySelector('#home').classList.add('resumed');
        noLoop();
    } else {
        document.querySelector('#home').classList.remove('resumed');
        loop();
    }
}

function windowResized() {
    resizeCanvas(innerWidth - 4, innerHeight);
}

function objectNoLimit(object) {
    if(object.pos.x < 0 - object.w) {
        object.pos.x = width + object.w;
    } else if (object.pos.x > width + object.w) {
        object.pos.x = 0 - object.w;
    }

    if(object.pos.y < 0 - object.w) {
        object.pos.y = height + object.w;
    } else if (object.pos.y > height + object.w) {
        object.pos.y = 0 - object.w;
    }
}

function asteroidsSpawn() {
    const asteroidsLenght = map(level, 1, 3, 2, 6);

    for(let a = 0; a < asteroidsLenght; a++) {
        let randShape, rand = Math.floor(random(1, 4));
        
        if(rand == 1) {
            randShape = 30;
        } else if( rand == 2) {
            randShape = 50;
        } else if( rand == 3) {
            randShape = 100;
        }
        asteroids.push(asteroidCreate(randShape));
    }
}

function asteroidSubdivise(asteroidBefore) {
    
    asteroidCrashSound.play();

    if(asteroidBefore.w == 30) {
        // pouf
        return;
    } else if( asteroidBefore.w == 50) {
        randShape = 30;
    } else if( asteroidBefore.w == 100) {
        randShape = 50;
    }

    let asteroidOne = asteroidCreate(randShape, asteroidBefore.pos),
        asteroidTwo = asteroidCreate(randShape, asteroidBefore.pos);

    asteroids.push(asteroidOne);
    asteroids.push(asteroidTwo);

}

function asteroidCreate(size, origin) {
    let position;
    if(typeof origin !== 'undefined') {
        position = createVector(origin.x, origin.y);
    } else {
        position = createVector(random(0, width), random(0, height));
    }
    return {
        pos: position,
        seed: Math.floor(random(1,3)),
        vel: createVector(random(1.8,-1.8), random(1.8,-1.8)),
        w: size,
        spawnAnimation: 20,
        angle: random(0, TWO_PI),
        angleVel: random(-QUARTER_PI/30, QUARTER_PI/30)
    };
}

function asteroidShape(size, seed, spawnAnimation) {
    if(debug) {
        noFill();
        stroke(255,0,0);
        strokeWeight(1);
        circle(0,0,size, size);    
    }
    const alpha = map(spawnAnimation, 20, 1, 0, 255);
    stroke(255, alpha);
    strokeWeight(2);
    noFill();
    beginShape();

    
    push();
    translate(-size/2,-size/2);
    if(size == 30) {
        if(seed == 1) {
            vertex(4, 7);
            vertex(20, 5);
            vertex(23, 15);
            vertex(15, 25);
            vertex(5, 20);
        } else if(seed == 2) {
            vertex(0, 7);
            vertex(6, 2);
            vertex(20, 5);
            vertex(23, 15);
            vertex(18, 18);
            vertex(12, 22);
            vertex(5, 20);
        }
    } else if( size == 50) {
        if(seed == 1) {
            vertex(8, 10);
            vertex(22, 13);
            vertex(40, 9);
            vertex(50, 15);
            vertex(40, 25);
            vertex(45, 35);
            vertex(45, 45);
            vertex(30, 45);
            vertex(16, 40);
            vertex(5, 25);
        } else if(seed == 2) {
            vertex(8, 7);
            vertex(20, 5);
            vertex(40, 9);
            vertex(50, 25);
            vertex(45, 45);
            vertex(30, 35);
            vertex(16, 40);
            vertex(5, 25);
        }
    } else if( size == 100) {
        if(seed == 1) {
            vertex(22, 7);
            vertex(40, 12);
            vertex(60, 9);
            vertex(75, 35);
            vertex(65, 65);
            vertex(40, 80);
            vertex(20, 80);
            vertex(14, 60);
            vertex(16, 40);
            vertex(10, 19);
        } else if(seed == 2) {
            vertex(60, 9);
            vertex(75, 35);
            vertex(80, 75);
            vertex(55, 70);
            vertex(40, 75);
            vertex(14, 60);
            vertex(16, 40);
            vertex(22, 5);
        }
    }
    endShape(CLOSE);
    pop();
}

function scoreAddAmout(amout, asteroidPosition) {
    if(amout > 0) {
        scoring += amout;
        let scoreTextPös = createVector(asteroidPosition.x, asteroidPosition.y);
            scoreTextPös.add(createVector(random(-40,40),random(40,-40)))
        scoreText.push({
            pos: scoreTextPös,
            amout: amout,
            life: amout
        });
    }
}

function levelUpStage() {
    level++;
    levelAnimation = 180;
    levelAsteroidsMaxium = map(level, 1, 3, 8, 25);
    bullets = [];
}

function soundInit() {

    // CURSOR LAZER SOUND
    cursorFireSound.amp(0.5);
    
    // ASTEROID SPAWN
    asteroidSpawnSound.amp(1);
    // ASTEROID CRASH
    asteroidCrashSound.amp(0.5);

}