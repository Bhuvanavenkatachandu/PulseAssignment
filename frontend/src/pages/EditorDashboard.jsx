import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function EditorDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showUploadForm, setShowUploadForm] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="container" style={{ marginTop: '2rem' }}>
            <div className="card">
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem',
                    paddingBottom: '1rem',
                    borderBottom: '1px solid var(--border)'
                }}>
                    <div>
                        <h1 style={{ marginBottom: '0.5rem' }}>Editor Dashboard</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                            Welcome back, <strong>{user?.username}</strong>
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: 'transparent',
                            border: '1px solid var(--border)',
                            color: 'var(--text)',
                            cursor: 'pointer',
                            borderRadius: '6px'
                        }}
                    >
                        Logout
                    </button>
                </div>

                <div style={{
                    padding: '2rem',
                    backgroundColor: 'rgba(99, 102, 241, 0.05)',
                    borderRadius: '8px',
                    marginBottom: '2rem'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '1rem'
                    }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem'
                        }}>
                            ✏️
                        </div>
                        <div>
                            <h3 style={{ marginBottom: '0.25rem' }}>Editor Role</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                You can upload and watch videos
                            </p>
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <button
                        onClick={() => setShowUploadForm(!showUploadForm)}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            backgroundColor: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: 600
                        }}
                    >
                        {showUploadForm ? '✕ Close Upload Form' : '+ Upload New Video'}
                    </button>

                    {showUploadForm && (
                        <div style={{
                            marginTop: '1.5rem',
                            padding: '2rem',
                            border: '1px solid var(--border)',
                            borderRadius: '8px'
                        }}>
                            <h3 style={{ marginBottom: '1.5rem' }}>Upload Video</h3>
                            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="Video Title"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea
                                        placeholder="Video Description"
                                        rows="4"
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '6px' }}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="file"
                                        accept="video/*"
                                        required
                                    />
                                </div>
                                <button type="submit" style={{ marginTop: '0.5rem' }}>
                                    Upload Video
                                </button>
                            </form>
                        </div>
                    )}
                </div>

                <div>
                    <h2 style={{ marginBottom: '1.5rem' }}>My Videos</h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {/* Placeholder for video cards */}
                        <div style={{
                            padding: '2rem',
                            border: '2px dashed var(--border)',
                            borderRadius: '8px',
                            textAlign: 'center',
                            color: 'var(--text-muted)'
                        }}>
                            <p>No videos uploaded yet</p>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
                    <h2 style={{ marginBottom: '1.5rem' }}>All Videos</h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {/* Placeholder for all video cards */}
                        <div style={{
                            padding: '2rem',
                            border: '2px dashed var(--border)',
                            borderRadius: '8px',
                            textAlign: 'center',
                            color: 'var(--text-muted)'
                        }}>
                            <p>No videos available yet</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditorDashboard;
