import { RectangleGogglesIcon } from "lucide-react"
import { signIn } from "next-auth/react"


export const AuthContent = () => {
    return (
        <div className="flex flex-col items-center text-center">
            <div className="text-2xl font-semibold py-4">See What&apos;s new in the tech</div>
            <div className="text-sm mx-auto w-4/5 text-gray-600 ">
                Join our community of friendly folks discovering 
                and sharing the latest product in tech
            </div>
            
            <button 
            onClick={() => signIn("google")}
            className="border rounded-md bg-emerald-200 hover:opacity-80  px-10 py-2 mt-4">
                sign in with Google
            </button>
            <button 
            onClick={() => signIn("github")}
            className="border rounded-md bg-purple-200 hover:opacity-80 px-10 py-2 mt-4 ">
                sign in with Github
            </button>
        </div>
    )
}