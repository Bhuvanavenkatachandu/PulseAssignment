import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import io from 'socket.io-client';


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
const ENDPOINT = API_URL.replace('/api', ''); // Dynamic: Localhost or Render

const Dashboard = () => {
    const [videos, setVideos] = useState([]);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchVideos();

        const socket = io(ENDPOINT);

        socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        socket.on('video-status-update', (data) => {
            setVideos((prevVideos) =>
                prevVideos.map((video) =>
                    video._id === data.videoId ? { ...video, status: data.status, sensitivityResult: data.sensitivityResult } : video
                )
            );
        });

        // Optional: Update progress in list if needed, but status is simpler
        // socket.on('video-progress', ...);

        return () => socket.disconnect();
    }, []);

    const fetchVideos = async () => {
        try {
            const { data } = await api.get('/videos');
            setVideos(data);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome, {user?.name} ({user?.role})</h1>
                <div className="actions">
                    {(user?.role === 'Editor' || user?.role === 'Admin') && (
                        <button onClick={() => navigate('/upload')}>Upload Video</button>
                    )}
                    <button onClick={logout} className="logout-btn">Logout</button>
                </div>
            </header>

            <div className="video-list">
                <h2>Available Videos</h2>
                {videos.length === 0 ? (
                    <p>No videos available.</p>
                ) : (
                    <div className="video-grid">
                        {videos.map((video) => (
                            <div key={video._id} className="video-card">
                                <h3>{video.originalName || video.filename}</h3>
                                <p>Status: <span className={`status ${video.status.toLowerCase()}`}>{video.status}</span></p>
                                {video.status === 'Completed' && (
                                    <p>Sensitivity: <span className={`sensitivity ${video.sensitivityResult?.toLowerCase()}`}>{video.sensitivityResult}</span></p>
                                )}
                                {video.status === 'Completed' && (user?.role === 'Admin' || user?.role === 'Viewer' || user?.role === 'Editor') && (
                                    // Everyone can watch if they hold the link, but logically only Safe ones if Viewer?
                                    // Backend filters list. So if it is in list, they can watch.
                                    <button onClick={() => navigate(`/watch/${video._id}`)}>Watch Video</button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
