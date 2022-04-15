const TUBE_GAP = 200;
const TUBE_WIDTH = 75;
const DIST_TUBES = 350;

function isPointInBox(point, corner, width, height, radius = 0) {
    if (point.x < corner.x+width+radius && point.x > corner.x-radius) {
        if (point.y < corner.y+height+radius && point.y > corner.y-radius) {
            return true;
        }
    }
    return false;
}

class Tube {
    constructor() {
        this.y = random(TUBE_GAP+50,height-TUBE_GAP+50);
        this.x = width+TUBE_WIDTH/2;
    }

    isColision(point, radius) {
        if (isPointInBox(point, new Point(this.upperX, this.upperY), this.upperW, this.upperH, radius) ) {
            return true;
        }
        if (isPointInBox(point, new Point(this.lowerX, this.lowerY), this.lowerW, this.lowerH, radius) ) {
            return true;
        }
        return false;
    }

    update(otherX) {
        this.x-=3;
        
        // if (this.x < BIRD_X && this.x>0) {
        //     score++;
        // }
        
        if (this.x<0) {
            this.x = otherX+DIST_TUBES;
            this.y = random(TUBE_GAP+50,height-TUBE_GAP+50);
        }
        this.upperX = this.x-TUBE_WIDTH/2;
        this.upperY = 0;
        this.upperW = TUBE_WIDTH;
        this.upperH = this.y-TUBE_GAP/2;

        this.lowerX = this.x-TUBE_WIDTH/2;
        this.lowerY = this.y+TUBE_GAP/2;
        this.lowerW = TUBE_WIDTH;
        this.lowerH = height-this.y;
    }

    show() {
        fill(0,150,0);
        rect(this.upperX,this.upperY,this.upperW,this.upperH);
        rect(this.lowerX,this.lowerY,this.lowerW,this.lowerH);
    }
}