import {Song} from "../models/song.model.js"
import {Album} from "../models/ablum.model.js"


export const createSong = async (req,res) => {
    try {
        if (!req.files || !req.files.audioFile){
            return res.status(400).json({message: "Please upload all files"})
        }

        const {title,artist,albumId,duration} =req.body
        const audioFile = req.files.audioFile
        const imageFile = req.files.imageFile

        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            ablumId: albumId || null
        })

        await song.save()

        // If song belongs to a album, update the album songs array
        if (albumId) {
            await Album.findByIdAndUpdate(albumId, {
                $push: {songs:song_id}
            })
        }

        res.status(201).json(song)
    } catch (error) {
        console.log("Error in creating song", error)
        res.status(500).json({message: "Internal server error", error})
    }
}