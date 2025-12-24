import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function ViewerDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

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
                        <h1 style={{ marginBottom: '0.5rem' }}>Viewer Dashboard</h1>
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
                            👁️
                        </div>
                        <div>
                            <h3 style={{ marginBottom: '0.25rem' }}>Viewer Role</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                You can watch videos
                            </p>
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎬</div>
                    <h2 style={{ marginBottom: '1rem' }}>Video Library</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                        Browse and watch videos from our collection
                    </p>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: '1.5rem',
                        marginTop: '2rem'
                    }}>
                        {/* Placeholder for video cards */}
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

export default ViewerDashboard;
