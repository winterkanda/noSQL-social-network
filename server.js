const connectdb = require("./config/connection.js")

const express = require('express')
const app = express()
const port = 3001

connectdb()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})