import Navbar from "@/components/navbar/navbar"
import { auth } from "../../../auth"


const HomeLayout = async ({children}: {children:React.ReactNode}) => {

    const authenticatedUser = await auth()

    return (
        <div>
            <Navbar  user={authenticatedUser} />
            {children}
        </div>
    )
}

export default HomeLayout