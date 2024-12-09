import { ElementType } from "react";
import { LuChevronRight } from "react-icons/lu"

type AccountProps = {
    Icon: ElementType;
    title: string;
    subtitle: string;
}

const Account = ({ Icon, title, subtitle }: AccountProps) => {
    return (
        <div className={`px-3 py-5 cursor-pointer flex items-center justify-between hover:bg-gray-500 hover:bg-opacity-20`}>
            <div className="flex items-center gap-8 ps-6">
                <Icon />

                <div>
                    <p className="dark:text-white font-lg">{title}</p>
                    <p className="dark:text-dark-text text-xs font-semibold">{subtitle}</p>
                </div>
            </div>

            <LuChevronRight className="text-xl text-dark-text stroke-2" />
        </div>
    )
}

export default Account