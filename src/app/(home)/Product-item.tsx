"use client"
import ProductModal from "@/components/ui/modals/product-modal"
import { Forward } from "lucide-react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import ProductModalContent from "../admin/product-modal-content"
import Modal from "@/components/ui/modals/modal"
import { AuthContent } from "@/components/navbar/auth-content"


interface ProductItemProps{
    product: any
    authenticatedUser:any
}


export const ProductItem: React.FC<ProductItemProps> = ({product,authenticatedUser}) => {


    const [showLoginModal,setShowLoginModal] = useState<boolean>(false)
    const [showProductModal,setShowProductModal] = useState<boolean>(false)
    const [currentProduct,setCurrentProduct] = useState()


    const HandleArrowClick = (e:React.MouseEvent<HTMLDivElement,MouseEvent>) => {
        e.stopPropagation()

        window.open(`${product.webiste}`,"_blank")
    }

    const HandleProductClick = () => {
        if(!authenticatedUser){
            setShowLoginModal(true)
        }else{
            setCurrentProduct(product)
            setShowProductModal(true)
        }
    }

    return (
        <div onClick={HandleProductClick} className="py-4 w-full cursor-pointer p-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Image 
                    src={product.logo}
                    width={1000}
                    height={1000}
                    alt="product logo"
                    className="h-12 w-12 rounded-xl" />
                    <div className="ml-4">
                        <div className="md:flex items-center gap-x-2">
                            <h1 className="text-sm font-semibold">{product.name}</h1>
                            <p className="hidden md:flex text-xs">-</p>
                            <p className="text-gray-500 text-xs md:text-sm pr-2">{product.headline}</p>
                            <div onClick={HandleArrowClick} className="hidden md:flex cursor-pointer">
                                <Forward   />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ProductModal 
            visible={showProductModal}
            setVisible={setShowProductModal}
            >
                <ProductModalContent
                currentProduct={currentProduct}
                authenticatedUser={authenticatedUser}
                 />
            </ProductModal>
            <Modal 
            setVisible={setShowLoginModal}
            visible={showLoginModal}>
                <AuthContent />
            </Modal>            
        </div>
    )
}