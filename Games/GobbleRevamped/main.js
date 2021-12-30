const LARGE = 100;
const MED   = 75;
const SMALL = 50; 
let redGPiece = [];
let blueGPiece = [];
let isRedTurn =  true;

let grid = [];

let padding;
let bigBox;
let cell;

let pRedLoc = [];
let pBlueLoc = [];

let winner = false;
let backColor;

const RED = 1;
const BLUE = 2;

let clack;
let victory;
let eating;
let backgroundMusic;
let blueMonster;
let yellowMonster;

let redColor;
let blueColor;

function preload() {
    clack = loadSound("clack.mp3");
    victory = loadSound("victory.mp4");
    eating = loadSound("eating.mp4");
    backgroundMusic = loadSound("background_music.mp4");
		blueMonster = loadImage("blue_monster.png");
		yellowMonster = loadImage("yellow_monster.png");
}

function setup() {
  createCanvas(700, 700);
  pRedLoc = [0,0,0,0,0,0];
  pBLueLoc = [0,0,0,0,0,0];
  padding = (width)/6;  
  bigBox = width-2*padding;
  cell = bigBox/3;
  backColor = color(200,200,200);
	redColor = color(254,210,10);
	blueColor = color(89,203,165);
  for (let i = 0; i < 6; i++) {
    let newRedPiece = new gPiece(createVector(padding/2,padding+i*LARGE),
                              color(255,0,0),
                              LARGE-(i%3)*25, RED);
    let newBluePiece = new gPiece(createVector(width-padding/2,padding+i*LARGE),
                              color(0,0,255),
                              LARGE-(i%3)*25,BLUE);
    redGPiece.push(newRedPiece);
    
    blueGPiece.push(newBluePiece);
  }
  grid = [0,0,0,
          0,0,0,
          0,0,0];
  backgroundMusic.loop();
	backgroundMusic.setVolume(1);
}

function showGrid() {
  strokeWeight(20)

  stroke(redColor);
	line(padding, padding+cell,width-padding, padding+cell);
	line(padding, padding+cell*2,width-padding, padding+cell*2);

  stroke(blueColor);
  line(padding+cell, padding, padding+cell, height-padding);
  line(padding+cell*2, padding, padding+cell*2, height-padding);
}



function draw() {
  background(backColor);
	for (let i = 0; i < 6; i++) {
		redGPiece[i].show();
		blueGPiece[i].show();
	}
  showGrid();
}

function mousePressed() {
	mouseV  = createVector(mouseX, mouseY);

	for (let i = 0; i < 6; i++) {
		pRedLoc[i] = redGPiece[i].getLoc();
		pBlueLoc[i] = blueGPiece[i].getLoc();
	}
	
	let isFound = false;
	for (let i = 0; i < 6; i++) {
		if (!isFound && redGPiece[i].isInside(mouseV) && isRedTurn && !redGPiece[i].getIsChild()) {
			redGPiece[i].selected(true);
			isFound = true;
		} else if (!isFound && blueGPiece[i].isInside(mouseV) && !isRedTurn && !blueGPiece[i].getIsChild()) {
			blueGPiece[i].selected(true);
			isFound = true;
		} else {
			redGPiece[i].selected(false);
			blueGPiece[i].selected(false);
		}
	}
}

function mouseDragged() {
  mouseV = createVector(mouseX, mouseY);
  for (let i = 0; i < 6; i++) {
    if (redGPiece[i].isSelect() && isRedTurn) {
      redGPiece[i].move(mouseV);
    } else if (blueGPiece[i].isSelect() && !isRedTurn) {
      blueGPiece[i].move(mouseV);
    }
  }
}

function canMove(j, tGPiece) {
  return grid[j] == 0 || grid[j].getSize() < tGPiece.getSize();
}

function find(tGPiece) {
  for (let i = 0; i < 9; i++) {
    if (grid[i] == tGPiece) {
      return i;
    }
  }
  return false;
}

function mouseReleased() {
  mouseV  = createVector(mouseX, mouseY);
  //let pGrid = grid;

  let pTurn = isRedTurn;
  for (let i = 0; i < 6; i++) {
    let sPiece = redGPiece[i];
    if (!isRedTurn) { sPiece = blueGPiece[i]; }
    if (sPiece.isSelect()) {
      for (let j = 0; j < 9; j++) {
        let ySpace = 0;
        if (j>2 && j < 6) {ySpace = 1}
        if (j >5) {ySpace = 2}
        let testLoc = createVector((padding+cell/2)+(j%3)*cell, (padding+cell/2)+ySpace*cell);
        if (sPiece.isClose(testLoc, cell/1.75) && canMove(j, sPiece)){

          if (grid[j] == 0) {
            clack.play();
            clack.setVolume(5);
            if (sPiece.child != undefined) {
              let prevIndex = find(sPiece);
              sPiece.getChild().setIsChild(false);
              grid[prevIndex] = sPiece.getChild();
              sPiece.setChild(undefined);
            } else {
              grid[find(sPiece)] = 0;
            }
            grid[j] = sPiece;
          } else if (grid[j].getSize() < sPiece.getSize()) {
            eating.play();
            if (sPiece.child != undefined) {
              let prevIndex = find(sPiece);
              sPiece.getChild().setIsChild(false);
              grid[prevIndex] = sPiece.getChild();
              sPiece.setChild(undefined);
            } else {
              grid[find(sPiece)] = 0;
            }
            grid[j].setIsChild(true);
            sPiece.setChild(grid[j]);
            grid[j] = sPiece;
          }

          sPiece.move(testLoc);
          isRedTurn = !isRedTurn;
        }
      }
    }
    redGPiece[i].selected(false);
    blueGPiece[i].selected(false);
  }
  
  if (pTurn == isRedTurn) {
    for (let i = 0; i < 6; i++) {
      redGPiece[i].setLoc(pRedLoc[i]);
      blueGPiece[i].setLoc(pBlueLoc[i]);
    }
  } else {
    checkWinner();
  }
}

function checkWinner() {
  for (let i = 0; i < 3; i++) {
    let judgeMemory = [];
    for (let j = i; j < i+7; j+=3) {
      if (grid[j] != 0) {
        judgeMemory.push(grid[j].getTeam());  
      }
    }
    if (judgeMemory.length == 3 && new Set(judgeMemory).size == 1) {
      foundWinner(judgeMemory[0]);
    }
  }
  
  for (let i = 0; i < 3; i+=3) {
    let judgeMemory = [];
    for (let j = i; j < i+3; j++) {
      if (grid[j] != 0) {
        judgeMemory.push(grid[j].getTeam());  
      }
    }
    if (judgeMemory.length == 3 && new Set(judgeMemory).size == 1) {
      foundWinner(judgeMemory[0]);
    }
  }
  
  let judgeMemory = [];
  for (let j = 0; j < 9; j+=4) {
    if (grid[j] != 0) {
      judgeMemory.push(grid[j].getTeam());  
    }
  }
  if (judgeMemory.length == 3 && new Set(judgeMemory).size == 1) {
    foundWinner(judgeMemory[0]);
  }
  
  judgeMemory = [];
  for (let j = 2; j < 7; j+=2) {
    if (grid[j] != 0) {
      judgeMemory.push(grid[j].getTeam());  
    }
  }
  if (judgeMemory.length == 3 && new Set(judgeMemory).size == 1) {
    foundWinner(judgeMemory[0]);
  }

}

function foundWinner(winnerColor) {
	if (!winner) {
		backgroundMusic.pause();
		victory.play();
		winner = true;
		if (winnerColor == RED) {
			backColor = redColor;  
		} else {
			backColor = blueColor;
		}
		noLoop();
	}
}