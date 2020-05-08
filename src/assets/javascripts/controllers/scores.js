class ScoresController {
    constructor(_) {
        this._ = _;
        this.scores = [];
        this.scoring = 0;
    }

    show() {
        for (let s = 0; s < this.scores.length; s++) {
            const amoutFontSize = this._.map(this.scores[s].amount, 40, 100, 14, 22);
            this._.noStroke();
            this._.fill(255, this.scores[s].life/2);
            this._.textSize(amoutFontSize);
            this._.text('+' + this.scores[s].amount, this.scores[s].pos.x, this.scores[s].pos.y);
        }
    }

    update() {
        for (let s = 0; s < this.scores.length; s++) {
            this.scores[s].pos.add(this._.createVector(0, -0.5));
            this.scores[s].life-=6;
            if (this.scores[s].life <= 0) {
                this.scoreRemove(s);
                s--;
            }
        }
    }

    scoreCreate(amount, position) {
        if (amount > 0) {
            this.scoring += amount;
            let scoreTextPos = this._.createVector(position.x, position.y);
            scoreTextPos.add(this._.createVector(this._.random(-40, 40), this._.random(40, -40)))
            this.scores.push({
                pos: scoreTextPos,
                amount: amount,
                life: 505
            });
        }
    }

    scoreRemove(index) {
        this.scores.splice(index, 1);
    }


}

export default ScoresController