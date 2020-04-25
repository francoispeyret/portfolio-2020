class Cursor {
    constructor(_) {
        this._    = _;
        this.pos  = this._.createVector(this._.width / 2, this._.height / 2);
        this.w    = 15;
        this.wMax = 15;
        this.life = 5
        this.clickedAnimationCount = 45;
        this.dammageAnimationCount = 0;
    }

    show() {
        let angle = this._.createVector(this._.width / 2, 0).heading();
        if (this._.mouseX !== 0 || this._.mouseY !== 0) {
            let vel = this._.createVector(this._.mouseX - this.pos.x, this._.mouseY - this.pos.y).div(75);
            const mag = (vel.mag() / 3).toFixed(1);

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
                //thisFireSound.play();
            }
            if (this.pos.dist(this._.createVector(this._.mouseX, this._.mouseY)) > 25) {
                this.pos.add(vel);
            }
            angle = this._.createVector(this._.mouseX - this.pos.x, this._.mouseY - this.pos.y).heading();
        }

        this._.noStroke();
        const thisOpacity = this._.map(this._.sin(this.dammageAnimationCount / 2), 0, 1, 255, 55);
        this._.fill(255, thisOpacity);

        this._.push();
            this._.translate(this.pos.x, this.pos.y);
            this._.rotate(angle);
            this._.beginShape();
            this._.vertex(0, 0);
            this._.vertex(-20, 10);
            this._.vertex(-20, -10);
            this._.endShape(this._.CLOSE);

            /* if (ultimateDelay == true) {
                this.ultimateAnimationCount--;
                const ultimateDistance = this._.map(this.ultimateAnimationCount, 45, 0, 0, this._.width * 1.5);

                this._.beginShape();
                    this._.vertex(0, 0);
                    this._.vertex(4, -3);
                    this._.vertex(ultimateDistance, -60);
                    this._.vertex(ultimateDistance + 50, -50);
                    this._.vertex(ultimateDistance + 100, -20);
                    this._.vertex(ultimateDistance + 115, 0);
                    this._.vertex(ultimateDistance + 100, 20);
                    this._.vertex(ultimateDistance + 50, 50);
                    this._.vertex(ultimateDistance, 60);
                    this._.vertex(4, 3);
                this._.endShape(CLOSE);

                if (this.ultimateAnimationCount < 0) {
                    this.ultimateAnimationCount = 45;
                    ultimateDelay = false;
                }
            } */
        this._.pop();

    }
}

export default Cursor;
