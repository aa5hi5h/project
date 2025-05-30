"use client"
import { CheckCheck, Copy } from "lucide-react"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard";

interface ShareModalProp{
    currentProduct: any
}

export const ShareModalContent: React.FC<ShareModalProp> = ({currentProduct}) => {

    const [copiedText, setCopiedText] = useState("")
    const [isCopied,setIsCopied] = useState<boolean>(false)

    const urlPrefix = 'http://localhost:3000/product/'

    useEffect(() => {
        if(currentProduct && currentProduct.slug){
            setCopiedText(urlPrefix + currentProduct.slug)
        }
    },[currentProduct])

    const HandleDiscordClick = () => {
        if(currentProduct && currentProduct.discord){
            window.open(currentProduct.discord,"_blank")
        }
    }

    const HandleTwitterClick = () => {
        if(currentProduct && currentProduct.twitter){
            window.open(currentProduct.twitter,"_blank")
        }
    }


    return (
        <div>
            <Image 
            src={currentProduct.logo}
            width={200}
            height={200}
            alt="logo"
            className="h-24 w-28 shadow-md bg-white border round-md" />
            <div className="py-4">
                <h1 className="text-2xl font-semibold">Share this product</h1>
                <p className="text-gray-600">stay connet by following the products on the socials</p>

                <div className="flex gap-4 pt-4">
                    <button onClick={HandleDiscordClick} className="bg-indigo-300 text-white rounded-xl w-1/2">
                    Discord
                    </button>
                    <button onClick={HandleTwitterClick} className="bg-indigo-200 text-whtie rounded-xl w-1/2">
                    twitter
                    </button>
                </div>
                
                <h1 className="pt-6 font-semibold">Copy Link</h1>
                <div className="mt-2 flex justify-center p-2 rounded-md border">
                    <input 
                    readOnly
                    value={copiedText}
                    className="text-sm md:text-md focus:outline-none w-full rounded-md" />
                    {
                        isCopied ? (
                            <button className="bg-[#3daf64] text-white p-2 rounded-md hover:scale-105">
                                <CheckCheck />
                            </button>
                        ) : (
                             <CopyToClipboard text={copiedText} onCopy={() => setIsCopied(true)}>
              <button className="bg-[#ff6154] text-white p-2 rounded-md hover:scale-105">
                <Copy className="text-white" />
              </button>
            </CopyToClipboard>
                        )
                    }
                </div>
            </div>
        </div>
    )
}