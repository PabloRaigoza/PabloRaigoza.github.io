class Point {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
}

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(registration => {
        console.log("SW Registered!");
        console.log(registration);
    }).catch(error => {
        console.log("failure");
        console.log(error);
    });
} else {
    console.log("application not supported");
}



const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth*.95;
canvas.height = (canvas.width)/2;

let hangarWidth = (canvas.width*127) / (2*324);
let hangarHeight = (canvas.height*114) / (2*162);

let terminalWidthAct = 67.76;
let terminalHeightAct = 70.78;

let terminalWidth = (terminalWidthAct * canvas.width) / 648;
let terminalHeight = (terminalHeightAct * canvas.height) / 324;

// ctx.fillStyle = 'grey';
// ctx.fillRect(0,0,canvas.width/2, canvas.height);

// ctx.fillStyle = 'cyan';
// ctx.fillRect(0,canvas.height/2, canvas.width, canvas.height/2);

ctx.fillStyle = 'blue';
ctx.fillRect(0,0,hangarWidth,hangarHeight);


ctx.fillStyle = 'red';
ctx.fillRect(canvas.width-hangarWidth,canvas.height-hangarHeight,hangarWidth,hangarHeight);

ctx.fillStyle = 'blue';
drawTriangle(new Point(0,canvas.height-terminalHeight),
             new Point(0, canvas.height),
             new Point(terminalWidth, canvas.height));
ctx.fillStyle = 'red';
drawTriangle(new Point(canvas.width-terminalWidth,0),
             new Point(canvas.width, 0),
             new Point(canvas.width, terminalHeight));

for (let i = 0; i < 4; i++) {
    if (i < 2) {ctx.fillStyle = "blue";}
    else {ctx.fillStyle = "red";}

    drawWedge(new Point(canvas.width/2, canvas.height/2),
    canvas.height/3,
    65+i*(90),
    155+i*90);
    ctx.stroke();
}

ctx.fillStyle = "grey";
drawWedge(new Point(canvas.width/2, canvas.height/2),
          canvas.height/6,
          0,
          360);

function drawWedge(point1, radius, startAngle, endAngle, cc = false) {
    ctx.beginPath();
    ctx.moveTo(point1.x, point1.y);
    ctx.arc(point1.x, point1.y, radius, startAngle*(Math.PI)/180, endAngle*(Math.PI)/180, cc);
    ctx.closePath();
    ctx.fill();
}

function drawTriangle(point1, point2, point3) {
    ctx.beginPath();
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.lineTo(point3.x, point3.y);
    ctx.closePath();
    ctx.fill();
}


