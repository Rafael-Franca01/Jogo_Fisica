class Trigger {
    constructor(x, y, w, h, func, visible = true) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.func = func;
        this.visible = visible;
    }

    display() {
        if (this.visible) {
            noFill();
            stroke(255, 0, 0);
            rect(this.x, this.y, this.w, this.h);
        }
    }

    checkClick(mx, my) {
        if (mx > this.x && mx < this.x + this.w && my > this.y && my < this.y + this.h) {
            this.func();
        }
    }
}