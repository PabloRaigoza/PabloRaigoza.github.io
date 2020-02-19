function FieldMember( _x, _y ) {
	this.x = _x;
	this.y = _y;

	this.show = function() {
		fill(225, 50, 50, 200);
		noStroke(0);
		circle(this.x,this.y, 10);
	}
}
