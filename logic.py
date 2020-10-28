#* pelotaX, pelotaY, jugadorX, jugadorY, jugadorAngulo, porteriaX, porteriaY
import numpy as np
import plotly.graph_objects as go
import math

MAX_DISTANCIA = 256


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


def getDistanciaDeEntrada(distancia):
    return int((distancia*10)/MAX_DISTANCIA)


def getDistanciaSalida():
    x = []
    yCerca = []
    yLejos = []
    yMuyLejos = []

    distanciaEntrada = getDistanciaDeEntrada(250)
    print(f"Variable de entrada: {distanciaEntrada}")
    for i in range(10):
        x.append(i)
        yCerca.append(min(cerca(i), cerca(distanciaEntrada)))
        yLejos.append(min(lejos(i), lejos(distanciaEntrada)))
        yMuyLejos.append(min(muyLejos(i), muyLejos(distanciaEntrada)))

    puntos = []
    for i in range(10):
        puntos.append([i, max(yCerca[i], yLejos[i], yMuyLejos[i])])

    print(f"Centroide: {CalcularCentroide(puntos)}")
    print(f"Avanzar: {(int(CalcularCentroide(puntos))*MAX_DISTANCIA)/10}")


getDistanciaSalida()
#fig = go.Figure(data=go.Scatter(x=x, y=yMuyLejos))
# fig.write_html("./file.html")
