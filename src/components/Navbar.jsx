import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = ({ isAuthenticated, user, onLogout }) => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('home')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const dropdownRef = useRef(null)

    useEffect(() => {
        console.log("Navbar: Scroll listener attached")
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // ScrollSpy Logic
    useEffect(() => {
        if (location.pathname !== '/') {
            setActiveSection('')
            return
        }

        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        }

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id)
                }
            })
        }

        const observer = new IntersectionObserver(observerCallback, observerOptions)
        const sections = ['home', 'features', 'why']
        sections.forEach(id => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [location.pathname])

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const handleLinkClick = (e, targetId) => {
        setIsMobileMenuOpen(false)
        if (targetId && location.pathname !== '/') {
            e.preventDefault()
            navigate('/#' + targetId)
        }
    }

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
            <Link to="/" className="nav-brand" style={{ textDecoration: 'none' }} onClick={(e) => handleLinkClick(e, 'home')}>
                <div className="icon">🧬</div>
                <span>HealthTwin AI</span>
            </Link>

            <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                {location.pathname === '/' ? (
                    <>
                        <li><a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={(e) => handleLinkClick(e, 'home')}>Home</a></li>
                        <li><a href="#features" className={activeSection === 'features' ? 'active' : ''} onClick={(e) => handleLinkClick(e, 'features')}>Features</a></li>
                        <li><a href="#why" className={activeSection === 'why' ? 'active' : ''} onClick={(e) => handleLinkClick(e, 'why')}>Why HealthTwin</a></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/" onClick={(e) => handleLinkClick(e, 'home')}>Home</Link></li>
                        <li><Link to="/#features" onClick={(e) => handleLinkClick(e, 'features')}>Features</Link></li>
                        <li><Link to="/#why" onClick={(e) => handleLinkClick(e, 'why')}>Why HealthTwin</Link></li>
                    </>
                )}

                {isAuthenticated ? (
                    <>
                        <li className="nav-profile" ref={dropdownRef}>
                            <div
                                className={`profile-trigger ${isDropdownOpen ? 'active' : ''}`}
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <div className="user-avatar-container">
                                    {localStorage.getItem('userAvatar') ? (
                                        <img
                                            src={localStorage.getItem('userAvatar')}
                                            alt={localStorage.getItem('userName') || 'User'}
                                            className="user-avatar"
                                            onError={(e) => {
                                                console.error("Avatar failed to load, fallback to initial")
                                                e.target.style.display = 'none'
                                                e.target.nextSibling.style.display = 'flex'
                                            }}
                                        />
                                    ) : null}
                                    <div className="user-avatar-placeholder" style={{ display: localStorage.getItem('userAvatar') ? 'none' : 'flex' }}>
                                        {localStorage.getItem('userName')?.charAt(0) || 'U'}
                                    </div>
                                </div>
                                <div className="user-info">
                                    <span className="user-name">
                                        {localStorage.getItem('userName')?.split(' ')[0] || 'User'}
                                    </span>
                                    <span className="dropdown-arrow">
                                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            <div className={`dropdown-menu ${isDropdownOpen ? 'active' : ''}`}>
                                <Link to="/dashboard" className="dropdown-item" onClick={() => { setIsDropdownOpen(false); handleLinkClick(); }}>
                                    <i>📊</i> Dashboard
                                </Link>
                                <Link to="/profile" className="dropdown-item" onClick={() => { setIsDropdownOpen(false); handleLinkClick(); }}>
                                    <i>⚙️</i> Profile Settings
                                </Link>
                                <div className="dropdown-divider"></div>
                                <button className="dropdown-item logout" onClick={() => { setIsDropdownOpen(false); onLogout(); handleLinkClick(); }}>
                                    <i>🚪</i> Logout
                                </button>
                            </div>
                        </li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login" className="nav-cta" onClick={handleLinkClick}>Login</Link></li>
                        <li><Link to="/signup" className="nav-cta nav-cta-outline" onClick={handleLinkClick}>Sign Up</Link></li>
                    </>
                )}
            </ul>

            <button className={`mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu} aria-label="Toggle navigation">
                <span></span><span></span><span></span>
            </button>
        </nav>
    )
}

export default Navbar
