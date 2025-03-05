import { axiosInstance } from '@/lib/axios';
import { Album, Song } from '@/types';
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