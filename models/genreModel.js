const mongoose=require('mongoose');
const Joi=require('joi');


const genreSchema=new mongoose.Schema({
    "name":{
        type:String,
        required:true,
        min:5,
        max:50,
    },
})    

const Genres=mongoose.model('Genres',genreSchema);

const validate=(arg)=>{
    const schema={
        name:Joi.string().required().min(3),
    }
    const result=Joi.validate(arg,schema);
    return result;
}

module.exports.validate=validate;
module.exports.Genres=Genres;
module.exports.genreSchema=genreSchema;