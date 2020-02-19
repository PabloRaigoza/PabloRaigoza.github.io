function drawField() {
	drawHashes();
	drawNumbers();
}

function drawEveryFive() {
	let disHash = width/20;
	stroke(255);
	strokeWeight(2);
	for(let i = 0; i < 20; i++){
		line(i*disHash,0,i*disHash,height);
	}
}

function drawYards() {
	let smallHashes = width/100;
	let smallHeight = 15;
	for(let i = 0; i < 100; i++) {
		stroke(255);
		strokeWeight(2);
		line(smallHashes*i, 0, smallHashes*i, smallHeight);
		line(smallHashes*i, height, smallHashes*i, height-smallHeight);
	}
}

function drawHashes() {
	drawYards();
	drawEveryFive();
}

function drawNumbers() {
	fill(0);
	noStroke(0);
	textAlign(CENTER,CENTER);
	textSize(24);

	drawTopNumbers();
	drawBottomNumbers();
}

function drawTopNumbers() {
	let disHash = width/10;
	let yardCounter = 10;
	let goDown = false;
	for(let i = 1; i < 10; i++) {
		push();
		translate(i*disHash, height-(height-40));
		rotate(PI);
		text(yardCounter,0,0);
		pop();
		
		if(!goDown)
			yardCounter = yardCounter + 10;
		else
			yardCounter = yardCounter - 10;
		if(yardCounter > 50) {
			goDown = true;
			yardCounter = yardCounter - 20;	
		}
	}
}

function drawBottomNumbers() {
	let disHash = width/10;
	let yardCounter = 10;
	let goDown = false;
	for(let i = 1; i < 10; i++) {
		text(yardCounter,i*disHash,height-40);
	
		if(!goDown)
			yardCounter = yardCounter + 10;
		else
			yardCounter = yardCounter - 10;
		if(yardCounter > 50) {
			goDown = true;
			yardCounter = yardCounter - 20;	
		}
	}
}
