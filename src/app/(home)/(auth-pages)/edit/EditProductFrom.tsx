"use client"
import { ImageUploader } from "@/components/ui/image-uploader"
import { LogoUploader } from "@/components/ui/logo-uploader"
import { updateProduct } from "@/lib/server-action"
import { CircleCheck, Flag, Pencil, XCircle } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"


interface EditProductFormProps{
    product: any
}

interface CategoryProp{
    id: string
    name : string
}
export const EditProductForm : React.FC<EditProductFormProps> = ({product}) => {


    const [isEditingLogo,setIsEditingLogo] = useState<boolean>(false)
    const [uploadedLogoUrl,setUploadedLogoUrl] = useState<string>("")
    const [isEdititngproductImages,setIsEditingProductImages] = useState<boolean>(false)
    const [uploadedProductImagesUrl,setUploadedProductImagesUrl] = useState<string[]>([])


    const [name,setName] = useState<string>(product.name)
    const [website,setWebsite] = useState<string>(product.website)
    const [headline,setHeadline] = useState<string>(product.headline)
    const [description,setDescription] = useState<string>(product.description)
    const [twiter,setTwitter] = useState<string>(product.twitter)
    const [discord,setDiscord] = useState<string>(product.discord)
    const [releaseDate,setReleaseDate] = useState(product.releaseDate)
    const [categories,setCategories] = useState(product.categories)
    const [slug,setSlug] = useState<string>("")


    const HandleLogoUpload = (url?:string) => {
        if(url){
            setUploadedLogoUrl(url)
            setIsEditingLogo(false)
        }else{
            setIsEditingLogo(true)
        }
    }

    const HandleNameChange = (e: any) => {
        const productName = e.target.value
        const truncatedName = productName.slice(0,30)
        setName(truncatedName)
    }

    useEffect(() => {
        const truncatedName = name.slice(0,30)
        const slugValue = truncatedName
        .toLowerCase()
        .replace(/\s+/g,"-")
        .replace(/\./g,"-")
        setSlug(slugValue)
    },[name])

    const HandleProductImagesUpload = (urls:string[]) => {
        setUploadedProductImagesUrl(urls)
        setIsEditingProductImages(false)
    }

    const router = useRouter()

    const HandleSubmit = async() => {
        try{
            await updateProduct(product.id,{
                name,
                slug,
                releaseDate,
                twitter:twiter,
                discord,
                website,
                headline,
                categories,
                description,
                logo: uploadedLogoUrl || product.logo,
                images: uploadedProductImagesUrl.length > 0 
                ? uploadedProductImagesUrl 
                : product.images.map((image:any) => image.url)
            });

            toast(<>
            <div className="flex items-center gap-4 mx-auto">
                <CircleCheck className="text-emerald-500" />
                <div className="text-md font-semibold">Prodcut updated successfully</div>
            </div>
            </>,
            {position:"top-center"})
            router.refresh()

            
        }catch(error:any){
            toast(
                <div className="flex items-center gap-4 mx-auto">
                    <XCircle />
                    <div className="font-medium text-red-500">There was an error {error.message}</div>
                </div>,
                {position:"top-center"}
            )
        }
    }


    return (
        <div className="h-full">
            <div className="flex items-center gap-4 mx-auto">
                <Pencil className="text-3xl text-green-600" />
                <h2 className="text-xl font-bold tracking-tight">Edit product</h2>
            </div>
            <div className="w-full rounded-xl md:gap-x-4 p-10 mt-10 bg-emerald-100 md:flex items-center ">
                <Flag size={32} className="mb-4 md:mb-0 text-5xl text-green-500" />
                <p className="text-gray-500"> This is the product form. You can update the product details here. If
          your product is currently live, and you make changes to the product
          details. It will delist the product from the marketplace until it is
          reviewed and approved by the admin.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 mt-10 gap-4">
                <div>
                <h1 className="font-medium">Logo</h1>
                {isEditingLogo ? (
                    <div className="mt-6">
                    <LogoUploader 
                    onChange={HandleLogoUpload}
                    endpoint="productLogo" />
                    <button onClick={() => setIsEditingLogo(false)}>
                        cancel
                    </button>
                    </div>
                ) : (
                    <div className="mt-6">
                        <Image 
                        src={uploadedLogoUrl || product.logo} 
                        alt="product logo"
                        width={200}
                        height={200}
                        className="w-28 md:w-60 border rounded-xl cursor-pointer" />
                        <button onClick={() => setIsEditingLogo(true)} 
                        className="text-blue-500 cursor-pointer hover:underline">
                            Change logo
                        </button>
                    </div>
                )}
                </div>
                <div>
                    <h2 className="font-medium">Product name</h2>
                    <input 
                    value={name}
                    onChange={HandleNameChange}
                    type="text"
                    className="w-full p-4 border rounded-xl focus:outline-none mt-6"
                     />
                </div>
                <div>
                    <h2 className="font-medium">Website</h2>
                    <input 
                    type="text"
                    value={website}
                    className="w-full p-4 border rounded-xl focus:oultine-none mt-6"
                    onChange={(e) => setWebsite(e.target.value)} />
                </div>
                <div>
                    <h2 className="font-medium">Release Date</h2>
                    <input 
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    className="w-full p-4 border rounded-xl focus:oultine-none mt-6" />
                </div>
                <div>
                    <h2 className="font-medium">Headline</h2>
                    <input 
                    value={headline}
                    type="text" 
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full p-4 border rounded-xl focus:outline-none mt-6" />
                </div>
                <div>
                    <h2 className="font-medium">Description</h2>
                    <input 
                    value={description}
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-4 border rounded-xl focus:oultine-none mt-6" />
                </div>
                <div>
                    <h2 className="font-medium">Twitter</h2>
                    <input
                    value={twiter}
                    type="text"
                    onChange={(e) => setTwitter(e.target.value)}
                    className="w-full p-4 border rounded-xl focus:outline-none mt-6" />
                </div>
                <div>
                    <h2 className="font-medium">Discord</h2>
                    <input 
                    value={discord}
                    type="text"
                    onChange={(e) => setDiscord(e.target.value)}
                    className="w-full p-4 border rounded-xl focus:outline-none mt-6" />
                </div>
                <div className="col-span-2">
                    <h2 className="font-medium">Categories</h2>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        {categories.map((item:any,idx:any) => (
                            <div key={idx}>
                                <div className="bg-gray-200 p-2 text-center text-sm rounded-full">
                                {item.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-2">
                    <h2 className="font-medium">Product Images</h2>
                    { isEdititngproductImages ? null : (
                        <div className="grid grid-cols-5 gap-4">
                            {uploadedProductImagesUrl.length > 0 && 
                            uploadedProductImagesUrl.map((item,idx) => (
                                <div key={idx}>
                                    <Image 
                                    src={item}
                                    alt="uploaded images"
                                    width={200}
                                    height={200}
                                    className="border rounded-xl hover:cursor-pointer"
                                     />
                                </div>
                            ) )}
                           {uploadedProductImagesUrl.length === 0 && product.images
                           && product.images.map((img:any,idx:any) => (
                            <div key={idx}>
                                <Image
                                src={img.url}
                                alt="product images"
                                width={200}
                                height={200}
                                className="border rounded-xl" />
                            </div>
                           ))}
                        </div>
                    )}
                    {isEdititngproductImages ? (
                        <div>
                            <ImageUploader 
                            endpoint="productImages"
                            onChange={HandleProductImagesUpload} />
                            <button className="mt-2 hover:cursor-pointer"
                            onClick={() => setIsEditingProductImages(false)}>
                                cancel
                            </button>
                        </div>
                    ) : (<div>
                        <button
                        onClick={() => setIsEditingProductImages(true)}
                         className="mt-2 hover:cursor-pointer text-blue-500 hover:underline">
                            click here to upload
                        </button>
                    </div>)}
                </div>
            </div>
            <div className="flex justify-end py-10">
                <button onClick={HandleSubmit} className="bg-emerald-500 text-white w-40 p-4 rounded-xl text-center cursor-pointer">
                    Save
                </button>

            </div>
        </div>
    )
}