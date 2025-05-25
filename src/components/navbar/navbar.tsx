"use client"
import { useState } from "react"
import Logo from "./logo"
import { Menu } from "./menu"
import { SearchBar } from "./search-bar"
import { SignInButton } from "./sign-in-button"
import { SignUpButton } from "./sign-up-button"
import Modal from "../ui/modals/modal"
import { AuthContent } from "./auth-content"
import { Avatar } from "./avatar"
import { Notification } from "./notification"
import { Submit } from "./submit"

interface NavbarProp{
    user: any
}

const Navbar = ({user}:NavbarProp) => {

    const [authVisible,setAuthVisible] = useState<boolean>(false)

    const handleButtonClick = () => {
        return setAuthVisible(true)
    }

    return (
        <div className="border py-2 md:py-0 px-4 md:px-6">
        <div className="flex  items-center  justify-between p-2">
            <div className="flex items-center">
            <Logo />
            <SearchBar />
            </div>
            <div className="flex absolute right-1/2 translate-x-1/2 transform">
            <Menu /> 
            </div>
            {
                user ? 
                <div className="flex space-x-6">
                    <Submit />
                    <Notification />
                    <Avatar authenticatedUser={user} /></div> :

                <div
            onClick={handleButtonClick}
            className="flex items-center space-x-6 text-sm cursor-pointer">
                <SignInButton />
                <SignUpButton />
            </div>
            }
            </div>
            <Modal visible={authVisible} setVisible={setAuthVisible}>
                <AuthContent />
                </Modal>
        </div>
    )
}

export default Navbar