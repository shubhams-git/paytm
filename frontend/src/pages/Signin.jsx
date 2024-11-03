import { BottomWarning } from "../components/BottomWarning"
import { ButtonComponent } from "../components/ButtonComponent"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
export const Signin = ()=>{
    return <div className="flex flex-col w-1/5">
            <Heading label={"Sign In"}/>
            <SubHeading label={"Enter your information"} />
            <InputBox title={"Email"} label={"shubham@gmail.com"}/>
            <InputBox title={"Password"} label={"123456"}/>
            <ButtonComponent label={"Sign in"} />
            <BottomWarning label={"Create a new account"} type={"Sign up"}/>
        </div>
}