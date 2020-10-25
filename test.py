from logic import *

pelotaX = 1
pelotaY = -2
jugadorX = 5
jugadorY = -5
jugadorAngulo = 0
porteriaX = 0
porteriaY = 0

puntos = [[0, 0.25], [2, 0.25], [4, 0.32], [6, 0.32], [8, 0.6], [10, 0.75]]

assert DistanciaPelotaJugador(
    jugadorX, jugadorY, pelotaX, pelotaY) == 5.0, "Should be 5.0"
assert CalcularCentroide(puntos) == 6.425702811244979, "Should be 6.42"
print("Todo bien crack!")
