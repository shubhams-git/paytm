import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTER}.mongodb.net/${process.env.DATABASE_NAME}` 

mongoose.connect(mongoURI).
then(
    ()=>{console.log("Successfully connected to the DB")}
).catch(
    (e)=>{console.log("Error in DB connection: "+e)}
)

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minLength:5,
        maxLength:20,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    firstName: {
        type: String,
        required:true,
        maxLength:20,
        trim:true
    },
    lastName: {
        type: String,
        required:true,
        trim:true,
        maxLength:20
    }
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    balance:{
        type: Number,
        required:true,
        maxLength: 20
    }
})
export const accountModel = mongoose.model("accounts", accountSchema)
export const userModel = mongoose.model("users",userSchema);
