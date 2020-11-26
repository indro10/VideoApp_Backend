const express=require('express');
const router=express.Router();

const {Customers,validate,putValidate}=require("../models/customerModel");


router.use(express.json());


router.get('/',async(req,res)=>{
    const customers=await Customers.find();
    res.send(customers);
})

router.get("/:id",async(req,res)=>{
    const id=req.params.id;
    try{
        const customer=await Customers.findById(id);
        if(!customer) return  res.status(404).send("No customer Found with given Id");
        res.send(customer);

    }catch(e){
        console.log(e.message);
    }
});

router.post("/",async(req,res)=>{
    const {error}=validate(req.body);
    if(error) {
         res.status(400).send(error.message);
         return;
    }

    const {name,isGold,phone}=req.body;

    try{
        const customer=new Customers({
            name,isGold,phone
        })
        const result=await customer.save();
        res.send(result);
        return;

    }catch(err){
        res.status(400).send('Some Error happened');
        console.log("error at post",err);
    }
})

router.put("/:id",async(req,res)=>{
    const id=req.params.id;
    const {error}=putValidate(req.body);
    if(error) return res.status(400).send("Bad request Check req body");
    const customer=await Customers.findByIdAndUpdate(id,{
        phone:req.body.phone
    },{new:true});
    res.send(customer);
    return;
});

router.delete("/:id",async(req,res)=>{
    const id=req.params.id;
    const customer=await Customers.remove({_id:id});
    if(!customer) return res.status(404).send("the genre with given id was not found");

    res.send(customer);
    return;
})






module.exports=router;