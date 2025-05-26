import Navbar from "@/components/navbar/navbar";
import React from "react";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";



const AuthHomeLayout = async({children}:{children:React.ReactNode}) => {

    const authenticatedUser = await auth()

    if(!authenticatedUser){
        redirect("/")
    }

    return(
        <div>
            <Navbar user={authenticatedUser} />
            {children}
        </div>
    )
}


export default AuthHomeLayout