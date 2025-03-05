import Topbar from "@/components/ui/Topbar"
import { useMusicStore } from "@/store/UseMusicStore"
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";


const Homepage = () => {
    const {fetchfeaturedSongs, fetchmadeForYou, fetchtrendingSongs, 
        isLoading,trendingSongs,madeForYou,featuredSongs} = useMusicStore();

        useEffect(() => {
            fetchfeaturedSongs();
            fetchmadeForYou();
            fetchtrendingSongs();
        }, [fetchfeaturedSongs,fetchmadeForYou,fetchtrendingSongs])

        console.log({isLoading,madeForYou,featuredSongs,trendingSongs})
    return (
        <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
            <Topbar />
            <ScrollArea className="h-[calc(100vh-180px)]">
                <div className="p-4 sm:p-6">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-6">Good afternoon</h1>
                    <FeaturedSection /> 
                

                    <div className="space-y-8">
                        <SectionGrid title="Made For You" songs={madeForYou} isLoading={isLoading} />
                        <SectionGrid title="Trending" songs={trendingSongs} isLoading={isLoading}/>
                    </div>
                </div>
            </ScrollArea>
        </main>
    )
}

export default Homepage