import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';


const VideoPlayerPage = () => {
    const { id } = useParams();
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    if (loading || !user) {
        return <div className="player-container">Loading session...</div>;
    }

    // Stream URL
    const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://pulseassignment.onrender.com/api' : 'http://localhost:5001/api');
    const streamUrl = `${API_URL}/videos/stream/${id}?token=${user.token}`;

    return (
        <div className="player-container">
            <button className="back-btn" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
            <div className="video-wrapper">
                <video controls autoPlay width="100%">
                    <source src={streamUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};

export default VideoPlayerPage;
