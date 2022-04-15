class Point {
    constructor(_x=0, _y=0) {
        this.x = _x;
        this.y = _y;
    }
}

class Bird {
    constructor(_point, _radius) {
        this.x = _point.x;
        this.y = _point.y;
        this.radius = _radius;
        this.yVel = 0;
    }

    jump() {
        this.yVel = -15;
        // this.yVel = -10;
    }

    update() {
        // let gravity = 1;
        let gravity = 1;
        this.yVel += gravity;
        this.y += this.yVel;
        if (this.y+this.radius > height) {
            this.y = height-this.radius;
            this.yVel -= gravity;
        }
    }

    show() {
        fill(100,100,100);
        circle(this.x, this.y, this.radius*2);
    }
}