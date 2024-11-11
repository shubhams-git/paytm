import { BottomWarning } from "../components/BottomWarning"
import { ButtonComponent } from "../components/ButtonComponent"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const Signup = ()=>{
    return <div className="bg-slate-300 h-screen flex justify-center items-center">
        <div className="flex flex-col w-1/5 px-3 py-5 bg-white rounded-lg">
                <Heading label={"Sign Up"}/>
                <SubHeading label={"Enter your information to create an account"} />
                <InputBox title={"First Name"} label={"John"}/>
                <InputBox title={"Last Name"} label={"Doe"}/>
                <InputBox title={"Email"} label={"shubham@gmail.com"}/>
                <InputBox title={"Password"} label={"123456"}/>
                <ButtonComponent label={"Sign up"} />
                <BottomWarning label={"Already have an account?"} type={"Sign in"}/>
            </div>
    </div>
}

