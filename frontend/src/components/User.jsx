import { useNavigate } from "react-router-dom"
import { SendMoney } from "./SendMoney"

export const User = ({shortName, name})=>{

    const navigate = useNavigate()

    function buttonHandler(){
        navigate("/send")
    }

    return <div className="flex py-2 px-4 items-center justify-between text-lg">
        <div className="flex">
            <div>
                {shortName}
            </div>
            <div className="font-bold px-5">
                {name}
            </div>
        </div>
        <div className="rounded-md bg-black text-white text-sm flex py-2 px-4">
            <button onClick={buttonHandler}>Send Money</button>
        </div>  
    </div>
}