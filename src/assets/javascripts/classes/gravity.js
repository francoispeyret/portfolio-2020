class Gravity {
    constructor(_) {
        this._ = _;
        this.spaceTime = [];
        for(let y = 0; y < _.height/100; y++) {
            this.spaceTime[y] = [];
            for(let x = 0; x < _.width/100; x++) {
                this.spaceTime[y][x] = {
                    pos: {
                        x: x*100,
                        y: y*100
                    },
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

    update(asteroids) {
        for(let y = 0; y < this.spaceTime.length; y++) {
            for(let x = 0; x < this.spaceTime[y].length; x++) {
                this.spaceTime[y][x].g = 0;
            }
        }
        for(let a = 0; a < asteroids.length; a++) {
            for(let y = 0; y < this.spaceTime.length; y++) {
                for(let x = 0; x < this.spaceTime[y].length; x++) {
                    const spaceTimeItem = this.spaceTime[y][x];
                    const distance      = this._.dist(spaceTimeItem.pos.x, spaceTimeItem.pos.y, asteroids[a].pos.x, asteroids[a].pos.y)
                    spaceTimeItem.g += 50 * (asteroids[a].w) / this._.constrain(distance, 30, 999);
                }
            }
        }
    }

}

export default Gravity;
