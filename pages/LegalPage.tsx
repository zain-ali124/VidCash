
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Page } from '../types';

interface LegalPageProps {
    type: 'terms' | 'privacy';
    navigate: (page: Page) => void;
}

const LegalPage: React.FC<LegalPageProps> = ({ type, navigate }) => {
    const content = {
        terms: {
            title: "Terms & Conditions",
            body: [
                {
                    heading: "1. Introduction",
                    text: "Welcome to VidCash. These terms and conditions outline the rules and regulations for the use of VidCash's Website. By accessing this website we assume you accept these terms and conditions. Do not continue to use VidCash if you do not agree to take all of the terms and conditions stated on this page."
                },
                {
                    heading: "2. License",
                    text: "Unless otherwise stated, VidCash and/or its licensors own the intellectual property rights for all material on VidCash. All intellectual property rights are reserved. You may access this from VidCash for your own personal use subjected to restrictions set in these terms and conditions."
                },
                {
                    heading: "3. User Account",
                    text: "You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account or password."
                },
            ]
        },
        privacy: {
            title: "Privacy Policy",
            body: [
                {
                    heading: "1. Information We Collect",
                    text: "We collect information you provide directly to us, such as when you create an account, update your profile, use the interactive features of our services, and communicate with us. The types of information we may collect include your name, email address, phone number, and any other information you choose to provide."
                },
                {
                    heading: "2. How We Use Your Information",
                    text: "We may use the information we collect about you to provide, maintain, and improve our services, process transactions, send you technical notices, updates, security alerts, and support messages, and respond to your comments, questions, and requests and provide customer service."
                },
                {
                    heading: "3. Sharing of Information",
                    text: "We may share information about you as follows or as otherwise described in this Privacy Policy: With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf; In response to a request for information if we believe disclosure is in accordance with any applicable law, regulation or legal process."
                },
            ]
        }
    };
    
    const pageContent = content[type];

    return (
        <>
            <Header navigate={navigate} />
            <main className="container mx-auto max-w-4xl py-16 px-4">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">{pageContent.title}</h1>
                <p className="text-muted-foreground dark:text-dark-muted-foreground mb-12">Last updated: {new Date().toLocaleDateString()}</p>

                <div className="prose dark:prose-invert max-w-none space-y-6">
                    {pageContent.body.map((section, index) => (
                        <div key={index}>
                            <h2 className="text-2xl font-bold">{section.heading}</h2>
                            <p>{section.text}</p>
                        </div>
                    ))}
                </div>
            </main>
            <Footer navigate={navigate} />
        </>
    );
};

export default LegalPage;
