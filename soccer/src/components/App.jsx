/* eslint-disable import/extensions */
import React from 'react'
import { Button } from '@material-ui/core'
import Field from './Field/Field.jsx'
import './style.css'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      python: '',
      startSim: false,
    }
  }

  startSimulation() {
    this.setState({ startSim: true })
  }

  render() {
    const { python, startSim } = this.state
    return (
      <div className="title">
        <h1>Soccer with Fuzzy Logic</h1>
        <Field startSim={startSim} />
        <Button color="primary" onClick={() => this.startSimulation()}>Start Simulation</Button>
        <p>{python}</p>
      </div>
    )
  }
}
