const express=require("express");
const { set } = require("mongoose");
const router=express.Router();
router.use(express.json());

const {Customers} =require('../models/customerModel');
const {Movies} =require('../models/moviesModel');

const {Rentals,validate} =require('../models/rentalModel');

router.get('/',async (req,res)=>{
    const result=await Rentals.find();
    res.send(result);
})

router.post('/',async (req,res)=>{
    try {
        const {error} =validate(req.body);
        if(error) return res.status(400).send("Error :"+error.message);
        const {custId,movieId}=req.body;
        
        const custRes=await Customers.find({_id:custId}).select({name:1,isGold:1,phone:1,_id:-1});
        const customer=custRes[0]._doc
        if(!customer) return res.status(400).send('Bad request');
        
        const movieRes= await Movies.find({_id:movieId}).select({title:1,dailyRentalRate:1,_id:-1});
        const movie=movieRes[0]._doc;
        if(!movie) return res.status(400).send('Bad request');
        console.log(movie);
        
        if(movie.numberInStock===0) return res.status(400).send('Movie not in stock');

        console.log("customer",customer);
        console.log("movie",movie);
        const rental=new Rentals({
            customer,movie
        })
        const movieUpdate=await Movies.findByIdAndUpdate(movieId,
            {
                $inc:{

                    numberInStock:-1
                }
           
            
        },{new:true})
        const result=await rental.save();
        
        
        res.send(result);
        
    } catch (error) {
      console.log("Error found",error);  
    }
})

module.exports=router;