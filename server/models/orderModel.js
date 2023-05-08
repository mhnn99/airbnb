const mongoose = require('mongoose')
const {Schema, model} = mongoose

const orderSchema = new Schema({
    userId:String,
    listingId:String,
    checkinDate:{
        type:Date,
        required:true
    },
    checkoutDate:{
        type:Date,
        required:true
    }
},{timestamps:true})

const orderModel = model("orderModel", orderSchema)
module.exports = orderModel