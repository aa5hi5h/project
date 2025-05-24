"use client"
import Link from "next/link"
import { useState } from "react"
import { LaunchesMenu } from "./menu/launches-menu"
import { CommunitiesMenu } from "./menu/communities-menu"
import { AboutMenu } from "./menu/about-menu"


export const Menu = () => {

    const [showLaunchesMenu,setShowLaunchesMenu] = useState<boolean>(false)
    const [showCommunitiesMenu,setShowCommunitiesMenu] = useState<boolean>(false)
    const [showAboutMenu,setShowAboutMenu] = useState<boolean>(false)



    return (
        <div className="hidden lg:flex item-center relative ">
        <div className="flex  items-center text-sm text-gray-600 space-x-6">
            <div 
            onMouseEnter={() => setShowLaunchesMenu(true)}
            onMouseLeave={() => setShowLaunchesMenu(false)}
            className="hover:text-red-600 py-4 cursor-pointer">Launches {showLaunchesMenu && <LaunchesMenu />}</div>
            <Link href={"/categories"} className="hover:text-red-600 cursor-pointer">Categories</Link>
            <div 
            onMouseEnter={() => setShowCommunitiesMenu(true)}
            onMouseLeave={() => setShowCommunitiesMenu(false)}
            className="hover:text-red-600 py-4 cursor-pointer">Communities {showCommunitiesMenu && <CommunitiesMenu />}</div>
            <Link href={"/advertise"} className="hover:text-red-600 cursor-pointer">Advertise</Link>
            <div 
            onMouseEnter={() => setShowAboutMenu(true)}
            onMouseLeave={() => setShowAboutMenu(false)}
            className="hover:text-red-600 py-4 cursor-pointer">About {showAboutMenu && <AboutMenu />}</div>
        </div>
        </div>
    )
}