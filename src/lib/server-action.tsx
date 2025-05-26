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
