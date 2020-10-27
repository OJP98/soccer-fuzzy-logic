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


def muyLejos(x): return 1/(1 + math.exp(-2.7*(x - 7.3)))


def cerca(x): return 1/(1 + math.exp(7.3*(x - 2.7)))


def lejos(x): return max(
    min(
        (x-8)/(5-8),
        1,
        (2-x)/(2-5)
    ),
    0
)
