
import Loot from "../classes/loot";

class LootsController {
    constructor(_) {
        this._ = _;
        this.loots = [];
    }

    show() {

        for (let o = 0; o < this.loots.length; o++) {
            this.loots[o].show();
        }
    }

    update() {

        for (let o = 0; o < this.loots.length; o++) {
            this.loots[o].update();
        }
    }

    lootRemove(index) {
        this.loots.splice(index, 1);
    }

    lootCreate(position) {
        if(this._.random(0,5) > 2) {
            this.loots.push(
                new Loot(this._, position)
            );
        }
    }
}

export default LootsController;
