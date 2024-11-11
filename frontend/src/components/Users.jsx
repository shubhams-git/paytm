import { User } from "./User"

export const Users = ()=>{
    
    const users = [
        {shortName:"U1", name: "User 1"},
        {shortName:"U2", name:"User 2"},
        {shortName:"U3", name:"User 3"}
    ]
    
    
    return <div>
        <div className="text-lg font-bold px-4">
            Users
        </div>
        <div className="p-4 text-sm mb-4">
            <input className="w-full px-2 py-1 border rounded" type="text" placeholder="  Search users..."></input>
        </div>
        {users.map(user=><User shortName={user.shortName} name={user.name}/>)}
    </div>
}