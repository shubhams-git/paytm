import { useEffect, useState } from "react"
import { AppBar } from "../components/AppBar"
import { Balance } from "../components/Balance"
import { InputBox } from "../components/InputBox"
import { Users } from "../components/Users"
import axios from "axios"
import { useSearchParams } from "react-router-dom"

export const Dashboard = ()=>{
    const [filter, setFilter] = useState("")
    const [user, setUser]= useState({
        username:"",
        firstName: "",
        lastName: "",
        balance: ""
    })
    const [users, setUsers] = useState([])
    const [debouncedFilter, setDebouncedFilter] = useState(filter)
    
    useEffect(()=>{
        async function getUser(){
            const response = await axios.get("http://localhost:3000/api/v1/user/details",
                {
                    headers:{
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }
            )
            setUser(response.data)
        }
        getUser();
    },[user])

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
                <AppBar name={user.firstName} shortName={user.firstName.charAt(0)}/>
                <Balance amount={user.balance} />
                <InputBox title={"Users"} label="Search Users..." onChange={async(e)=>{
                    setFilter(e.target.value);
                    }}/>
                <Users users={users}/>
            </div>)
}