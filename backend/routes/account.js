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
            await session.abortTransaction(); // Abort within the transaction context
            session.endSession();
            return { status: 400, message: "Invalid Account" };
        }

        if (fromAccount.balance < amount) {
            await session.abortTransaction();
            session.endSession();
            return { status: 400, message: "Insufficient Balance" };
        }

        // Perform balance update operations within the transaction
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

        // Commit the transaction and end the session
        await session.commitTransaction();
        session.endSession();

        return { status: 200, message: "Transfer successful" };
    } catch (error) {
        // Abort only if transaction is still active
        if (session.inTransaction()) {
            await session.abortTransaction();
        }
        session.endSession();
        return { status: 500, message: "Transfer failed", error: error.message };
    }
});

async function transfer(req) {
    const { amount, to } = req.body;
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const fromAccount = await accountModel.findOne({ userId: req.userId }).session(session);
        const toAccount = await accountModel.findOne({ userId: to }).session(session);

        if (!fromAccount || !toAccount) {
            await session.abortTransaction(); // Abort within the transaction context
            session.endSession();
            return { status: 400, message: "Invalid Account" };
        }

        if (fromAccount.balance < amount) {
            await session.abortTransaction();
            session.endSession();
            return { status: 400, message: "Insufficient Balance" };
        }

        // Perform balance update operations within the transaction
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

        // Commit the transaction and end the session
        await session.commitTransaction();
        session.endSession();

        return { status: 200, message: "Transfer successful" };
    } catch (error) {
        // Abort only if transaction is still active
        if (session.inTransaction()) {
            await session.abortTransaction();
        }
        session.endSession();
        return { status: 500, message: "Transfer failed", error: error.message };
    }
}


transfer({
    userId:"671f7a816e1ad28baa031b2b",
    body:{
        to:"671f86dced22d20f2ccd1373",
        amount: 1000
    }
})

transfer({
    userId:"671f7a816e1ad28baa031b2b",
    body:{
        to:"671f86dced22d20f2ccd1373",
        amount: 1000
    }
})
