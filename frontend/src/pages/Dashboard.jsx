import { AppBar } from "../components/AppBar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
export const Dashboard = ()=>{
    const amount = 5000
    const name = "Shubham"
    const shortName = "S"

    return (<div>
                <AppBar name={name} shortName={shortName}/>
                <Balance amount={amount} />
                <Users />
            </div>)
}