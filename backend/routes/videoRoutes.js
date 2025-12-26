const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Video = require('../models/Video');
const { protect, authorize } = require('../middleware/authMiddleware');

// Multer Setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /mp4|mkv|webm/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Videos Only!');
        }
    },
    limits: { fileSize: 1024 * 1024 * 1024 } // 1GB limit
});

// @desc    Upload a video
// @route   POST /api/videos/upload
// @access  Private (Editor, Admin)
router.post('/upload', protect, authorize('Editor', 'Admin'), upload.single('video'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Please upload a video file' });
    }

    try {
        const video = await Video.create({
            filename: req.file.filename,
            originalName: req.file.originalname,
            size: req.file.size,
            status: 'Uploading',
            uploadedBy: req.user._id,
            filepath: req.file.path
        });

        res.status(201).json(video);

        // Simulate Processing
        simulateProcessing(video, req.app.get('io'));

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Processing Simulation Function
const simulateProcessing = async (video, io) => {
    try {
        // Update status to Processing
        video.status = 'Processing';
        await video.save();
        io.emit('video-status-update', { videoId: video._id, status: 'Processing', progress: 0 });

        let progress = 0;
        const interval = setInterval(async () => {
            progress += 25;
            if (progress <= 100) {
                // Update progress in DB (optional, maybe too frequent write? let's just emit)
                // Keeping DB simple, assume memory or just emit for UI
                io.emit('video-progress', { videoId: video._id, progress });
            } else {
                clearInterval(interval);

                // Finalize
                const isSafe = Math.random() > 0.3; // 70% safe
                video.status = 'Completed';
                video.progress = 100;
                video.sensitivityResult = isSafe ? 'Safe' : 'Flagged';
                await video.save();

                io.emit('video-status-update', {
                    videoId: video._id,
                    status: 'Completed',
                    sensitivityResult: video.sensitivityResult
                });
            }
        }, 2000); // 2 seconds per step

    } catch (err) {
        console.error('Processing Error:', err);
    }
};

// @desc    Get all videos
// @route   GET /api/videos
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        let videos;
        if (req.user.role === 'Admin') {
            videos = await Video.find({}).populate('uploadedBy', 'name email');
        } else if (req.user.role === 'Editor') {
            videos = await Video.find({ uploadedBy: req.user._id });
        } else {
            // Viewer sees all completed SAFE videos
            videos = await Video.find({ status: 'Completed', sensitivityResult: 'Safe' }).populate('uploadedBy', 'name');
        }
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Stream video
// @route   GET /api/videos/stream/:id
// @access  Private
router.get('/stream/:id', protect, async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        // Optional: Check access (e.g., if Flagged, maybe restrict?)
        // For now, allow logged in users to stream if they found the ID.

        const path = video.filepath;

        // Check if file physically exists (Handling Render Ephemeral Storage)
        if (!fs.existsSync(path)) {
            return res.status(404).json({
                message: 'Video file not found on server. On free hosting (Render), files are deleted when the server sleeps. Please upload again.'
            });
        }

        const stat = fs.statSync(path);
        const fileSize = stat.size;
        const range = req.headers.range;

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunksize = (end - start) + 1;
            const file = fs.createReadStream(path, { start, end });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            fs.createReadStream(path).pipe(res);
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error streaming video' });
    }
});

module.exports = router;
