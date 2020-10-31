/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'

const playerImg = require('../../assets/player.png').default
const ballImg = require('../../assets/ball.png').default

const FIELD_HEIGHT = 583
const FIELD_WIDTH = 1002

const HEIGHT = 20
const WIDTH = 20

const BALL_HEIGHT = 15
const BALL_WIDTH = 15

const SPEED = 15

class Player extends Component {
  constructor(props) {
    super(props)

    this.state = {
      topLeftCorner: [props.x, props.y],
      playerCoords: [0, 0],
      playerAngle: 0,
      ballCoords: [0, 0],
      playerImg: `url(${playerImg})`,
      ballImg: `url(${ballImg})`,
      pythonResults: '',
    }
  }

  componentDidMount() {
    console.log(this.state)
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    console.log(this.state)
    const newCoords = [nextProps.x, nextProps.y]
    this.setState({ topLeftCorner: newCoords })
  }

  getRandom(a, b) {
    return Math.floor(Math.random() * (a - b + 1) + b)
  }

  getFetchUrl(px, py, bx, by) {
    const target = new URL('http://localhost:3000/')
    const params = new URLSearchParams()

    params.set('jugadorX', px)
    params.set('jugadorY', py)
    params.set('pelotaX', bx)
    params.set('pelotaY', by)
    target.search = params.toString()

    return target
  }

  handlePythonResponse(res) {
    console.log('python response:', res)
    const { state } = this

    if (res[0] === 'avanzar') {
      this.setState({ playerAngle: res[1] })

      const dist = res[2]
      const angle = (state.playerAngle * Math.PI) / 180
      const newX = state.playerCoords[0] + (dist * Math.cos(angle))
      const newY = state.playerCoords[1] + (dist * Math.sin(angle))
      let newCoords
      if (newX < state.topLeftCorner[0]) {
        newCoords = [newX + state.topLeftCorner[0], newY + state.topLeftCorner[1]]
      } else {
        newCoords = [newX, newY]
      }
      this.setState({
        playerCoords: newCoords,
      })
    } else {
      // manejar el ángulo de patada
    }
  }

  movePlayer() {
    const { state } = this

    const url = this.getFetchUrl(
      state.playerCoords[0],
      state.playerCoords[1],
      state.ballCoords[0],
      state.ballCoords[1],
    )

    console.log('se consulta el siguiente URL', url)

    fetch(url, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        this.handlePythonResponse(res)

        console.log(state)
      })
  }

  render() {
    const { state } = this

    // Check if it's the first time rendering
    if (state.playerCoords[0] === 0) {
      const initialX = state.topLeftCorner[0]
      const initialY = state.topLeftCorner[1]

      this.setState({
        playerCoords: [
          this.getRandom(initialX, initialX + FIELD_WIDTH),
          this.getRandom(initialY, initialY + FIELD_HEIGHT),
        ],
        ballCoords: [
          this.getRandom(initialX, initialX + FIELD_WIDTH),
          this.getRandom(initialY, initialY + FIELD_HEIGHT),
        ],
      })
    }

    const playerStyle = {
      position: 'absolute',
      top: `${state.playerCoords[1]}px`,
      left: `${state.playerCoords[0]}px`,
      transform: `rotate(${state.playerAngle}deg)`,
      backgroundImage: state.playerImg,
      backgroundSize: 'cover',
      width: WIDTH,
      height: HEIGHT,
    }

    const ballStyle = {
      position: 'absolute',
      top: `${state.ballCoords[1]}px`,
      left: `${state.ballCoords[0]}px`,
      backgroundImage: state.ballImg,
      backgroundSize: 'cover',
      width: BALL_WIDTH,
      height: BALL_HEIGHT,
    }

    return (
      <div>
        <div style={playerStyle} onClick={() => this.movePlayer()} aria-hidden="true" />
        <div style={ballStyle} />
      </div>
    )
  }
}

export default Player
