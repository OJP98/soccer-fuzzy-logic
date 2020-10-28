/* eslint-disable import/extensions */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'
import Player from '../Player/Player.jsx'

const HEIGHT = 603
const WIDTH = 1072
const fieldImg = require('../../assets/field.png').default

class Field extends Component {
  constructor(props) {
    super(props)
    this.state = {
      x: 0,
      y: 0,
    }
  }

  componentDidMount() {
    const coords = document.getElementById('field').getBoundingClientRect()
    this.setState({
      x: coords.x,
      y: coords.y,
    })
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  render() {
    const { x, y } = this.state

    const style = {
      position: 'inherit',
      backgroundImage: `url(${fieldImg})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: WIDTH,
      height: HEIGHT,
    }

    return (
      <div id="field" style={style}>
        <Player x={x} y={y} />
      </div>
    )
  }
}

export default Field
