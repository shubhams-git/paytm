import { accountModel, userModel } from "../db.js";
import express from "express"
import authMiddleware from "../middleware.js";

export const accountRouter = express.Router();

accountRouter.get("/balance",authMiddleware,async(req,res)=>{
    const name = req.body.username
    const user = await userModel.findOne({username:name})

    if(user){
        const userBalance = await accountModel.findOne({userId:user._id})
        if(userBalance){
            return res.status(200).send({
                balance: userBalance
            })
        }
        else{
            return res.status(400).send({
                message: "LOL"
            })
        }
    }
})


