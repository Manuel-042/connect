import { LuChevronRight } from "react-icons/lu";

type SettingProps = {
  name: string;
  onClick: (name: string) => void;
  active: boolean;
}

const Setting = ({name, onClick, active}: SettingProps) => {
  return (
    <div onClick={() => onClick(name)} className={`px-3 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-500 hover:bg-opacity-20 ${active && 'bg-gray-500 bg-opacity-20 border-r-4 border-secondary'}`}>
        <p>{name}</p>
        <LuChevronRight className="text-xl text-dark-text stroke-2"/>
    </div>
  )
}

export default Setting