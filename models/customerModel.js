const mongoose=require('mongoose');
const Joi=require('joi');


const customerSchema=new mongoose.Schema({
    "name":{type:String,min:3,max:50,required:true},
    "isGold":{type:Boolean,required:true},
    "phone":{type:String,required:true}    
})



const Customers=mongoose.model('Customers',customerSchema);

const validate=(arg)=>{
    const schema={
        "name":Joi.string().required().max(50).min(3),
        "isGold":Joi.boolean().required(),
        "phone":Joi.string().required()
    }
    return Joi.validate(arg,schema);
}

const putValidate=(arg)=>{
    const schema={
        "phone":Joi.string().required()
    }
    return Joi.validate(arg,schema);
}
module.exports.Customers=Customers;
module.exports.validate=validate;
module.exports.putValidate=putValidate;