import { Badge } from "@/components/ui/badge"
import { getProductById } from "@/lib/server-action"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { EditProduct } from "../EditProduct"
import { DeleteProduct } from "../DeleteProduct"


interface ProductIdParams{
    id: string
}

const ProductIdPage  = async({params}:{params:ProductIdParams}) => {

    const {id} = await params
    
    const product = await getProductById(id)

    if(!product){
    return <div>There is no product found </div>
    }

    
    return (
        <div className="md:w-4/5 mx-auto px-6 md:px-0 py-10">
            <Link href={"/my-product"} className="flex items-center gap-x-2 " >
            <ArrowLeft />
            <div>Back</div>
            </Link>
            <div className="flex mt-4 items-center justify-between py-4">
                <div className="flex items-center  gap-x-4">
                    <div className="flex items-center gap-x-4">
                    <Image 
                    width={500}
                    height={500}
                    src={product.logo}
                    alt="prodcut logo"
                    className="h-20 w-20 md:h-40 md:w-40 border rounded-xl"
                    />
                    </div>
                    <div>
                        <h2 className="text-3xl font-medium">{product.name}</h2>
                        <p className="text-gray-600">{product.website}</p>
                        { product.status === "PENDING" && (
                            <Badge className="bg-yellow-500">Pending</Badge>
                        )}
                        {product.status === "ACTIVE" && (
                            <Badge className="bg-green-500">Active</Badge>
                        )}
                        {product.status === "REJECTED" && (
                            <Badge className="bg-red-500">Recjected</Badge>
                        )
                        }
                    </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <EditProduct product={product} />
                        <DeleteProduct productId={product.id} />
                    </div>

                </div>
            </div>
    )
}

export default ProductIdPage