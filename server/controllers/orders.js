const orderModel = require('../models/orderModel')
const postOrder = async(req,res) =>{
    try{
        const {userId, listingId, checkinDate, checkoutDate, listingName} = req.body
        const order = new orderModel({
            userId,
            listingId,
            listingName,
            checkinDate,
            checkoutDate
        })
        const savedOrder = await order.save()
        res.status(201).json({savedOrder})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const getOrders = async (req,res) =>{
    try{
        const ordersByListing = await orderModel.find({listingId:req.params.id})
        res.status(201).json({ordersByListing})
    }catch(err){
        res.status(501).json({message:err.message})
    }
}

const getOrdersByUser = async (req,res) =>{
    try{
        const ordersByUser = await orderModel.find({userId:req.params.id})
        res.status(201).json({ordersByUser})
    }catch(err){
        res.status(501).json({message:err.message})
    }
}

const deleteOrders = async(req,res) =>{
    try{
        const order = await orderModel.findByIdAndDelete(req.params.id)
        res.status(200).json({message:'Order deleted'})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports = {postOrder,getOrders, getOrdersByUser, deleteOrders}