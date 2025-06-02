import Navbar from "@/components/navbar/navbar";
import React from "react";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { getNotifications } from "@/lib/server-action";



const AuthHomeLayout = async({children}:{children:React.ReactNode}) => {

    const authenticatedUser = await auth()

    if(!authenticatedUser){
        redirect("/")
    }

    const notifications = await getNotifications()

    return(
        <div>
            <Navbar user={authenticatedUser}
            notifications = {notifications} />
            {children}
        </div>
    )
}


export default AuthHomeLayout