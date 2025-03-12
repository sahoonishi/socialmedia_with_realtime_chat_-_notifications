import jwt from 'jsonwebtoken';
export const isAuth=async(req,res,next)=>{
  try {
    const token = req.cookies.token;
    if(!token){
      return res.status(401).json({
        message:"User not authenticated",
        success:false
      })
    }
    const verify = await jwt.verify(token,process.env.JWT_SECRET_KEY);
    if(!verify){
      return res.status(401).json({
        message:"Invalid token in cookie",
        success:false
      })
    }
    req.id = verify.userId;
    next();
  } catch (error) {
    console.log(error);
  }
}