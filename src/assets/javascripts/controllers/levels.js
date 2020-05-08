class LevelsController {
    constructor(_) {
        this._ = _;
        this.level = 1;
        this.introAnimation = 90;
    }

    show() {
        if (this.animationInProgress()) {
            this._.fill(255);
            const levelTextSize = this._.map(this.introAnimation, 90, 1, 0, 48);
            this._.textSize(levelTextSize);
            this._.textAlign(this._.CENTER);
            this._.text('LEVEL' + this.level, this._.width / 2, this._.height / 2);
        }
    }

    update(asteroidsController) {
        if (this.animationInProgress()) {
            this.introAnimation--;
            if (this.introAnimation <= 1) {
                asteroidsController.asteroidsSpawn(this);
            }
            return;
        }
    }

    animationInProgress() {
        return this.introAnimation > 1;
    }

    levelUpStage(bulletsController) {
        level++;
        levelAnimation = 90;
        levelAsteroidsMaximum = _.map(level, 1, 3, 8, 25);
        bulletsController = new BulletsController(_);
    }
}

export default LevelsController;