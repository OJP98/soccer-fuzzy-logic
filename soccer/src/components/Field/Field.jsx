/* eslint-disable import/extensions */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'
import Player from '../Player/Player.jsx'
import Goal from '../Goal/Goal.jsx'

const HEIGHT = 603
const WIDTH = 1072

const fieldImg = require('../../assets/field.png').default

class Field extends Component {
  constructor(props) {
    super(props)
    this.state = {
      x: 0,
      y: 0,
      startSim: props.startSim,
    }
  }

  componentDidMount() {
    const coords = document.getElementById('field').getBoundingClientRect()
    this.setState({
      x: coords.x,
      y: coords.y,
    })
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps({ startSim }) {
    const { state } = this
    this.setState({ ...state, startSim })
  }

  handlePlayerCallback = (goalData) => {
    this.props.handleCallback(goalData)
  }

  render() {
    const { x, y, startSim } = this.state

    const style = {
      display: 'flex',
      position: 'inherit',
      backgroundImage: `url(${fieldImg})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: WIDTH,
      height: HEIGHT,
    }

    return (
      <div id="field" style={style}>
        {startSim && <Player x={x} y={y} goalCallback={this.handlePlayerCallback} /> }
        <Goal x={x} y={y} />
      </div>
    )
  }
}

export default Field
