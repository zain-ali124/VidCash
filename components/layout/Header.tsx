
import React from 'react';
import { Page } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../ui/shadcn';

interface HeaderProps {
    navigate: (page: Page) => void;
}

const Logo: React.FC<{ navigate: (page: Page) => void }> = ({ navigate }) => (
    <div onClick={() => navigate('landing')} className="flex items-center space-x-3 cursor-pointer group">
        <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-500 group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 8-4 4 4 4" />
                <path d="M20 12H8" />
            </svg>
        </div>
        <div>
            <span className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">VidCash</span>
            <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Earn by Watching</p>
        </div>
    </div>
);

const SunIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MoonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);


const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <Button 
            onClick={toggleTheme} 
            variant="ghost" 
            size="icon"
            className="text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
            {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
        </Button>
    );
};

const Header: React.FC<HeaderProps> = ({ navigate }) => {
    const navLinks = [
        { name: 'Features', page: 'landing', section: '#features' },
        { name: 'Rules', page: 'rules' },
        { name: 'FAQ', page: 'faq' },
    ];

    const handleNavClick = (page: Page, section?: string) => {
        navigate(page);
        if (page === 'landing' && section) {
            setTimeout(() => {
                document.querySelector(section)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };
    
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 shadow-sm">
            <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                <Logo navigate={navigate} />
                <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
                    {navLinks.map(link => (
                        <span 
                            key={link.name} 
                            onClick={() => handleNavClick(link.page as Page, link.section)} 
                            className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-200 relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-200 group-hover:w-full"></span>
                        </span>
                    ))}
                </nav>
                <div className="flex items-center space-x-4">
                    <ThemeToggle />
                    <Button 
                        variant="outline" 
                        onClick={() => navigate('auth')}
                        className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                        Login
                    </Button>
                    <Button 
                        onClick={() => navigate('auth')} 
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/25"
                    >
                        Sign Up
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
