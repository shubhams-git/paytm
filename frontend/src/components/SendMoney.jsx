import { useEffect, useState } from "react"
import { Heading } from "./Heading"

export const SendMoney = ({id, shortName, firstName, onTransferClick})=>{

    const [amount, setAmount] = useState("")

    return <div className="h-screen flex bg-slate-200 justify-center items-center">
                <div className="shadow-xl flex flex-col w-1/4 p-10 bg-white rounded-lg">
                    <Heading label={"Send Money"}/>
                    <div className="flex items-center pt-10">
                        <div className="flex items-center justify-center rounded-full size-12 bg-[#28c45c]">
                            <div className="text-white text-xl">
                                {shortName}
                            </div>
                        </div>
                        <div className="pl-4  text-xl font-bold">
                            {firstName}
                        </div>
                    </div>
                    <div className="font-semibold text-sm">
                        Amount (in Rs)
                    </div>
                    <div className="pt-5">
                        <input type="text" onChange={e=>setAmount(e.target.value)} className="py-1 px-2 w-full text-sm" placeholder="Enter amount"></input>
                    </div>
                    <div className="flex justify-center bg-[#28c45c] text-white py-2 rounded mt-5">
                        <button className="w-full" onClick={()=>onTransferClick(amount)}> Initiate Transfer</button>
                    </div>
                </div>
            </div>
}

