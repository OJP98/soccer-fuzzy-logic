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
      buttonText: 'Run Simulation'
    }
  }

  startSimulation() {
    this.setState({
      startSim: true,
      buttonText: 'Simulation Running...',
    })
  }

  handleCallback = (goaldata) => {
    if (goaldata) {
      const { goals } = this.state
      this.setState({ goals: goals + 1 })
    } else {
      const { misses } = this.state
      this.setState({ misses: misses + 1 })
    }

    this.setState({
      startSim: false,
      buttonText: 'Run Simulation',
    })
  }

  stopSimulation() {
    this.setState({
      startSim: false,
      buttonText: 'Run Simulation',
    })
  }

  render() {
    const {
      python,
      startSim,
      goals,
      misses,
      buttonText,
    } = this.state

    return (
      <div className="title">
        <h1>Soccer with Fuzzy Logic</h1>
	<p className="no-margin">To start a simulation, press on the RUN SIMULATION button below the soccer field. Once the player shoots the ball, the scoreboard will update and both assets will disappear. Press on the button again to run another simulation.</p>
        <Field startSim={startSim} handleCallback={this.handleCallback}/>
        <div className="text-div">
          <Button color="primary" onClick={() => this.startSimulation()}>{ buttonText }</Button>
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
