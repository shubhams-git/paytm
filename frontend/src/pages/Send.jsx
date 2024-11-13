import { useNavigate, useSearchParams } from "react-router-dom"
import { SendMoney } from "../components/SendMoney"
import axios from "axios";
export const Send = ()=>{
    const [searchParams] = useSearchParams();
    const userId = searchParams.get("userId")
    const firstName= searchParams.get("firstName")
    const shortName = searchParams.get("shortName")
    const navigate = useNavigate();

    return <div>
        <SendMoney id={userId} shortName={shortName} firstName={firstName} onTransferClick={async(amount)=>{
            const response = await axios.post("http://localhost:3000/api/v1/account/transfer",  
                {
                    "to":userId.toString(),
                    "amount": amount
                },
                {
                    headers:{
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }
            );
            navigate("/dashboard")
        }}/>
    </div>
}