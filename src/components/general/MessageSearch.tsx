import { useState } from "react";


type Props = {}

const MessageSearch = (props: Props) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const labels = ["All", "People", "Group", "Messages"];



    return (
        <div className="flex">
            {labels.map((label, index) => (
                <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-[20%] flex items-center justify-center cursor-pointer hover:bg-gray-500 hover:bg-opacity-20`}
                >
                    <p className={`dark:text-gray-500 text-opacity-20 py-3 ${activeIndex === index ? 'border-b-4 border-blue-500 dark:text-neutral-300' : ''}`}>{label}</p>
                </button>
            ))}
        </div>
    )
}

export default MessageSearch