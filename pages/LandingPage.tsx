
import React from 'react';
import { Page, Package } from '../types';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label } from '../components/ui/shadcn';
import { PACKAGES, TESTIMONIALS } from '../constants';

// Utility function to merge tailwind classes
const cn = (...classes: (string | undefined | null | false)[]) => {
    return classes.filter(Boolean).join(' ');
};

interface LandingPageProps {
    navigate: (page: Page) => void;
}

const HeroSection: React.FC<{ navigate: (page: Page) => void }> = ({ navigate }) => (
    <section className="py-20 md:py-32 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto max-w-7xl text-center px-4">
            <div className="animate-fade-in-up">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-gray-900 dark:text-white">
                    Get Paid to Watch Videos. <br />
                    <span className="text-cyan-500">Boost Your YouTube Channel.</span>
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
                    The ultimate platform connecting viewers who want to earn with creators who need engagement. Simple tasks, real rewards, and authentic growth.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                    <Button size="lg" onClick={() => navigate('auth')} className="btn-primary animate-pulse-glow">
                        Start Earning Now
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => navigate('auth')} className="hover:bg-cyan-50 dark:hover:bg-gray-800">
                        Promote My Video
                    </Button>
                </div>
            </div>
        </div>
    </section>
);


const FeaturesSection: React.FC = () => {
    const features = [
        { 
            title: 'Daily Tasks', 
            description: 'Watch a set number of videos each day based on your package and earn instantly.',
            icon: '📱'
        },
        { 
            title: 'Powerful Referrals', 
            description: 'Invite friends and build your team to earn direct bonuses and lifetime commissions.',
            icon: '👥'
        },
        { 
            title: 'Secure Withdrawals', 
            description: 'Easily withdraw your earnings through JazzCash, EasyPaisa, or Bank Transfer.',
            icon: '💰'
        },
        { 
            title: 'Real Engagement', 
            description: 'For YouTubers, get real views from an active user base to boost your channel rankings.',
            icon: '📈'
        },
    ];
    return (
        <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">How It Works</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">Simple, transparent, and effective for everyone.</p>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="card-hover text-center border-0 shadow-lg">
                            <CardHeader className="pb-4">
                                <div className="text-4xl mb-2">{feature.icon}</div>
                                <CardTitle className="text-xl">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

const PackageCard: React.FC<{ pkg: Package, navigate: (page: Page) => void }> = ({ pkg, navigate }) => (
    <Card className={cn('flex flex-col', pkg.popular ? `${pkg.color} border-2 relative` : `border-border dark:border-dark-border`)}>
        {pkg.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-white px-3 py-1 text-sm font-semibold rounded-full">
                Most Popular
            </div>
        )}
        <CardHeader className="items-center">
            <CardTitle className="text-cyan-500">{pkg.name}</CardTitle>
            <p className="text-4xl font-bold">
                {pkg.price} <span className="text-lg font-medium text-muted-foreground dark:text-dark-muted-foreground">PKR</span>
            </p>
        </CardHeader>
        <CardContent className="flex-grow">
            <ul className="space-y-3 text-sm text-muted-foreground dark:text-dark-muted-foreground">
                <li className="flex items-center"><span className="font-semibold text-foreground dark:text-dark-foreground mr-2">{pkg.videosPerDay}</span> Videos/Day</li>
                <li className="flex items-center"><span className="font-semibold text-foreground dark:text-dark-foreground mr-2">{pkg.referralBonus} PKR</span> per Referral</li>
                <li className="flex items-center"><span className="font-semibold text-foreground dark:text-dark-foreground mr-2">{pkg.referralWithdrawalBonus}%</span> from Referral Withdrawals</li>
            </ul>
        </CardContent>
        <CardFooter>
            <Button onClick={() => navigate('auth')} className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
                Choose Plan
            </Button>
        </CardFooter>
    </Card>
);

const PackagesSection: React.FC<{ navigate: (page: Page) => void }> = ({ navigate }) => (
    <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Our Packages</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">Choose the plan that's right for you and start earning.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {PACKAGES.map((pkg) => (
                    <PackageCard key={pkg.name} pkg={pkg} navigate={navigate} />
                ))}
            </div>
        </div>
    </section>
);

const TestimonialsSection: React.FC = () => (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">What Our Users Say</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">Real stories from our community members.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {TESTIMONIALS.map((testimonial, index) => (
                    <Card key={index} className="flex flex-col card-hover border-0 shadow-lg">
                        <CardContent className="pt-6 flex-grow">
                            <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.text}"</p>
                        </CardContent>
                        <CardFooter className="mt-4">
                            <img src={testimonial.avatar} alt={testimonial.name} className="h-12 w-12 rounded-full mr-4 ring-2 ring-cyan-200" />
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                                <p className="text-sm text-cyan-600 dark:text-cyan-400">{testimonial.role}</p>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    </section>
);

const ContactSection: React.FC = () => (
    <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-3xl px-4">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Get in Touch</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">Have questions? We'd love to hear from you.</p>
            </div>
            <Card className="mt-12 border-0 shadow-xl">
                <CardContent className="p-8">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Name</Label>
                                <Input id="name" placeholder="Your Name" className="h-12" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                                <Input id="email" type="email" placeholder="Your Email" className="h-12" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message" className="text-gray-700 dark:text-gray-300">Message</Label>
                            <textarea 
                                id="message" 
                                placeholder="Your message..." 
                                className="flex min-h-[120px] w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                            ></textarea>
                        </div>
                        <Button type="submit" className="w-full btn-primary h-12 text-lg">
                            Send Message
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    </section>
);


const LandingPage: React.FC<LandingPageProps> = ({ navigate }) => {
    return (
        <>
            <Header navigate={navigate} />
            <main>
                <HeroSection navigate={navigate} />
                <FeaturesSection />
                <PackagesSection navigate={navigate} />
                <TestimonialsSection />
                <ContactSection />
            </main>
            <Footer navigate={navigate} />
        </>
    );
};




export default LandingPage;