export const  AppBar = ({name, shortName})=>{
    return <div className="flex justify-between px-3 py-2 border-2 border-slate-200 rounded-3xl shadow items-center text-lg">
        <div className="font-bold text-xl">
            PayTM App
        </div>
        <div className="flex items-center">
            <div>
                Hello, {name}
            </div>
            <div className="flex rounded-full bg-slate-300 size-8 justify-center items-center ml-5">
                <div>
                    {shortName}
                </div>
            </div>
            
        </div>
    </div>
}