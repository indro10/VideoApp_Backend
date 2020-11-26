const express=require('express');
const app=express();
const logger=require('./middleware/customLogger')
const morgan=require('morgan');
const config=require('config');
const debug=require('debug')('app:debugger');
const genres=require('./Routes/genres');
const customers=require('./Routes/customers');
const movies=require('./Routes/movies');
const rentals=require('./Routes/rentals');
const home=require('./Routes/homePage');
const mongoose=require('mongoose');
const Joi=require('joi');
Joi.objectId=require('joi-objectid')(Joi);


app.set('view engine','pug');
app.set('views','./views');


//configuration
// console.log("Application name : " + config.get('name'));
// console.log("Application name : " + config.get('mail.host'));
// console.log("password : " + config.get('mail.password')); 

//Middleware
app.use('/api/genres',genres);
app.use('/',home);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rentals',rentals);
    
app.use(express.json());
app.use(logger);

//db connection
mongoose.connect("mongodb://localhost/VidlyApp")
        .then(()=>console.log('Database Connected'))
        .catch(e=>console.log("Error :",e.message));

 
console.log(app.get('env'));
if(app.get('env') === 'development'){
    debug('morganenabled')
    app.use(morgan("tiny"));
}


const port= process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`port running at ${port}`);
})


//if you want to chain multiple function promisses .. you will return
//something like return new Promise(res,rej)=>{
//     res({ob:objext})
// })
//after that only you can use then and catch
