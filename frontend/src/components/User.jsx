export const User = ({shortName, name})=>{
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
            <button>Send Money</button>
        </div>  
    </div>
}