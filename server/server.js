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
const reviewFunc = require('./controllers/reviews')
const {reviewPost, getReviews} = reviewFunc
const {register, login, changePassword} = authFunc;
const orderFunc = require('./controllers/orders')
const {postOrder, getOrders, getOrdersByUser, deleteOrders} = orderFunc
const {getUser,addToFav,removeFav} = require('./controllers/users')


if (!MONGO_URL) {
    console.error("Missing MONGO_URL environment variable");
    process.exit(1);
  }

mongoose.connect(MONGO_URL)
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Accept-Patch');
  next();
});
app.post('/auth/register',register)
app.post('/auth/login', login)
app.post('/orders',postOrder)
app.get('/orders/:id',getOrders)
app.delete('/orders/:id', deleteOrders)
app.patch('/change', changePassword)
app.patch('/favorites/:id', removeFav)
app.get('/user/orders/:id', getOrdersByUser)
app.post('/reviews',reviewPost)
app.get('/reviews/:id', getReviews)
app.get('/users/:id',getUser)
app.post('/favorites/:id',addToFav)
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))

