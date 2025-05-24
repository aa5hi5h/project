import { Search } from "lucide-react"


export const SearchBar = () => {
  
    return (
        <div className="rounded-full ml-4 flex items-center  bg-emerald-100 py-1 relative">
            <Search className="ml-1 p-1" />
            <input 
            type="text"
            placeholder="search"
            className="bg-emerald-100 rounded-full focus:outline-none text-sm " />
        </div>
    )
}