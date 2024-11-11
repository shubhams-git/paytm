export const InputBox = ({title, label})=>{
    return <div className="pl-2">
        <div className="font-bold text-base">
            {title}
        </div>
        <div className="py-2 px-3">
            <input className="min-w-full" placeholder={label}></input>
        </div>
    </div>
}