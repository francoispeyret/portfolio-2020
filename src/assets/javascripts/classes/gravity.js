class Gravity {
    constructor(_) {
        this._ = _;
        this.G = .05;
        this.initSpaceTime();
    }

    initSpaceTime() {
        this.spaceTime = [];
        for(let y = 0; y < this._.height/100; y++) {
            this.spaceTime[y] = [];
            for(let x = 0; x < this._.width/100; x++) {
                this.spaceTime[y][x] = {
                    pos: this._.createVector(
                        x*100,
                        y*100
                    ),
                    g: 3
                };
            }
        }
    }

    show(_) {
        _.fill(255, 25);
        for(let y = 0; y < this.spaceTime.length; y++) {
            for(let x = 0; x < this.spaceTime[y].length; x++) {
                const spaceTimeItem = this.spaceTime[y][x];
                _.circle(spaceTimeItem.pos.x, spaceTimeItem.pos.y, spaceTimeItem.g);
            }
        }
    }

    update(asteroids, cursor) {
        for(let y = 0; y < this.spaceTime.length; y++) {
            for(let x = 0; x < this.spaceTime[y].length; x++) {
                let spaceTimeItem   = this.spaceTime[y][x];
                    spaceTimeItem.g = 0;
                for(let a = 0; a < asteroids.length; a++) {
                    const distance      = this._.dist(spaceTimeItem.pos.x, spaceTimeItem.pos.y, asteroids[a].pos.x, asteroids[a].pos.y)
                    spaceTimeItem.g += 25 * (asteroids[a].w / 1.5) / this._.constrain(distance, 30, 999);
                    this.attract(asteroids[a], cursor);
                }
                const distance      = this._.dist(spaceTimeItem.pos.x, spaceTimeItem.pos.y, cursor.pos.x, cursor.pos.y)
                spaceTimeItem.g += 25 * (140 / 1.5) / this._.constrain(distance, 30, 999);
            }
        }
    }

    attract(mover, cursor) {
        let force = this._.createVector(
            cursor.pos.x - mover.pos.x,
            cursor.pos.y - mover.pos.y
        );
        let distanceSq = this._.constrain(force.magSq(), 100, 1000);
        let strengh = this.G * (cursor.w * mover.w) / distanceSq;
        force.setMag(strengh);
        mover.applyForce(force);
    }

    resize(_) {
        this.initSpaceTime();
    }

}

export default Gravity;
