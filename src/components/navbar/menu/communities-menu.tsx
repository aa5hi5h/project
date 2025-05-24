

const items = [
    {
        icon: "🎙️",
        title: "Discussion",
        description:"checkout the launches that are  comin soon"
    },
    {
        icon:"✏️",
        title:"Stories",
        description:"Tech news, interviews and tips from makers"
    },
    {
        icon:"💯",
        title:"Visit Streaks",
        description:"The most active community"
    }

]

export const CommunitiesMenu = () => {

    return (
        <div className="border border-gray-300 bg-white rounded-sm shadow-md top-full absolute  text-gray-600 ">
            <div className="flex p-4">
                <div className="flex flex-col items-start space-y-3">
                    {items.map((item,idx) => (
                        <div key={idx} className="flex items-center space-x-6">
                            <div className="p-1 bg-white rounded-sm shadow-sm">{item.icon}</div>
                            <div className="flex flex-col items-start">
                                <div className="font-semibold">{item.title}</div>
                                <div className="text-xs w-60">{item.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}