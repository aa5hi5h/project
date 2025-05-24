

const items =[
    {title:"About Us"},
    {title:"Carrers"},
    {title:"Apps"},
    {title:'FAQs'},
    {title:"Legal"}
]

export const AboutMenu = () => {

    return (
        <div className="bg-white border border-gray-300 absolute top-full text-gray-600 rounded-sm shadow-md ">
            <div className="flex p-4">
                <div className="flex flex-col space-y-3">
                    {items.map((item,idx) => (
                        <div key={idx} className="font-semibold w-20">
                            {item.title}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
