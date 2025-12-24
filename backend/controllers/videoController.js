const Video = require('../models/Video');

// Upload video and save metadata
exports.uploadVideo = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { originalname, mimetype, size, filename, path } = req.file;

        const newVideo = new Video({
            filename,
            originalName: originalname,
            contentType: mimetype,
            size,
            path: path
        });

        await newVideo.save();

        res.status(201).json({
            message: 'Video uploaded successfully',
            video: newVideo
        });
    } catch (error) {
        console.error('Error uploading video:', error);
        res.status(500).json({ message: 'Server error during video upload' });
    }
};
