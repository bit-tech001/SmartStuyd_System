import mongoose from 'mongoose';
import  User from '../models/User.js'


export const  FetchProfileUsers = async(req, res)=> {
     

      try {
         const user = User.findOne({email})
         
       res.status(400).json({message : "Fetch profile", user})

      }catch(error) {
         res.status(404).json({message : "profile not found"})
       
      }


     
}