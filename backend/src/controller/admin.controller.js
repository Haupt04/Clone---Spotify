import {Song} from "../models/song.model.js"
import {Album} from "../models/album.model.js"
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

export const deleteSong = async (req, res, next) => {
	try {
		const { id } = req.params;

		const song = await Song.findById(id);

		// if song belongs to an album, update the album's songs array
		if (song.albumId) {
			await Album.findByIdAndUpdate(song.albumId, {
				$pull: { songs: song._id },
			});
		}

		await Song.findByIdAndDelete(id);

		res.status(200).json({ message: "Song deleted successfully" });
	} catch (error) {
		console.log("Error in deleteSong", error);
		next(error);
	}
};

export const createAlbum = async (req,res,next) => {
    try {
        const {title, artist, releaseYear } = req.body
        const {imageFile} = req.files

        const imageUrl = await uploadToClouduinary(imageFile)

        const album = new Album({
            title,
            artist,
            imageUrl,
            releaseYear
        })

        res.status(201).json(album)

    } catch (error){
        console.log("Error creating a ablum", error)
        next(error)
    }
}

export const deleteAlbum = async (req,res,next) => {
    try {
        const { id } = req.params;
        await Song.deleteMany({albumId: id })
        await Album.findByIdAndDelete(id);
        res.status(200).json({message: 'Ablum deleted successfully'})
    } catch (error){
        console.log("Error in deleting album", error)
        next(error)
    }
}


export const checkAdmin = async (req,res,next) => {
    res.status(200).json({admin:true})
}