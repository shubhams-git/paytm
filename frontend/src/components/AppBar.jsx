import { UserIcon } from "./UserIcon"

export const  AppBar = ({name, shortName})=>{
    return <div className="flex justify-between px-3 py-2 border-2 border-slate-200 rounded-3xl shadow items-center text-lg">
        <div className="font-bold text-xl">
            PayTM App
        </div>
        <div className="flex items-center">
            <div className="mr-5">
                Hello, {name}
            </div>
            <UserIcon shortName={shortName} />
        </div>
    </div>
}