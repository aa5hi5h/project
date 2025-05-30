"use server"

import { auth } from "../../auth"
import { db } from "./db"

interface ProductData{
    name: string
    slug: string
    description: string
    headline: string
    website: string
    twitter: string
    discord: string
    logo: string
    releaseDate: string
    categories: string[]
    images: string[]
}

export const createProduct = async({
    name,
    slug,
    logo,
    releaseDate,
    twitter,
    discord,
    website,
    images,
    categories,
    headline,
    description
}:ProductData):Promise<any> => {
    try{
        const authenticatedUser = await auth()

        if(!authenticatedUser){
            throw new Error("You are not authenticated ")
        }

        const userId = authenticatedUser.user?.id

        const product = await db.product.create({
            data:{
                name,
                headline,
                description,
                slug,
                logo,
                releaseDate,
                twitter,
                website,
                discord,
                images: {
                    createMany:{
                        data: images.map((image) => ({url:image}))
                    }
                },
                categories:{
                    connectOrCreate: categories.map((name) => ({
                        where:{name},
                        create:{
                            name
                        }
                    }))
                },
                user:{
                    connect:{
                        id: userId
                    }
                }
            }
        })

        return product
    }catch(error){
        console.log(error)
        return null
    }
}

export const getProducts = async() => {


    const authenticatedUser = await auth()

    if(!authenticatedUser){
        throw new Error("User is not logged in")
    }

    const userId = authenticatedUser.user?.id

    const products = await db.product.findMany({
        where:{
            userId
        }
    })

    return products

}

export const updateProduct = async(productId:string,{
    name,
    slug,
    headline,
    description,
    twitter,
    discord,
    website,
    releaseDate,
    logo,
    images
}:ProductData) => {

    const authenticatedUser = await auth()

    if(!authenticatedUser){
        throw new Error("You need to be authenticated before updating product details")
    }

    const product = await db.product.findUnique({
        where:{
            id:productId
        }
    })
    if(!product){
        throw new Error("Product not found")
    }

    const updatedProduct = await db.product.update({
        where:{
            id:productId
        },
        data:{
            name,
            slug,
            headline,
            description,
            twitter,
            discord,
            website,
            releaseDate,
            logo,
            images:{
                deleteMany:{
                    productId
                },
                createMany:{
                    data: images.map((image) => ({url:image}))
                }
            },
            status:"PENDING"
        }
    });
    return updatedProduct
}

export const deleteProduct = async(productId:string) => {
    
    const authenticatedUser = await auth()

    if(!authenticatedUser || !authenticatedUser.user || !authenticatedUser.user.id){
        throw new Error("You need to be authenticated to perform this action")
    }


    const product = await db.product.findUnique({
        where:{
            id: productId
        }
    })

    if(!product || product.userId !== authenticatedUser.user.id){
        throw new Error("There is no such product you want to delete")
    }

    await db.product.delete({
        where:{
            id:productId
        },
        include:{
            images:true
        }
    })

    return true


}


export const getProductById = async(productId:string) => {
    try{
        const product = await db.product.findUnique({
            where:{
                id:productId
            },
            include:{
                categories: true,
                images: true
            }
        })

        return product
    }catch(error){
        console.log("ERROR::::",error)
        return null
    }
}

export const getPendingProducts = async() => {
    const products = await db.product.findMany({
        where:{
            status:"PENDING"
        },
        include:{
            images:true,
            categories:true
        }
    })
    return products
}

export const activateProduct = async(productId:string) => {

    const product = await db.product.findUnique({
        where:{
            id:productId
        }
    })

    if(!product){
        throw new Error("Product not found")
    }

    await db.product.update({
        where:{
            id:productId
        },
        data:{
            status: "ACTIVE"
        }
    })

    await db.notification.create({
        data:{
            userId: product.userId,
            body:  `Your product ${product.name} has been activated`,
            profilePicture: product.logo,
            productId: product.id,
            type: "ACTIVATED",
            status: "UNREAD"

        }
    })
    return product
}