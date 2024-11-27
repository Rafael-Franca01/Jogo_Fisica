class Computador {
    constructor(room) {
        this.img = loadImage("zoom/computador.png");
        this.game = new Game(400, 130, 875, 415);
        this.room = room;
        this.trigger = new Trigger(0, H - 150, W, H, () => {
            room.interacting = false;
            room.facing = "right";
        });
    }

    show(light) {
        if (light) {
            this.game.show();
        }
        image(this.img, 0, 0);
    }

    update() {
        this.trigger.checkClick(mouseX, mouseY);
        this.game.press();

    }

    release() {
        this.game.release();
    }
}

class Wall {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    show() {
        fill(0);
        noStroke();
        rect(this.x, this.y, this.w, this.h);
    }
}

class Ball {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.yVel = 0;
        this.xVel = 0;
        this.acceleration = 0.1;
        this.GRAVITY = 0.2;
    }

    show() {
        fill(255);
        noStroke();
        circle(this.x, this.y, this.size);
    }

    update() {
        this.yVel += this.GRAVITY;
        this.y += this.yVel;
        this.x += this.xVel;

        // if (this.y >= 400 - this.size / 2) {
        //     this.y = 400 - this.size / 2;
        //     this.yVel *= -0.5;
        // } else if (this.y <= this.size / 2) {
        //     this.y = this.size / 2;
        //     this.yVel *= -0.5;
        // }

        // if (this.x >= 400 - this.size / 2) {
        //     this.x = 400 - this.size / 2;
        //     this.xVel *= -0.9;
        // } else if (this.x <= this.size / 2) {
        //     this.x = this.size / 2;
        //     this.xVel *= -0.9;
        // }

    }

    moveTowards(x, y, force) {
        let dx = x - this.x;
        let dy = y - this.y;
        let distance = dist(this.x, this.y, x, y);

        if (distance > 0) {
            this.xVel = (dx / distance) * force;
            this.yVel = (dy / distance) * force;
        }
    }

    isOnGround(walls) {
        for (let wall of walls) {
            if (
                this.y + this.size / 2 >= wall.y &&
                this.y - this.size / 2 <= wall.y + wall.h &&
                this.x + this.size / 2 >= wall.x &&
                this.x - this.size / 2 <= wall.x + wall.w
            ) {
                return true;
            }
        }
        return this.y >= 400 - this.size / 2;
    }

}

class Game {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = x + w;
        this.h = y + h;
        this.ball = new Ball(x + 200, y + 100, 20);
        this.pressStartTime = 0;
        this.isPressed = false;
        this.calculatedForce = 0;
        this.walls = [
            // ground
            new Wall(x, y + h, w, 20),
            // top
            new Wall(x, y, w, 20),
            // walls
            new Wall(x, y, 20, h),
            new Wall(x + w, y, 20, h),
            // obstacles
            new Wall(x + 100, y + 200, 200, 20),
            new Wall(x + 100, y + 250, 20, 150),
            new Wall(x + 280, y + 250, 20, 150),
        ];
    }

    intersects(ball, wall) {
        let nearestX = constrain(ball.x, wall.x, wall.x + wall.w);
        let nearestY = constrain(ball.y, wall.y, wall.y + wall.h);
        let distance = dist(ball.x, ball.y, nearestX, nearestY);

        if (distance < ball.size / 2) {
            let overlap = ball.size / 2 - distance;
            let normalX = (ball.x - nearestX) / distance;
            let normalY = (ball.y - nearestY) / distance;

            ball.x += normalX * overlap;
            ball.y += normalY * overlap;

            // Separate velocity adjustments for vertical and horizontal collisions
            if (abs(normalX) > abs(normalY)) {
                ball.xVel *= -0.8; // Horizontal collision
            } else {
                ball.yVel *= -0.8; // Vertical collision
            }
        }
    }

    crossCursor(showDots) {
        if (mouseX < this.x || mouseX > this.w || mouseY < this.y || mouseY > this.h) {
            cursor();
            return;
        }
        noCursor();
        stroke(0);
        strokeWeight(2);
        line(mouseX - 5, mouseY - 5, mouseX + 5, mouseY + 5);
        line(mouseX - 5, mouseY + 5, mouseX + 5, mouseY - 5);

        if (showDots) {
            let dotSpacing = 10;
            let distance = dist(this.ball.x, this.ball.y, mouseX, mouseY);
            let steps = distance / dotSpacing;
            stroke(0);
            strokeWeight(2);
            for (let i = 0; i < steps; i++) {
                let t = i / steps;
                let x = lerp(this.ball.x, mouseX, t);
                let y = lerp(this.ball.y, mouseY, t);
                point(x, y);
            }
        }
    }

    show() {
        background(220);
        this.crossCursor(this.ball.isOnGround(this.walls));
        this.ball.show();
        for (let wall of this.walls) {
            wall.show();
            this.intersects(this.ball, wall)
        }
        this.ball.update();
        this.ball.xVel = (this.ball.isOnGround(this.walls)) ? this.ball.xVel * 0.99 : this.ball.xVel;

        if (!this.isPressed && this.calculatedForce > 0 && this.ball.isOnGround(this.walls)) {
            this.ball.moveTowards(mouseX, mouseY, this.calculatedForce);
            this.calculatedForce = 0;
        }

        let maxForce = 10;
        let barHeight = map(this.isPressed ? millis() - this.pressStartTime : this.calculatedForce * 100, 0, maxForce * 100, 0, 200);
        barHeight = constrain(barHeight, 0, 200);

        fill(200, 0, 0);
        rect(this.x + 10, this.h - 30 - barHeight, 20, barHeight);
        stroke(0);
        noFill();
        rect(this.x + 10, this.h - 230, 20, 200);
    }

    press() {
        if (this.ball.isOnGround(this.walls)) {
            this.isPressed = true;
            this.pressStartTime = millis();
        }
    }

    release() {
        if (this.isPressed) {
            let pressDuration = millis() - this.pressStartTime;
            this.calculatedForce = constrain(pressDuration / 100, 0, 10);
            this.isPressed = false;
        }
    }

}