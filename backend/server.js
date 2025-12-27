const express = require('express')

require('dotenv').config()
const { MongoClient } = require('mongodb')
const url = process.env.MONGO_URL
const client = new MongoClient(url)
const dbname = 'passop'

const app = express()
const port = 3000
client.connect();

// get all passwords
app.get('/', async (req, res) => {
    const db = client.db(dbname)
    const collection = db.collection('documents')
    const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

//save passwords
app.post('/', async (req, res) => {

})

//delete passwords
app.delete('/', async (req, res) => {
    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
