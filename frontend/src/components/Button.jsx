import { useNavigate } from "react-router-dom"

export const Button = ({label, onClick})=>{

    const navigate = useNavigate()

    function handleButton(){
        navigate("/dashboard")
    }

    return <div className="flex justify-center rounded-lg my-3 mx-2 h-10 items-center bg-[#1e2938] text-white text-center">
        <button onClick={onClick}>{label}</button>
    </div>
}