import { activateProduct } from "@/lib/server-action"
import { CheckCircle, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface ActiveProductProps{
    currentProduct : any 
    closeModal: () => void
}

export const ActiveProductModalContent:React.FC<ActiveProductProps> = ({currentProduct,closeModal}) => {

    const router = useRouter()

    const HandleActivateProduct = async() => {
        try{
            await activateProduct(currentProduct.id)

            toast(
                <>
                <div className="flex items-center gap-4 mx-auto">
                    <CheckCircle size={28} className="text-green-500" />
                    <div className="text-md font-semibold">Product activated successfully</div>
                </div>
                </>,
                {
                    position:"top-center"
                }
            );
            closeModal()
            router.refresh()
        }catch(err){
            console.log("ERROR_WHILE_ACTIVATING:::::",err)
        }

    }

    return (
        <div className="h-full">
            <div className="">
                <CheckCircle2 size={44} className="text-emerald-500 p-1 mb-4 rounded-lg" />
                <h1 className="text-3xl font-bold mb-4">Activate Product</h1>
                <p className="text-gray-500 mb-4">Are you sure you want to activate this prodcut ?</p>
                <p className="pb-10 text-gray-500">
                    Once activated, the product will be visible to the user will be able to interact with it
                </p>
                <button onClick={HandleActivateProduct} className="text-emerald-500 hover:underline">Click here to activate </button>
            </div>
        </div>
    )
}