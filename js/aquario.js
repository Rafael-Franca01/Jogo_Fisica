class Aquario {
    constructor(room) {
        this.img = loadImage("espelho/espelho_0_0.png");
        this.final = loadImage("espelho/espelho_final.png");
        this.room = room;
        this.triggers = [
            new Trigger(0, H - (150 * off.h), W, H, () => {
                room.interacting = false
                room.facing = "left";
            })
        ]
        this.index = [0, 0, 0, 0, 0];
        this.espelhos = {}
        this.crop = [[805, 88, 100, 115], [800, 375, 120, 115], [1210, 375, 120, 115], [1200, 515, 120, 115], [375, 515, 120, 115]]
        this.xys = []
        for (let c of this.crop) {
            this.xys.push([c[0] * off.w, c[1] * off.h, c[2] * off.w, c[3] * off.h])
        }
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
        image(this.img, 0, 0, W, H)
        for (let i = 0; i < this.xys.length; i++) {
            image(this.espelhos[`${i}`][this.index[i]], ...this.xys[i], ...this.crop[i])
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
                myLine(1235, 184, 860, 154);
                return;
            case 1:
                myLine(1235, 184, 860, 154);
                break;
            case 2:
                myLine(1235, 184, 885, 154);
                myLine(863, 126, 870, 68)
                return;
        }

        switch (this.index[1]) {
            case 0:
                myLine(860, 154, 860, 432);
                return;
            case 1:
                myLine(860, 154, 860, 435);
                break;
            case 2:
                myLine(860, 154, 860, 435);
                myLine(860, 435, 641, 426);
                return;
        }

        switch (this.index[2]) {
            case 0:
                myLine(860, 435, 1271, 433);
                return;
            case 1:
                myLine(860, 435, 1271, 433);
                myLine(1271, 433, 1258, 215);
                return;
            case 2:
                myLine(860, 435, 1271, 433);
                break;
        }

        switch (this.index[3]) {
            case 0:
                myLine(1271, 433, 1262, 531);
                return;
            case 1:
                myLine(1271, 433, 1258, 573);
                break;
            case 2:
                myLine(1271, 433, 1260, 565);
                return;
        }

        switch (this.index[4]) {
            case 0:
                myLine(1258, 573, 430, 580);
                return;
            case 1:
                myLine(1258, 573, 430, 580);
                myLine(430, 580, 434, 441)
                break;
            case 2:
                myLine(1258, 573, 430, 580);
                myLine(430, 580, 439, 650);
                return;
        }
        this.img = this.final;
        this.room.energy = true;
    }
}

function myLine(x1, y1, x2, y2) {
    line(x1 * off.w, y1 * off.h, x2 * off.w, y2 * off.h)
}