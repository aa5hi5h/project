"use client"
import EditProductModal from "@/components/ui/modals/edit-product-modal"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { EditProductForm } from "./EditProductFrom"

interface EditProductProps{
    product: any
}

export const EditProduct : React.FC<EditProductProps>  = ({
    product
}) => {

    const [editProductModalVisible,setEditProductModalVisible] = useState<boolean>(false)

    const HandleEditProductClick = () => {
        setEditProductModalVisible(true)
    }
    
    return (
        <button 
        onClick={HandleEditProductClick} 
        className="bg-emerald-100 p-4 rounded-xl flex items-center justify-center cursor-pointer">
            <Pencil className="text-emerald-500 text-xl" />
            <EditProductModal 
            visible={editProductModalVisible} setVisible={setEditProductModalVisible}>
                <EditProductForm product={product} />
            </EditProductModal>
        </button>
    )
}