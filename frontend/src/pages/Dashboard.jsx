import { useEffect, useState } from "react"
import { AppBar } from "../components/AppBar"
import { Balance } from "../components/Balance"
import { InputBox } from "../components/InputBox"
import { Users } from "../components/Users"
import axios from "axios"

export const Dashboard = ()=>{
    const amount = 5000
    const name = "Shubham"
    const shortName = "S"
    const [filter, setFilter] = useState("")
    const [users, setUsers] = useState([])
    const [debouncedFilter, setDebouncedFilter] = useState(filter)

    useEffect(()=>{
        const handler = setTimeout(()=>{
            setDebouncedFilter(filter)
        },500)
        
        return ()=>clearTimeout(handler)
    },[filter])

    useEffect(()=>{
        async function getUsers(){
            const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${debouncedFilter}`,
                {
                    headers:{
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }
            )
            setUsers(response.data.user)
        }
        getUsers();
    }, [debouncedFilter])

    return (<div>
                <AppBar name={name} shortName={shortName}/>
                <Balance amount={amount} />
                <InputBox title={"Users"} label="Search Users..." onChange={async(e)=>{
                    setFilter(e.target.value);
                    }}/>
                <Users users={users}/>
            </div>)
}