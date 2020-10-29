import React, { Component } from 'react'

const goalImg = require('../../assets/goal.png').default

class Goal extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const style = {
      marginLeft: 'auto',
      alignSelf: 'center',
      backgroundImage: `url(${goalImg})`,
      backgroundSize: 'cover',
      width: '50px',
      height: '200px',
    }
    return (
      <div style={style} />
    )
  }
}

export default Goal
