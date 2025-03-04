import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar";

const MainLayout = () => {
    const isMoble = false;

    return (
    <div className="h-screen bg-black text-white flex flex-col">

        <ResizablePanelGroup direction="horizontal" className="flex-1 flex h-full overflow-hidden p-2">
            {/* Left side  */}
            <ResizablePanel defaultSize={20} minSize={isMoble ? 0 : 10} maxSize={30}>
                <LeftSidebar />
            </ResizablePanel>

            <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

            {/* Main Content  */}
            <ResizablePanel defaultSize={isMoble ? 80 : 60}>
                <Outlet />
            </ResizablePanel>

            <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

             {/* Right side  */}
             <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
                right side bar - friends activity
            </ResizablePanel>

        </ResizablePanelGroup>

    </div>
    )

}

export default MainLayout;