import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import ShareModal from "@/components/ui/modals/share-product-modal"
import { Textarea } from "@headlessui/react"
import { ArrowBigUp, MessageCircleDashed, Share, Trash } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ShareModalContent } from "./share-product-modal"
import { CommentOnProduct, deleteComment } from "@/lib/server-action"
import { Badge } from "@/components/ui/badge"


interface ProductModalProps{
    currentProduct: any
    authenticatedUser: any
    totalUpvotes: any
    hasUpvoted: any
    setTotalUpvotes: any
    setHasUpvoted: any
}

const ProductModalContent: React.FC<ProductModalProps> = ({currentProduct,
    authenticatedUser,
    totalUpvotes,
    hasUpvoted,
    setTotalUpvotes,
    setHasUpvoted
}) => {

    const [shareModalVisible,setShareModalVisible] = useState<boolean>(false)
    const [commentText,setCommentText] = useState<string>("")
    const [comments,setComments] = useState(currentProduct.commentsData || [])

    const HandleCommentSubmit = async() => {
        try{
            await CommentOnProduct(currentProduct.id,commentText)

            setCommentText("")
            setComments([
                ...comments,
                {
                    user: authenticatedUser.user.name,
                    body: commentText,
                    profile: authenticatedUser.user.image,
                    userId: authenticatedUser.user.id,
                    timestamp: new Date().toISOString()
                }
            ])
        }catch(error){
            console.log(error)
        }
    }

    const handleCommentChange = (e:any) => {
        setCommentText(e.target.value)
    }

    console.log("PROFILE_PICTURE::::",comments.map((comment:any) => comment.profilePicture))


    const handleCommentDelete = async(commentId: string) => {
        try{
            await deleteComment(commentId)

            setComments(comments.filter((comment:any) => comment.id !== commentId))
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className="h-full">
            <div className="md:w-4/5 mx-auto">
            <Image 
            src={currentProduct.logo}
            width={200}
            height={200}
            alt={"product logo"}
            className="h-20 w-20 border rounded-xl bg-white shadow-md" />
            <div className="py-4 space-y-2">
                <div className="text-2xl font-semibold">{currentProduct.name}</div>
                <div className="md:flex md:justify-between items-center">
                    <p className="text-gray-600 text-xl font-light md:w-3/5">{currentProduct.headline}</p>
                
                <div className="flex items-center gap-2 pt-4">
                    <button 
                    onClick={() => window.open(currentProduct.website,"_blank")}
                    className="border justify-center items-center flex p-4 rounded-xl cursor-pointer">
                        Visit</button>

                    <button className={`rounded-xl flex justify-center items-center p-4 gap-x-2 cursor-pointer
                        w-full lg:w-56 ${
                            hasUpvoted ? "bg-emerald-500" : "text-black border "
                        }`}>
                            <ArrowBigUp className={`${ hasUpvoted ? "text-white" : "text-black"}`} />
                    </button>
                    </div>
                </div>
                <h2 className="text-gray-600 py-6">{currentProduct.description}</h2>
                <div className="md:flex justify-between items-center">
                <div className="flex gap-x-2">
                {currentProduct.categories.map((category:any,idx:any) => (
                    <Link href={`/category/${category.toLowerCase()}`}
                    key={idx}
                    className="bg-gray-200 text-gray-500 px-4 py-2 rounded-xl">
                        {category}
                    </Link>
                ))}
                </div>
                <div className="flex items-center gap-x-6 py-4">
                <div className="text-md text-gray-600 flex items-center gap-x-2 cursor-pointer">
                <MessageCircleDashed className="text-gray-500" />
                <p>Disscuss</p>
                </div>
                <div onClick={() => setShareModalVisible(true)} className="text-md text-gray-600 flex items-center gap-x-2 cursor-pointer">
                <Share className="text-gray-500" />
                <p>Share</p>
                </div>
                </div>
                </div>
                <Carousel opts={{align:"start"}} className="w-full overflow-hidden md:overflow-visible">
                <CarouselContent>
               {Array.from({
                length: currentProduct.images.length
               }).map((_,index) => (
                <CarouselItem key={index} className="basis-1/2" >
                    <Image 
                    src={currentProduct.images[index]}
                    alt="product images"
                    width={500}
                    height={500}
                    className="rounded-xl object-cover border border-gray-200 h-60 w-full" />
                </CarouselItem>
               ))}
                <CarouselPrevious />
                <CarouselNext />
                </CarouselContent>
                </Carousel>
                <h1 className="font-semibold pt-10">Community Feedback</h1>
                <div>
                    <div className="w-full flex items-center gap-4 mt-4">
                        <Image 
                        src={authenticatedUser.user.image}
                        alt="profile"
                        width={50}
                        height={50}
                        className="rounded-full h-12 w-12" />
                        <Textarea 
                        value={commentText}
                        onChange={handleCommentChange}
                        placeholder="What do you think about this product?"
                        className="w-full border rounded-md focus:outline-none p-4 text-gray-500 "/>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button onClick={HandleCommentSubmit} className="bg-red-500 text-white p-2 rounded-xl">
                            Comment
                        </button>
                    </div>
                </div>
                <div className="py-8 space-y-8">
                    {comments.map((comment:any,idx:any) => (
                        <div key={idx} className="flex gap-4">
                            <Image
                            src={comment.profile}
                            alt="profile picture"
                            width={50}
                            height={50}
                            className="w-8 h-8 rounded-full mt-1 cursor-pointer" />
                            <div className="w-full">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-x-2 items-center">
                                        <h1 className="text-gray-600 font-semibold">{comment.user}</h1>
                                        { comment.userID === currentProduct.userId && (
                                            <Badge className="bg-blue-300">Creator</Badge>
                                        )}
                                        <div className="text-gray-500 text-xs">
                                            {new Date(comment.timestamp).toDateString()}
                                        </div>
                                        {(comment.userId === authenticatedUser.user.id || 
                                        currentProduct.userId === authenticatedUser.user.id) && (
                                            <Trash 
                                            onClick={() => handleCommentDelete(comment.id)}
                                            className="text-red-500 cursor-pointer" />
                                        )}
                                    </div>
                                </div>
                                <div className="text-gray-600 text-sm hover:cursor-pointer mt-2">
                                        {comment.body}
                                    </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            </div>
            <ShareModal
            visible={shareModalVisible}
            setVisible={setShareModalVisible} >
               <ShareModalContent currentProduct={currentProduct} />
            </ShareModal>
        </div>
    )
}

export default ProductModalContent