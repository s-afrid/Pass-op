const express = require('express')
var cors = require('cors')
require('dotenv').config()
const { MongoClient } = require('mongodb')
const bodyParser = require('body-parser')

const url = process.env.MONGO_URL
const client = new MongoClient(url)
const dbname = 'passop'

const app = express()
const port = 3000

app.use(cors())

app.use(bodyParser.json())
client.connect();

// get all passwords
app.get('/', async (req, res) => {
    const db = client.db(dbname)
    const collection = db.collection('passwords')
    const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

//save passwords
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbname)
    const collection = db.collection('passwords')
    const findResult = await collection.insertOne(password)
    res.json({success: true, message: findResult})
})

//delete passwords
app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbname)
    const collection = db.collection('passwords')
    const findResult = await collection.deleteOne(password)
    res.json({success: true, message: findResult})
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
