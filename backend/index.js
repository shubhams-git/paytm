import express from "express"
import mainRouter from "./routes/index.js"
import cors from "cors"
import dotenv from "dotenv"

const app = express();
app.use(express.json())
app.use(cors())
dotenv.config()

app.use("/api/v1", mainRouter)
app.listen(process.env.PORT, ()=>{
    console.log(`listening to port:${process.env.PORT}`)
})