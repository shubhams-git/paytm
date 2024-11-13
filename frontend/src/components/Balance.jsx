export const Balance = ({amount})=>{
    return <div className="flex p-4 pt-6 text-lg">
                <div className="font-bold">
                    Your Balance
                </div>
                <div className="font-semibold px-3">
                    {Number(amount).toFixed(2)}
                </div>
            </div>
}