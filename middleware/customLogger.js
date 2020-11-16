
const log=(req,res,next)=>{
    console.log('logging through a custom  middleware....')
    next();
}

module.exports=log;