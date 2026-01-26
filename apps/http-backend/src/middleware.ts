import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '@repo/backend-common/config';

export async function usermiddleware(req:any,res:any,next:any){
    const token= req.headers.authorization;
    if(!token)
    {
        res.json({message:"No token received"})
    }
try {
    const decodedtoken= jwt.verify(token,JWT_SECRET);
    //@ts-ignore
    req.userId=decodedtoken.userId;
    next()
    
} catch (error) {
    res.json({message:"Error in verification"})
}


}