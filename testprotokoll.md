# Testprotokoll

## Fehler 1: Programmabsturz
- **Zustand:** Leeres Spielfeld zu Beginn
- **Eingabe:** Drücken von Enter ohne Zahl
- **Erwartet:** Fehlermeldung
- **Tatsächlich:** Absturz (parseInt("") -> NaN -> Array-Zugriff)

