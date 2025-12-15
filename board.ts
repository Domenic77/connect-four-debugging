export const ROWS = 6;
export const COLS = 7;
export const CONNECT_N = 4;

export enum Player {
  Nobody = "_",
  PlayerX = "x",
  PlayerO = "o",
}

export class Board {
  private fields: Player[][];

  constructor() {
    this.fields = Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => Player.Nobody)
    );
  }

  public output() {
    let header = "";
    for (let c = 0; c < COLS; c++) header += `${c} `;
    console.log(header.trimEnd());

    for (let r = 0; r < ROWS; r++) {
      console.log(this.fields[r].join(" "));
    }
  }

  public makeMove(player: Player, col: number): number {
    if (isNaN(col) || col < 0 || col >= COLS) return -1;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (this.fields[r][col] === Player.Nobody) {
        this.fields[r][col] = player;
        return r;
      }
    }
    return -1; // Spalte voll
  }

  public winner(player: Player, row: number, col: number): Player {
    if (row === -1 || isNaN(col) || col < 0 || col >= COLS) return Player.Nobody;

    if (this.horizontalWinner(player, row) !== Player.Nobody) return player;
    if (this.verticalWinner(player, col) !== Player.Nobody) return player;
    if (this.diagonalWinner(player, row, col) !== Player.Nobody) return player;

    return Player.Nobody;
  }

  private horizontalWinner(player: Player, r: number): Player {
    const rowStr = this.fields[r].join("");
    return rowStr.includes(player.repeat(CONNECT_N)) ? player : Player.Nobody;
  }

  private verticalWinner(player: Player, c: number): Player {
    const colStr = this.fields.map(row => row[c]).join("");
    return colStr.includes(player.repeat(CONNECT_N)) ? player : Player.Nobody;
  }

  private diagonalWinner(player: Player, r: number, c: number): Player {
    const win = player.repeat(CONNECT_N);
    const [rising, falling] = this.getDiagonals(r, c);
    return rising.includes(win) || falling.includes(win) ? player : Player.Nobody;
  }

  private getDiagonals(r: number, c: number): [string, string] {
    const rising: string[] = [];   // / diagonal (unten links -> oben rechts)
    const falling: string[] = [];  // \ diagonal (oben links -> unten rechts)

    // Rising diagonal (/)
    for (let i = r, j = c; i < ROWS && j >= 0; i++, j--) rising.unshift(this.fields[i][j]);
    for (let i = r + 1, j = c + 1; i < ROWS && j < COLS; i++, j++) rising.push(this.fields[i][j]);

    // Falling diagonal (\)
    for (let i = r, j = c; i >= 0 && j >= 0; i--, j--) falling.unshift(this.fields[i][j]);
    for (let i = r + 1, j = c + 1; i < ROWS && j < COLS; i++, j++) falling.push(this.fields[i][j]);

    return [rising.join(""), falling.join("")];
  }
}
