import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function RegisterPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'viewer'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { username, email, password, confirmPassword, role } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        setLoading(true);
        try {
            const response = await api.post('/auth/register', { username, email, password, role });
            setSuccess(response.data.message);
            setFormData({ username: '', email: '', password: '', confirmPassword: '', role: 'viewer' });
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '400px', marginTop: '4rem' }}>
            <div className="card">
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Join Pulse</h2>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>Create your account to continue</p>

                {error && <div className="error-badge" style={{ marginBottom: '1rem' }}>{error}</div>}
                {success && <div className="success-badge" style={{ marginBottom: '1rem' }}>{success}</div>}

                <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div className="form-group">
                        <input
                            name="username"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            name="email"
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={onChange}
                            required
                            minLength="6"
                        />
                    </div>

                    <div className="form-group" style={{ marginTop: '0.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.75rem',
                            fontWeight: 600,
                            fontSize: '0.875rem'
                        }}>
                            Select Your Role
                        </label>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <label style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                cursor: 'pointer',
                                padding: '0.75rem',
                                border: role === 'viewer' ? '2px solid var(--primary)' : '1px solid var(--border)',
                                borderRadius: '8px',
                                backgroundColor: role === 'viewer' ? 'rgba(99, 102, 241, 0.05)' : 'transparent',
                                transition: 'all 0.2s'
                            }}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="viewer"
                                    checked={role === 'viewer'}
                                    onChange={onChange}
                                    style={{ marginRight: '0.75rem', marginTop: '0.25rem' }}
                                />
                                <div>
                                    <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Viewer</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                        Can watch videos
                                    </div>
                                </div>
                            </label>

                            <label style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                cursor: 'pointer',
                                padding: '0.75rem',
                                border: role === 'editor' ? '2px solid var(--primary)' : '1px solid var(--border)',
                                borderRadius: '8px',
                                backgroundColor: role === 'editor' ? 'rgba(99, 102, 241, 0.05)' : 'transparent',
                                transition: 'all 0.2s'
                            }}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="editor"
                                    checked={role === 'editor'}
                                    onChange={onChange}
                                    style={{ marginRight: '0.75rem', marginTop: '0.25rem' }}
                                />
                                <div>
                                    <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Editor</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                        Can upload and watch videos
                                    </div>
                                </div>
                            </label>

                            <label style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                cursor: 'pointer',
                                padding: '0.75rem',
                                border: role === 'admin' ? '2px solid var(--primary)' : '1px solid var(--border)',
                                borderRadius: '8px',
                                backgroundColor: role === 'admin' ? 'rgba(99, 102, 241, 0.05)' : 'transparent',
                                transition: 'all 0.2s'
                            }}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="admin"
                                    checked={role === 'admin'}
                                    onChange={onChange}
                                    style={{ marginRight: '0.75rem', marginTop: '0.25rem' }}
                                />
                                <div>
                                    <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Admin</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                        Can manage users and videos (Only one allowed)
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <input
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign in</Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
