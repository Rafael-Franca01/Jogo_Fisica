class Cena {
    constructor(img, room, faceTo, back = false) {
        this.img_dark = loadImage(img.replace("LIGHT", "SEMLUZ"));
        this.img_light = loadImage(img.replace("LIGHT", "LUZ"));
        this.triggers = [];
        if (!back) {
            this.addTrigger(W - (100 * off.w), 0, (100 * off.w), H, () => {
                room.facing = faceTo[0];
            });
            this.addTrigger(0, 0, 100 * off.w, H, () => {
                room.facing = faceTo[1];
            });
        } else {
            this.addTrigger(0, H - (150 * off.h), W, H, () => {
                room.interacting = false;
                room.facing = faceTo;
            });
        }
    }

    addTrigger(x, y, w, h, func, otherFunc = () => { }) {
        this.triggers.push(new Trigger(x, y, w, h, func, otherFunc));
    }

    show(light) {
        if (light) {
            image(this.img_light, 0, 0, W, H);
        } else {
            image(this.img_dark, 0, 0, W, H);
        }
    }

    update() {
        for (let trigger of this.triggers) {
            trigger.checkClick(mouseX, mouseY);
        }
    }
}
