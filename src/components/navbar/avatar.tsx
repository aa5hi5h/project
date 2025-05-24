import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Heart, Settings, ShoppingBag } from "lucide-react"
import { signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

interface AvatarProp{
    authenticatedUser:any
}

export const Avatar = ({authenticatedUser}:AvatarProp) => {

    const handleUpvoteClick = () => {
        window.location.href ="/my-upvote"
    }

    return (
        <DropdownMenu>
  <DropdownMenuTrigger className="focus:outline-none">
    <Image
    src={authenticatedUser.user.image}
    className="border rounded-full h-8 w-8"
    width={50}
    height={50}
    alt="avatar" />
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-40 space-y-1 p-2 text-gray-600">
    <DropdownMenuItem>
        <Link href={"/my-product"} className="flex items-center gap-x-2 rounded-sm w-full cursor-pointer">
        <ShoppingBag size={16} />
        My Product
        </Link>
    </DropdownMenuItem>
    <DropdownMenuItem>
        <div onClick={handleUpvoteClick} className="flex items-center gap-x-2 rounded-sm w-full cursor-pointer">
            <Heart size={16} />
            Upvoted
        </div>
    </DropdownMenuItem>
    <DropdownMenuItem>
        <div className="flex items-center gap-x-2 rounded-sm w-full cursor-pointer">
            <Settings size={16} />
          Setting
        </div>
    </DropdownMenuItem>
    <DropdownMenuItem>
        <div onClick={() => signOut()}>
            Log out
        </div>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

    )
}