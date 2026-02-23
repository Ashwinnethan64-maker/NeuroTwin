import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Dashboard from './pages/Dashboard'
import Simulator from './pages/Simulator'
import ProfilePage from './pages/ProfilePage'
import ProtectedRoute from './components/ProtectedRoute'

const Placeholder = ({ name }) => (
    <div style={{
        color: "white",
        backgroundColor: "#0d1222",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, sans-serif"
    }}>
        <h1>🧬 {name} Loading...</h1>
    </div>
)

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('isLoggedIn') === 'true'
    )
    const [user, setUser] = useState(() => {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
        if (loggedIn) {
            return {
                name: localStorage.getItem('userName'),
                picture: localStorage.getItem('userAvatar'),
                email: localStorage.getItem('userEmail') // Keep email for profile page
            }
        }
        return null
    })
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        console.log("App Rendered Successfully")
        console.log("Auth State:", localStorage.getItem("isLoggedIn"))
        console.log("User Data:", user)

        // Scroll to top on route change
        window.scrollTo(0, 0)
    }, [location.pathname, user])

    const handleLogin = (userData) => {
        setIsAuthenticated(true)
        setUser(userData)
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('userName', userData.name)
        localStorage.setItem('userAvatar', userData.picture || '')
        localStorage.setItem('userEmail', userData.email || '')
    }

    const handleGoogleLogin = (credentialResponse) => {
        try {
            const base64Url = credentialResponse.credential.split('.')[1]
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            }).join(''))

            const userData = JSON.parse(jsonPayload)
            const mappedUser = {
                name: userData.name,
                email: userData.email,
                picture: userData.picture
            }
            handleLogin(mappedUser)
        } catch (error) {
            console.error('Error decoding Google JWT:', error)
        }
    }

    const handleLogout = () => {
        setIsAuthenticated(false)
        setUser(null)
        localStorage.clear()
        if (window.google) {
            window.google.accounts.id.disableAutoSelect()
        }
        navigate('/')
    }

    return (
        <div className="app-container">
            <Navbar isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage onLogin={handleLogin} onGoogleLogin={handleGoogleLogin} />} />
                <Route path="/signup" element={<SignupPage onLogin={handleLogin} onGoogleLogin={handleGoogleLogin} />} />

                <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/simulator" element={<Simulator />} />
                    <Route path="/profile" element={<ProfilePage user={user} onUpdate={handleLogin} />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    )
}

export default App
