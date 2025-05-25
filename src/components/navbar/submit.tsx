import Link from "next/link"



export const Submit = () => {

    return (
        <Link href={"/new-product"} className="text-gray-600 py-2 hover:text-red-400">submit</Link>
    )
}