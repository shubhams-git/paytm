import JWT_SECRET from "./config.js"
import jwt from "jsonwebtoken"

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).send({
            message: "Authorization Error lol"
        })
    }

    try{
        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next()

    }catch(e){
        return res.status(403).send({
            message: "Authorization Error" + e
        })
    }   
}

export default authMiddleware