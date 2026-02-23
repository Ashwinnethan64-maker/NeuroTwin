import React, { useState, useEffect, useRef } from 'react'

const BASELINE = {
    sleep: 7,
    activity: 45,
    stress: 4,
    sugar: 30,
    screen: 5
}

const timeLabels = ['Now', '1M', '3M', '6M', '1Y', '2Y', '5Y']

const decisionScenarios = {
    1: {
        id: 1,
        icon: '🏃',
        label: 'Exercise 60 min/day',
        desc: 'Intense cardio 5x/week',
        current: { heart: 12, stress: 42, energy: 76, score: 87 },
        future: { heart: 7, stress: 28, energy: 92, score: 95 }
    },
    2: {
        id: 2,
        icon: '🍎',
        label: 'Reduce sugar by 50%',
        desc: 'Cut processed snacks & sodas',
        current: { heart: 12, stress: 42, energy: 76, score: 87 },
        future: { heart: 9, stress: 38, energy: 82, score: 91 }
    },
    3: {
        id: 3,
        icon: '😴',
        label: 'Sleep 8+ hours',
        desc: 'Regular sleep schedule',
        current: { heart: 12, stress: 42, energy: 76, score: 87 },
        future: { heart: 10, stress: 22, energy: 89, score: 93 }
    },
    4: {
        id: 4,
        icon: '📱',
        label: 'Cut screen time 50%',
        desc: 'No screens 1hr before bed',
        current: { heart: 12, stress: 42, energy: 76, score: 87 },
        future: { heart: 11, stress: 30, energy: 84, score: 90 }
    }
}

const Simulator = () => {
    const [inputs, setInputs] = useState(BASELINE)
    const [metrics, setMetrics] = useState({ health: 87, heart: 12, stress: 42, energy: 76 })
    const [baselineMetrics, setBaselineMetrics] = useState({ health: 87, heart: 12, stress: 42, energy: 76 })
    const [activeDecisions, setActiveDecisions] = useState(new Set())
    const timelineRef = useRef(null)

    // Simulation Logic
    const computeMetrics = (s) => {
        const sleepNorm = Math.min(Math.max((s.sleep - 3) / 5, 0), 1)
        const activityNorm = Math.min(s.activity / 90, 1)
        const stressNorm = 1 - (s.stress / 10)
        const sugarNorm = 1 - Math.min(s.sugar / 80, 1)
        const screenNorm = 1 - Math.min(Math.max((s.screen - 1) / 12, 0), 1)

        const healthScore = Math.round((sleepNorm * 25 + activityNorm * 25 + stressNorm * 20 + sugarNorm * 15 + screenNorm * 15) + 15)
        const heartRisk = Math.round(Math.max(5, 40 - (activityNorm * 15) - (sleepNorm * 10) - (sugarNorm * 8) + (s.stress * 1.5)))
        const stressLevel = Math.round(Math.max(5, (s.stress * 6) + ((10 - s.sleep) * 2) + (s.screen * 1.5) - (s.activity * 0.15)))
        const energyLevel = Math.round(Math.min(100, (sleepNorm * 30) + (activityNorm * 25) + (stressNorm * 20) + (sugarNorm * 10) + (screenNorm * 15) + 10))

        return {
            health: Math.min(100, Math.max(10, healthScore)),
            heart: Math.min(80, Math.max(5, heartRisk)),
            stress: Math.min(95, Math.max(5, stressLevel)),
            energy: Math.min(100, Math.max(10, energyLevel))
        }
    }

    useEffect(() => {
        const newMetrics = computeMetrics(inputs)
        setMetrics(newMetrics)
    }, [inputs])

    const handleInputChange = (e) => {
        const { id, value } = e.target
        setInputs(prev => ({ ...prev, [id]: parseFloat(value) }))
    }

    const resetSliders = () => setInputs(BASELINE)

    const toggleDecision = (id) => {
        const newDecisions = new Set(activeDecisions)
        if (newDecisions.has(id)) newDecisions.delete(id)
        else newDecisions.add(id)
        setActiveDecisions(newDecisions)
    }

    const projectValues = (baseValue, variance, trend) => {
        return timeLabels.map((_, i) => {
            const drift = trend * i * 0.5
            const noise = (Math.random() - 0.5) * variance
            return Math.round(Math.min(100, Math.max(5, baseValue + drift + noise)))
        })
    }

    const renderChart = (chartId, title, values, maxVal, color) => (
        <div key={chartId} className="glass-card forecast-card">
            <div className="forecast-header">
                <span className="forecast-title">{title}</span>
                <span className="forecast-indicator">Projected (10y)</span>
            </div>
            <div className="forecast-chart">
                <div className="chart-container">
                    {values.map((v, i) => (
                        <div key={i} className="chart-bar-group">
                            <div
                                className="chart-bar"
                                style={{
                                    height: `${(v / maxVal) * 100}%`,
                                    background: color,
                                    transitionDelay: `${i * 80}ms`
                                }}
                            ></div>
                            <div className="chart-bar-label">{timeLabels[i]}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

    const healthTrend = (metrics.health - baselineMetrics.health) * 0.1
    const heartTrend = (metrics.heart - baselineMetrics.heart) * 0.15
    const stressTrend = (metrics.stress - baselineMetrics.stress) * 0.12
    const energyTrend = (metrics.energy - baselineMetrics.energy) * 0.1

    return (
        <div id="route-simulator">
            <section className="section" id="simulator-hero">
                <span className="section-label neon-cyan">⚡ Predictive Engine</span>
                <h2 className="section-title">Health <span className="gradient-text">Simulation Lab</span></h2>
                <p className="section-subtitle">Adjust your lifestyle variables below to see how they impact your health trajectory over time.</p>

                <div className="simulator-container">
                    {/* Controls Side */}
                    <div className="simulator-controls">
                        <div className="glass-card controls-card">
                            <div className="controls-header">
                                <h3>Simulation Variables</h3>
                                <button className="reset-btn" onClick={resetSliders}>🔄 Reset to Baseline</button>
                            </div>

                            <div className="slider-group">
                                <div className="slider-label">
                                    <span>Sleep Quality</span>
                                    <span className="slider-val">{inputs.sleep} hrs</span>
                                </div>
                                <input type="range" id="sleep" min="3" max="12" step="0.5" value={inputs.sleep} onChange={handleInputChange} className="health-slider" />
                            </div>

                            <div className="slider-group">
                                <div className="slider-label">
                                    <span>Daily Activity</span>
                                    <span className="slider-val">{inputs.activity} min</span>
                                </div>
                                <input type="range" id="activity" min="0" max="180" value={inputs.activity} onChange={handleInputChange} className="health-slider" />
                            </div>

                            <div className="slider-group">
                                <div className="slider-label">
                                    <span>Stress Level</span>
                                    <span className="slider-val">{inputs.stress} / 10</span>
                                </div>
                                <input type="range" id="stress" min="0" max="10" value={inputs.stress} onChange={handleInputChange} className="health-slider" />
                            </div>

                            <div className="slider-group">
                                <div className="slider-label">
                                    <span>Daily Sugar</span>
                                    <span className="slider-val">{inputs.sugar} g</span>
                                </div>
                                <input type="range" id="sugar" min="0" max="200" value={inputs.sugar} onChange={handleInputChange} className="health-slider" />
                            </div>

                            <div className="slider-group">
                                <div className="slider-label">
                                    <span>Screen Time</span>
                                    <span className="slider-val">{inputs.screen} hrs</span>
                                </div>
                                <input type="range" id="screen" min="1" max="16" value={inputs.screen} onChange={handleInputChange} className="health-slider" />
                            </div>
                        </div>

                        {/* Change Indicators */}
                        <div className="glass-card risk-change-card">
                            <h3>Impact Assessment</h3>
                            <div className="risk-change-grid">
                                {[
                                    { id: 'health', label: 'Health Score', val: metrics.health, base: baselineMetrics.health, goodUp: true },
                                    { id: 'heart', label: 'Heart Risk', val: metrics.heart, base: baselineMetrics.heart, goodUp: false },
                                    { id: 'stress', label: 'Stress Index', val: metrics.stress, base: baselineMetrics.stress, goodUp: false },
                                    { id: 'energy', label: 'Energy Index', val: metrics.energy, base: baselineMetrics.energy, goodUp: true }
                                ].map(m => {
                                    const diff = m.val - m.base
                                    const isGood = m.goodUp ? diff > 0 : diff < 0
                                    return (
                                        <div key={m.id} className="risk-change-item">
                                            <span className="label">{m.label}</span>
                                            <div className="value-wrap">
                                                <span className="val">{m.val}%</span>
                                                <span className={`delta ${diff === 0 ? 'stable' : isGood ? 'good' : 'bad'}`}>
                                                    {diff === 0 ? '— Baseline' : `${diff > 0 ? '↑' : '↓'} ${Math.abs(diff)}%`}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Forecasts Side */}
                    <div className="simulator-forecasts">
                        {renderChart('healthScoreChart', 'Health Trajectory', projectValues(metrics.health, 5, healthTrend), 100, 'var(--gradient-green-cyan)')}
                        {renderChart('heartRiskChart', 'Cardiovascular Risk', projectValues(metrics.heart, 4, heartTrend), 80, 'var(--gradient-red-amber)')}
                        {renderChart('stressForecastChart', 'Brain Stress Forecast', projectValues(metrics.stress, 6, stressTrend), 100, 'var(--gradient-amber-red)')}
                        {renderChart('energyPredictionChart', 'Metabolic Energy', projectValues(metrics.energy, 4, energyTrend), 100, 'var(--gradient-purple-cyan)')}
                    </div>
                </div>
            </section>

            {/* Decision Simulator Section */}
            <section className="section" id="decision-sim">
                <div style={{ textAlign: 'center' }}>
                    <span className="section-label">🎯 Action Items</span>
                    <h2 className="section-title">Decision <span className="gradient-text">Impact Lab</span></h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>Select potential lifestyle adjustments to see their projected long-term impact on your digital twin.</p>
                </div>

                <div className="decision-grid">
                    {Object.values(decisionScenarios).map(s => (
                        <div
                            key={s.id}
                            className={`glass-card decision-card ${activeDecisions.has(s.id) ? 'active' : ''}`}
                            onClick={() => toggleDecision(s.id)}
                        >
                            <div className="decision-icon">{s.icon}</div>
                            <h3>{s.label}</h3>
                            <p>{s.desc}</p>

                            <div className="decision-impact-mini">
                                {['heart', 'stress', 'energy', 'score'].map(m => (
                                    <div key={m} className="mini-impact-bar-group">
                                        <div className="bars">
                                            <div className="bar current" style={{ height: `${(s.current[m] / (m === 'heart' ? 50 : 100)) * 100}%` }}></div>
                                            <div className="bar future" style={{ height: `${(activeDecisions.has(s.id) ? s.future[m] : s.current[m]) / (m === 'heart' ? 50 : 100) * 100}%` }}></div>
                                        </div>
                                        <span className="mini-label">{m}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Simulator
