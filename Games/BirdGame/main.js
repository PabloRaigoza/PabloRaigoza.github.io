let sBird;
let t = 0;
let tubes = [];
let gameOver = false;
let score = 0;
let button;
let BIRD_X;
function setup() {
    createCanvas(600,800);
    sBird = new Bird(new Point(600/4,800/2), 25);
    BIRD_X = sBird.x;
    tubes.push(new Tube());
    tubes.push(new Tube());
    tubes[1].x+=DIST_TUBES;
    button = new Button("↻", new Point(width/2, height*6/7), width/2, height/10);
}

function draw() {
    background(105,184,209);
    if (!gameOver) {
        
        sBird.update();
        sBird.show();

        tubes[0].update(DIST_TUBES);
        tubes[0].show();
        for (let i = 1; i < tubes.length; i++) {
            tubes[i].update(tubes[i-1].x);
            tubes[i].show();
        }

        score++;
        checkColision();
        fill(0,0,0);
        textAlign(LEFT, TOP);
        textSize(width/15);
        text("Score: "+score, 0,0);
    } else {
        fill(255,50,50);
        textSize(width/6)
        textAlign(CENTER, CENTER);
        text("GAMEOVER", width/2, height/2);
        
        fill(0,0,0);
        textSize(width/12);
        text("SCORE: "+score, width/2, height*5/7);

        fill(255, 127, 39);
        button.showBackGround();
        fill(0,0,0);
        textSize(width/16);
        button.showText();
    }
}

function mousePressed() {
    if (gameOver) {
        console.log(new Point(mouseX, mouseY))
        if (button.clickOccurred(new Point(mouseX, mouseY))) {
            // console.log("kjalskjd")
            sBird = new Bird(new Point(BIRD_X,height/2), 25);
            tubes = [];
            tubes.push(new Tube());
            tubes.push(new Tube());
            tubes[1].x+=DIST_TUBES;
            score = 0;
            gameOver = false;
        }
    }
}

function keyPressed() {
    if (!gameOver) {
        if (key == ' ') {
            sBird.jump();
        }
    }
}

function checkColision() {
    for (let i = 0; i < tubes.length; i++) {
        if (tubes[i].isColision(new Point(sBird.x, sBird.y), sBird.radius)) {
            gameOver = true;
        }
    }
}

