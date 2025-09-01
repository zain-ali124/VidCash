
export type Page = 'landing' | 'auth' | 'dashboard' | 'youtuber-dashboard' | 'rules' | 'faq' | 'terms' | 'privacy';

export type AuthStep = 'login' | 'signup' | 'verify' | 'package' | 'payment';

export type UserRole = 'viewer' | 'youtuber';

export interface Package {
    name: string;
    price: number;
    videosPerDay: number;
    referralBonus: number;
    referralWithdrawalBonus: number;
    color: string;
    popular?: boolean;
}

export interface User {
    name: string;
    email: string;
    role: UserRole;
    package: 'Bronze' | 'Silver' | 'Gold' | 'Diamond';
    referrals: number;
    balance: number;
    withdrawalStatus: string;
}

export type PaymentMethod = 'JazzCash' | 'EasyPaisa' | 'Bank';

export interface FAQItem {
    question: string;
    answer: string;
}

export interface Testimonial {
    name: string;
    role: string;
    text: string;
    avatar: string;
}
