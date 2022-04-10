const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
const port = process.env.PORT || 3000

app.listen(port, () => { 
    console.log(`Listening on port ${port}`)
})

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/public/views/index.html')
})
