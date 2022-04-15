class Button {
    constructor(_text,_point, _width, _height) {
        this.innerText = _text;
        this.x = _point.x;
        this.y = _point.y;
        this.width = _width;
        this.height = _height;
    }

    clickOccurred(point) {
        if (isPointInBox(point, new Point(this.x-this.width/2, this.y-this.height/2), this.width, this.height)) {
            return true;
        }
    }

    showBackGround() {
        rect(this.x-this.width/2, this.y-this.height/2, this.width, this.height);
    }

    showText() {
        textAlign(CENTER, CENTER);
        text(this.innerText, this.x, this.y);
    }
}