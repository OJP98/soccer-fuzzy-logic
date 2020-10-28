/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'

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
      x: coords.top,
      y: coords.left,
    })
  }

  render() {
    const style = {
      position: 'inherit',
      backgroundImage: `url(${fieldImg})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: WIDTH,
      height: HEIGHT,
    }

    const { props } = this

    return (
      <div id="field" style={style}>
        {props.children}
      </div>
    )
  }
}

export default Field
