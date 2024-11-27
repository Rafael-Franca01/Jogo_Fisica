class Aquario {
    constructor(room) {
        this.img = loadImage("espelho/espelho_0_0.png");
        this.final = loadImage("espelho/espelho_final.png");
        this.triggers = [
            new Trigger(0, H - 150, W, H, () => {
                room.interacting = false
                room.facing = "left";
            })
        ]
        this.index = [0, 0, 0, 0, 0];
        this.espelhos = {}
        this.xys = [[805, 88, 100, 115], [800, 375, 120, 115], [1210, 375, 120, 115], [1200, 515, 120, 115], [375, 515, 120, 115]]
        for (let i = 0; i < 5; i++) {
            this.espelhos[`${i}`] = [
                loadImage(`espelho/espelho_${i}_0.png`),
                loadImage(`espelho/espelho_${i}_1.png`),
                loadImage(`espelho/espelho_${i}_2.png`)
            ]
            this.triggers.push(new Trigger(...this.xys[i], () => {
                this.index[i] = (this.index[i] + 1) % 3;
            }))
        }
    }

    show(light) {
        if (!light) {
            return;
        }
        image(this.img, 0, 0)
        for (let i = 0; i < this.xys.length; i++) {
            image(this.espelhos[`${i}`][this.index[i]], ...this.xys[i], ...this.xys[i])
        }
        for (let t of this.triggers) {
            t.show()
        }
        stroke(72, 24, 107); // purple
        strokeWeight(5);
        this.emitRay();
    }

    update() {
        for (let t of this.triggers) {
            t.checkClick(mouseX, mouseY)
        }

    }

    emitRay() {
        switch (this.index[0]) {
            case 0:
                line(1235, 184, 860, 154);
                return;
            case 1:
                line(1235, 184, 860, 154);
                break;
            case 2:
                line(1235, 184, 885, 154);
                line(863, 126, 870, 68)
                return;
        }

        switch (this.index[1]) {
            case 0:
                line(860, 154, 860, 432);
                return;
            case 1:
                line(860, 154, 860, 435);
                break;
            case 2:
                line(860, 154, 860, 435);
                line(860, 435, 641, 426);
                return;
        }

        switch (this.index[2]) {
            case 0:
                line(860, 435, 1271, 433);
                return;
            case 1:
                line(860, 435, 1271, 433);
                line(1271, 433, 1258, 215);
                return;
            case 2:
                line(860, 435, 1271, 433);
                break;
        }

        switch (this.index[3]) {
            case 0:
                line(1271, 433, 1262, 531);
                return;
            case 1:
                line(1271, 433, 1258, 573);
                break;
            case 2:
                line(1271, 433, 1260, 565);
                return;
        }

        switch (this.index[4]) {
            case 0:
                line(1258, 573, 430, 580);
                return;
            case 1:
                line(1258, 573, 430, 580);
                line(430, 580, 434, 441)
                break;
            case 2:
                line(1258, 573, 430, 580);
                line(430, 580, 439, 650);
                return;
        }
        this.img = this.final;
    }
}