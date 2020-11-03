# soccer-fuzzy-logic

Simple soccer AI simulation using the fuzzy logic algorithm. The app is made with React as frontend, python as backend and ExpressJS as middleware.

## Requirements

* **NodeJS:** Version 14 or higher *IMPORTANT*
* **Python 3:** Tested with version 3.8.2 and 3.7

## Installation guide

1. Clone this repository with the following url: https://github.com/OJP98/soccer-fuzzy-logic.
2. With your favorite terminal, access the folder containing the source code and install the python dependencies with the following command:
`pip install -r requirements.txt`.
3. While still in your terminal, access the *backend* folder and run `npm install`. 
4. Once step 3 is done, run `npm start`. This will run an ExpressJS server that will act as our middleware so that we can use python as backend for the algorithm. It will run in localhost, port 3000.
5. Go back to the root folder of the repository.
6. Access the *soccer* folder and run `npm install` once more.
7. Once step 6 is done, run `npm start`. This will start a react-webpack environment in http://localhost:9000.
8. Open your browser on the URL specified and run the simulation.

## Directory guide

* *soccer* contains a react project with the following dependencies: Webpack, ESLint and Babel
* *backend* contains an ExpressJS server that uses python-shell library in order to execute and provide python results.
* *logic.py* file that processes all the player and ball coordinates and returns what the player must do in order to score a goal.

## Video Demonstration
<a href="http://www.youtube.com/watch?feature=player_embedded&v=iyIBZGY_0Pc
" target="_blank"><img src="http://img.youtube.com/vi/iyIBZGY_0Pc/0.jpg" 
alt="Youtube video thumbnail" width="240" height="180" border="10" /></a>

## Developers:

* Jose Pablo Cifuentes
* Oscar Juárez

Universidad del Valle de Guatemala - 2020
