const express=require('express');
const router=express.Router();



router.get("/",(req,res)=>{
    res.render('index',{title:"Genres",message:"hello Welcome"})
})

module.exports=router;
