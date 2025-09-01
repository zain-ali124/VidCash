
import React, { useState } from 'react';
import { Page, User } from '../types';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label } from '../components/ui/shadcn';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '../contexts/ThemeContext';

interface YouTuberDashboardPageProps {
    user: User | null;
    onLogout: () => void;
    navigate: (page: Page) => void;
}

type YouTuberView = 'overview' | 'submit' | 'history';

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
        <Button onClick={toggleTheme} variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
        </Button>
    );
};

const YouTuberSidebar: React.FC<{ view: YouTuberView, setView: (view: YouTuberView) => void, onLogout: () => void, navigate: (page: Page) => void }> = ({ view, setView, onLogout, navigate }) => {
    const navItems = [
        { id: 'overview', label: 'Analytics' },
        { id: 'submit', label: 'Submit Video' },
        { id: 'history', label: 'Payment History' },
    ];
    return (
        <div className="w-64 bg-secondary dark:bg-dark-secondary/50 border-r border-border dark:border-dark-border p-4 flex flex-col">
            <div className="flex items-center space-x-2 mb-8 cursor-pointer" onClick={() => navigate('landing')}>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 8-4 4 4 4" /><path d="M20 12H8" /></svg>
                <span className="text-2xl font-bold">VidCash</span>
            </div>
            <nav className="flex-grow">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setView(item.id as YouTuberView)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                            view === item.id ? 'bg-cyan-500 text-white' : 'hover:bg-accent dark:hover:bg-dark-accent'
                        }`}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>
            <div className="mt-auto">
                <ThemeToggle />
                <Button variant="ghost" className="w-full justify-start mt-2" onClick={onLogout}>Logout</Button>
            </div>
        </div>
    );
};

const YouTuberDashboardPage: React.FC<YouTuberDashboardPageProps> = ({ user, onLogout, navigate }) => {
    const [view, setView] = useState<YouTuberView>('overview');
    if (!user) return <div>Loading...</div>;

    const renderView = () => {
        switch(view) {
            case 'overview': return <Analytics />;
            case 'submit': return <SubmitVideo />;
            case 'history': return <YT_PaymentHistory />;
            default: return <Analytics />;
        }
    }

    return (
        <div className="flex min-h-screen">
            <YouTuberSidebar view={view} setView={setView} onLogout={onLogout} navigate={navigate} />
            <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900/50">
                <h1 className="text-3xl font-bold mb-2">Advertiser Dashboard</h1>
                <p className="text-muted-foreground dark:text-dark-muted-foreground mb-8">Promote your content and track its performance.</p>
                {renderView()}
            </main>
        </div>
    );
};


const Analytics: React.FC = () => {
    const data = [
        { name: 'Day 1', views: 400 }, { name: 'Day 2', views: 300 },
        { name: 'Day 3', views: 500 }, { name: 'Day 4', views: 780 },
        { name: 'Day 5', views: 600 }, { name: 'Day 6', views: 800 },
        { name: 'Day 7', views: 950 },
    ];
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                 <Card>
                    <CardHeader><CardTitle>Total Views</CardTitle></CardHeader>
                    <CardContent><p className="text-3xl font-bold">12,450</p></CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle>Engagement Rate</CardTitle></CardHeader>
                    <CardContent><p className="text-3xl font-bold">78%</p></CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle>Active Campaigns</CardTitle></CardHeader>
                    <CardContent><p className="text-3xl font-bold">2</p></CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Views Over Last 7 Days</CardTitle>
                </CardHeader>
                <CardContent>
                     <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip contentStyle={{ backgroundColor: 'black', border: '1px solid #333' }} />
                                <Legend />
                                <Bar dataKey="views" fill="#06b6d4" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

const SubmitVideo: React.FC = () => (
    <Card>
        <CardHeader>
            <CardTitle>Submit New Video for Promotion</CardTitle>
            <CardDescription>Enter your video details and desired views to create a new campaign.</CardDescription>
        </CardHeader>
        <CardContent className="max-w-xl">
            <form className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="video-url">YouTube Video URL</Label>
                    <Input id="video-url" placeholder="https://www.youtube.com/watch?v=..." />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="views">Desired Views</Label>
                    <Input id="views" type="number" placeholder="e.g., 5000" />
                </div>
                <div className="p-4 bg-secondary dark:bg-dark-secondary rounded-md">
                    <p className="font-bold">Estimated Cost: <span className="text-cyan-500">2,500 PKR</span></p>
                    <p className="text-xs text-muted-foreground dark:text-dark-muted-foreground">Based on 0.5 PKR per view.</p>
                </div>
                <Button className="w-full bg-cyan-500 text-white">Proceed to Payment</Button>
            </form>
        </CardContent>
    </Card>
);

const YT_PaymentHistory: React.FC = () => (
     <Card>
        <CardHeader><CardTitle>Campaign Payment History</CardTitle></CardHeader>
        <CardContent>
            <table className="w-full text-sm text-left">
                <thead className="bg-secondary dark:bg-dark-secondary">
                    <tr><th className="p-2">Date</th><th className="p-2">Campaign</th><th className="p-2">Amount</th><th className="p-2">Status</th></tr>
                </thead>
                <tbody>
                    <tr className="border-b dark:border-dark-border"><td className="p-2">2023-10-18</td><td className="p-2">"New Gadget Review"</td><td className="p-2">2500 PKR</td><td className="p-2 text-green-500">Paid</td></tr>
                    <tr className="border-b dark:border-dark-border"><td className="p-2">2023-09-25</td><td className="p-2">"Travel Vlog Part 1"</td><td className="p-2">5000 PKR</td><td className="p-2 text-green-500">Paid</td></tr>
                </tbody>
            </table>
        </CardContent>
    </Card>
);


export default YouTuberDashboardPage;
