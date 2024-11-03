import { useNavigate } from "react-router-dom"

export const BottomWarning = ({label, type})=>{
    const navigate = useNavigate();

    function handleNavigation(){
        if(type == "Sign in"){
            navigate("/signin")
        }
        if(type == "Sign up"){
            navigate("/signup")
        }
    }

    return <div className="flex justify-center text-sm">
        <div className="px-1">
            {label}
        </div>
        <button onClick={handleNavigation} className="text-blue-700 underline">
            {type}
        </button>
    </div>
}