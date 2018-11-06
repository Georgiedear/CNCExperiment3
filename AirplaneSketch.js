
var z;
var c1;
var c2;
var Y_AXIS; //Example used from Linear Gradient 
var gradientBG;
var canvas;
function setup() {
canvas = createCanvas(windowWidth, windowHeight, WEBGL);
z = 0;

}

function draw() {
	canvas.id('background');
	//z in this case will control my speed
camera(mouseX, mouseY, z*-5, height/4, (height/4) / tan(PI/6), -width/2, height/2, 0, 0, 1, 0);

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

