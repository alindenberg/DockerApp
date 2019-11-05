const express = require('express')
const mongo = require('mongodb')
const bodyParser = require('body-parser')
const port = 3000

const app = express()
app.use(bodyParser.json())

var collection = null
mongo.MongoClient.connect('mongodb://mongo:27017', { useNewUrlParser: true }, (err, client) => {
  if (err) {
    console.log("Error connecting to mongo: ", err)
    throw err
  }
  collection = client.db('dockerapp').collection('test')
})


app.get('/', (req, res) => res.send('Hello World!'))

app.post('/posts', async (req, res) => {
  const post = req.body
  await collection.insertOne(post)
  res.send('Entered post!')
})

app.get('/posts', async (req, res) => {
  let posts = await collection.find({}).toArray()
  res.send(posts)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))