
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Page } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/shadcn';

interface RulesPageProps {
    navigate: (page: Page) => void;
}

const RulesPage: React.FC<RulesPageProps> = ({ navigate }) => {
    const rules = [
        {
            title: "Valid Payment Methods",
            content: "All payments for package activation must be made through our official channels: JazzCash, EasyPaisa, or Direct Bank Transfer. Payments sent to any other accounts will not be recognized."
        },
        {
            title: "Anti-Fraud Policy",
            content: "Submitting fake, edited, or fraudulent payment proofs (screenshots, transaction IDs) is strictly prohibited. Any user caught engaging in such activities will face an immediate and permanent ban from the platform without any prior warning or chance for appeal."
        },
        {
            title: "Referral Commission System",
            content: "You earn a direct bonus when a user signs up with your link and activates their package. Additionally, you will receive a 2.5% commission on all withdrawals made by your direct referrals for a lifetime."
        },
        {
            title: "Withdrawal Policies",
            content: "Users are eligible to make their first withdrawal request exactly 20 days after their account has been activated. The minimum withdrawal amount and processing times will be displayed in the withdrawal section of your dashboard."
        },
        {
            title: "Account Responsibility",
            content: "Each user is responsible for the security of their own account. Sharing account details is not permitted. Only one account is allowed per user. Creating multiple accounts to abuse the referral system will result in the suspension of all associated accounts."
        }
    ];

    return (
        <>
            <Header navigate={navigate} />
            <main className="container mx-auto max-w-4xl py-16 px-4">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">Platform Rules & Policies</h1>
                <p className="text-muted-foreground dark:text-dark-muted-foreground mb-12">Please read these rules carefully to ensure a smooth and fair experience for everyone.</p>

                <div className="space-y-6">
                    {rules.map((rule, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>{rule.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground dark:text-dark-muted-foreground">{rule.content}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
            <Footer navigate={navigate} />
        </>
    );
};

export default RulesPage;
