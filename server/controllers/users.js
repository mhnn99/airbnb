const userModel = require('../models/userModel')
const mongoose = require('mongoose')
const getUser = async(req,res) =>{
try{
const foundUser = await userModel.findOne({_id:req.params.id})
res.status(200).json({foundUser})
}catch(err){
    res.status(500).json({message:err.message})
}
}
const addToFav = async (req, res) => {
    try {
      const { id } = req.params;
      const { city, favorites } = req.body;
  
      const user = await userModel.findById(id);
  
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      if(!user.favorites.find(favorite=>favorite.id===favorites)){
          user.favorites.push({ city, favorites: favorites });
      }else{
        res.status(400).json({message:'Already added'})
      }
  
      const updatedUser = await user.save();
  
      res.status(200).json({ message: 'Added to favorites', user: updatedUser });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  
  
  
module.exports = {getUser, addToFav}