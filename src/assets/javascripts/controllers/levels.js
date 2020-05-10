import BulletsController from './bullets';

class LevelsController {
    constructor(_) {
        this._ = _;
        this.level = 1;
        this.introAnimation = 90;
        this.startingAnimation = 90;
    }

    show() {
        if (this.animationInProgress()) {
            this._.fill(255);
            //const levelTextSize = this._.map(this.introAnimation, 90, 1, 0, 48);
            this._.textSize(48);
            this._.textAlign(this._.CENTER);
            this._.text('LEVEL' + this.level, this._.width / 2, this._.height / 2);
        }
        
        if (this.startingAnimation > 1 && !this.animationInProgress()) {
            this.startingAnimation--;
            const  scalingAnimation = this._.map(this.startingAnimation, 90, 1, 0, 1),
                translateAnimationX = this._.map(this.startingAnimation, 90, 1, this._.width / 2, 0),
                translateAnimationY = this._.map(this.startingAnimation, 90, 1, this._.height / 2, 0);

            this._.translate(translateAnimationX, translateAnimationY);
            this._.scale(scalingAnimation, scalingAnimation);
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

    getAsteroidsMaximum() {
        return this._.map(this.level, 1, 3, 8, 25);
    }

    levelUpStage(bulletsController) {
        this.level++;
        this.introAnimation = 90;
        this.startingAnimation = 90;
        this.levelAsteroidsMaximum = this.getAsteroidsMaximum();
        bulletsController = new BulletsController(this._);
    }
}

export default LevelsController;