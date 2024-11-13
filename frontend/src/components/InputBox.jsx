export const InputBox = ({title, label, onChange})=>{
    return <div className="pl-4">
        <div className="font-bold text-base">
            {title}
        </div>
        <div className="py-2 px-3">
            <input onChange={onChange} className="min-w-full" placeholder={label}></input>
        </div>
    </div>
}