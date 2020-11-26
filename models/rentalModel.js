const mongoose=require('mongoose');
const Joi=require('joi');

const rentalSchema=new mongoose.Schema({
    customer:{type:new mongoose.Schema({
        "name":{
            type:String,
            min:3,
            max:50,
            required:true,
        },
        "isGold":{type:Boolean,required:true},
        "phone":{type:String,required:true}  
    }),
    required:true},
    movie:{
        type:new mongoose.Schema({
            title:{type:String,required:true, min:3,max:50},
            dailyRentalRate:{type:Number,required:true}
        }),required:true,

    },
    dateOut:{
        type:Date,
        default:Date.now,
        required:true,
    },
    dateReturned:{
        type:Date
    },
    rentalFee:{
        type:Number,
        min:0,
    }
});

const Rentals=mongoose.model("Rentals",rentalSchema);


const validate=(arg)=>{
    const schema={
        custId:Joi.objectId().required(),
        movieId:Joi.objectId().required()
    }
    return Joi.validate(arg,schema);
}


module.exports.Rentals=Rentals;
module.exports.validate=validate;