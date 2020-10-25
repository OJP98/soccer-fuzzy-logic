#* pelotaX, pelotaY, jugadorX, jugadorY, jugadorAngulo, porteriaX, porteriaY
import math

# pelota, jugador


def DistanciaPelotaJugador(jugadorX, jugadorY, pelotaX, pelotaY):
    return math.sqrt((jugadorX-pelotaX)**2
                     +
                     (jugadorY-pelotaY)**2)


def CalcularCentroide(puntos):
    numerador, denominador = 0, 0
    for i in puntos:
        numerador += i[0]*i[1]
        denominador += i[1]

    return numerador/denominador
