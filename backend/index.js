import Express from 'express'
import cors from 'cors'
import { PythonShell } from 'python-shell' 
import path from 'path'

// App
const app = Express()
const port = 3000

// Use cors in order to avoid browser blocking
app.use(cors())

app.get('/', (req, res) => {

  const params = req.query

  // Options when executing python
  let options = {
    mode: 'text',
    scriptPath: path.join(path.resolve(), '../'),
    pythonOptions: ['-u'],
    args: [
      parseInt(params.jugadorX, 10),
      parseInt(params.jugadorY, 10),
      parseInt(params.pelotaX, 10),
      parseInt(params.pelotaY, 10)
    ]
  }

  // This is just to print whatever python prints
  let pythonTest = new PythonShell('logic.py', options)
  pythonTest.on('message', (message) => {
    console.log(message)
  })

  // Execute file, then send results as array
  PythonShell.run('logic.py', options, function(error, results) {
    if (error) throw error
    res.send(results)
  })

})

app.listen(port, () => console.log(`Listening on port ${port}`))
