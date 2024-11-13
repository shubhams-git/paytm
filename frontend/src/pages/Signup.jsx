import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"

export const Signup = ()=>{
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("") 
    const [password, setPassword] = useState("")
    console.log("FIrst name is: "+firstName)

    return <div className="bg-slate-300 h-screen flex justify-center items-center">
        <div className="flex flex-col w-1/5 px-3 py-5 bg-white rounded-lg">
                <Heading label={"Sign Up"}/>
                <SubHeading label={"Enter your information to create an account"} />
                <InputBox title={"First Name"} label={"John"} onChange={e=> setFirstName(e.target.value)}/>
                <InputBox title={"Last Name"} label={"Doe"} onChange={e=> setLastName(e.target.value)}/>
                <InputBox title={"Email"} label={"shubham@gmail.com"} onChange={e=> setUsername(e.target.value)}/>
                <InputBox title={"Password"} label={"123456"} onChange={e=> setPassword(e.target.value)}/>
                <Button label={"Sign up"} onClick={
                    async()=>{
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                            username,
                            password,
                            firstName,
                            lastName
                        });
                        localStorage.setItem("token", response.data.token)
                    }
                }/>
                <BottomWarning label={"Already have an account?"} type={"Sign in"}/>
            </div>
    </div>
}

