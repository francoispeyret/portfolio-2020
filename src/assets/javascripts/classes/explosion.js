
class Explosion {
    constructor(_,pos,w) {
        this._ = _;
        this.pos = this._.createVector(
            pos.x,
            pos.y
        );
        this.lifeAnimation = 50;
        this.dots = [];
        for(let i = 0; i < 9; i++) {
            this.dots.push({
                x:this._.sin(i)*this.lifeAnimation,
                y:this._.cos(i)*this.lifeAnimation,
                alpha: this._.random(200,255),
                vel: this._.random(-1-w/30,-6-w/30),
                life: w/2
            })
        }
    }

    show() {
        this._.strokeWeight(5);
        for(let i = 0; i < this.dots.length; i++) {
            this._.stroke(255, this.dots[i].alpha);
            this._.point(this.pos.x-this.dots[i].x, this.pos.y-this.dots[i].y);
        }
    }

    update() {
        this.lifeAnimation = this.lifeAnimation - 5;
        for(let i = 0; i < this.dots.length; i++) {
            this.dots[i].life = this.dots[i].life - this.dots[i].vel;
            this.dots[i].x = this._.sin(i)*this.dots[i].life;
            this.dots[i].y = this._.cos(i)*this.dots[i].life;
            this.dots[i].alpha -= this._.random(3,10);
        }
    }
}

export default Explosion;
