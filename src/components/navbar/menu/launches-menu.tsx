

const items = [
    {
        icon: "🗓️",
        title: "Coming Soon",
        description:"Checkout launches that are coming soon"
    },
    {
        icon: "❓",
        title: "Product Question",
        description:"Anwer the most intresting questions"
    },
    {
        icon:"🔮",
        title:"Launch Archive",
        description:"Most loved launches by the community"
    },
    {
        icon:"📰",
        title:"Newslatter",
        description:"the best of bird by launches"
    }
]

export const LaunchesMenu = () => {

    return (
        <div className="absolute top-full border border-gray-300 bg-white text-gray-600 rounded-sm shadow-sm">
            <div className="flex p-4">
                <div className="flex flex-col items-start space-y-3">
                    {items.map((item,idx) => (
                        <div key={idx} className="flex items-center space-x-6">
                            <div className="bg-white p-1 shadow-sm rounded-sm">{item.icon}</div>
                            <div className="flex flex-col items-start">
                                <div className="font-semibold">{item.title}</div>
                                <div className="text-xs ">{item.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}