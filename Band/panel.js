function Panel( _x, _y, _w, _h, _x2, _y2, _w2, _h2 ) {
	this.x = _x;
	this.y = _y;
	this.w = _w;
	this.h = _h;

	this.x2 = _x2;
	this.y2 = _y2;
	this.w2 = _w2;
	this.h2 = _h2;

	this.shown = false;

	this.show = function() {
		noStroke();

		if(this.shown){
			fill(255,255,255,200);
			rect(this.x, this.y, this.w, this.h);

			let d = 25;
			for( let i = 0; i < 4; i++ ){
				for( let j = 0; j < 10; j++ ) {
					let index = i+j*4;
					fill(225, 50, 50, 200);
					noStroke();
					circle( 12+(i*d), 12+(j*d), 20);
					fill(0);
					textSize(16);
					text(index, 12+(i*d), 13+(j*d));
				}
			}

		}

		fill(0,0,200);
		rect(this.x2, this.y2, this.w2, this.h2);
		
	}
}
