#* pelotaX, pelotaY, jugadorX, jugadorY, jugadorAngulo, porteriaX, porteriaY
from numpy import random
import math
import sys

MAX_DISTANCIA = 1230
MAX_ANGULO = 180
MAX_ANGULO_PATADA = 15
RANGO_PATADA = 10


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


def mucho(x): return 1/(1 + math.exp(-2.7*(x - 7.3)))


def poco(x): return 1/(1 + math.exp(7.3*(x - 2.7)))


def medio(x): return max(
    min(
        (x-8)/(5-8),
        1,
        (2-x)/(2-5)
    ),
    0
)


def getDistanciaDeEntrada(distancia):
    return int((distancia*10)/MAX_DISTANCIA)


def getAnguloDeEntrada(angulo):
    return int((angulo*10)/MAX_ANGULO)


def getDistanciaSalida(distancia):
    x = []
    yCerca = []
    yLejos = []
    yMuyLejos = []

    distanciaEntrada = getDistanciaDeEntrada(distancia)
    #print(f"Variable de entrada: {distanciaEntrada}")
    for i in range(10):
        x.append(i)
        yCerca.append(min(poco(i), poco(distanciaEntrada)))
        yLejos.append(min(medio(i), medio(distanciaEntrada)))
        yMuyLejos.append(min(mucho(i), mucho(distanciaEntrada)))

    puntos = []
    for i in range(10):
        puntos.append([i, max(yCerca[i], yLejos[i], yMuyLejos[i])])

    #print(f"Centroide: {CalcularCentroide(puntos)}")
    print((int(CalcularCentroide(puntos))*MAX_DISTANCIA)/10)


def getAngulo(targetX, targetY, myX, myY):
    radianes = math.atan2(targetY-myY, targetX-myX)
    return math.degrees(radianes)


def getAnguloSalida(angulo):
    x = []
    yPoco = []
    yMedio = []
    yMucho = []
    negativo = False
    anguloDeEntrada = getAnguloDeEntrada(angulo)
    #print(f"Angulo real {angulo}")
    if(anguloDeEntrada < 0):
        negativo = True
        anguloDeEntrada *= -1
    #print(f"Variable de entrada: {anguloDeEntrada}")
    for i in range(10):
        x.append(i)
        yPoco.append(min(poco(i), poco(anguloDeEntrada)))
        yMedio.append(min(medio(i), medio(anguloDeEntrada)))
        yMucho.append(min(mucho(i), mucho(anguloDeEntrada)))

    puntos = []
    for i in range(10):
        puntos.append([i, max(yPoco[i], yMedio[i], yMucho[i])])

    #print(f"Centroide: {CalcularCentroide(puntos)}")
    if(negativo):
        print(-1*((int(CalcularCentroide(puntos)) * MAX_ANGULO)/10))
    else:
        print((int(CalcularCentroide(puntos)) * MAX_ANGULO)/10)


def getAnguloPatada():
    randomNormal = random.normal()
    return (randomNormal*MAX_ANGULO_PATADA)/5


#fig = go.Figure(data=go.Scatter(x=x, y=yMuyLejos))
# fig.write_html("./file.html")
try:
    jugadorX, jugadorY, pelotaX, pelotaY = int(sys.argv[1]), int(
        sys.argv[2]), int(sys.argv[3]), int(sys.argv[4])
    distancia = DistanciaPelotaJugador(jugadorX, jugadorY, pelotaX, pelotaY)
    if(distancia > RANGO_PATADA):
        # Tenemos que avanzar
        print('avanzar')
        #targetX, targetY, myX, myY
        getAnguloSalida(getAngulo(pelotaX, pelotaY, jugadorX, jugadorY))
        getDistanciaSalida(distancia)
    else:
        # Pateamos
        print("patear")
        #print(f"Distancia {distancia}")
        print(getAnguloPatada())

except:
    print('Error')
