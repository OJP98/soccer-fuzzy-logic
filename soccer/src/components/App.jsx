import React from 'react'
import { Button } from '@material-ui/core'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <h1>Soccer with Fuzzy Logic</h1>
	<Button color="primary">This is a MUI button</Button>
      </div>
    )
  }
}
