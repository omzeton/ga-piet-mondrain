import { default as p5Class } from "p5";
import "./style.css";

const blockWidth = 500;
const blockHeight = 600;

const cellSize = blockWidth / 10;

const gridXLength = Math.floor(blockWidth / cellSize) + 1;
const gridYLength = Math.floor(blockHeight / cellSize) + 1;

const canvasWidth = 1200;
const canvasHeight = 850;

const p5 = new p5Class(() => {});

let grid;
const flipCoin = () => (p5.random() < 0.6 ? false : true);
const generateCell = (west, north) => {
  if (!west && !north) {
    return { poziomo: false, pionowo: false };
  }
  if (!west) {
    return { poziomo: flipCoin(), pionowo: true };
  }
  if (!north) {
    return { poziomo: true, pionowo: flipCoin() };
  }
  const poziomo = flipCoin();
  const pionowo = poziomo ? flipCoin() : true;
  return { poziomo, pionowo };
};
const generateGrid = () => {
  grid = new Array(gridYLength);
  for (let y = 0; y < grid.length; y++) {
    grid[y] = new Array(gridXLength);
    for (let x = 0; x < grid[y].length; x++) {
      if (y == 0 || x == 0) {
        grid[y][x] = { poziomo: false, pionowo: false };
      } else if (y == 1 && x == 1) {
        grid[y][x] = { poziomo: true, pionowo: true };
      } else {
        grid[y][x] = generateCell(grid[y][x - 1].poziomo, grid[y - 1][x].pionowo);
      }
    }
  }
};

p5.setup = () => {
  p5.createCanvas(canvasWidth, canvasHeight);
  p5.background("#222222");
  generateGrid();
};

p5.draw = () => {
  p5.noLoop();
  p5.noFill();

  p5.translate(canvasWidth / 2 - blockWidth / 2 - cellSize, canvasHeight / 2 - blockHeight / 2 - cellSize);

  p5.strokeWeight(6);
  p5.stroke("#fff");
  p5.rect(cellSize, cellSize, blockWidth, blockHeight);
  for (let y = 0; y < gridYLength; y++) {
    for (let x = 0; x < gridXLength; x++) {
      const xPos = x * cellSize;
      const yPos = y * cellSize;
      if (grid[y][x].poziomo) {
        p5.line(xPos, yPos, (x + 1) * cellSize, y * cellSize);
      }
      if (grid[y][x].pionowo) {
        p5.line(xPos, yPos, x * cellSize, (y + 1) * cellSize);
      }
    }
  }

  p5.strokeWeight(2);
  p5.stroke("#222");
  p5.rect(cellSize, cellSize, blockWidth, blockHeight);
  for (let y = 0; y < gridYLength; y++) {
    for (let x = 0; x < gridXLength; x++) {
      const xPos = x * cellSize;
      const yPos = y * cellSize;
      if (grid[y][x].poziomo) {
        p5.line(xPos, yPos, (x + 1) * cellSize, y * cellSize);
      }
      if (grid[y][x].pionowo) {
        p5.line(xPos, yPos, x * cellSize, (y + 1) * cellSize);
      }
    }
  }
};

p5.keyTyped = () => {
  if (p5.key === "s" || p5.key === "S") {
    p5.saveCanvas(`palette-${colorPaletteRandomIndex}-${new Date().toISOString()}`, "png");
  }
};
