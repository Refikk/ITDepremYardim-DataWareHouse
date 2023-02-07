const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.get('/', db.getUsers)
app.post('/', db.createUser)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})