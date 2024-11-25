class Cena {
    constructor(img, room, faceTo, back = false, debug = false) {
        this.img_dark = loadImage(img.replace("LIGHT", "SEMLUZ"));
        this.img_light = loadImage(img.replace("LIGHT", "LUZ"));
        this.triggers = [];
        this.debug = debug;
        if (!back) {
            this.addTrigger(W - 100, 0, 100, H, () => {
                room.facing = faceTo[0];
            });
            this.addTrigger(0, 0, 100, H, () => {
                room.facing = faceTo[1];
            });
        } else {
            this.addTrigger(0, H - 200, W, H, () => {
                room.interacting = false;
                room.facing = faceTo;
            });
        }
    }

    addTrigger(x, y, w, h, func, otherFunc= ()=> {}) {
        this.triggers.push(new Trigger(x, y, w, h, func, otherFunc));
    }

    show(light) {
        if (light) {
            image(this.img_light, 0, 0);
        } else {
            image(this.img_dark, 0, 0);
        }
        if (this.debug) {
            for (let trigger of this.triggers) {
                trigger.show();
            }
        }
    }

    update() {
        for (let trigger of this.triggers) {
            trigger.checkClick(mouseX, mouseY);
        }
    }
}