import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const navigate = useNavigate()
    const isAuthenticated = () => localStorage.getItem('isLoggedIn') === 'true'

    React.useEffect(() => {
        const hash = window.location.hash
        if (hash) {
            const id = hash.replace('#', '')
            const element = document.getElementById(id)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }, [])

    return (
        <div id="route-landing">
            {/* ===== 1. HERO / LANDING ===== */}
            <section className="section" id="home">
                <div className="hero-container">
                    <div className="hero-content">
                        <div className="hero-badge">
                            <span className="dot"></span>
                            AI-Powered Health Prediction
                        </div>
                        <h1 className="hero-title">
                            Simulate Your<br />
                            <span className="gradient-text">Future Health</span><br />
                            Before It Happens.
                        </h1>
                        <p className="hero-description">
                            Create your Digital Twin and explore how lifestyle choices shape your health trajectory. Powered
                            by predictive AI with full transparency and explainable insights.
                        </p>
                        <div className="hero-actions">
                            <button
                                onClick={() => navigate(isAuthenticated() ? '/dashboard' : '/signup')}
                                className="btn-primary"
                                id="heroCTA1"
                            >
                                🧬 Create My Digital Twin
                            </button>
                            <button
                                onClick={() => navigate(isAuthenticated() ? '/simulator' : '/login')}
                                className="btn-secondary"
                                id="heroCTA2"
                            >
                                ▶ Start Simulation
                            </button>
                        </div>
                        <div className="hero-stats">
                            <div className="hero-stat">
                                <div className="value">98.6%</div>
                                <div className="label">Prediction Accuracy</div>
                            </div>
                            <div className="hero-stat">
                                <div className="value">12M+</div>
                                <div className="label">Health Simulations</div>
                            </div>
                            <div className="hero-stat">
                                <div className="value">24/7</div>
                                <div className="label">Real-time Monitoring</div>
                            </div>
                        </div>
                    </div>

                    {/* Hero Visual / Dashboard Preview */}
                    <div className="hero-visual">
                        <div className="hero-visual-inner">
                            <div className="hero-orb hero-orb-1"></div>
                            <div className="hero-orb hero-orb-2"></div>
                            <div className="hero-dashboard-preview anim-scale-in">
                                <div className="preview-header">
                                    <span className="preview-dot red"></span>
                                    <span className="preview-dot yellow"></span>
                                    <span className="preview-dot green"></span>
                                    <span className="preview-title">HealthTwin Dashboard — Live</span>
                                </div>
                                <div className="preview-body">
                                    <div className="preview-card">
                                        <div className="pc-label">Health Score</div>
                                        <div className="pc-value" style={{ color: 'var(--accent-green)' }}>87/100</div>
                                        <div className="pc-bar">
                                            <div className="pc-bar-fill" style={{ width: '87%', background: 'var(--gradient-green-cyan)' }}></div>
                                        </div>
                                    </div>
                                    <div className="preview-card">
                                        <div className="pc-label">Heart Risk</div>
                                        <div className="pc-value" style={{ color: 'var(--accent-cyan)' }}>12%</div>
                                        <div className="pc-bar">
                                            <div className="pc-bar-fill" style={{ width: '12%', background: 'var(--gradient-cyan-blue)' }}></div>
                                        </div>
                                    </div>
                                    <div className="preview-card">
                                        <div className="pc-label">Stress Level</div>
                                        <div className="pc-value" style={{ color: 'var(--accent-amber)' }}>42%</div>
                                        <div className="pc-bar">
                                            <div className="pc-bar-fill" style={{ width: '42%', background: 'var(--accent-amber)' }}></div>
                                        </div>
                                    </div>
                                    <div className="preview-card">
                                        <div className="pc-label">Energy Index</div>
                                        <div className="pc-value" style={{ color: 'var(--accent-purple)' }}>76%</div>
                                        <div className="pc-bar">
                                            <div className="pc-bar-fill" style={{ width: '76%', background: 'var(--gradient-purple-pink)' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== FEATURES ===== */}
            <section className="section" id="features">
                <div style={{ textAlign: 'center' }}>
                    <span className="section-label">✦ Core Capabilities</span>
                    <h2 className="section-title">Powered by <span className="gradient-text">Next-Gen AI</span></h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        Three pillars that make HealthTwin AI the most advanced health prediction platform.
                    </p>
                </div>
                <div className="features-grid">
                    <div className="glass-card feature-card">
                        <div className="feature-icon cyan">🔮</div>
                        <h3>Predictive AI Engine</h3>
                        <p>Advanced machine learning models analyze thousands of biomarkers to forecast health trajectories up to 10 years ahead.</p>
                    </div>
                    <div className="glass-card feature-card">
                        <div className="feature-icon green">🛡️</div>
                        <h3>Preventive Healthcare</h3>
                        <p>Proactive health recommendations based on your digital twin's risk profile. Prevent issues before they become problems.</p>
                    </div>
                    <div className="glass-card feature-card">
                        <div className="feature-icon purple">🧠</div>
                        <h3>Explainable Insights</h3>
                        <p>Transparent AI reasoning shows exactly why predictions are made. No black boxes — full clarity into every health assessment.</p>
                    </div>
                    <div className="glass-card feature-card">
                        <div className="feature-icon pink">👤</div>
                        <h3>Digital Twin Engine</h3>
                        <p>A personalized health avatar that mirrors your real-time biometric data, lifestyle choices, and medical history.</p>
                    </div>
                    <div className="glass-card feature-card">
                        <div className="feature-icon amber">⚡</div>
                        <h3>Real-Time Simulation</h3>
                        <p>Instantly simulate the impact of lifestyle changes. See how sleep, exercise, and diet reshape your future health score.</p>
                    </div>
                    <div className="glass-card feature-card">
                        <div className="feature-icon blue">📊</div>
                        <h3>Smart Analytics</h3>
                        <p>Dynamic dashboards with intelligent data visualization that transform complex health data into actionable intelligence.</p>
                    </div>
                </div>
            </section>

            {/* ===== WHY DIGITAL TWIN? ===== */}
            <section className="section why-section" id="why">
                <div style={{ textAlign: 'center' }}>
                    <span className="section-label">💡 Why HealthTwin?</span>
                    <h2 className="section-title">Why a <span className="gradient-text">Digital Twin?</span></h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        Traditional healthcare is reactive. HealthTwin makes it proactive, predictive, and personal.
                    </p>
                </div>
                <div className="why-grid">
                    <div className="glass-card why-card">
                        <div className="why-number">01</div>
                        <h3>Predict Before It Happens</h3>
                        <p>Our AI models analyze your lifestyle patterns and biomarkers to forecast health risks years in advance.</p>
                    </div>
                    <div className="glass-card why-card">
                        <div className="why-number">02</div>
                        <h3>Simulate Any Scenario</h3>
                        <p>Test the impact of lifestyle changes instantly. See how sleep, diet, and exercise reshape your future.</p>
                    </div>
                    <div className="glass-card why-card">
                        <div className="why-number">03</div>
                        <h3>Understand the AI</h3>
                        <p>No black boxes. Every prediction comes with transparent reasoning so you understand exactly why.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LandingPage
