import { axiosInstance } from '@/lib/axios';
import { Album, Song, Stats } from '@/types';
import toast from 'react-hot-toast';
import {create} from 'zustand';

interface MusicStore {
    songs: Song[];
    albums: Album[];
    isLoading:boolean;
    error:string | null;
    currentAlbum: Album | null;
    madeForYou: Song[];
    featuredSongs: Song[];
    trendingSongs: Song[];

    fetchAlbums: () => Promise<void>;
    fetchAlbumById: (id:string) => Promise<void>;
    fetchfeaturedSongs: () => Promise<void>;
    fetchmadeForYou: () => Promise<void>;
    fetchtrendingSongs: () => Promise<void>;
    fetchStats: () => Promise<void>;
    fetchSongs: () => Promise<void>;
    stats: Stats;
    deleteSong: (id:string) => Promise<void>;
    deleteAlbum: (id: string) => Promise<void>;


}

export const useMusicStore = create<MusicStore>((set) => ({
    albums: [],
    songs: [],
    isLoading: false,
    error:null,
    currentAlbum: null,
    madeForYou: [],
    featuredSongs: [],
    trendingSongs: [],
    stats: {
        totalSongs:0,
        totalAlbums:0,
        totalUsers:0,
        totalArtists:0,
    },

    deleteSong: async (id) => {
        set({isLoading:true, error:null})
        try {
            await axiosInstance.delete(`/admin/songs/${id}`)

            set((state) => ({
                songs: state.songs.filter((song) => song._id !== id)
            }))
            toast.success("Song deleted successfully")
        } catch (error: any){
            console.log("Error deleting song", error)
            toast.error("Error deleting song")
        } finally {
            set({isLoading:false})
        }
    },
    deleteAlbum: async (id) => {
        set({isLoading:true, error:null})
        try {
            await axiosInstance.delete(`/admin/albums/${id}`)

            set((state) => ({
               albums: state.albums.filter((album) => album._id !== id),
               songs: state.songs.map((song) => (
                song.albumId === state.albums.find((a) => a._id === id)?.title ? {...song,album : null} : song
               ))
            }))
            toast.success("Album deleted successfully")
        } catch (error: any){
            console.log("Error deleting songs and album", error.message)
            toast.error("Error deleting album")
        } finally {
            set({isLoading:false})
        }
    },

    fetchSongs: async () => {
        set({isLoading:true, error:null})
        try {
            const response = await axiosInstance.get("/songs");
            set({songs: response.data})
        } catch (error:any){
            set({error: error.message})
        } finally {
            set({isLoading:false})
        }
    },

    fetchStats: async () => {
        set({isLoading:true, error:null})
        try {
            const response = await axiosInstance.get("/stats");
            set({stats: response.data})
        } catch (error:any){
            set({error: error.message})
        } finally {
            set({isLoading:false})
        }
    },

    fetchAlbums: async () => {
        set({
            isLoading: true,
            error:null
        })
       try{
        const response = await axiosInstance.get("/albums");
        set({
            albums:response.data
        })
       } catch (error){
        set({
            error: error.response.data.message
        })

       } finally {
        set({isLoading:false})
       }
    },

    fetchAlbumById: async (id:string) => {
        set({ isLoading:true, error:null})
        try {
            const response = await axiosInstance.get(`albums/${id}`)
            set({
                currentAlbum: response.data
            })
        } catch (error:any){
            set({error:error.response.data.message})
        } finally {
            set({isLoading:false})
        }
    },

    fetchfeaturedSongs: async() => {
        set({isLoading:true, error:null});
        try {
            const response = await axiosInstance.get("/songs/featured");
            set({featuredSongs: response.data})
        } catch (error: any){
            set({error: error.response.data.message})
        } finally {
            set({isLoading: false})
        }
    },
    fetchtrendingSongs: async() => {
        set({isLoading:true, error:null});
        try {
            const response = await axiosInstance.get("/songs/made-for-you");
            set({trendingSongs: response.data})
        } catch (error: any){
            set({error: error.response.data.message})
        } finally {
            set({isLoading: false})
        }
    },
    fetchmadeForYou: async() => {
        set({isLoading:true, error:null});
        try {
            const response = await axiosInstance.get("/songs/trending");
            set({madeForYou: response.data})
        } catch (error: any){
            set({error: error.response.data.message})
        } finally {
            set({isLoading: false})
        }
    },

}))