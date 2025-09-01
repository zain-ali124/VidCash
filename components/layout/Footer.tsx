
import React from 'react';
import { Page } from '../../types';

interface FooterProps {
    navigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ navigate }) => {
    const footerLinks = [
        { name: 'Rules', page: 'rules' },
        { name: 'FAQ', page: 'faq' },
        { name: 'Terms & Conditions', page: 'terms' },
        { name: 'Privacy Policy', page: 'privacy' },
    ];
    return (
        <footer className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto max-w-7xl px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <div className="flex items-center space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m12 8-4 4 4 4" />
                                <path d="M20 12H8" />
                            </svg>
                            <div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">VidCash</span>
                                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Earn by Watching</p>
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            Earn money by watching videos. Promote your content to a real audience. Join thousands of users who are already earning daily.
                        </p>
                    </div>
                    <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Platform</h4>
                            <ul className="space-y-3">
                                {footerLinks.slice(0, 2).map(link => (
                                    <li key={link.name}>
                                        <span 
                                            onClick={() => navigate(link.page as Page)} 
                                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 cursor-pointer transition-colors duration-200"
                                        >
                                            {link.name}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h4>
                            <ul className="space-y-3">
                                {footerLinks.slice(2, 4).map(link => (
                                    <li key={link.name}>
                                        <span 
                                            onClick={() => navigate(link.page as Page)} 
                                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 cursor-pointer transition-colors duration-200"
                                        >
                                            {link.name}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h4>
                            <div className="space-y-3">
                                <p className="text-sm text-gray-600 dark:text-gray-400">contact@vidcash.com</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">+92 300 1234567</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">24/7 Support</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        &copy; {new Date().getFullYear()} VidCash. All rights reserved. | Made with ❤️ for the community
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
