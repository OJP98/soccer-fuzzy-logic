/* eslint-disable import/extensions */
import React from 'react'
import { Button } from '@material-ui/core'
import Player from './Player/Player.jsx'
import Field from './Field/Field.jsx'
import './style.css'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="title">
        <h1>Soccer with Fuzzy Logic</h1>
        <Field>
          <Player x="200" y="100" />
        </Field>
        <Button color="primary">This is a MUI button</Button>
      </div>
    )
  }
}
