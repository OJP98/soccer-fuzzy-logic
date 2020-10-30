import React, { Component } from 'react'

const playerImg = require('../../assets/player.png').default
const ballImg = require('../../assets/ball.png').default

const HEIGHT = 20
const WIDTH = 20

const BALL_HEIGHT = 15
const BALL_WIDTH = 15 

class Player extends Component {
  constructor(props) {
    super(props)

    this.state = {
      topLeftCorner: [ props.x, props.y ],
      playerCoords: [ 0, 0 ],
      ballCoords: [ 0, 0 ], 
      playerImg: `url(${playerImg})`,
      ballImg: `url(${ballImg})`,
    }
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    this.setState({
      x: nextProps.x,
      y: nextProps.y,
    })
  }

  getCoords() {
    console.log(this.state)
    this.setState(
      (prevState) => ({
        x: parseInt(prevState.x, 10) + 10,
        y: parseInt(prevState.y, 10) + 10,
      }),
    )
  }

  render() {
    const { state } = this
    const style = {
      position: 'absolute',
      top: `${state.y}px`,
      left: `${state.x}px`,
      backgroundImage: state.playerImg,
      backgroundSize: 'cover',
      width: WIDTH,
      height: HEIGHT,
    }

    const ballStyle = {
      position: 'absolute',
      top: `${state.y + 100}px`,
      left: `${state.x + 100}px`,
      backgroundImage: state.ballImg,
      backgroundSize: 'cover',
      width: BALL_WIDTH,
      height: BALL_HEIGHT,
    }

    return (
      <div>
	<div style={style} onClick={() => this.getCoords()} aria-hidden="true" />
	<div style={ballStyle} />	
      </div>
    )
  }
}

export default Player
