import {Song} from "../models/song.model.js"
import {Album} from "../models/ablum.model.js"
import cloudinary from "../lib/cloudinary.js"


// helper function for cloudinary uploads
const uploadToClouduinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto",
        })
        return result.secure_url
    } catch (error) {
        console.log("Error in upload to Cloudianry", error);
        throw new Error("Error uploading to cloudinary");
    }
}








export const createSong = async (req,res, next) => {
    try {
        if (!req.files || !req.files.audioFile){
            return res.status(400).json({message: "Please upload all files"})
        }

        const {title,artist,albumId,duration} =req.body
        const audioFile = req.files.audioFile
        const imageFile = req.files.imageFile

        const audioUrl = await uploadToClouduinary(audioFile);
        const imageUrl = await uploadToClouduinary(imageFile);


        // Create song in the database
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
        next(error);
    }
}