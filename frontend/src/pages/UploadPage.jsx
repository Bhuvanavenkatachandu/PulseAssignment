import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import io from 'socket.io-client';


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
const ENDPOINT = API_URL.replace('/api', ''); // Dynamic: Localhost or Render

const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('');
    const [uploading, setUploading] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const socket = io(ENDPOINT);

        // Initialize socket connection

        return () => socket.disconnect();
    }, []);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('video', file);

        setUploading(true);
        setStatus('Uploading...');

        try {
            const { data } = await api.post('/videos/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percentCompleted);
                },
            });

            setStatus('Processing...');
            setProgress(0); // Reset for processing progress

            // Connect to socket to listen for THIS video's progress
            const socket = io(ENDPOINT);

            socket.on('video-progress', (msg) => {
                if (msg.videoId === data._id) {
                    setProgress(msg.progress);
                    setStatus('Processing...');
                }
            });

            socket.on('video-status-update', (msg) => {
                if (msg.videoId === data._id) {
                    setStatus(msg.status);
                    if (msg.status === 'Completed') {
                        setUploading(false);
                        setTimeout(() => navigate('/dashboard'), 1000);
                    }
                }
            });

        } catch (error) {
            console.error(error);
            setStatus('Upload Failed');
            setUploading(false);
        }
    };

    return (
        <div className="upload-container">
            <h2>Upload Video</h2>
            <form onSubmit={handleUpload}>
                <div className="form-group">
                    <input
                        type="file"
                        accept="video/mp4,video/mkv,video/webm"
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                        disabled={uploading}
                    />
                </div>
                <button type="submit" disabled={uploading || !file}>
                    {uploading ? 'Processing...' : 'Upload'}
                </button>
            </form>

            {status && (
                <div className="progress-container">
                    <p>Status: {status}</p>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${progress}%` }}
                        >
                            {progress}%
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadPage;
