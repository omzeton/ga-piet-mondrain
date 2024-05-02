import { default as p5Class } from "p5";
import colors from "nice-color-palettes";
import "./style.css";

const p5 = new p5Class(() => {});
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;
const blockSize = canvasWidth;
const step = (canvasWidth / 8.81) * 0.4;

const colorPaletteRandomIndex = Math.floor(Math.random() * colors.length);
const colorPalette = colors[colorPaletteRandomIndex];

const squares = [
  {
    x: 0,
    y: 0,
    width: blockSize,
    height: blockSize,
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
  };

  const squareB = {
    x: splitAt,
    y: square.y,
    width: square.width - splitAt + square.x,
    height: square.height,
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
  };

  const squareB = {
    x: square.x,
    y: splitAt,
    width: square.width,
    height: square.height - splitAt + square.y,
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

  for (let i = 0; i < blockSize; i += step) {
    splitSquaresWith({ x: i });
    splitSquaresWith({ y: i });
  }

  for (const sq of squares) {
    const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    p5.strokeCap(p5.SQUARE);
    p5.stroke(color);
    p5.fill(color);
    const data = [sq.x, sq.y, sq.width, sq.height];
    p5.rect(...data);
    console.log(data);
  }
};

p5.keyTyped = () => {
  if (p5.key === "s" || p5.key === "S") {
    p5.saveCanvas(`palette-${colorPaletteRandomIndex}-${new Date().toISOString()}`, "png");
  }
};
