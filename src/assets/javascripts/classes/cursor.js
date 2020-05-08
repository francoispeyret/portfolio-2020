class Cursor {
    constructor(_) {
        this._    = _;
        this.pos  = this._.createVector(this._.width / 2, this._.height / 2);
        this.w    = 15;
        this.wMax = 15;
        this.life = 3
        this.dammageAnimationCount = 0;

        this.smoke = [];
    }

    show() {
        let angle = this._.createVector(this._.width / 2, 0).heading();
        let vel = this._.createVector(this._.mouseX - this.pos.x, this._.mouseY - this.pos.y).div(45);
        const mag = (vel.mag() / 3).toFixed(1);

        if (this.w - mag > 5) {
            this.w -= mag;
        }
        if (this.w < this.wMax) {
            this.w += .5;
        }
        if (this.pos.dist(this._.createVector(this._.mouseX, this._.mouseY)) > 25) {
            this.pos.add(vel);
        }

        angle = this._.createVector(this._.mouseX - this.pos.x, this._.mouseY - this.pos.y).heading();


        this.smokeShow();
        const thrust = this._.map(mag, 0, 3, 0, 45);
        this.smokeCreate(thrust);
        this.smokeUpdate();

        this._.noStroke();
        const thisOpacity = this._.map(this._.sin(this.dammageAnimationCount / 2), 0, 1, 255, 55);
        this._.fill(255, thisOpacity);

        this._.push();
            this._.translate(this.pos.x, this.pos.y);
            this._.rotate(angle);

            this._.beginShape();
            this._.vertex(20, 0);
            this._.vertex(0, 10);
            this._.vertex(0, -10);
            this._.endShape(this._.CLOSE);
            
            /*this._.beginShape();
            this._.vertex(-5, 5);
            this._.vertex(-5, -5);
            this._.vertex(thrust , 0);
            this._.endShape(this._.CLOSE);
*/
        this._.pop();


    }

    smokeShow() {
        this._.noStroke();
        for(let s = 0; s < this.smoke.length; s++) {
            const smokeItem = this.smoke[s];
            const alpha = this._.map(smokeItem.life, 30, 0, 12, 0);
            this._.fill(255, alpha);
            this._.circle(smokeItem.pos.x, smokeItem.pos.y, smokeItem.w);
        }
    }

    smokeUpdate() {
        for(let s = 0; s < this.smoke.length; s++) {
            this.smoke[s].life--;
            this.smoke[s].w++;

            if(this.smoke[s].life <= 0) {
                this.smoke.splice(s, 1);
                s--;
            }
        }
    }


    smokeCreate(thrust) {
        if(thrust > 3) {
            this.smoke.push({
                pos: {
                    x: this.pos.x,
                    y: this.pos.y
                },
                w: thrust*0.66,
                life: 30
            });
        }
    }
}

export default Cursor;
