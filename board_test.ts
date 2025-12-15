import { assertEquals } from "@std/assert";
import { Board, Player } from "./board.ts";

  Deno.test("Absturz bei leerer oder ungültiger Eingabe vermeiden", () => {
    const board = new Board();

    // Simuliere eine ungültige Spaltennummer
    const invalidCols = [-1, 7, NaN];

    for (const col of invalidCols) {
      const row = board.makeMove(Player.PlayerX, col as any);

      if (row !== -1) {
        throw new Error(`Fehler: Ungültige Spalte ${col} sollte -1 zurückgeben`);
      }

      const winner = board.winner(Player.PlayerX, row, col as any);
      if (winner !== Player.Nobody) {
        throw new Error(`Fehler: Ungültiger Zug darf keinen Gewinner zurückgeben`);
      }
    }
  });

  Deno.test("Diagonalgewinn wird erkannt", () => {
  const board = new Board();
  board.makeMove(Player.PlayerX, 0); // X in 0
  board.makeMove(Player.PlayerO, 1); // O
  board.makeMove(Player.PlayerX, 1); // X in 1
  board.makeMove(Player.PlayerO, 2); // O
  board.makeMove(Player.PlayerO, 2); // O
  board.makeMove(Player.PlayerX, 2); // X in 2
  board.makeMove(Player.PlayerO, 3); // O
  board.makeMove(Player.PlayerO, 3); // O
  board.makeMove(Player.PlayerO, 3); // O
  const row = board.makeMove(Player.PlayerX, 3); // X in 3 bildet diagonal 4

  const winner = board.winner(Player.PlayerX, row, 3);
  assertEquals(winner, Player.PlayerX);
  if (winner !== Player.PlayerX) {
    throw new Error("Fehler: Diagonalgewinn wurde nicht erkannt");
  }
});

