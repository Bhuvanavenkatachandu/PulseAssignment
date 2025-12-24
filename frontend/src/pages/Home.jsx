import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

function Home() {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            // Redirect to appropriate dashboard based on role
            if (user.role === 'admin') {
                navigate('/admin');
            } else if (user.role === 'editor') {
                navigate('/editor');
            } else {
                navigate('/viewer');
            }
        }
    }, [user, isAuthenticated, navigate]);

    return (
        <div className="container">
            <header>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '-2rem' }}>
                    <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Create Account</Link>
                </div>
                <h1>Pulse</h1>
                <p style={{ color: 'var(--text-muted)' }}>Welcome to your professional dashboard.</p>
            </header>

            <main>
                <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                    <h2 style={{ marginBottom: '1.5rem' }}>Ready to get started?</h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto 2rem', color: 'var(--text-muted)' }}>
                        This project has been restructured for better maintainability. Start building your amazing features here.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link to="/register" className="button" style={{
                            display: 'inline-block',
                            padding: '0.75rem 1.5rem',
                            backgroundColor: 'var(--primary)',
                            color: 'white',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontWeight: 600
                        }}>Join Now</Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home;
