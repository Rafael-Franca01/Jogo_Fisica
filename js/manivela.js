class Manivela {
    constructor(room, lose) {
        this.img = loadImage("zoom/manivela/manivela_0.png");
        this.img_final = loadImage("zoom/manivela_LUZ.png");
        this.frames = [];
        this.turning = false;
        this.i = 0;
        this.time = 0;
        this.clicks = 0;
        this.tempo = 50;
        this.checks = 5;
        this.room = room;
        this.lose = lose;
        this.frames.push(this.img);
        for (let i = 1; i <= 7; i++) {
            this.frames.push(loadImage("zoom/manivela/manivela_" + i + ".png"));
        }
        this.triggers = [
            new Trigger(175, 175, 350, 350, () => {
                if (room.light == true) {
                    return;
                }
                this.turning = true;
                this.clicks++;
            }),
            new Trigger(0, H - 150, W, H, () => {
                room.facing = "table";
            })]
    }

    show(light) {
        if (light && !this.turning) {
            image(this.img_final, 0, 0, W, H);
            this.btn(false);
            return;
        }
        if (this.turning) {
            image(this.frames[this.i], 0, 0, W, H);
            this.tempo--;
            if (this.tempo == 0) {
                this.tempo = 3;
                this.turning = (++this.i == this.frames.length) ? false : true;
                this.i = (this.turning) ? this.i : 0;
            }
        } else {
            image(this.img, 0, 0, W, H);
        }
        this.btn(true);
        this.checkCPS();
    }

    update() {
        for (let trigger of this.triggers) {
            trigger.checkClick(mouseX, mouseY);
        }

    }

    btn(on) {
        noStroke()
        if (on) {
            fill(255, 0, 0)
        } else {
            fill(100, 0, 0)
        }
        circle(350 * off.w, 350 * off.h, 350 * (off.w / off.h))
        fill(0, 255, 0)
        arc(350 * off.w, 350 * off.h, 350 * (off.w / off.h), 350 * (off.w / off.h), 0, PI / 5 * this.clicks)
        if (on) {
            fill(255)
        } else {
            fill(100)
        }
        circle(350 * off.w, 350 * off.h, 340)
        fill(0)
        textSize(64 * (off.w / off.h))
        textFont("Comic Sans")
        textAlign(CENTER, CENTER)
        text("Girar", 350 * off.w, 350 * off.h)
        textSize(32)
        text(`${this.clicks * 35} Watts`, 350 * off.w, 400 * off.h)

    }

    checkCPS() {
        let time = millis();
        if (time - this.time >= 1000) {
            if (this.clicks == 5 || this.clicks == 6) {
                this.checks--;
                if (this.checks == 0) {
                    this.room.light = true;
                }
            } else if (this.clicks > 6) {
                this.estourar()
                this.clicks = 0;
            } else {
                this.checks = 5;
            }
            this.clicks = (this.clicks == 0) ? 0 : this.clicks - 1;
            this.time = millis()
        }
    }

    estourar() {
        this.lose.active = true;
        this.lose.play();
    }

}
