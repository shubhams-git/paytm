import { useNavigate } from "react-router-dom"
import { SendMoney } from "./SendMoney"
import { UserIcon } from "./UserIcon"

export const User = ({id, shortName, firstName })=>{

    const navigate = useNavigate()

    function buttonHandler(){
        navigate("/send?userId="+id+"&shortName="+shortName+"&firstName="+firstName)
    }

    return <div className="flex py-2 px-4 items-center justify-between text-lg">
        <div className="flex">
            <UserIcon shortName={shortName} />
            <div className="font-bold px-5">
                {firstName}
            </div>
        </div>
        <div className="rounded-md bg-black text-white text-sm flex">
            <button className="w-full py-2 px-4 " onClick={buttonHandler}>Send Money</button>
        </div>  
    </div>
}