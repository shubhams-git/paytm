import express from "express"
import zod from "zod"
import {userModel} from "../db.js"
import { accountModel } from "../db.js"
import jwt from "jsonwebtoken"
import JWT_SECRET from "../config.js"
import authMiddleware from "../middleware.js"

const userRouter = express.Router()
export default userRouter

const signupSchema = zod.object({
    username: zod.string().email().max(20),
    password: zod.string().min(4),
    firstName: zod.string().max(20),
    lastName:zod.string().max(20)
})

const updateBodySchema = zod.object({
    password: zod.string().min(4).optional(),
    lastName: zod.string().max(20).optional(),
    firstName: zod.string().max(20).optional()
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

    const newAcount = await accountModel.create({
        userId:newUserId,
        balance: 1+ 10000*Math.random()
    })

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
            userId: findUser._id
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

userRouter.put("/", authMiddleware, async (req,res)=>{

    const {success} = updateBodySchema.safeParse(req.body)
    if(!success){
        return res.status(411).send({
            message: "Error while updating information"
        })
    }

    try{
        const updatedUser = await userModel.findByIdAndUpdate(req.userId,req.body)
        return res.send({
            message: "Updated successfully"
        })
    }catch (e){
        return res.status(411).send({
            message: "Error while updating information"
        })
    }
})

userRouter.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || '';
    
    const users = await userModel.find({
        $or: [
            { firstName: { "$regex": filter, "$options": "i" } }, // Case-insensitive search
            { lastName: { "$regex": filter, "$options": "i" } }
        ]
    });

    const filteredUsers = users.filter(user => user._id.toString() !== req.userId);

    return res.status(202).json({
        user: filteredUsers.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
});


