"use client"
import { rejectedProducts } from "@/lib/server-action"
import { Textarea } from "@headlessui/react"
import { CheckCircle, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"


interface RejectedProductProp{
    currentProduct: any
    closeModal: () => void
}

const RejectProductModalContent: React.FC<RejectedProductProp> = ({
     currentProduct,
     closeModal
}) => {

    const router = useRouter()

    const [reason,setReason] = useState<string>("")

    const HandleRejectButton = async() => {
        try{
            await rejectedProducts(currentProduct.id, reason)
            toast(
                <>
                <div className="flex items-center gap-4 mx-auto">
                    <CheckCircle className="text-green-500" />
                    <div className="text-md font-semibold">
                        Product rejected successfully 
                    </div>
                </div>
                </>,
                {position:"top-center"}
            );
            closeModal()
            router.refresh()

        }catch(err){
            console.log("ERROR:::::",err)
        }
    }

    return (
        <div className="h-full overflow-auto">
            <div>
                <XCircle size={44} className="text-red-500 mb-4 p-1 rounded-md" />
                <h1 className="text-3xl font-bold mb-4">Reject Products</h1>
                <p className="text-gray-500 mb-4">
                    Are you sure you want to reject this product
                </p>
                <p className="text-gray-500">
                    Once rejected, the user will be notified the necessary steps to take 
                </p>
                <div>
                    <h1 className="text-gray-500 py-4 font-semibold">
                        Reason for rejection
                    </h1>
                    <Textarea 
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full p-2 rounded-xl border focus:outline-none"
                    placeholder="Enter the reason for rejection"
                    rows={4}>
                        {reason}
                    </Textarea>
                </div>
                <button 
                onClick={HandleRejectButton}
                className="pt-4 text-red-500 hover:underline">
                    Click here to reject
                </button>
            </div>
        </div>
    )
}

export default RejectProductModalContent