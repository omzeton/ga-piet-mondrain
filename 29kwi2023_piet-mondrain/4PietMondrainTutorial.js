import { default as p5Class } from "p5";
import "./style.css";

const p5 = new p5Class(() => {});
const canvasWidth = 1000;
const canvasHeight = 1000;
const blockSize = canvasWidth;
const step = canvasHeight / 5;

const bgColor = "#CCDADD";
const strokeColor = "#202126";
const colors = ["#FE1A00", "#004FB4", "#F6B71E"];

const squares = [
  {
    x: 0,
    y: 0,
    width: blockSize,
    height: blockSize,
    color: bgColor,
  },
];

function splitSquaresWith({ x, y }) {
  for (let i = squares.length - 1; i >= 0; i--) {
    const square = squares[i];

    if (x && x > square.x && x < square.x + square.width) {
      if (p5.random() > 0.5) {
        squares.splice(i, 1);
        splitOnX(square, x);
      }
    }

    if (y && y > square.y && y < square.y + square.height) {
      if (p5.random() > 0.5) {
        squares.splice(i, 1);
        splitOnY(square, y);
      }
    }
  }
}

function splitOnX(square, splitAt) {
  const squareA = {
    x: square.x,
    y: square.y,
    width: square.width - (square.width - splitAt + square.x),
    height: square.height,
    color: bgColor,
  };

  const squareB = {
    x: splitAt,
    y: square.y,
    width: square.width - splitAt + square.x,
    height: square.height,
    color: bgColor,
  };

  squares.push(squareA);
  squares.push(squareB);
}

function splitOnY(square, splitAt) {
  const squareA = {
    x: square.x,
    y: square.y,
    width: square.width,
    height: square.height - (square.height - splitAt + square.y),
    color: bgColor,
  };

  const squareB = {
    x: square.x,
    y: splitAt,
    width: square.width,
    height: square.height - splitAt + square.y,
    color: bgColor,
  };

  squares.push(squareA);
  squares.push(squareB);
}

p5.setup = () => {
  p5.createCanvas(canvasWidth, canvasHeight);
  p5.background("#fff");
};

p5.draw = () => {
  p5.noLoop();
  p5.noFill();

  for (let i = 0; i < blockSize; i += step) {
    splitSquaresWith({ x: i });
    splitSquaresWith({ y: i });
  }

  for (const c of colors) {
    const sq = squares[Math.floor(Math.random() * squares.length)];
    sq.color = c;
  }

  for (const sq of squares) {
    p5.strokeCap(p5.SQUARE);
    p5.strokeWeight(25);
    p5.stroke(strokeColor);
    p5.fill(sq.color);
    p5.rect(sq.x, sq.y, sq.width, sq.height);
  }
};

p5.keyTyped = () => {
  if (p5.key === "s" || p5.key === "S") {
    p5.saveCanvas(`palette-${new Date().toISOString()}`, "png");
  }
};
