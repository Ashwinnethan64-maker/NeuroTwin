import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProfilePage = ({ user, onUpdate }) => {
    const [name, setName] = useState(user?.name || '')
    const [isSaving, setIsSaving] = useState(false)
    const navigate = useNavigate()

    const handleSave = (e) => {
        e.preventDefault()
        setIsSaving(true)

        // Simulate API call
        setTimeout(() => {
            const updatedUser = { ...user, name }
            onUpdate(updatedUser)
            setIsSaving(false)
            alert('Profile updated successfully!')
        }, 1000)
    }

    return (
        <div className="profile-body" style={{ paddingTop: '120px', minHeight: '100vh', background: 'var(--bg-main)' }}>
            <div className="section">
                <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <div className="user-avatar-container" style={{ width: '100px', height: '100px', margin: '0 auto 1.5rem' }}>
                            {user?.picture ? (
                                <img src={user.picture} alt={user.name} className="user-avatar" style={{ border: '4px solid var(--accent-cyan)' }} />
                            ) : (
                                <div className="user-avatar-placeholder" style={{ fontSize: '2.5rem' }}>{user?.name?.charAt(0) || 'U'}</div>
                            )}
                        </div>
                        <h1 className="section-title" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Profile Settings</h1>
                        <p className="section-subtitle">Manage your Digital Twin identity</p>
                    </div>

                    <form onSubmit={handleSave}>
                        <div className="auth-input-group" style={{ marginBottom: '2rem' }}>
                            <label>Full Name</label>
                            <div className="auth-input-wrap">
                                <span className="auth-input-icon">👤</span>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                        </div>

                        <div className="auth-input-group" style={{ marginBottom: '3rem' }}>
                            <label>Email Address</label>
                            <div className="auth-input-wrap" style={{ opacity: 0.7 }}>
                                <span className="auth-input-icon">📧</span>
                                <input
                                    type="email"
                                    value={user?.email || ''}
                                    readOnly
                                    style={{ cursor: 'not-allowed' }}
                                />
                            </div>
                            <small style={{ color: 'var(--text-muted)', marginTop: '0.5rem', display: 'block' }}>
                                Email cannot be changed as it is linked to your Google account.
                            </small>
                        </div>

                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <button
                                type="submit"
                                className="btn-primary"
                                style={{ flex: 1 }}
                                disabled={isSaving}
                            >
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button
                                type="button"
                                className="btn-secondary"
                                onClick={() => navigate('/dashboard')}
                                style={{ flex: 1 }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
