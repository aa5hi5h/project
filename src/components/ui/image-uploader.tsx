import { ourFileRouter } from "@/app/api/uploadthing/core"
import { UploadDropzone } from "@/lib/uploadthing"
import { toast } from "sonner"


interface ImageUploaderProps{
    onChange: (urls: string[]) => void
    endpoint: keyof typeof ourFileRouter
}

export const ImageUploader = ({onChange,endpoint}:ImageUploaderProps) => {

    const handleChangeEvent = (res:{url:string}[]) => {
        const urls = res.map((img) => img.url)
        onChange(urls)
    }



    return (
        <UploadDropzone 
        endpoint={endpoint}
        onClientUploadComplete={handleChangeEvent}
        onUploadError={(error:Error) => {
            toast(error.message,{position:"top-center"})
        }} />
    )
}