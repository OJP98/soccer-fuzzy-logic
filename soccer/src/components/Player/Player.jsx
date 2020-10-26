import React, { Component } from 'react'

const playerImg = require('../../assets/player.png').default

const HEIGHT = 120
const WIDTH = 120

class Player extends Component {
  constructor(props) {
    super(props)

    this.state = {
      x: props.x,
      y: props.y,
      angle: 0,
      imgFile: `url(${playerImg})`,
      hasBall: false,
      isShooting: false,
    }
  }

  update() {
    const { onUpdate } = this.props

    if (onUpdate && typeof onUpdate === 'function') {
      const onUpdateResult = onUpdate(this.state)

      if (onUpdateResult) {
        this.setState((prevState) => ({ ...prevState, ...onUpdateResult }))
      }
    }
  }

  render() {
    const { state } = this
    const style = {
      position: 'absolute',
      top: state.x,
      left: state.y,
      backgroundImage: state.imgFile,
      backgroundSize: 'cover',
      width: WIDTH,
      height: HEIGHT,
    }

    return (
      <div style={style} />

    )
  }
}

export default Player
