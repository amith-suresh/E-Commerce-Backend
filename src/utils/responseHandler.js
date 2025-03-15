export const successHandler=(req,res,message,statusCode)=>{
    return res.status(statusCode).json({
        success:true,
        message
    })
}