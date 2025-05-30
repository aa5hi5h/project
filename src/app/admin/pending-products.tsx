"use client"
import ActivateProductModal from "@/components/ui/modals/activate-product-modal"
import ProductModal from "@/components/ui/modals/product-modal"
import RejectProductModal from "@/components/ui/modals/reject-product-modal"
import { Check, CheckCircle, X } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import ProductModalContent from "./product-modal-content"
import { ActiveProductModalContent } from "./active-product-modal"
import RejectProductModalContent from "./reject-product-modal"


interface PendingProductsProps{
    pendingProducts: any
    authenticatedUser: any
}

const PendingProducts : React.FC<PendingProductsProps> = ({pendingProducts,authenticatedUser}) => {

    const [viewProductModalVisible,setViewProductModalVisible] = useState<boolean>(false)
    const [currentProduct,setCurrentProduct] = useState<any>(null)

    const [ActivateProductModalVisible,setActiveProductModalVisible] = useState<boolean>(false)
    const [rejectedProductModalVisible,setRejectProductModalVisible] = useState<boolean>(false)


    const formattedProducts = pendingProducts.map((product:any) => {
        const {
            id,
            name,
            slug,
            headline,
            description,
            releaseDate,
            logo,
            website,
            twitter,
            discord,
            user,
            userId,
            categories,
            images,
        } = product

        const imagesUrl = images.map((image:any) => image.url)
        const categoryNames = categories.map((category:any) => category.name)

        return {
            id,
            name,
            slug,
            headline,
            description,
            releaseDate,
            logo,
            twitter,
            website,
            discord,
            user,
            userId,
            images: imagesUrl,
            categories: categoryNames
        }
    })

    const HandleViewProduct = (product:any) => {
        const formattedProduct = formattedProducts.find((formattedProduct:any) => formattedProduct.id === product.id )

        setCurrentProduct(formattedProduct)
        setViewProductModalVisible(true)
    }

    const HandleActiveProduct = (product:any) => {
        setCurrentProduct(product)
        setActiveProductModalVisible(true)
    }

    const HandleRejectProduct = (product:any) => {
        setCurrentProduct(product)
        setRejectProductModalVisible(true)
    }

    return (
        <div>
            <div className="flex flex-col w-full mt-6">
                {formattedProducts.map((product:any,idx:any) => (
                    <div key={idx} className="flex p-4 border justify-between items-center rounded-md">
                        <div className="flex gap-x-6 items-center">
                            <Image 
                            src={product.logo}
                            alt="product logo"
                            width={200}
                            height={200}
                            className="w-10 md:w-20 rounded-md cursor-pointer"
                             />
                             <div className="space-y-2">
                                <h1 className="text-2xl font-bold">{product.name}</h1>
                                <p className="text-sm hidden md:flex text-gray-500">{product.description}</p>
                                <div className="hidden md:flex text-gray-500 font-smeibold">
                                    Release Date : {product.releaseDate}
                                </div>
                             </div>
                        </div>
                        <div className="flex items-center justify-between gap-2 md:gap-x-4 ">
                            <button
                            onClick={() => HandleViewProduct(product)}
                             className="bg-green-500 hidden md:flex text-white px-4 py-2 rounded-xl text-center text-sm">
                                View Product
                            </button>
                            <button 
                            onClick={() => HandleViewProduct(product)} className="bg-green-500 md:hidden text-white px-4 py-2 rounded-xl text-center text-sm">
                                View
                            </button>
                            <button
                            onClick={() => HandleActiveProduct(product)}
                            className="bg-emerald-200 px-4 py-2 text-center rounded-xl">
                                <Check className="text-green-600" />
                            </button>
                            <button
                            onClick={ () => HandleRejectProduct(product)}
                             className="bg-red-200 px-4 py-2 text-center rounded-xl">
                                <X className="text-red-600" />
                            </button>
                        </div>
                    </div>
                ))}

                <ProductModal
                visible={viewProductModalVisible}
                setVisible={setViewProductModalVisible}>
                    <ProductModalContent 
                    currentProduct={currentProduct}
                    authenticatedUser={authenticatedUser}
                     />
                </ProductModal>

                <ActivateProductModal 
                visible={ActivateProductModalVisible}
                setVisible={setActiveProductModalVisible}>
                    <ActiveProductModalContent 
                    currentProduct={currentProduct} 
                    closeModal={() => setActiveProductModalVisible(false)} />
                </ActivateProductModal>

                <RejectProductModal 
                visible={rejectedProductModalVisible}
                setVisible={setRejectProductModalVisible}>
                    <RejectProductModalContent 
                    currentProduct={currentProduct}
                    closeModal={() => setRejectProductModalVisible(false)}
                     />
                </RejectProductModal>
            </div>
        </div>
    )
}

export default PendingProducts