import { getProducts } from "@/lib/server-action"
import { Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"


const MyProduct = async() => {

    const products = await getProducts()

    return (
        <div className="mx-auto lg:w-3/5 py-10 px-6">
            {products.length === 0  ? (
                <div>
                    <h1 className="text-3xl font-bold">No product found</h1>
                    <p className="text-gray-600">Looks like you have not created any products yet , click 
                        on the below button to get started
                    </p>
                    <Link href="/new-product">
                    <div className="flex flex-col mt-4 p-4 rounded-xl items-center justify-center bg-red-500 w-60 h-56 text-white">
                        <Plus className="text-3xl mb-4" />
                        <div>Create a product</div>
                    </div>
                    </Link>
                </div>
            ) : (
                <div>
                    <h1 className="text-3xl font-bold">Your products</h1>
                    <p className="text-gray-600">Manage your products here</p>
                    <div className="grid grid-cols-2 lg:grid-cols-5 mt-10 gap-4">
                        {products.map((product,idx) => (
                            <Link href={`/edit/${product.id}`} key={idx}>
                                <div>
                                    <div className="rounded-xl hover:scale-105 transition-transform
                                    justify-center items-center  border ease-in-out duration-300 transform">
                                        <Image
                                        height={1000}
                                        width={1000}
                                        src={product.logo}
                                        alt="product logo"
                                        className="h-36 w-full rounded-xl object-cover" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default MyProduct