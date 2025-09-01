
import { Package, FAQItem, Testimonial } from './types';

export const PACKAGES: Package[] = [
    { name: 'Bronze', price: 500, videosPerDay: 2, referralBonus: 100, referralWithdrawalBonus: 2.5, color: 'border-yellow-600' },
    { name: 'Silver', price: 2000, videosPerDay: 8, referralBonus: 400, referralWithdrawalBonus: 2.5, color: 'border-gray-400' },
    { name: 'Gold', price: 5000, videosPerDay: 20, referralBonus: 1000, referralWithdrawalBonus: 2.5, color: 'border-yellow-400', popular: true },
    { name: 'Diamond', price: 7000, videosPerDay: 30, referralBonus: 1500, referralWithdrawalBonus: 2.5, color: 'border-blue-400' },
];

export const FAQS: FAQItem[] = [
    {
        question: "How do I start earning?",
        answer: "Simply sign up, choose a package, and once your payment is verified by our admin, you can start watching your daily assigned videos to earn."
    },
    {
        question: "What are the payment methods for registration?",
        answer: "We accept payments through JazzCash, EasyPaisa, and direct Bank Transfer. You must submit a screenshot and Transaction ID for verification."
    },
    {
        question: "When can I withdraw my earnings?",
        answer: "You are eligible to make your first withdrawal request 20 days after your account activation. Subsequent withdrawals can be made according to the platform's policy."
    },
    {
        question: "How does the referral system work?",
        answer: "Share your unique referral link. When someone signs up using your link and activates their account, you earn a direct bonus based on your package. You also get a 2.5% commission from their withdrawals."
    },
    {
        question: "What happens if I submit a fake payment proof?",
        answer: "Submitting fake or edited payment proofs is a serious violation of our policy. Such actions will result in a permanent ban from the platform without any warning."
    }
];

export const TESTIMONIALS: Testimonial[] = [
    {
        name: 'Ahmed Khan',
        role: 'Gold Member',
        text: 'This platform is a game-changer! I easily earn a decent side income just by watching a few videos in my spare time. The withdrawal process was smooth too.',
        avatar: 'https://picsum.photos/100/100?random=1'
    },
    {
        name: 'Fatima Ali',
        role: 'YouTuber',
        text: 'I was looking for a way to get genuine engagement on my new videos, and this service delivered. The views I got were from real people, and it helped boost my channel.',
        avatar: 'https://picsum.photos/100/100?random=2'
    },
    {
        name: 'Usman Sharif',
        role: 'Diamond Member',
        text: 'The referral system is amazing! I have built a small team, and the passive income from commissions is fantastic. Highly recommend for anyone looking to earn online.',
        avatar: 'https://picsum.photos/100/100?random=3'
    }
];
