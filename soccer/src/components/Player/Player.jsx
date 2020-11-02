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

const GOAL_HEIGHT = 200
const GOAL_WIDTH = 50

const SPEED = 2

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
      isPlaying: false,
      roundOver: false,
      scored: false,
    }
  }

  getInitialState() {
    this.setState({
      playerCoords: [0, 0],
      playerAngle: 0,
      ballCoords: [0, 0],
      isPlaying: false,
      roundOver: false,
      scored: false,
    })
  }

  componentDidMount() {
    this.movePlayer()
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
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

  ballInterval(ballAngle) {
    const { state } = this

    const angle = ballAngle / 180

    // Previous player coordinates
    const prevX = state.ballCoords[0]
    const prevY = state.ballCoords[1]

    // New player coordinates
    const newX = prevX + (SPEED * Math.cos(angle))
    const newY = prevY + (SPEED * Math.sin(angle))

    this.setState({
      ballCoords: [newX, newY],
    })

    const difX = Math.abs(newX - prevX)
    const difY = Math.abs(newY - prevY)

    return Math.sqrt((difX ** 2) + (difY ** 2))
  }

  playerInterval() {
    const { state } = this

    const angle = (state.playerAngle * Math.PI) / 180

    // Previous player coordinates
    const prevX = state.playerCoords[0]
    const prevY = state.playerCoords[1]

    // New player coordinates
    const newX = prevX + (SPEED * Math.cos(angle))
    const newY = prevY + (SPEED * Math.sin(angle))

    let newCoords
    if (newX < state.topLeftCorner[0]) {
      newCoords = [newX + state.topLeftCorner[0], newY + state.topLeftCorner[1]]
    } else {
      newCoords = [newX, newY]
    }

    this.setState({
      playerCoords: newCoords,
    })

    const difX = Math.abs(newX - prevX)
    const difY = Math.abs(newY - prevY)

    return Math.sqrt((difX ** 2) + (difY ** 2))
  }

  handlePythonResponse(res) {
    console.log('python response:', res)
    const { state } = this

    // python sends that the player need to move
    if (res[0] === 'avanzar') {
      this.setState({ playerAngle: res[1] })

      const dist = res[2]
      let traveled = 0

      const newInterval = setInterval(() => {
        const { playerCoords, topLeftCorner } = this.state
        traveled += this.playerInterval()
        if (traveled >= dist
          || playerCoords[1] >= topLeftCorner[1] + FIELD_HEIGHT
          || playerCoords[1] <= topLeftCorner[1]
          || playerCoords[1] >= topLeftCorner[0] + FIELD_WIDTH) {
          clearInterval(newInterval)

          this.setState({ isPlaying: false })
        }
      }, 10)
    // python sends that the player must shoot
    } else {
      const ballAngle = res[1]

      this.setState({
        playerAngle: 0,
      })

      const fieldEnd = state.topLeftCorner[0] + FIELD_WIDTH + GOAL_WIDTH
      const goalX = fieldEnd - GOAL_WIDTH
      const goalTop = (FIELD_HEIGHT / 2 - GOAL_HEIGHT / 2) + state.topLeftCorner[1]
      const goalBottom = goalTop + GOAL_HEIGHT

      const newInterval = setInterval(() => {
        const { ballCoords } = this.state
        this.ballInterval(ballAngle)

        // Check if the ball is in the goal X position
        if (ballCoords[0] >= (goalX + GOAL_WIDTH / 2)) {
          // Check if the boal went in
          if (ballCoords[1] >= goalTop && ballCoords[1] <= goalBottom) {
            this.setState({ scored: true })
          }

          this.setState({
            roundOver: true,
          })
          clearInterval(newInterval)
        }
      }, 6)
    }
  }

  movePlayer() {
    const newInterval = setInterval(() => {
      const {
        isPlaying,
        playerCoords,
        ballCoords,
        roundOver,
        scored,
      } = this.state

      const url = this.getFetchUrl(
        playerCoords[0],
        playerCoords[1],
        ballCoords[0],
        ballCoords[1],
      )

      if (roundOver) {
        const { goalCallback } = this.props
        if (scored) {
          goalCallback(true)
        } else {
          goalCallback(false)
        }

        clearInterval(newInterval)
      }

      if (!isPlaying) {
        this.setState({ isPlaying: true })

        fetch(url, {
          method: 'GET',
        })
          .then((res) => res.json())
          .then((res) => {
            this.handlePythonResponse(res)
          })
      }
    }, 500)
  }

  render() {
    const { state } = this

    // Check if it's the first time rendering
    if (state.playerCoords[0] === 0) {
      const initialX = state.topLeftCorner[0] + 20
      const initialY = state.topLeftCorner[1] + 20

      this.setState({
        playerCoords: [
          this.getRandom(initialX, initialX + FIELD_WIDTH - 20),
          this.getRandom(initialY, initialY + FIELD_HEIGHT - 20),
        ],
        ballCoords: [
          this.getRandom(initialX, initialX + FIELD_WIDTH - 20),
          this.getRandom(initialY, initialY + FIELD_HEIGHT - 20),
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
