class gPiece {
    constructor(_loc, _color, _size, _team) {
      this.loc = _loc;
      this.color = _color;
      this.size = _size;
      this.isChild = false;
      this.child = undefined;
      this.team = _team;
    }
    
    show() {
      strokeWeight(3);
			fill(this.color);
			stroke(this.color);
      if (!this.isChild) {
				if (this.team == BLUE) {
					image(blueMonster, this.loc.x - this.size/2, this.loc.y - this.size/2, this.size, this.size);
				} else {
					image(yellowMonster, this.loc.x - this.size/2, this.loc.y - this.size/2, this.size, this.size);
				}
				//circle(this.loc.x, this.loc.y, this.size);	
			} else {
				noFill();
				circle(this.loc.x, this.loc.y, this.size);
			}
		}
    
    getSize() { return this.size; }
    getColor() { return this.color; }
    getTeam() { return this.team; }
    isInside(tLoc) {
      return dist(tLoc.x, tLoc.y, this.loc.x, this.loc.y) < this.size/2;
    }
    
    selected(_isSelected) {
      this.isSelected = _isSelected;
    }
    
    isSelect() {
      return this.isSelected;
    }
    
    move(nLoc) {
      if (this.isSelected) {
        this.loc = nLoc;  
      }
    }
    
    isClose(tLoc, radius) {
      let result = dist(tLoc.x, tLoc.y, this.loc.x, this.loc.y) < radius;
      return result;
    }
    
    setIsChild(someBool) {
      this.isChild = someBool;
    }
    
    getIsChild() { return this.isChild; }
    
    setChild(tGPiece) {
      this.child = tGPiece;
    }
    
    getChild() { return this.child; }
    
    setLoc(tLoc) { this.loc = tLoc; }
    getLoc() { return this.loc; }
    
  }