require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const {MONGO_URL,PORT} = process.env
const authFunc = require('./controllers/auth')

const {register, login} = authFunc;
const orderFunc = require('./controllers/orders')
const {postOrder, getOrders} = orderFunc


if (!MONGO_URL) {
    console.error("Missing MONGO_URL environment variable");
    process.exit(1);
  }

mongoose.connect(MONGO_URL)

app.post('/auth/register',register)
app.post('/auth/login', login)
app.post('/orders',postOrder)
app.get('/orders/:id',getOrders)
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))

