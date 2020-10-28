import React, { Component } from 'react'

const playerImg = require('../../assets/player.png').default

const HEIGHT = 20
const WIDTH = 20

class Player extends Component {
  constructor(props) {
    super(props)

    this.state = {
      x: props.x,
      y: props.y,
      imgFile: `url(${playerImg})`,
    }
  }

  getCoords() {
    this.setState(
      (prevState) => ({
        x: parseInt(prevState.x, 10) + 10,
        y: parseInt(prevState.y, 10) + 10,
      }),
    )
  }

  /* update() {
    const { onUpdate } = this.props

    if (onUpdate && typeof onUpdate === 'function') {
      const onUpdateResult = onUpdate(this.state)

      if (onUpdateResult) {
        this.setState((prevState) => ({ ...prevState, ...onUpdateResult }))
      }
    }
  } */

  render() {
    const { state } = this
    const style = {
      position: 'absolute',
      top: `${state.y}px`,
      left: `${state.x}px`,
      backgroundImage: state.imgFile,
      backgroundSize: 'cover',
      width: WIDTH,
      height: HEIGHT,
    }

    return (
      <div style={style} onClick={() => this.getCoords()} aria-hidden="true" />
    )
  }
}

export default Player
