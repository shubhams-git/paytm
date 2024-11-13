import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const Signin = ()=>{
    return <div className="bg-slate-300 h-screen flex justify-center items-center">
        <div className="flex flex-col w-1/5 px-3 py-5 bg-white rounded-lg">
            <Heading label={"Sign In"}/>
            <SubHeading label={"Enter your information"} />
            <InputBox title={"Email"} label={"shubham@gmail.com"}/>
            <InputBox title={"Password"} label={"123456"}/>
            <Button label={"Sign in"} />
            <BottomWarning label={"Create a new account"} type={"Sign up"}/>
        </div>
    </div>
}