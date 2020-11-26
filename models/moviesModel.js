const mogoose=require('mongoose');
const Joi=require('joi');
const {genreSchema}=require('./genreModel');


const movieSchema=new mogoose.Schema({
    title:{type:String,required:true, min:3,max:50},
    genre:{type: genreSchema,required:true},
    numberInStock:{type:Number,required:true},
    dailyRentalRate:{type:Number,required:true}
})

const Movies=mogoose.model('Movies',movieSchema);

const validate=(arg)=>{
    const schema={
        title:Joi.string().required().max(50),
        genre:Joi.string().required().max(50),
        numberInStock:Joi.number().required(),
        dailyRentalRate:Joi.number().required()
        
    }
    return Joi.validate(arg,schema);
}

module.exports.Movies=Movies;
module.exports.validate=validate;