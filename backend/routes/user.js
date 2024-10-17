import express from "express"
import zod from "zod"
import userModel from "../db.js"
import jwt from "jsonwebtoken"
import JWT_SECRET from "../config.js"

const userRouter = express.Router()
export default userRouter

const signupSchema = zod.object({
    username: zod.string().email().max(20),
    password: zod.string().min(4),
    firstName: zod.string().max(20),
    lastName:zod.string().max(20)
})

userRouter.post("/signup",async(req,res)=>{

    const body = req.body

    const {success} = signupSchema.safeParse(body)
    if(!success){
        console.log(`Schema error`)
        return res.status(411).send({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await userModel.findOne({
        username: body.username
    })
    
    if(user){
        return res.status(411).send({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const newUser = await userModel.create(body)
    const newUserId = newUser._id

    const token = jwt.sign({
        userId: newUserId
    }, JWT_SECRET);

    return res.status(200).send({
        message: "User created successfully",
        token: token
    })

   
})

userRouter.post("/signin",async(req,res)=>{

    const body = req.body
    const findUser = await userModel.findOne({
        username: body.username,
        password: body.password
    })

    if(findUser){

        const token = jwt.sign({
            userid: findUser._id
        },JWT_SECRET)
    
        return res.status(200).send(
            {
                token: token
            });
    }else{
        return res.status(411).send({
            message: "Error while logging in"
        })
    }
})