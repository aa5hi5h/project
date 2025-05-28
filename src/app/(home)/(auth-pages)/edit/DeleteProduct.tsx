import { Trash2 } from "lucide-react"



export const DeleteProduct = () => {

    return (
        <button className="flex items-center justify-center cursor-pointer p-4 rounded-xl bg-red-200">
            <Trash2 className="text-xl text-red-500" />
        </button>
    )
}