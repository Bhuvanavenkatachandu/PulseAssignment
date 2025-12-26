import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import './VideoPlayerPage.css';

const VideoPlayerPage = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Construct stream URL with token
    const streamUrl = `https://pulseassignment.onrender.com/api/videos/stream/${id}?token=${user?.token}`;

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
