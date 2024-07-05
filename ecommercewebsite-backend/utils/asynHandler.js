import { ApiError } from "./ApiError.js";


const asyncHandler =(fn)=>(req,res,next)=>{
    return Promise.resolve(
        fn(req,res,next)
    ).catch((err)=>{
        console.log("ERRORR",err);
         next(err);
        // throw new ApiError(404,"Async Error");
        });
}

export { asyncHandler} ;

// RAPER FOR HANDLE DATA FROM DATABASE (ASYNC AWAIT) ----> 2ND METHOD

// const asyncHandler = (fn) =>{ 
//     async (req,res,next)=>{
//          try{
//              await fn(req,res ,next);
//          }
//          catch(err){
//                 res.status( err.code || 500).json({
//                     success: false,
//                     message : err.message
//                 });
//          }
//     }
// }