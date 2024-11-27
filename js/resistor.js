class Resistor {
    constructor(room) {
        this.room = room;
        this.img = loadImage("zoom/energia_FECHADO.png");
        this.open = loadImage("zoom/energia_ABERTO.png");
        this.resistor = loadImage("zoom/resistor.png");
        this.resistor3d = loadImage("zoom/resistor3d.png")
        this.selected = 0;
        this.current = "closed";
        this.xys = [[741, 293, 151, 85], [745, 425, 151, 85], [755, 565, 151, 85]]
        this.placed = [[false, false, false], [4, 4, 4]]
        this.placable = [true, true, true, true, true]
        this.triggers = [
            new Trigger(0, H - 150, W, 150, () => {
                room.interacting = false;
                room.facing = "right"
            }),
            new Trigger(0, 235, 286, 395, () => {
                this.current = "open";
            }),
            new Trigger(1305, 15, 343, 630, () => {
                this.current = "closed";
            })
        ]
        // resistors
        let places = [[75, 52, 60, 150], [135, 52, 60, 150], [195, 52, 60, 150], [255, 52, 60, 150], [315, 52, 60, 150]]
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
            image(this.img, 0, 0)
            return;
        }
        image(this.open, 0, 0)
        fill(0, 150, 0)
        stroke(0, 50, 0);
        strokeWeight(5)
        let ohms = [50, 50, 100, 125, 25]
        rect(28, 25, 413, 270)
        fill(255)
        stroke(0)
        textSize(11)
        for (let i = 0; i < 5; i++) {
            if (!this.placable[i]) {
                continue;
            }
            image(this.resistor, 75 + (60 * i), 52, this.resistor.width * 0.3, this.resistor.height * 0.3)
            if (i == this.selected) {
                fill(255, 255, 0)
            } else {
                fill(255)
            }
            text(ohms[i] + "Ω", 95 + (60 * i), 230)
        }
        fill(255)
        text("100Ω", 807, 158)
        text("50Ω", 1006, 390)
        for (let i = 0; i < 3; i++) {
            if (this.placed[0][i]) {
                image(this.resistor3d, ...this.xys[i], ...this.xys[i])
                fill(255)
                text(ohms[this.placed[1][i]] + "Ω", this.xys[i][0] + 50, this.xys[i][1] + 50)
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
            console.log(sequence[i], ohms[this.placed[1][i]])
            if (sequence[i] != ohms[this.placed[1][i]]) {
                correct = false;
            }
        }
        if (correct) {
            this.room.resistors = true;
        }
    }

}
