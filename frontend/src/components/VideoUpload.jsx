import React, { useState } from 'react';
import api from '../services/api';
import './VideoUpload.css';

const VideoUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (!selectedFile.type.startsWith('video/')) {
                setError('Please select a valid video file.');
                setFile(null);
                return;
            }
            if (selectedFile.size > 50 * 1024 * 1024) {
                setError('File size exceeds 50MB limit.');
                setFile(null);
                return;
            }
            setFile(selectedFile);
            setError('');
            setMessage('');
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('video', file);

        setLoading(true);
        setError('');
        setMessage('');

        try {
            await api.upload('/videos/upload', formData);
            setMessage('Video uploaded successfully!');
            setFile(null);
            // Reset file input
            document.getElementById('video-input').value = '';
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to upload video.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="upload-container">
            <div className="upload-card">
                <h2>Upload Video</h2>
                <p className="upload-subtitle">Share your moments with us</p>

                <form onSubmit={handleUpload} className="upload-form">
                    <div className="file-input-wrapper">
                        <input
                            type="file"
                            id="video-input"
                            accept="video/*"
                            onChange={handleFileChange}
                            className="file-input"
                        />
                        <label htmlFor="video-input" className="file-label">
                            {file ? file.name : 'Choose a video file...'}
                        </label>
                    </div>

                    {error && <div className="message error">{error}</div>}
                    {message && <div className="message success">{message}</div>}

                    <button
                        type="submit"
                        className={`upload-btn ${loading ? 'loading' : ''}`}
                        disabled={loading || !file}
                    >
                        {loading ? 'Uploading...' : 'Upload Video'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VideoUpload;
