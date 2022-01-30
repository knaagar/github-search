import fetch from 'node-fetch'
import express from 'express'
import bodyParser from 'body-parser'

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

const response = await fetch('https://api.github.com/users/knaagar')
const data = await response.json()

console.log(data)
// https://api.github.com/users/knaagar
// https://www.frontendmentor.io/challenges/github-user-search-app-Q09YOgaH6
// using localstorage to show recent search