
import React, { useState, useCallback } from 'react';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import YouTuberDashboardPage from './pages/YouTuberDashboardPage';
import { Page, User, UserRole } from './types';
import RulesPage from './pages/RulesPage';
import FAQPage from './pages/FAQPage';
import LegalPage from './pages/LegalPage';
import { useTheme } from './contexts/ThemeContext';

const App: React.FC = () => {
    const { theme } = useTheme();
    const [currentPage, setCurrentPage] = useState<Page>('landing');
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const navigate = useCallback((page: Page) => {
        window.scrollTo(0, 0);
        setCurrentPage(page);
    }, []);
    
    // Simulate login
    const handleLogin = (role: UserRole) => {
        const user: User = {
            name: "Alex Doe",
            email: "alex.doe@example.com",
            role: role,
            package: 'Gold',
            referrals: 23,
            balance: 12500,
            withdrawalStatus: 'Eligible in 5 days'
        };
        setCurrentUser(user);
        if (role === 'viewer') {
            navigate('dashboard');
        } else {
            navigate('youtuber-dashboard');
        }
    };
    
    const handleLogout = () => {
        setCurrentUser(null);
        navigate('landing');
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'landing':
                return <LandingPage navigate={navigate} />;
            case 'auth':
                return <AuthPage navigate={navigate} onLogin={handleLogin} />;
            case 'dashboard':
                return <DashboardPage user={currentUser} onLogout={handleLogout} navigate={navigate}/>;
            case 'youtuber-dashboard':
                return <YouTuberDashboardPage user={currentUser} onLogout={handleLogout} navigate={navigate} />;
            case 'rules':
                return <RulesPage navigate={navigate} />;
            case 'faq':
                return <FAQPage navigate={navigate} />;
            case 'terms':
                return <LegalPage type="terms" navigate={navigate} />;
            case 'privacy':
                return <LegalPage type="privacy" navigate={navigate} />;
            default:
                return <LandingPage navigate={navigate} />;
        }
    };

    return <div className={`min-h-screen transition-colors duration-200 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>{renderPage()}</div>;
};

export default App;
