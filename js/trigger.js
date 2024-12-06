class Trigger {
    constructor(x, y, w, h, func, otherFunc = () => { }) { // LINDO!
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.disable = false;
        this.func = func;
        this.otherFunc = otherFunc;
    }

    // show() {
    //     noFill();
    //     stroke(255, 0, 0);
    //     rect(this.x, this.y, this.w, this.h);
    // }

    checkClick(mx, my) {
        if (this.disable) {
            return;
        }
        if (mx > this.x && mx < this.x + this.w && my > this.y && my < this.y + this.h) {
            this.func();
        } else {
            this.otherFunc();
        }
    }

    checkInside(mx, my) {
        return mx > this.x && mx < this.x + this.w && my > this.y && my < this.y + this.h;
    }
}