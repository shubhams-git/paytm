import axios from "axios"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Signin = ()=>{

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center items-center">
        <div className="flex flex-col w-1/5 px-3 py-5 bg-white rounded-lg">
            <Heading label={"Sign In"}/>
            <SubHeading label={"Enter your information"} />
            <InputBox title={"Email"} label={"shubham@gmail.com"} onChange={
                e=>setUsername(e.target.value)
            }/>
            <InputBox title={"Password"} label={"123456"} onChange={
                e=>setPassword(e.target.value)
            }/>
            <Button label={"Sign in"} onClick={
                    async()=>{
                        const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                            username,
                            password
                        });
                        localStorage.setItem("token", response.data.token)
                        navigate("/dashboard")
                    }
                }/>
            <BottomWarning label={"Create a new account"} type={"Sign up"}/>
        </div>
    </div>
}