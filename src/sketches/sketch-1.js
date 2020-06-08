// A Game of Life Simulation
// by Stefan Baumann

// Global functions
// Makes a grid with r rows and c columns with a random value (0 or 1)
function makeRandomGrid(r, c) {
    let arr = new Array(r);
    for (let i = 0; i < r; i++) {
        arr[i] = new Array(c);
        for (let j = 0; j < c; j++) {
            let state = Math.floor(Math.random()*2);
            let cell = new Cell(state);
            arr[i][j] = cell;
        }
    }
    return arr;
}

// Counts the nr of living cells around itself
function countLiveNeighbors(x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let ny = y+i;
            let nx = x+j;
            // Check that it's not out of bounds
            if (ny !== -1 && nx !== -1 && ny !== rows && nx !== cols) {
                sum += grid[ny][nx].prevState;
            }
        }
    }
    sum -= grid[y][x].prevState;
    return sum;
}


// Global vars
let grid;
let rows;
let cols;
let res = 10;

class Cell {
    constructor(state) {
        this.prevState = state;
        this.state = state;
    }

    // Draws cell
    drawIt(x, y, res, p) {
        let color = 255;
        p.fill(color);
        p.stroke(color);
        p.rect(x, y, res, res);
    }

    // Depending on the state of cell and nr of neighbors we change its state
    updateState(liveNg) {
        let nextState;
        if (this.prevState && (liveNg < 2 || liveNg > 3)) {
            // Current cell is alive and will die
            nextState = 0;
        }
        else if (!this.prevState && liveNg === 3) {
            // Current cell is not alive and will become alive
            nextState = 1;
        }
        else {
            // Don't change state
            nextState = this.prevState;
        }
        this.state = nextState;
    }
}



export default function sketch (p) {
  // let rotation = 0;

  // Setup function
  p.setup = function () {
      p.createCanvas(500, 700);
      rows = p.height / res;
      cols = p.width / res;
      grid = makeRandomGrid(rows, cols);
  };

  // p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
  //   if (props.rotation){
  //     rotation = props.rotation * Math.PI / 180;
  //   }
  // };

  // Draw function
  p.draw = function () {
      p.background(0);

      // Draw all cells with a size of res
      for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
              let x = j * res;
              let y = i * res;
              let c = grid[i][j];
              if (c.state) {
                  c.drawIt(x, y, res, p);
              }
          }
      }

      // Convert all current states to previous states
      for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
              grid[i][j].prevState = grid[i][j].state;
          }
      }

      // Compute next generation based on current grid states
      for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
              let liveNg = countLiveNeighbors(j, i);
              grid[i][j].updateState(liveNg);
          }
      }
  };
};
