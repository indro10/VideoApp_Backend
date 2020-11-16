const express=require('express');
const router=express.Router();
const Joi=require('joi');



var Genres=[
    {id:1,name:"action"},
    {id:2,name:"comedy"},
    {id:3,name:"suspence"},
]


//Route handlers


router.get('/',(req,res)=>{
    res.send(Genres); 
})

router.get('/:id',(req,res)=>{
    const id=req.params.id;
    const genre=Genres.find(genre=>genre.id==id);
    if(!genre){
        res.status(404).send('No genre Found with that id');
        return;
    }
    res.send(genre);
})


router.post('',(req,res)=>{
    const {error}=validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    Genres.push({
        id:Genres.length+1,
        name:req.body.name,
    })
    res.send(req.body.name);
    return;
})

router.put('/:id',(req,res)=>{
    const {error}=validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    const id=parseInt(req.params.id);
    if(id>Genres.length){
        res.status(400).send("No genre available with that id");
    }
    const genre=Genres.find(genre=>genre.id==id);
    genre.name=req.body.name;
    res.send(genre);
    return;
})

router.delete('/:id',(req,res)=>{
    if(req.params.id>Genres.length){
        res.status(400).send('No genere available for this id');
    }
    const id=parseInt(req.params.id);
    const genre=Genres.find(genre=>genre.id==id)
    Genres=Genres.filter(genre=>genre.id!= id);
    res.send(genre);

})



const validate=(arg)=>{
    const schema={
        name:Joi.string().required().min(3)
    }
    const result=Joi.validate(arg,schema);
    return result;
}

module.exports=router;