import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, allowedRoles }) {
    const { user, loading, isAuthenticated } = useAuth();

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <p>Loading...</p>
            </div>
        );
    }

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return (
            <div className="container" style={{ maxWidth: '600px', marginTop: '4rem' }}>
                <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                    <h2 style={{ color: 'var(--error)', marginBottom: '1rem' }}>Access Denied</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                        You don't have permission to access this page.
                    </p>
                    <p style={{ fontSize: '0.875rem' }}>
                        Your role: <strong>{user.role}</strong>
                    </p>
                </div>
            </div>
        );
    }

    return children;
}

export default ProtectedRoute;
