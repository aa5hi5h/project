import { createUploadthing } from "uploadthing/next";



const f = createUploadthing()

export const ourFileRouter = {
    productLogo: f({image:{maxFileSize:"4MB",maxFileCount:1}})
    .middleware(async({req}) => {
        return {...req}
    })
    .onUploadComplete(() => {
        console.log("product images uploaded successfully")
    }),

    productImages: f({image:{maxFileCount:5,maxFileSize:'4MB'}})
    .middleware(async({req}) => {
        return {...req}
    })
    .onUploadComplete(() => {
        console.log("Product Images successfully")
    })
}

export type OurFileRouter = typeof ourFileRouter