class Menu {
    constructor(intro) {
        this.active = true;
        this.i = 0;
        this.reading = false;
        this.transitioning = false;
        this.reverse = false;
        this.destination = null;
        this.imgs = {
            play: loadImage("menu/menu_play.png"),
            credits: loadImage("menu/menu_credits.png"),
            spoiler: loadImage("menu/menu_spoiler.png"),
            credits_text: loadImage("menu/menu_credits_text.png"),
            spoiler_text1: loadImage("menu/menu_spoiler_text1.png"),
            spoiler_text2: loadImage("menu/menu_spoiler_text2.png"),
            t1: loadImage("menu/menu_t1.png"),
            t2: loadImage("menu/menu_t2.png")
        }
        this.current = "play";
        this.triggers = [
            new Trigger(678 * off.w, 331 * off.h, 318 * off.w, 134 * off.h, () => {
                switch (this.current) {
                    case "play":
                        intro.play();
                        this.active = false;
                        break;
                    case "credits":
                        this.reading = true;
                        this.current = "credits_text";
                        break;
                    case "spoiler":
                        this.current = "spoiler_text1";
                        this.reading = true;
                        break;
                    case "spoiler_text1":
                        this.reading = true;
                        this.current = "spoiler_text2";
                        break;
                    case "spoiler_text2":
                        this.reading = false;
                        this.current = "spoiler";
                        break;
                    case "credits_text":
                        this.reading = false;
                        this.current = "credits";
                        break;
                }
            }, () => {
                if (!this.reading) return;

                switch (this.current) {
                    case "spoiler_text1":
                        this.reading = true;
                        this.current = "spoiler_text2";
                        break;
                    case "spoiler_text2":
                        this.reading = false;
                        this.current = "spoiler";
                        break;
                    case "credits_text":
                        this.reading = false;
                        this.current = "credits";
                        break;
                }
            }),
            new Trigger(1168 * off.w, 366 * off.h, 60 * off.w, 60 * off.h, () => {
                this.transitioning = true;
                switch (this.current) {
                    case "play":
                        this.destination = "credits";
                        break;
                    case "credits":
                        this.destination = "spoiler";
                        break;
                    case "spoiler":
                        this.destination = "play";
                        break;
                }
                this.current = "t1"
                this.reverse = false;
                this.transition();
            }),
            new Trigger(408 * off.w, 368 * off.h, 60 * off.w, 60 * off.h, () => {
                this.transitioning = true;
                switch (this.current) {
                    case "play":
                        this.destination = "spoiler";
                        break;
                    case "credits":
                        this.destination = "play";
                        break;
                    case "spoiler":
                        this.destination = "credits";
                        break;
                }
                this.current = "t2"
                this.reverse = true;
                this.transition();
            })
        ]
    }

    show() {
        image(this.imgs[this.current], 0, 0, W, H)
        if (this.transitioning) {
            this.transition();
        }
    }

    update() {
        for (let t of this.triggers) {
            t.checkClick(mouseX, mouseY)
        }
    }


    transition() {
        this.i++;
        if (this.i == 3) {
            this.current = (this.reverse) ? "t1" : "t2";
        }
        if (this.i == 6) {
            this.i = 0;
            this.transitioning = false;
            this.current = this.destination;
        }
    }
}