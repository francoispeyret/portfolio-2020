class Cursor {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.w = 15;
        this.wMax = 15;
        this.clickedAnimationCount = 45;
        this.ultimateAnimationCount = 45;
        this.dammageAnimationCount = 0;
        this.life = 5
    }

    show() {
        let angle = createVector(width / 2, 0).heading();
        if (mouseX !== 0 || mouseY !== 0) {
            let vel = createVector(mouseX - this.pos.x, mouseY - this.pos.y).div(100);
            const mag = (vel.mag() / 6).toFixed(1);

            if (this.w - mag > 5) {
                this.w -= mag;
            }
            if (this.w < this.wMax) {
                this.w += .5;
            }
            if (this.clickedAnimationCount > 0) {
                this.clickedAnimationCount--;
            }
            if (this.clickedAnimationCount >= 44 && typeof thisFireSound !== 'undefined') {
                thisFireSound.play();
            }
            if (this.pos.dist(createVector(mouseX, mouseY)) > 42) {
                this.pos.add(vel);
            }
            angle = createVector(mouseX - this.pos.x, mouseY - this.pos.y).heading();
        }

        noStroke();
        const thisOpacity = map(sin(this.dammageAnimationCount / 2), 0, 1, 255, 55);
        fill(255, thisOpacity);

        push();
            translate(this.pos.x, this.pos.y);
            rotate(angle);
            beginShape();
            vertex(0, 0);
            vertex(-20, 10);
            vertex(-20, -10);
            endShape(CLOSE);

            if (ultimateDelay == true) {
                this.ultimateAnimationCount--;
                const ultimateDistance = map(this.ultimateAnimationCount, 45, 0, 0, width * 1.5);

                beginShape();
                vertex(0, 0);
                vertex(4, -3);
                vertex(ultimateDistance, -60);
                vertex(ultimateDistance + 50, -50);
                vertex(ultimateDistance + 100, -20);
                vertex(ultimateDistance + 115, 0);
                vertex(ultimateDistance + 100, 20);
                vertex(ultimateDistance + 50, 50);
                vertex(ultimateDistance, 60);
                vertex(4, 3);
                endShape(CLOSE);

                if (this.ultimateAnimationCount < 0) {
                    this.ultimateAnimationCount = 45;
                    ultimateDelay = false;
                }
            }
        pop();

        if (this.clickedAnimationCount > 0) {
            const thisClickedSize = map(this.clickedAnimationCount, 45, 1, 0, this.w + 80);
            noFill();
            strokeWeight(2);
            stroke(255, map(thisClickedSize, this.w, this.w + 80, 255, 0));
            circle(this.pos.x, this.pos.y, thisClickedSize);

        }
    }
}
