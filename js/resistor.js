class Resistor {
    constructor(room) {
        this.room = room;
        this.img = loadImage("zoom/energia_FECHADO.png");
        this.open = loadImage("zoom/energia_ABERTO.png");
        this.resistor = loadImage("zoom/resistor.png");
        this.resistor3d = loadImage("zoom/resistor3d.png")
        this.selected = 0;
        this.current = "closed";
        this.crop = [[741, 293, 151, 85], [745, 425, 151, 85], [755, 565, 151, 85]]
        this.xys = []
        for (let c of this.crop) {
            this.xys.push([c[0] * off.w, c[1] * off.h, c[2] * off.w, c[3] * off.h])
        }
        this.placed = [[false, false, false], [4, 4, 4]]
        this.placable = [true, true, true, true, true]
        this.triggers = [
            new Trigger(0, H - (150 * off.h), W, 150 * off.h, () => {
                room.interacting = false;
                room.facing = "right"
            }),
            new Trigger(0, 235 * off.h, 286 * off.w, 395 * off.h, () => {
                this.current = "open";
            }),
            new Trigger(1305 * off.w, 15 * off.h, 343 * off.w, 630 * off.h, () => {
                this.current = "closed";
            })
        ]
        // resistors
        let places = [[75 * off.w, 52 * off.h, 60 * off.w, 150 * off.h], [135 * off.w, 52 * off.h, 60 * off.w, 150 * off.h], [195 * off.w, 52 * off.h, 60 * off.w, 150 * off.h], [255 * off.w, 52 * off.h, 60 * off.w, 150 * off.h], [315 * off.w, 52 * off.h, 60 * off.w, 150 * off.h]]
        for (let i = 0; i < 5; i++) {
            this.triggers.push(new Trigger(...places[i], () => {
                if (this.placable[i]) {
                    this.selected = i;
                }
            }))
        }
        // resistors places
        for (let i = 0; i < this.xys.length; i++) {
            this.triggers.push(new Trigger(...this.xys[i], () => {

                if (!this.placable[this.selected]) {
                    if (this.placed[0][i]) {
                        this.placable[this.placed[1][i]] = true;
                        this.placed[0][i] = false;
                    }
                    return;
                }
                if (!this.placed[0][i]) {
                    this.placed[1][i] = this.selected;
                    this.placable[this.selected] = false;
                } else {
                    this.placable[this.placed[1][i]] = true;
                }
                this.placed[0][i] = !this.placed[0][i];
            }))
        }
    }

    show(light) {
        if (!light) {
            return;
        }
        if (this.current == "closed") {
            image(this.img, 0, 0, W, H)
            return;
        }
        image(this.open, 0, 0, W, H)
        fill(0, 150, 0)
        stroke(0, 50, 0);
        strokeWeight(5)
        let ohms = [50, 50, 100, 125, 25]
        rect(28 * off.w, 25 * off.h, 413 * off.w, 270 * off.h)
        fill(255)
        stroke(0)
        textSize(11)
        for (let i = 0; i < 5; i++) {
            if (!this.placable[i]) {
                continue;
            }
            let x = (75 + (60 * i)) * off.w
            image(this.resistor, x, 52 * off.h, this.resistor.width * 0.3 * off.w, this.resistor.height * 0.3 * off.h)
            if (i == this.selected) {
                fill(255, 255, 0)
            } else {
                fill(255)
            }
            text(ohms[i] + "Ω", x + (20 * off.w), (230 * off.h))
        }
        fill(255)
        text("100Ω", 807 * off.w, 158 * off.h)
        text("50Ω", 1006 * off.w, 390 * off.h)
        let textPos = [[822, 346], [823, 455], [821, 607]]
        for (let i = 0; i < 3; i++) {
            if (this.placed[0][i]) {
                image(this.resistor3d, ...this.xys[i], ...this.crop[i])
                fill(255)
                text(ohms[this.placed[1][i]] + "Ω", textPos[i][0] * off.w, textPos[i][1] * off.h)
            }
        }
    }

    update() {
        for (let t of this.triggers) {
            t.checkClick(mouseX, mouseY);
        }
        let sequence = [100, 50, 50];
        let ohms = [50, 50, 100, 125, 25];
        let correct = true;
        for (let i = 0; i < 3; i++) {
            if (sequence[i] != ohms[this.placed[1][i]]) {
                correct = false;
            }
        }
        if (correct) {
            this.room.resistors = true;
        }
    }

}
