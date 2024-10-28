import { accountModel, userModel } from "../db.js";
import express from "express"
import authMiddleware from "../middleware.js";
import mongoose from "mongoose";

export const accountRouter = express.Router();

accountRouter.get("/balance",authMiddleware,async(req,res)=>{

    const userAccount = await accountModel.findOne({userId:req.userId})
        if(userAccount){
            return res.status(200).send({
                balance: userAccount.balance
            })
        }
        else{
            return res.status(400).send({
                message: "LOL"
            })
        }
})

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
    const { amount, to } = req.body;
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const fromAccount = await accountModel.findOne({ userId: req.userId }).session(session);
        const toAccount = await accountModel.findOne({ userId: to }).session(session);

        if (!fromAccount || !toAccount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).send({
                message: "Invalid Account" 
            });
        }

        if (fromAccount.balance < amount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).send({
                message: "Insufficient Balance" 
            });
        }

        await accountModel.updateOne(
            { userId: fromAccount.userId },
            { $inc: { balance: -amount } },
            { session }
        );

        await accountModel.updateOne(
            { userId: toAccount.userId },
            { $inc: { balance: amount } },
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        return res.status(200).send({
            message: "Transfer successful" 
        });
    } catch (error) {

        if (session.inTransaction()) {
            await session.abortTransaction();
        }
        session.endSession();
        return res.status(500).send({
            message: "Transfer failed",
            error: error.message 
        });
    }
});