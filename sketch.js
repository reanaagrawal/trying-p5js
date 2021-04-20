'use strict';

var maxCount = 5000; // max count of the circles
var currentCount = 1;
var x = [];
var y = [];
var r = [];
var c = [];
let lapse = 0;    // mouse timer

function setup() {
  createCanvas(1112, 834);
	colorMode(HSB, 255);
  strokeWeight(0.5);

  // first circle
  x[0] = width / 2;
  y[0] = height / 2;
  r[0] = 10;
  c[0] = color('#fff');
}

function draw() {
  clear();

  // create a random set of parameters
  var newR = random(1, 7);
  var newX = random(newR, width - newR);
  var newY = random(newR, height - newR);

  var closestDist = Number.MAX_VALUE;
  var closestIndex = 0;
  // which circle is the closest?
  for (var i = 0; i < currentCount; i++) {
    var newDist = dist(newX, newY, x[i], y[i]);
    if (newDist < closestDist) {
      closestDist = newDist;
      closestIndex = i;
    }
  }

  // align it to the closest circle outline
  var angle = atan2(newY - y[closestIndex], newX - x[closestIndex]);

  x[currentCount] = x[closestIndex] + cos(angle) * (r[closestIndex] + newR);
  y[currentCount] = y[closestIndex] + sin(angle) * (r[closestIndex] + newR);
  r[currentCount] = newR;
  c[currentCount] = color(random(255), 255, 255);
  currentCount++;

  // draw them
  for (var i = 0; i < currentCount; i++) {
    fill(c[i]);
    ellipse(x[i], y[i], r[i] * 2, r[i] * 2);
  }

  if (currentCount >= maxCount) noLoop();
}

function mousePressed(){
// prevents mouse press from registering twice
  if (millis() - lapse > 200){
    save('pix.jpg');
    lapse = millis();
  }
}

