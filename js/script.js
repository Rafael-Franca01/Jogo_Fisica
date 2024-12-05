let W, H;
let off;
let quarto;
let menu;
let intro;
let ended = false;

function preload() {
    W = windowWidth, H = windowHeight;
    off = { w: windowWidth / 1653, h: windowHeight / 796 }
    quarto = new Quarto()
    intro = new Cutscene("cutscenes/intro.mp4", () => {
        intro.active = false
    }, true);
    ed1 = new Cutscene("cutscenes/final_1.mp4", () => {
        ed1.active = false
        quarto.showEnd = true;
    });
    ed2 = new Cutscene("cutscenes/final_2.mp4", () => {
        ed2.active = false
        ended = true;
        window.location.reload()
    });
    edAlt = new Cutscene("cutscenes/final_alt.mp4", () => {
        edAlt.active = false
        ended = true;
        window.location.reload()
    });

    quarto.walls.front.addTrigger(0, 0, W, H, () => {
        this.showEnd = false;
        ed2.active = true;
        ed2.play()
    })
    quarto.walls.front.triggers[2].disable = true;
    quarto.walls.front.addTrigger(628 * off.w, 337 * off.h, 339 * off.w, 235 * off.h, () => {
        if (quarto.light && quarto.energy && quarto.resistors && quarto.won) {
            ed1.active = true;
            ed1.play()
            quarto.walls.front.triggers[2].disable = false;
        }
    });
    quarto.walls.back.addTrigger(194 * off.w, 472 * off.h, 309 * off.w, 204 * off.h, () => {
        if (quarto.light && quarto.energy && quarto.resistors && quarto.won) {
            edAlt.active = true;
            edAlt.play()
        }
    });

    menu = new Menu(intro)
}

function setup() {
    createCanvas(W, H);
}

function draw() {
    if (menu.active) {
        menu.show()
        return
    }
    if (intro.active) {
        intro.show()
        return
    }

    if (ed1.active) {
        ed1.show()
        return
    }

    if (ed2.active) {
        ed2.show()
        return
    }

    if (edAlt.active) {
        edAlt.show()
        return
    }

    if (ended) {
        background(0)
        return
    }

    if (quarto.light) {
        background(255)
    } else {
        background(0)
    }
    quarto.show()
}

function mousePressed() {
    console.log(mouseX, mouseY)
    if (menu.active) {
        menu.update()
        return
    }
    quarto.update()
}

function mouseReleased() {
    if (menu.active) {
        return
    }
    if (quarto.facing == "computador" && quarto.light) {
        quarto.interactions.computador.release()
    }
}