import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function AdminDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('users');

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
                        <h1 style={{ marginBottom: '0.5rem' }}>Admin Dashboard</h1>
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
                            👑
                        </div>
                        <div>
                            <h3 style={{ marginBottom: '0.25rem' }}>Admin Role</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                You have full access to manage users and videos
                            </p>
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '2rem'
                }}>
                    <div style={{
                        padding: '1.5rem',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.25rem' }}>0</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Total Users</div>
                    </div>
                    <div style={{
                        padding: '1.5rem',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎬</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.25rem' }}>0</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Total Videos</div>
                    </div>
                    <div style={{
                        padding: '1.5rem',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✏️</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.25rem' }}>0</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Editors</div>
                    </div>
                    <div style={{
                        padding: '1.5rem',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👁️</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.25rem' }}>0</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Viewers</div>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        borderBottom: '1px solid var(--border)',
                        marginBottom: '2rem'
                    }}>
                        <button
                            onClick={() => setActiveTab('users')}
                            style={{
                                padding: '0.75rem 1.5rem',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderBottom: activeTab === 'users' ? '2px solid var(--primary)' : '2px solid transparent',
                                color: activeTab === 'users' ? 'var(--primary)' : 'var(--text-muted)',
                                cursor: 'pointer',
                                fontWeight: 600
                            }}
                        >
                            User Management
                        </button>
                        <button
                            onClick={() => setActiveTab('videos')}
                            style={{
                                padding: '0.75rem 1.5rem',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderBottom: activeTab === 'videos' ? '2px solid var(--primary)' : '2px solid transparent',
                                color: activeTab === 'videos' ? 'var(--primary)' : 'var(--text-muted)',
                                cursor: 'pointer',
                                fontWeight: 600
                            }}
                        >
                            Video Management
                        </button>
                    </div>

                    {activeTab === 'users' && (
                        <div>
                            <h2 style={{ marginBottom: '1.5rem' }}>User Management</h2>
                            <div style={{
                                padding: '2rem',
                                border: '2px dashed var(--border)',
                                borderRadius: '8px',
                                textAlign: 'center',
                                color: 'var(--text-muted)'
                            }}>
                                <p>No users to manage yet</p>
                                <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                                    Users will appear here once they register
                                </p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'videos' && (
                        <div>
                            <h2 style={{ marginBottom: '1.5rem' }}>Video Management</h2>
                            <div style={{
                                padding: '2rem',
                                border: '2px dashed var(--border)',
                                borderRadius: '8px',
                                textAlign: 'center',
                                color: 'var(--text-muted)'
                            }}>
                                <p>No videos to manage yet</p>
                                <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                                    Videos uploaded by editors will appear here
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
