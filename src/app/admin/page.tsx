import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Bell, Settings2 } from "lucide-react"
import Link from "next/link"
import PendingProducts from "./pending-products"
import { auth } from "../../../auth"
import { getPendingProducts } from "@/lib/server-action"


const AdminPage = async() => {

    const pendingProducts = await getPendingProducts()
    const authenticatedUser = await auth()

    return (
        <div className="px-8 md:px-20">
            <div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-x-6">
                    <div className="flex gap-x-6 items-center py-10">
                        <Link href={"/"}>
                        <div>Logo</div>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <h1 className="text-3xl font-medium">Welcome back admin</h1>
                        <p>here is what&apos;s happening in your buissness today</p>
                    </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Bell className="text-gray-500" />
                        <Settings2 className="text-gray-500" />
                    </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 mt-4 md:mt-8 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-md font-bold">Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                            0 
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-md font-bold">Premium Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                            0 
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                            <CardTitle className="text-md font-bold">Active Products</CardTitle>
                        </CardHeader>
                        <CardContent>
                            0 
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-md font-bold">Pending Products</CardTitle>
                        </CardHeader>
                        <CardContent>
                            0
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-md font-bold">Rejected Products</CardTitle>
                        </CardHeader>
                        <CardContent>
                            0
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                            <CardTitle className="text-md font-bold">Upvotes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            0
                        </CardContent>
                    </Card>
                </div>
                <Separator className="my-10" />
                <div className="pb-10 space-y-10">
                    <div className="text-2xl font-bold ">Pending Products</div>
                    <PendingProducts pendingProducts={pendingProducts} authenticatedUser={authenticatedUser} />
                </div>
            </div>
            
        </div>
    )
}

export default AdminPage