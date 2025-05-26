"use client"
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/ui/image-uploader";
import { LogoUploader } from "@/components/ui/logo-uploader";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { createProduct } from "@/lib/server-action";
import { useClose } from "@headlessui/react";
import { format } from "date-fns";
import { Calendar, Gamepad2, Rss, Twitter, X } from "lucide-react";
import Image from "next/image";
import {  useCallback, useState } from "react"
import { toast } from "sonner";


const categories = [
  "Media",
  "Blockchain",
  "Cloud",
  "Commerce",
  "Cybersecurity",
  "Data",
  "Design",
  "Photography",
  "E-commerce",
  "Education",
  "Entertainment",
  "Video",
  "Finance",
  "Social",
  "Health",
  "Fitness",
  "Marketing",
  "Music",
  "Productivity",
  "Engineering",
  "Sales",
  "Sports",
  "Travel",
  "Bootstrapped",
  "Art",
  "Analytics",
];

const NewProduct = () => {

    const [step,setStep] = useState<number>(1)
    const [name,setName] = useState<string>("")
    const [slug ,setSlug] = useState<string>("")
    const [selectedCategories,setSelectedCategories] = useState<string[]>([])
    const[headline,setHeadline] = useState<string>("")
    const[description,setDescription] = useState<string>("")
    const[uploadedLogoUrl,setUploadedLogoUrl] = useState<string>("")
    const[uploadedImagesUrl,setUploadImagesUrl] = useState<string[]>([])
    const [date,setDate] = useState<Date | undefined>(new Date())
    const [website,setWebsite] = useState<string>("")
    const [twitter,setTwitter] = useState<string>("")
    const [discord,setDiscord] = useState<string>("")
    const [loading,setLoading] = useState<boolean>(false)


    const handleNameChange = (e:any) => {
        const productName = e.target.value
        const truncatedName = productName.slice(0,30)
        setName(truncatedName)

        const slugValue = truncatedName.toLowerCase()
        .replace(/\s+/g,"-")
        .replace(/\./g,"-")
        setSlug(slugValue)
    }

    const HandleToggleCategories = (category:string) => {
        if(selectedCategories.includes(category)){
            selectedCategories.filter((prev) => prev !== category)
        }else if(selectedCategories.length < 3){
            setSelectedCategories((prev) => [...prev,category])
        }
    }

    const HandleHeadlineChange = (e:any) => {
         setHeadline(e.target.value.slice(0,70))
    }

    const handleDescriptionChange = (e:any) => {
        setDescription(e.target.value.slice(0,500))
    }

    const handleImageUploader = useCallback((url:any) => {
        setUploadedLogoUrl(url)
    },[])

    const handleMultipleImageUpload = useCallback((urls: string[]) => {
        setUploadImagesUrl(urls)
    },[])



    const nextStep = useCallback(() => {
        if(step === 1 && name.length < 4){
            toast(
                <>
                <div className="flex bg-white items-center gap-4 mx-auto">
                    <X className="text-red-600" />
                    <div>Please enter atleast 4 character</div>
                </div>
                </>,
                {position: "top-center"}
            );
            return
        }
        if(step === 2 && selectedCategories.length < 3){
            toast(
                <>
                <div className="flex items-center gap-4 mx-auto">
                    <X className="text-red-600" />
                    <div>Please select atleast 3 categories</div>
                </div>
                </>,
                {position:"top-center"}
            );
            return
        }
        if(step === 3 && headline.length < 10){
            toast(
                <>
                <div className="flex items-center gap-4 mx-auto">
                    <X className="text-red-600" />
                    <div>Please enter atleast 10 characters for the headline</div>
                </div>
                </>,
                {position:"top-center"}
            );
            return
        }
        if(step === 3 && description.length < 20){
            toast(
                <>
                <div className="flex items-center gap-4 mx-auto">
                    <X className="text-red-600" />
                    <div>Please enter atleast 20 characters for the description</div>
                </div>
                </>,
                {position:"top-center"}
            );
            return
        }
        if(step === 4 && !uploadedLogoUrl){
            toast(
                <>
                <div className="flex items-center gap-4 mx-auto">
                    <X className="text-red-600" />
                    <div>Please select product logo before continuing</div>
                </div>
                </>,
                {position:"top-center"}
            );
            return
        }
        if(step===4 && uploadedImagesUrl.length < 3){
            toast(
                <>
                <div className="flex items-center mx-auto gap-4">
                    <X className="text-red-600" />
                    <div>Please select atleast 3 product images before continuing</div>
                </div>
                </>,
                {
                    position:"top-center"
                }
            );
            return
        }
        if(step ===5 && !date){
            toast(
                <>
                <div className="flex items-center mx-auto gap-4">
                    <X  className="text-red-600"/>
                    <div>Please select a date before continue</div>
                    </div></>,
                    {position:"top-center"}
            );
            return
        }
        if(step===6 && !website && !twitter && !discord){
            toast(
                <>
                <div className="flex items-center gap-4 mx-auto">
                    <X className="text-red-600" />
                    <div>Please enter atleast one link</div>
                    </div>
                    </>,
                    {position:"top-center"}
            );
            return
        }
        setStep(step + 1 )
    },[step])

    const prevStep = useCallback(() => {
        setStep(step-1)
    },[step])


    const SubmitAnotherProduct = () => {
        setStep(1)
        setDate(new Date())
        setDescription("")
        setDiscord("")
        setHeadline("")
        setName("")
        setSelectedCategories([])
        setSlug("")
        setTwitter("")
        setUploadedLogoUrl("")
        setUploadImagesUrl([])
        setWebsite("")
    }

    const HanldeSubmitAction = async() => {
        setLoading(true)
        const formattedDate = date ? format(date, "dd/MM/yyyy") : ""

        try{
            await createProduct({
                name,
                slug,
                description,
                headline,
                twitter,
                discord,
                website,
                logo: uploadedLogoUrl,
                categories: selectedCategories,
                images: uploadedImagesUrl,
                releaseDate: formattedDate
            })
            setStep(8)
            
        }catch(error){
            console.log("ERROR WHILE CREATING PRODUCT::::",error)
            setLoading(false)
        }

    }

    return (
    <div className="flex items-center justify-between py-8 md:py-20">
        <div className="md:w-3/5 px-8 mx-auto">
        { step == 1 && (
            <div className="space-y-10">
                <div className="text-4xl font-bold tracking-tight">New Product</div>
                <p className="mt-2 text-lg font-light leading-8">
                    Ready to showcase your product to the world? You came to the right place. 
                    Follow the steps below to get started.
                </p>
                <div>
                    <div className="font-medium">Name of the product</div>
                    <input
                    type="text"
                    value={name}
                    maxLength={30}
                    onChange={handleNameChange}
                    className="border mt-2 rounded-md w-full p-2 focus:outline-none" />
                    <div>{name.length} / 30</div>
                </div>
                <div className=""
                >
                    <div className="font-medium">
                        Slug (URL) - This will be used to create a unique URL for your product
                        </div>
                        <input
                        type="text"
                        readOnly
                        value={slug}
                        className="p-2 rounded-md mt-2 w-full border focus:outline-none" />
                        </div>
            </div>
        )}
        { step == 2 && (
            <div className="space-y-10">
                <div className="text-4xl font-bold tracking-tight"> What category does your product belong ?</div>
                <p className="text-xl  font-light leading-8">Choose atleast 3 categories that best defines your product. This will help people to 
                    find your product
                </p>
                <div>
                    <h2 className="font-medium">Selected Categories</h2>
                    <div className="grid grid-cols-4 gap-2 mt-4 items-center justify-center">
                    {categories.map((category,idx) => (
                        <div onClick={() => HandleToggleCategories(category)} key={idx} className="flex  border items-center justify-center rounded-full ">
                            <div className={`text-xs md:text-sm w-full rounded-full  p-2 text-center cursor-pointer 
                                ${selectedCategories.includes(category) ? "bg-red-600 text-white": "text-black"}`}>
                                {category}
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        )}
        { step == 3 && (
            <div className="space-y-10">
                <h1 className="text-4xl font-bold tracking-tight">Product Details</h1>
                <p className="text-xl font-medium leading-8 ">Keep it simple and clear. Describe your product in a way that makes it 
                    easy for people to understand what it does.</p>
                <div>
                    <h3 className="font-medium">Headline</h3>
                    <input 
                    type="text"
                    maxLength={70}
                    value={headline}
                    onChange={HandleHeadlineChange}
                    className="p-2 border rounded-md mt-2 w-full focus:outline-none" />
                    <p className="text-gray-600 text-sm">{headline.length} / 70</p>
                </div>
                <div>
                    <h3 className="font-medium">Description</h3>
                    <textarea
                    maxLength={500}
                    rows={8}
                    value={description}
                    onChange={handleDescriptionChange}
                    className="p-2 border rounded-md mt-2 w-full focus:outline-none" />
                    <p className="text-gray-600 text-sm">{description.length} / 500</p>
                </div>
            </div>
        )}
        { step == 4 && (
            <div className="space-y-10 ">
                <h1 className="text-4xl font-bold tracking-tight">Add images to showcase your product</h1>
                <p className="text-xl font-light leading-8 ">
                    include images that best represents your product, this will help 
                    people understand what your products look like 
                </p>
                <div>
                    <h2 className="font-medium">Logo</h2>
                    { uploadedLogoUrl ? (
                        <div>
                            <Image 
                            src={uploadedLogoUrl}
                            width={1000}
                            height={1000}
                            alt="logo"
                            className="h-40 w-40 object-cover rounded-md"/>
                        </div>
                    ) : (
                        <LogoUploader
                        endpoint="productLogo"
                        onChange={handleImageUploader} />
                    )}
                </div>
                <div>
                        <h2 className="font-medium">Product images (upload atleast 3 images)</h2>
                        {
                            uploadedImagesUrl.length > 0 ? (
                                <div className="mt-2 md:flex gap-2 space-y-4 md:space-y-0">
                                    {uploadedImagesUrl.map((img,idx) => (
                                        <div key={idx} className="relative md:w-40 h-40">
                                            <Image 
                                            src={img}
                                            width={1000}
                                            height={1000}
                                            priority
                                            objectFit="cover"
                                            alt="product image"
                                            className="rounded-md" />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <ImageUploader 
                                endpoint="productImages"
                                onChange={handleMultipleImageUpload} />
                            )
                        }
                    </div>
            </div>
        )}
        {step == 5 && (
            <div className="space-y-10">
                <h2 className="text-4xl font-bold tracking-tight">Release Date</h2>
                <p className="text-xl font-light leading-8">When will your product be available to the public? Select a date to continue.</p>
                <div className="">
                    <div className="font-medium pb-3">
                        Release date
                    </div>
                    <>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                            variant={"outline"}
                            className={`w-[300px] pl-3 text-left font-normal ${!date && "text-muted-foreground"}`}
                            >
                                {date ? format(date,"PPP") : <>Pick a date</>}
                                <Calendar
                                 className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                    </Popover>
                    </>
                </div>
            </div>
        )}
        {step == 6 && (
            <div className="space-y-10">
                <h2 className="text-4xl font-bold tracking-tight">Additional links</h2>
                <p className="text-xl font-light leading-8">Add links to your product&apos;s website, social media , and other platform.</p>
                <div className="">
                    <div className="flex items-center gap-x-2">
                    <Rss className="h-8 w-8 opacity-70" />
                    <h2 className="font-medium">Website</h2>
                    </div>
                    <input 
                    type="text"
                    placeholder="https://www-your-domain-name/"
                    value={website}
                    className="p-2 border rounded-md mt-2 w-full focus:outline-none"
                    onChange={(e) => setWebsite(e.target.value)} />
                </div>
                <div className="">
                    <div className="flex gap-x-2 items-center">
                    <Twitter className="h-8 w-8 opacity-70" />
                    <h2 className="font-medium">Twitter</h2>
                    </div>
                    <input
                    type="text"
                    placeholder="https://twitter.com"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    className="p-2 border rounded-md w-full mt-2 focus:outline-none" />
                </div>
                <div className="">
                    <div className="flex items-center gap-x-2">
                    <Gamepad2 className="h-8 w-8 opacity-70" />
                    <h2 className="font-medium">Discord</h2>
                    </div>
                    <input 
                    type="text"
                    placeholder="https://discord.com"
                    value={discord}
                    onChange={(e) => setDiscord(e.target.value) }
                    className="p-2 mt-2 border rounded-lg w-full focus:outline-none" />
                </div>
            </div>
        )}
        { step == 7 && (
            <div className="space-y-10">
                <h2 className="text-4xl font-bold tracking-tight">Review and submit</h2>
                <p className="text-xl font-light leading-8">Review the details of your product and submit it to the world.
            Your product will be reviewed by our team before it goes live.</p>
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <div className="font-medium">Name of the product</div>
                    <div className="text-gray-600 mt-2">{name}</div>
                </div>
                <div>
                    <div className="font-medium">Slug (URL)</div>
                    <div className="text-gray-600 mt-2">{slug}</div>
                </div>
                <div>
                    <div className="font-medium">Category</div>
                    <div className="flex gap-x-2 mt-2 items-center ">
                    {selectedCategories.map((item,idx) => (
                        <div className="text-gray-600" key={idx}>{item}</div>
                    ))}
                    </div>
                </div>
                <div>
                    <div className="font-medium">Website URL</div>
                    <div className="text-gray-600 mt-2">{website}</div>
                </div>
                <div>
                    <div className="font-medium">Headline</div>
                    <div className="text-gray-600 mt-2">{headline}</div>
                </div>
                <div>
                    <div className="font-medium">Description</div>
                    <div className="text-gray-600 mt-2">{description}</div> 
                </div>
                <div>
                    <div className="font-medium">Twitter</div>
                    <div className="text-gray-600 mt-2">{twitter}</div>
                </div>
                <div>
                    <div className="font-medium">Discord</div>
                    <div className="text-gray-600 mt-2 ">{discord}</div>
                </div>
                <div>
                    <div className="font-medium">Release Date</div>
                    <div className="text-gray-600 mt-2">{date ? date.toDateString() : "not specified"}</div> 
                </div>
                <div>
                    <div className="font-medium">Product Images</div>
                    <div className="flex gap-x-2 max-w-max mt-2 items-center">
                        {uploadedImagesUrl.map((img,idx) => (
                            <Image
                            src={img}
                            objectFit="cover"
                            key={idx}
                            alt="product image"
                             width={800}
                             height={800}
                            className="rounded-md h-24 w-24" />
                        ))}
                    </div>
                </div>
                </div>
            </div>
        ) }

        {step == 8 && (
            <div className="space-y-10">
                <div className="text-4xl font-semibold tracking-tight">Congratulations</div>
                <p className="text-xl font-light leading-8">
                    Your product has been successfully submitted. Our team will 
                    review it and get back to you soon.
                </p>
                <div className="flex flex-col gap-4">
                    <div 
                    onClick={() => window.location.href="/my-product"}
                    className="bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center">
                        Go to your product
                    </div>
                    <Separator />
                    <div
                    onClick={SubmitAnotherProduct} 
                    className="text-red-600 cursor-pointer hover:text-red-400">
                        Submit another product
                    </div>
                </div>
            </div>
        )}
        { step !== 8 && (
            <div className="flex mt-10 items-center justify-between">
                {step !== 1 && (
                    <button onClick={prevStep}>
                        Previous
                    </button>
                )}
                <div>
                    {step === 7 
                    ? <button onClick={HanldeSubmitAction} className="bg-red-600 py-2 rounded-full px-4 text-white hover:bg-red-400 ">Submit</button>
                     : <button onClick={nextStep} className="bg-red-600 py-2 px-4 text-white rounded-full hover:bg-red-400">Next</button>}
                </div>
            </div>
        )}
        </div>
    </div>
    )
}

export default NewProduct