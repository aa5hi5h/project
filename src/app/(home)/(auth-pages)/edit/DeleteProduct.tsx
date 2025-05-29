"use client"
import Modal from "@/components/ui/modals/modal"
import { deleteProduct } from "@/lib/server-action"
import { Store, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"



export const DeleteProduct = ({productId}:{productId:string}) => {

    const [deleteProductModalVisible,setDeleteProductModalVisible] = useState<boolean>(false)
    const [confirmationInput,setConfirmationInput] = useState<string>("")
    const [isDeleteButtonEnabled,setIsDeleteButtonEnabled] = useState<boolean>(false)

    const HandleInputChange = (e:any) => {
        const InputText = e.target.value
        setConfirmationInput(InputText)
        setIsDeleteButtonEnabled(InputText === "delete")
    }

    const router = useRouter()

    const HandleCancelButton = () => {
        setDeleteProductModalVisible(false)
    }

    const HandleDeleteButton = async() => {
        try{
            if(confirmationInput === "delete"){
            await deleteProduct(productId)
            router.push("/my-product")
            router.refresh()
            }
        }catch(err){
            console.log("ERROR::::",err)
        }
    }

    


    return (
        <>
        <button onClick={() => setDeleteProductModalVisible(true)} className="flex items-center justify-center cursor-pointer p-4 rounded-xl bg-red-200">
            <Trash2 className="text-xl text-red-500" />
        </button>

        <Modal visible={deleteProductModalVisible} setVisible={setDeleteProductModalVisible}>
            <div>
                <Store size={64} className="text-red-500 bg-red-100 p-1 rounded-xl mb-10" />
                <h1 className="text-2xl font-bold tracking-tight mb-10">Delete Product</h1>
                <p className="text-sm">
                    We&apos;re sorry to see you go. Once your product is deleted, all of your content
                    will be permanently gone, including your products and product settings.
                </p>
                <p className="text-sm py-10">
                    this action cannot be undone. This will permanently delelte your products
                    and all your content.
                </p>
                <p className="text-sm">To confirm deletion, type "delete" below:</p>
                <input 
                type="text"
                value={confirmationInput}
                onChange={HandleInputChange}
                className="w-full p-4 mt-6 border rounded-xl focus:oultine-none" />

                <div className="flex justify-end mt-10">
                    <button 
                    className="bg-white text-red-500 border text-sm
                    rounded-full border-red-500 px-4 py-2 mr-4 font-light cursor-pointer"
                    onClick={HandleCancelButton}>Cancel</button>
                    <button 
                    className={`px-4 py-2 rounded-full text-sm
                             ${ isDeleteButtonEnabled ? 
                                "bg-red-500 text-white "
                                : "bg-gray-200 text-gray-500 cursor-not-allowed"
                             }`}
                             disabled={!isDeleteButtonEnabled}
                             onClick={HandleDeleteButton}>Confirm delete</button>
                </div>
            </div>

        </Modal>
        </>
    )
}