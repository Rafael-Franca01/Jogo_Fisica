const W = 1653, H = 796;
let quarto;

function preload() {
    quarto = new Quarto()
}

function setup() {
    // trigger_left = new Trigger(0, 0, 100, H, () => {
    //     face = ((face + 1) % 4) + luz;
    // });
    // trigger_right = new Trigger(W - 100, 0, 100, H, () => {
    //     face = ((face + 3) % 4) + luz;
    // });

    // trigger_mesa = new Trigger(816, 393, 305, 193, () => {
    //     prev_face = face;
    //     face = 10;
    // });
    // trigger_computador = new Trigger(737, 412, 174, 189, () => {
    //     prev_face = face;
    //     face = 11;
    // });
    // trigger_energia = new Trigger(1102, 342, 68, 51, () => {
    //     prev_face = face;
    //     face = 12;
    // });
    // trigger_aquario = new Trigger(563, 101, 515, 296, () => {
    //     prev_face = face;
    //     face = 13;
    // });
    // trigger_back = new Trigger(0, H - 150, W, H, () => {
    //     face = prev_face;
    // });
    createCanvas(W, H);
    // image(quarto[0], 0, 0);
}

function draw() {
    if (quarto.light) {
        background(255)
    } else {
        background(0)
    }
    quarto.show()
}

function mousePressed() {
    console.log(mouseX, mouseY)
    quarto.update()
}

function mouseReleased() {
    if (quarto.facing == "computador" && quarto.light) {
        quarto.interactions.computador.release()
    }
}