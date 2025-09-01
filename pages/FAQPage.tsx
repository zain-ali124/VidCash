
import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Page } from '../types';
import { FAQS } from '../constants';

interface FAQPageProps {
    navigate: (page: Page) => void;
}

const AccordionItem: React.FC<{ question: string; answer: string; isOpen: boolean; onClick: () => void; }> = ({ question, answer, isOpen, onClick }) => (
    <div className="border-b border-border dark:border-dark-border">
        <button
            onClick={onClick}
            className="flex justify-between items-center w-full py-5 text-left"
        >
            <span className="font-semibold text-lg">{question}</span>
            <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </span>
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 py-4' : 'max-h-0'}`}>
            <p className="text-muted-foreground dark:text-dark-muted-foreground pr-4">
                {answer}
            </p>
        </div>
    </div>
);


const FAQPage: React.FC<FAQPageProps> = ({ navigate }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <Header navigate={navigate} />
            <main className="container mx-auto max-w-4xl py-16 px-4">
                 <h1 className="text-4xl font-extrabold tracking-tight text-center mb-4">Frequently Asked Questions</h1>
                <p className="text-muted-foreground dark:text-dark-muted-foreground text-center mb-12">Find answers to the most common questions about VidCash.</p>

                <div className="w-full">
                    {FAQS.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => handleClick(index)}
                        />
                    ))}
                </div>
            </main>
            <Footer navigate={navigate} />
        </>
    );
};

export default FAQPage;
