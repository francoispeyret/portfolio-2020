

//-----------------------//
//        HEADER        //
//----------------------//
let headerArrow = {
	el: document.querySelector('header .arrow'),
	step: 0
};
let main = {
	el: document.querySelector('main')
};
let menu = {
    el: document.querySelector('.header-menu'),
    linksEls: document.querySelectorAll('.header-menu a'),
    active: false
};

window.addEventListener('scroll', windowScroll);
window.addEventListener('resize', windowScroll);

function windowScroll(e) {
	const pos = main.el.getBoundingClientRect();
	const arrowPos = Math.floor((( -pos.y * (pos.width + 25) / pos.height) - 5));
	headerArrow.el.setAttribute('style', 'left:'+ arrowPos +'px');
}

document.querySelector('#toggle-mobile').addEventListener('click', () => {
    mobileMenu();
});

for(let e = 0; e < menu.linksEls.length; e++) {
    menu.linksEls[e].addEventListener('click', () => {
        mobileMenu();
    })
}

function mobileMenu() {
    if(menu.active === true) {
        menu.el.classList.remove('active');
        main.el.classList.remove('menu-active');
    } else {
        menu.el.classList.add('active');
        main.el.classList.add('menu-active');
    }
    menu.active = !menu.active;
}


//----------------------------//
//        CONTACT FORM        //
//----------------------------//





//----------------------------//
//        GAME OVERLAY        //
//----------------------------//
let cursor,
    balls = [],
    bullets = [],
    asteroids = [],
    startingAnimation = 90,
    gameStarted = true;

const buttonStart = document.querySelector('#play-start');

buttonStart.addEventListener('click', () => {
    gameStarted = true;
    document.querySelector('#home').classList.add('started');
});

function setup() {
    var canvas = createCanvas(innerWidth - 4, innerHeight);
    canvas.parent('p5-holder');

    cursor = {
        pos: createVector(width/2, height/2),
        w: 15,
        wMax: 15,
        clickedAnimationCount: 45
    };

    for(let i = 0; i < 33; i++) {
        balls[i] = {
            pos: createVector(random(0, width), random(0, height)),
            w: Math.floor(random(2, 12)),
            vel: createVector(randomGaussian(.75,-.75), randomGaussian(.75,-.75))
        };
    }

    for(let a = 0; a < 8; a++) {
        
        let randShape, rand = Math.floor(random(1, 4));
        
        if(rand == 1) {
            randShape = 40;
        } else if( rand == 2) {
            randShape = 60;
        } else if( rand == 3) {
            randShape = 100;
        }

        asteroids[a] = {
            pos: createVector(random(0, width), random(0, height)),
            vel: createVector(randomGaussian(.75,-.75), randomGaussian(.75,-.75)),
            w: randShape,
            angle: random(0, TWO_PI),
            angleVel: random(-QUARTER_PI/30, QUARTER_PI/30)
        };
    }

}

function draw() {
    clear();

    if(!gameStarted) {
        return;
    }

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

        if(cursor.pos.dist(createVector(mouseX, mouseY)) > 42) {
            cursor.pos.add(vel);
        }
        angle = createVector(mouseX - cursor.pos.x, mouseY - cursor.pos.y).heading();
	}
	
	// BREAKPOINT for Mobile Devices
	if(width < 769) 
		return;
        
    noStroke();
    fill(255);
    push();
        translate(cursor.pos.x, cursor.pos.y);
        rotate(angle);
        beginShape();
            vertex(0, 0);
            vertex(-20, 10);
            vertex(-20, -10);
        endShape(CLOSE);
    pop();
    
    if(cursor.clickedAnimationCount > 0) {
        const cursorClickedSize = map(cursor.clickedAnimationCount, 45, 1, 0, cursor.w + 80);
        noFill();
        strokeWeight(1);
        stroke(255, map(cursorClickedSize, cursor.w, cursor.w + 80, 255, 0));
        circle(cursor.pos.x, cursor.pos.y, cursorClickedSize);
        
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
                    asteroids.splice(a, 1);
                    a--;
                    bullets.splice(b, 1);
                    b--;
                    break;
                }
            }
        }
    }

    // ASTEROIDS
    for(let a = 0; a < asteroids.length; a++) {
        asteroids[a].angle += asteroids[a].angleVel;
        push();
            translate(asteroids[a].pos.x, asteroids[a].pos.y);
            rotate(asteroids[a].angle);
            asteroidShape(asteroids[a].w);
        pop();
        
        asteroids[a].pos.add(asteroids[a].vel);

        objectNoLimit(asteroids[a]);
    }

    if(frameCount % 240 == 0 && asteroids.length < 22) {
        let asteroidNewOne = {
            pos: createVector(random(0, width), random(0, height)),
            vel: createVector(randomGaussian(.75,-.75), randomGaussian(.75,-.75)),
            w: 100,
            angle: random(0, TWO_PI),
            angleVel: random(-QUARTER_PI/30, QUARTER_PI/30)
        };
        asteroids.push(asteroidNewOne);
    }
}

function mouseClicked() {
    cursor.clickedAnimationCount = 45;

    bullets.push({
        pos: createVector(cursor.pos.x, cursor.pos.y),
        target: createVector(mouseX - cursor.pos.x, mouseY - cursor.pos.y).limit(10)
    });
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

function asteroidSubdivise(asteroidBefore) {
    
    if(asteroidBefore.w == 40) {
        // pouf
        return;
    } else if( asteroidBefore.w == 60) {
        randShape = 40;
    } else if( asteroidBefore.w == 100) {
        randShape = 60;
    }

    let asteroidOne = {
        pos: createVector(asteroidBefore.pos.x, asteroidBefore.pos.y),
        w: randShape,
        angle: random(0, TWO_PI),
        vel: createVector(randomGaussian(.75,-.75), randomGaussian(.75,-.75)),
        angleVel: random(-QUARTER_PI/30, QUARTER_PI/30)
    }, asteroidTwo = {
        pos: createVector(asteroidBefore.pos.x, asteroidBefore.pos.y),
        w: randShape,
        angle: random(0, TWO_PI),
        vel: createVector(randomGaussian(.75,-.75), randomGaussian(.75,-.75)),
        angleVel: random(-QUARTER_PI/30, QUARTER_PI/30)
    };

    asteroids.push(asteroidOne);
    asteroids.push(asteroidTwo);
}

function asteroidShape(rand) {
    stroke(255);
    strokeWeight(2);
    noFill();
    beginShape();

    //circle(0,0,rand, rand);

    push();
    translate(-rand/2,-rand/2);
    if(rand == 40) {
        vertex(4, 7);
        vertex(20, 5);
        vertex(23, 15);
        vertex(15, 25);
        vertex(5, 20);
    } else if( rand == 60) {
        vertex(8, 7);
        vertex(20, 5);
        vertex(40, 9);
        vertex(50, 25);
        vertex(45, 45);
        vertex(30, 35);
        vertex(16, 40);
        vertex(5, 25);
    } else if( rand == 100) {
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
    }
    endShape(CLOSE);
    pop();
}
