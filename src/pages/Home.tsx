import { MainContent } from "../components/general/MainContent";
import { RightPanel } from "../components/general/RightPanel";
import SideBar from "../components/general/SideBar";

export default function Home() {
    return (
        <div className="flex flex-row w-full min-h-screen container mx-auto">
            <SideBar />
            <MainContent />
            <RightPanel />
        </div>
    )
}