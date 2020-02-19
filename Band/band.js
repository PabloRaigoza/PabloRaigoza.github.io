let people = [];
let myPanel;

function setup() {
	createCanvas(600,400);
	myPanel = new Panel(0,0,100,height, width-25,height-25,25,25);
}

function displayPeople() {
	for(let i = 0; i < people.length; i++){
		people[i].show();
		textAlign(CENTER,CENTER);
		noStroke(0);
		fill(0);
		textSize(12);
		text(1+i,people[i].x, people[i].y+1);
	}
}

function draw() {
	background(100,200,100);
	drawField();

	mouseNext();
	displayPeople();

	myPanel.show();
}

function mouseNext() {
	let disHash = width/20;
	for(let i = 1; i < 20; i++) {
		for(let j = -5; j < 6; j++) {
			if(mouseX+j == disHash*i) {
				stroke(230,250,75);
				strokeWeight(4);
				line(disHash*i, 0, disHash*i, height);
				mouseX = disHash*i;
				return disHash*i;
			}
		}
	}
	return 0;
}

function mousePressed() {
	if( dist(mouseX, mouseY, myPanel.x2+(myPanel.w2/2), myPanel.y2+(myPanel.h2/2)) < 12 ) {
		if(myPanel.shown)
			myPanel.shown = false;
		else
			myPanel.shown = true;
	}
	else {
		let closest = mouseNext();
		if(closest == 0) 
			people.push(new FieldMember(mouseX, mouseY));
		else
			people.push(new FieldMember(closest, mouseY));
		stroke(0);
	}

}
