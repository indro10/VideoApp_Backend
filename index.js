const express=require('express');
const app=express();
const logger=require('./middleware/customLogger')
const morgan=require('morgan');
const config=require('config');
const debug=require('debug')('app:debugger');
const genres=require('./Routes/genres');
const home=require('./Routes/homePage');


app.set('view engine','pug');
app.set('views','./views');

//configuration
console.log("Application name : " + config.get('name'));
console.log("Application name : " + config.get('mail.host'));
console.log("password : " + config.get('mail.password')); 

//Middleware
app.use('/api/genres',genres);
app.use('/',home);
app.use(express.json());
app.use(logger);



 
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
