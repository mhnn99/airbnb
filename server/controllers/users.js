const userModel = require('../models/userModel')

const getUser = async(req,res) =>{
try{
const foundUser = await userModel.findOne({_id:req.params.id})
res.status(200).json({foundUser})
}catch(err){
    res.status(500).json({message:err.message})
}
}

module.exports = getUser