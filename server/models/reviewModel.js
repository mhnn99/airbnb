const mongoose = require('mongoose')
const {Schema, model} = mongoose

const reviewSchema = new Schema({
    userId:String,
    listingId:String,
    comment:String
},{timestamps:true})

const reviewModel = model("reviewModel", reviewSchema)
module.exports = reviewModel