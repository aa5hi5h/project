"use client"
import ProductModal from "@/components/ui/modals/product-modal"
import { ArrowBigUpDash, Forward, MessageCircle } from "lucide-react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import ProductModalContent from "../admin/product-modal-content"
import Modal from "@/components/ui/modals/modal"
import { AuthContent } from "@/components/navbar/auth-content"
import Link from "next/link"
import { upvoteProduct } from "@/lib/server-action"


interface ProductItemProps{
    product: any
    authenticatedUser:any
}


export const ProductItem: React.FC<ProductItemProps> = ({product,authenticatedUser}) => {


    const [showLoginModal,setShowLoginModal] = useState<boolean>(false)
    const [showProductModal,setShowProductModal] = useState<boolean>(false)
    const [currentProduct,setCurrentProduct] = useState()
    const [hasUpvoted,setHasUpvoted] = useState(product.upvoter?.includes(authenticatedUser?.user.id))
    const [totalUpvotes,setTotalUpvotes] = useState(product.upvotes || "")


    const HandleArrowClick = (e:React.MouseEvent<HTMLDivElement,MouseEvent>) => {
        e.stopPropagation()

        window.open(`${product.webiste}`,"_blank")
    }

    const releaseDate = product.releaseDate && new Date(product.releaseDate)

    const currentDate = new Date()

    let displayReleaseDate 

    if( releaseDate > currentDate){
        displayReleaseDate = releaseDate.toDateString()
    }else{
        displayReleaseDate = "Available"
    }

    const HandleProductClick = () => {
        if(!authenticatedUser){
            setShowLoginModal(true)
        }else{
            setCurrentProduct(product)
            setShowProductModal(true)
        }
    }

    const HandleCategoryClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.stopPropagation()
    }

    const handleUpvoteClick = async(e: React.MouseEvent<HTMLDivElement , MouseEvent >) => {
        e.stopPropagation()
        try{
            await upvoteProduct(product.id)

            setTotalUpvotes( hasUpvoted ? totalUpvotes - 1 : totalUpvotes + 1 )
            setHasUpvoted(!hasUpvoted)
        }catch(err){
            console.log(err)
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
                        <div className="hidden md:flex gap-x-2 items-center">
                            <div className="text-xs text-gray-600 flex gap-x-1 items-center">
                                {product.commentsLength}
                                <MessageCircle />
                            </div>
                            {product.categories.map((category:any,idx:any) => (
                                <div
                                key={idx}
                                className="text-xs text-gray-500"
                                >
                                    <div className="flex gap-x-1 items-center">
                                        <div className="mr-1">
                                            <Link 
                                            href={`/category/${category.toLowerCase()}`}
                                            className="hover:underline"
                                            onClick={HandleCategoryClick}>
                                            {category}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="text-xs text-gray-500">
                                <div className="flex gap-x-1 items-center">
                                    <div className="mr-1">*</div>
                                        {displayReleaseDate}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-sm ">
                    <div onClick={handleUpvoteClick}>
                        { hasUpvoted ? (
                            <div className="border px-2 rounded-md flex flex-col items-center bg-red-500 text-white">
                                <ArrowBigUpDash  />
                                {totalUpvotes}
                            </div>
                        ) : (
                            <div className="border px-2 rounded-md flex flex-col items-center ">
                                <ArrowBigUpDash />
                                {totalUpvotes}
                            </div>
                        )}
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
                setHasUpvoted={setHasUpvoted}
                setTotalUpvotes={setTotalUpvotes}
                hasUpvoted={hasUpvoted}
                totalUpvotes={totalUpvotes}
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