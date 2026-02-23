import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignupPage = ({ onLogin, onGoogleLogin }) => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    React.useEffect(() => {
        if (window.google) {
            window.google.accounts.id.initialize({
                client_id: "941110404615-thqa3p28tkcnu839qdqad4crpf2jqdid.apps.googleusercontent.com",
                callback: (response) => {
                    onGoogleLogin(response)
                    navigate('/dashboard')
                }
            })
            window.google.accounts.id.renderButton(
                document.getElementById("googleSignUpBtn"),
                { theme: "outline", size: "large", width: "100%", text: "signup_with" }
            )
        }
    }, [onGoogleLogin, navigate])

    const handleFormSignup = (e) => {
        e.preventDefault()
        setIsLoading(true)
        setTimeout(() => {
            const userData = {
                email,
                name,
                picture: null
            }
            onLogin(userData)
            navigate('/dashboard')
        }, 2000)
    }

    return (
        <div className="auth-body">
            <div className="auth-container">
                {/* Left: Branding */}
                <div className="auth-brand">
                    <div className="auth-brand-inner">
                        <div className="auth-orb auth-orb-1"></div>
                        <div className="auth-orb auth-orb-2"></div>
                        <div className="auth-orb auth-orb-3"></div>
                        <div className="auth-brand-content">
                            <div className="nav-brand" style={{ justifyContent: 'center', marginBottom: '2rem' }}>
                                <div className="icon">🧬</div>
                                <span>HealthTwin AI</span>
                            </div>
                            <h1 className="auth-brand-title">Build Your<br /><span className="gradient-text">Digital Twin</span></h1>
                            <p className="auth-brand-desc">Join thousands of users predicting and preventing health risks with AI-powered simulation.</p>
                            <div className="auth-brand-features">
                                <div className="auth-feature"><span className="auth-feature-icon">⚡</span> Real-Time Simulation</div>
                                <div className="auth-feature"><span className="auth-feature-icon">📊</span> Smart Analytics</div>
                                <div className="auth-feature"><span className="auth-feature-icon">👤</span> Digital Twin Avatar</div>
                            </div>
                        </div>
                        <svg className="auth-dna" viewBox="0 0 100 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 0 Q80 50 20 100 Q-40 150 20 200 Q80 250 20 300 Q-40 350 20 400" stroke="url(#dnaGrad1)" strokeWidth="1.5" fill="none" opacity="0.3" />
                            <path d="M80 0 Q20 50 80 100 Q140 150 80 200 Q20 250 80 300 Q140 350 80 400" stroke="url(#dnaGrad2)" strokeWidth="1.5" fill="none" opacity="0.3" />
                            <defs>
                                <linearGradient id="dnaGrad1" x1="0" y1="0" x2="0" y2="400">
                                    <stop offset="0%" stopColor="#00d4ff" />
                                    <stop offset="100%" stopColor="#7c3aed" />
                                </linearGradient>
                                <linearGradient id="dnaGrad2" x1="0" y1="0" x2="0" y2="400">
                                    <stop offset="0%" stopColor="#7c3aed" />
                                    <stop offset="100%" stopColor="#ec4899" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>

                {/* Right: Signup Form */}
                <div className="auth-form-side">
                    <div className="auth-form-card glass-card">
                        <h2 className="auth-form-title">Create Account</h2>
                        <p className="auth-form-subtitle">Start building your Digital Twin in minutes</p>
                        <form onSubmit={handleFormSignup}>
                            <div className="auth-input-group">
                                <label htmlFor="signupName">Full Name</label>
                                <div className="auth-input-wrap">
                                    <span className="auth-input-icon">👤</span>
                                    <input
                                        type="text"
                                        id="signupName"
                                        placeholder="John Doe"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="auth-input-group">
                                <label htmlFor="signupEmail">Email Address</label>
                                <div className="auth-input-wrap">
                                    <span className="auth-input-icon">📧</span>
                                    <input
                                        type="email"
                                        id="signupEmail"
                                        placeholder="you@example.com"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="auth-input-group">
                                <label htmlFor="signupPassword">Password</label>
                                <div className="auth-input-wrap">
                                    <span className="auth-input-icon">🔒</span>
                                    <input
                                        type="password"
                                        id="signupPassword"
                                        placeholder="Min. 8 characters"
                                        required
                                        minLength="8"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="auth-options">
                                <label className="auth-checkbox"><input type="checkbox" required /> I agree to the <a href="#" className="auth-link-accent">Terms</a> & <a href="#" className="auth-link-accent">Privacy</a></label>
                            </div>
                            <button type="submit" className="btn-primary auth-submit" disabled={isLoading}>
                                <span className="auth-btn-text" style={{ opacity: isLoading ? 0 : 1 }}>Create Account</span>
                                <span className={`auth-btn-loader ${isLoading ? 'active' : ''}`}></span>
                            </button>
                        </form>
                        <div className="auth-divider"><span>or continue with</span></div>

                        <div id="googleSignUpBtn" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}></div>

                        <p className="auth-switch">Already have an account? <Link to="/login" className="auth-link-accent">Sign in</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupPage
