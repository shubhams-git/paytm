import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTER}.mongodb.net/${process.env.DATABASE_NAME}` 
console.log(mongoURI)

mongoose.connect(mongoURI).
then(
    ()=>{console.log("Successfully connected")}
).catch(
    (e)=>{console.log("error: "+e)}
)

const userSchema = new mongoose.Schema({
    userName: {
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

export const userModel = mongoose.model("User",userSchema);