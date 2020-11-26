const express=require('express');
const router=express.Router();
router.use(express.json());

const {Genres,validate}=require("../models/genreModel");
//Route handlers
router.get('/',async (req,res)=>{
    const genres=await Genres.find();
    res.send(genres);
    

    
})

router.get('/:id',async  (req,res)=>{
    const id=req.params.id;
    const genre=await Genres.findById(id);

    if(!genre){
        res.status(404).send('No genre Found with that id');
        return;
    }
    res.send(genre);
})


router.post('/', async (req,res)=>{

    const {error}=validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    const {name}=req.body;
    const genre=new  Genres({
        name
    })

    try{
        const result=await genre.save();
        res.send(result);
    }catch(e){
        console.log("Error:" ,e);
        res.status(400).send('Error happened while adding');
    }
    return;
})

router.put('/:id',async (req,res)=>{
    // const {error}=validate(req.body);
    // if(error){
    //     res.status(400).send(error.details[0].message);
    //     return;
    // }
    const id=req.params.id;
    try{
        const genre=await Genres.findByIdAndUpdate(id,{
            name:req.body.name,
        },{new:true});
        if(!genre) return res.status(404).send("error while Updating the database");
        res.send(genre);
    }catch(e){
        console.log('Error at put',e);
    }


    return; 
})

router.delete('/:id',async (req,res)=>{
    const id=req.params.id;
    const genre=await Genres.remove({_id:id});

    if(!genre) return res.status(404).send("the genre with given id was not found");

    res.send(genre);
    return;
})


module.exports=router;