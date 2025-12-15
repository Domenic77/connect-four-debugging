import { Board, Player, COLS } from "./board.ts";

const board = new Board();
let player = Player.PlayerX;

board.output();

while (true) {
  const input = prompt(`Player ${player}:`) || "";
  const col = Number.parseInt(input);

  // Neuer Code damit es nicht abstürzt bei ungültiger Eingabe
  if (isNaN(col) || col < 0 || col >= COLS) {
    console.log(`Ungültige Eingabe geben Sie eine Zahl zwischen 0 und ${COLS - 1} ein.`);
    continue;
  }

  const row = board.makeMove(player, col);

  if (row === -1) {
    console.log("Diese Spalte ist voll! Bitte wähle eine andere Spalte.");
    continue;
  }

  board.output();
  console.log();

  const winner = board.winner(player, row, col);
  if (winner !== Player.Nobody) {
    console.log(`Player ${player} gewinnt!`);
    break;
  }

  player = player === Player.PlayerX ? Player.PlayerO : Player.PlayerX;
}