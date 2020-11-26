const express=require('express');
const router=express.Router();
const {Movies,validate}=require('../models/moviesModel');
const {Genres}=require('../models/genreModel');
router.use(express.json());

router.get('/',async (req,res)=>{
    const movies=await Movies.find();
    res.send(movies);    
})

router.get('/:id',async  (req,res)=>{

    const id=req.params.id;
    const movie=await Movies.findById(id);

    if(!movie){
        res.status(404).send('No movie Found with that id');
        return;
    }
    res.send(movie);
})


router.post('/', async (req,res)=>{

    const {error}=validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    const {title,genre,numberInStock,dailyRentalRate}=req.body;
    const genreItem=await Genres.find({name:genre});
    if(!genreItem) return res.status(400).send("No genre Found as provided");
    const result=genreItem[0]._doc;

    const movie=new  Movies({
        genre:result,
        title,
        numberInStock,
        dailyRentalRate
    })
    try{
        const response=await movie.save();
        res.send(response);
    }catch(e){
        console.log("Error:" ,e);
        res.status(400).send('Error happened while adding movies' );
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
        const movie=await Movies.findByIdAndUpdate(id,{
            name:req.body.name,
        },{new:true});
        if(!movie) return res.status(404).send("error while Updating the database");
        res.send(movie);
    }catch(e){
        console.log('Error at put',e);
    }


    return; 
})

router.delete('/:id',async (req,res)=>{
    const id=req.params.id;
    const movie=await Movies.remove({_id:id});

    if(!movie) return res.status(404).send("the movie with given id was not found");

    res.send(movie);
    return;
})

module.exports=router;