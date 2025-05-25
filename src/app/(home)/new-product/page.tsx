"use client"
import {  useCallback, useState } from "react"


const NewProduct = () => {

    const [step,setStep] = useState<number>(1)
    const [name,setName] = useState<string>("")
    const [slug ,setSlug] = useState<string>("")

    const handleNameChange = (e:any) => {
        const productName = e.target.value
        const truncatedName = productName.slice(0,30)
        setName(truncatedName)

        const slugValue = truncatedName.toLowerCase()
        .replace(/\s+/g,"-")
        .replace(/\./g,"-")
        setSlug(slugValue)
    }


    const nextStep = useCallback(() => {
        setStep(step + 1 )
    },[])


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
                    <div>{name.length}/30</div>
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
        <button onClick={nextStep} className=" mt-10 bg-[#ff6154] text-white py-2 px-4 rounded-full">
            Continue
        </button>
        </div>
    </div>
    )
}

export default NewProduct