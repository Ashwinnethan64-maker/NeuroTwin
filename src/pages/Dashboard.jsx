import React from 'react'

const Dashboard = () => {
    return (
        <div id="route-dashboard">
            <section className="section" id="dashboard">
                <span className="section-label">🧬 Digital Twin</span>
                <h2 className="section-title">Your Health <span className="gradient-text">Dashboard</span></h2>
                <p className="section-subtitle">Real-time overview of your digital twin's health metrics, risk factors, and historical events.</p>

                <div className="dashboard-grid">
                    {/* Avatar */}
                    <div className="glass-card avatar-card">
                        <div className="avatar-container">
                            <div className="avatar-glow"></div>
                            <svg className="avatar-silhouette" viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="60" cy="32" r="22" stroke="url(#avatarGrad)" strokeWidth="2" fill="rgba(0,212,255,0.05)">
                                    <animate attributeName="r" values="22;23;22" dur="3s" repeatCount="indefinite" />
                                </circle>
                                <line x1="60" y1="54" x2="60" y2="68" stroke="url(#avatarGrad)" strokeWidth="2" />
                                <path d="M30 68 Q60 62 90 68 L95 130 Q60 140 25 130 Z" stroke="url(#avatarGrad)" strokeWidth="2" fill="rgba(0,212,255,0.03)">
                                    <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
                                </path>
                                <path d="M30 72 L8 110" stroke="url(#avatarGrad)" strokeWidth="2" strokeLinecap="round" />
                                <path d="M90 72 L112 110" stroke="url(#avatarGrad)" strokeWidth="2" strokeLinecap="round" />
                                <path d="M40 130 L32 190" stroke="url(#avatarGrad)" strokeWidth="2" strokeLinecap="round" />
                                <path d="M80 130 L88 190" stroke="url(#avatarGrad)" strokeWidth="2" strokeLinecap="round" />
                                <circle cx="55" cy="88" r="6" fill="rgba(239,68,68,0.3)">
                                    <animate attributeName="r" values="5;7;5" dur="1.2s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="0.5;1;0.5" dur="1.2s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="60" cy="88" r="12" stroke="rgba(0,212,255,0.2)" strokeWidth="1" fill="none">
                                    <animate attributeName="r" values="12;20;12" dur="2s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
                                </circle>
                                <defs>
                                    <linearGradient id="avatarGrad" x1="0" y1="0" x2="120" y2="200">
                                        <stop offset="0%" stopColor="#00d4ff" />
                                        <stop offset="100%" stopColor="#7c3aed" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <h3 style={{ marginBottom: '6px' }}>Your Digital Twin</h3>
                        <div className="avatar-status">
                            <span className="dot"></span>
                            Active & Synced
                        </div>
                    </div>

                    {/* Health Score */}
                    <div className="glass-card health-score-card">
                        <div className="score-ring-container">
                            <svg viewBox="0 0 120 120">
                                <defs>
                                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#00d4ff" />
                                        <stop offset="50%" stopColor="#7c3aed" />
                                        <stop offset="100%" stopColor="#10b981" />
                                    </linearGradient>
                                </defs>
                                <circle cx="60" cy="60" r="52" className="score-ring-bg" />
                                <circle cx="60" cy="60" r="52" className="score-ring-fill" strokeDasharray="326.7" strokeDashoffset="42.5" />
                            </svg>
                            <div className="score-value">
                                <span className="number gradient-text">87</span>
                                <span className="label">Health Score</span>
                            </div>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center' }}>Excellent — Top 15% globally</p>
                    </div>

                    {/* Risk Cards */}
                    <div className="glass-card risk-card tooltip-wrap">
                        <div className="tooltip-box">Cardiovascular risk based on activity, diet & genetics</div>
                        <div className="risk-header">
                            <span className="risk-label">Heart Risk</span>
                            <div className="risk-icon" style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--accent-red)' }}>❤️</div>
                        </div>
                        <div className="risk-value" style={{ color: 'var(--accent-red)' }}>12%</div>
                        <div className="risk-bar">
                            <div className="risk-bar-fill" style={{ width: '12%', background: 'var(--accent-red)' }}></div>
                        </div>
                        <div className="risk-trend down">↓ 2.3% from last month</div>
                    </div>

                    <div className="glass-card risk-card tooltip-wrap">
                        <div className="tooltip-box">Cortisol-based stress index from sleep & screen patterns</div>
                        <div className="risk-header">
                            <span className="risk-label">Stress Level</span>
                            <div className="risk-icon" style={{ background: 'rgba(245,158,11,0.1)', color: 'var(--accent-amber)' }}>🧠</div>
                        </div>
                        <div className="risk-value" style={{ color: 'var(--accent-amber)' }}>42%</div>
                        <div className="risk-bar">
                            <div className="risk-bar-fill" style={{ width: '42%', background: 'var(--accent-amber)' }}></div>
                        </div>
                        <div className="risk-trend up">↑ 5.1% from last month</div>
                    </div>

                    <div className="glass-card risk-card tooltip-wrap">
                        <div className="tooltip-box">Composite energy from sleep quality, activity & nutrition</div>
                        <div className="risk-header">
                            <span className="risk-label">Energy Index</span>
                            <div className="risk-icon" style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--accent-green)' }}>⚡</div>
                        </div>
                        <div className="risk-value" style={{ color: 'var(--accent-green)' }}>76%</div>
                        <div className="risk-bar">
                            <div className="risk-bar-fill" style={{ width: '76%', background: 'var(--accent-green)' }}></div>
                        </div>
                        <div className="risk-trend down">↓ Stable trend</div>
                    </div>

                    {/* Mini Timeline */}
                    <div className="glass-card dash-timeline-card">
                        <h3>📋 Recent Health Events</h3>
                        <div className="mini-timeline">
                            <div className="mini-timeline-item">
                                <div className="date">Feb 20, 2026</div>
                                <div className="event-title">Blood Panel Results</div>
                                <div className="event-desc">All markers within normal range</div>
                            </div>
                            <div className="mini-timeline-item">
                                <div className="date">Feb 15, 2026</div>
                                <div className="event-title">Stress Spike Detected</div>
                                <div className="event-desc">Cortisol levels elevated — 3 day trend</div>
                            </div>
                            <div className="mini-timeline-item">
                                <div className="date">Feb 10, 2026</div>
                                <div className="event-title">Sleep Pattern Shift</div>
                                <div className="event-desc">Average sleep dropped to 5.8hrs</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Dashboard
