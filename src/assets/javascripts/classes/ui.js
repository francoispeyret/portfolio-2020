class Ui {
    constructor(_) {
        this._ = _;
    }

    show(cursor, levelsController, scoresController) {

        // SCORING $$$
        this._.noStroke();
        this._.fill(255);
        this._.textAlign(this._.LEFT);
        this._.textSize(28);
        this._.text('€' + scoresController.scoring, 25, 110);
        this._.textSize(14);
        this._.text('LVL' + levelsController.level, 25, 160);

        // LIFEs
        this._.noFill();
        this._.stroke(255);
        for (let o = 0; o < 3; o++) {
            if (o < cursor.life) {
                this._.fill(255);
            } else {
                this._.noFill();
            }
            this._.rect(25 + (o * 15), 121, 8, 18);
        }
        this._.stroke(255);
        this._.noFill();

    }
}

export default Ui;