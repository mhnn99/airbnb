const reviewModel = require('../models/reviewModel')

const reviewPost = async(req,res) =>{
    try{
        const {userId,listingId,comment} = req.body
        const newReviews = new reviewModel({
            userId,
            listingId,
            comment
        })
        const savedReview = await newReviews.save()
        res.status(201).json({savedReview})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const getReviews = async(req,res) =>{
    try{
        const foundReviews = await reviewModel.find({listingId:req.params.id})
        res.status(200).json({foundReviews})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports = {reviewPost, getReviews}