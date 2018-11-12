var serial;

var serialPortName = "/dev/cu.usbmodem1411";

var xOrient;
var yOrient;
var zOrient;

var mZ;
var mY;
var mX;

var z;
var c1;
var c2;
var gradientBG;
var canvas;

// An array of hoopa
var hoops = []; 

function setup() {
canvas = createCanvas(windowWidth, windowHeight, WEBGL);
z = 0;

serial = new p5.SerialPort();
serial.open(serialPortName);
serial.on('open', ardCon);
 serial.on('data',dataReceived);  



 for (var i = 0; i < 30; i++) {

hoops[i] = {
 r: 100,
 	tR: 8,
x: random(0,windowWidth/8.5),
y: random(windowHeight/4),
z: random(0,-80000),
 display: function() {
 	
noStroke();
normalMaterial();
fill(17,1,122);
},

pos : function() {
   push();
//translate(this.x-1200, this.y, this.z+30);
translate(this.x*-12+180, this.y*2+80, this.z);

  rotateY(frameCount * 0.02);
  torus(this.r, this.tR);
pop();

}
}
}
}

function draw() {
 
	canvas.id('background');
	var mZ = map(zOrient, 0, -10, 0, windowHeight, true);
 var mY = map(yOrient, -32, 62, 0, windowHeight, true);
  var mX = map(xOrient, 255, 72, 0, -windowWidth, true);

	//z in this case will control my speed, mouse X and mouse Y will be replaced with the IMU x and y

	//Z will always steer us straight ahead. 
	//X and Y will allow us to look up, down and side to side.
//camera(mouseX, mouseY, z*-1, height/4, (height/4) / tan(PI/6), -width/2, height/2, 0, 0, 1, 0);
//camera(xOrient, yOrient, z*-1, height/4, (height/4) / tan(PI/6), -width/2, height/2, 0, 0, 1, 0);
//camera(mX, mY, mZ*1, height/4, (height/4) / tan(PI/6), -width/2, height/2, 0, 0, 1, 0);

camera(mX, mY, z*-6, height/2, (height/2) / tan(PI/6), -width/2, height/2, 0, 0, 1, 0);

for(var i = 0; i < hoops.length; i++) {
hoops[i].display();
hoops[i].pos();
}


//Original Torus
push();
translate(-windowWidth/2+250, windowHeight/6,-300);
  rotateY(frameCount * 0.02);
  torus(100, 8);
pop();
noStroke();
normalMaterial();
fill(20,55,100);
push();
translate(-275, 175,-500);

cone(50,70);
pop();



z++;



}

function dataReceived(){

var rawImuData = serial.readStringUntil('\r\n');
{

if(rawImuData.length >1)
{
 xOrient = JSON.parse(rawImuData).oX;

 yOrient = JSON.parse(rawImuData).oY;

 zOrient = JSON.parse(rawImuData).oZ;

 //Let's remap the orientation values min and max to the screen:

//zOrient remapped


 
}



}


}

function ardCon()
{
  console.log("connected to the arduino!! Listen UP");
}

/*
//Shapes below are examples from the WebGL 
//P5 GitHub: https://github.com/processing/p5.js/wiki/Getting-started-with-WebGL-in-p5 

	noStroke();
	fill(50);
	push();
	translate(-275, 175,-500);
	rotateY(1.25);
	rotateX(-0.9);
	box(100);
	pop();


	fill(100,25,255);
	directionalLight(0, 150, 80, 0, -1, 0);
	stroke(255);
	push();

	translate(50, height*0.35, -10000);
	sphere(200);
	pop();

fill(0,25,255);
directionalLight(255, 120, 0, 0, -1, 0);
	stroke(255);
	push();
	translate(500, height*0.35, -500);
	sphere(200);
	pop();

translate(-140, -100, -5020);
  normalMaterial();
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  box(70);
  pop();

	translate(-240, -100, -10020);
  normalMaterial();
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  box(70,70,z++);
  pop();



}
*/

