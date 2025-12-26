const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    originalName: {
        type: String
    },
    size: {
        type: Number
    },
    status: {
        type: String,
        enum: ['Uploading', 'Processing', 'Completed'],
        default: 'Uploading'
    },
    progress: {
        type: Number,
        default: 0
    },
    sensitivityResult: {
        type: String,
        enum: ['Safe', 'Flagged', 'Pending'],
        default: 'Pending'
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    filepath: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Video', videoSchema);
