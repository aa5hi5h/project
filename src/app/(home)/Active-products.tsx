import { ProductItem } from "./Product-item"

interface activeProductProps{
    activateProduct: any,
    authenticatedUser: any
}

export const ActiveProducts: React.FC<activeProductProps> = ({
    activateProduct,
    authenticatedUser
}) => {

    const formatedActiveProducts = activateProduct.map((product:any) => {
        const {
            id,
            name,
            slug,
            headline,
            description,
            logo,
            releaseDate,
            website,
            twitter,
            discord,
            createdAt,
            updatedAt,
            userId,
            status,
            images,
            categories
        } = product

        const imagesUrl = images.map((image:any) => image.url)
        const categoriesName = categories.map((categories:any) => categories.name)

        return {
             id,
            name,
            slug,
            headline,
            description,
            logo,
            releaseDate,
            website,
            twitter,
            discord,
            createdAt,
            updatedAt,
            userId,
            status,
            images: imagesUrl,
            categories: categoriesName
        }
    })

    return (
        <div className="w-full">
            <div className="flex items-center border-b pb-3">
                <h1 className="text-xl font-bold tracking-tight">All Products</h1>
            </div>
            <div className="flex flex-col py-6 space-y-2">
                {formatedActiveProducts.map((product:any,idx:any) => 
                <ProductItem
                key={idx}
                product={product}
                authenticatedUser={authenticatedUser}
                 /> )}
            </div>
        </div>
    )
}