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
      goals: 0,
      misses: 0,
    }
  }

  startSimulation() {
    this.setState({ startSim: true })
  }

  handleCallback = (goaldata) => {
    if (goaldata) {
      const { goals } = this.state
      this.setState({ goals: goals + 1 })
    } else {
      const { misses } = this.state
      this.setState({ misses: misses + 1 })
    }

    this.setState({ startSim: false })
  }

  render() {
    const {
      python,
      startSim,
      goals,
      misses,
    } = this.state

    return (
      <div className="title">
        <h1>Soccer with Fuzzy Logic</h1>
        <Field startSim={startSim} handleCallback={this.handleCallback}/>
        <div className="text-div">
          <Button color="primary" onClick={() => this.startSimulation()}>Start Simulation</Button>
          <p>
            Goals:
            { goals }
          </p>
          <p>
            Misses:
            { misses }
          </p>
        </div>
        <p>{python}</p>
      </div>
    )
  }
}
