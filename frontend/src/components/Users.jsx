import { User } from "./User"

export const Users = ({users})=>{    
    if(users){
        return <div>
                    {users.map(user=><User shortName={user.firstName.charAt(0)} firstName={user.firstName} id={user._id}/>)}
                </div>
    }
}