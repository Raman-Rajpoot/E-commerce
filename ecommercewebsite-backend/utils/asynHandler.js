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

