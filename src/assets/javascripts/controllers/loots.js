
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
}

export default LootsController;
