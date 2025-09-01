
import React, { useState } from 'react';
import { Page, User } from '../types';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label } from '../components/ui/shadcn';
import { useTheme } from '../contexts/ThemeContext';

interface DashboardPageProps {
    user: User | null;
    onLogout: () => void;
    navigate: (page: Page) => void;
}

type DashboardView = 'overview' | 'tasks' | 'referrals' | 'withdraw' | 'history';

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
            className="w-full justify-start text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
        >
            {theme === 'light' ? (
                <>
                    <MoonIcon className="h-5 w-5 mr-3" />
                    <span>Dark Mode</span>
                </>
            ) : (
                <>
                    <SunIcon className="h-5 w-5 mr-3" />
                    <span>Light Mode</span>
                </>
            )}
        </Button>
    );
};

const Sidebar: React.FC<{ view: DashboardView, setView: (view: DashboardView) => void, onLogout: () => void, navigate: (page: Page) => void }> = ({ view, setView, onLogout, navigate }) => {
    const navItems = [
        { id: 'overview', label: 'Overview', icon: '📊' },
        { id: 'tasks', label: 'Daily Tasks', icon: '📱' },
        { id: 'referrals', label: 'Referrals', icon: '👥' },
        { id: 'withdraw', label: 'Withdraw', icon: '💰' },
        { id: 'history', label: 'Payment History', icon: '📋' },
    ];
    return (
        <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-6 flex flex-col shadow-lg">
            <div className="flex items-center space-x-3 mb-8 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('landing')}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 8-4 4 4 4" /><path d="M20 12H8" /></svg>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">VidCash</span>
            </div>
            <nav className="flex-grow space-y-2">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setView(item.id as DashboardView)}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium flex items-center space-x-3 ${
                            view === item.id 
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg' 
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                        }`}
                    >
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>
            <div className="mt-auto space-y-3">
                <ThemeToggle />
                <Button 
                    variant="ghost" 
                    className="w-full justify-start text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white" 
                    onClick={onLogout}
                >
                    🚪 Logout
                </Button>
            </div>
        </div>
    );
};

const DashboardPage: React.FC<DashboardPageProps> = ({ user, onLogout, navigate }) => {
    const [view, setView] = useState<DashboardView>('overview');
    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    const renderView = () => {
        switch(view) {
            case 'overview': return <Overview user={user} />;
            case 'tasks': return <DailyTasks />;
            case 'referrals': return <Referrals />;
            case 'withdraw': return <Withdraw user={user}/>;
            case 'history': return <PaymentHistory />;
            default: return <Overview user={user} />;
        }
    }

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar view={view} setView={setView} onLogout={onLogout} navigate={navigate}/>
            <main className="flex-1 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Hello, {user.name}! 👋</h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">Welcome to your dashboard.</p>
                    </div>
                    {renderView()}
                </div>
            </main>
        </div>
    );
};

const Overview: React.FC<{ user: User }> = ({ user }) => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-0 shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white">Account Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-lg">
                    <Label className="text-gray-600 dark:text-gray-400 text-sm">Package</Label>
                    <p className="font-bold text-2xl text-cyan-500 mt-1">{user.package}</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-lg">
                    <Label className="text-gray-600 dark:text-gray-400 text-sm">Referrals</Label>
                    <p className="font-bold text-2xl text-green-600 dark:text-green-400 mt-1">{user.referrals}</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg">
                    <Label className="text-gray-600 dark:text-gray-400 text-sm">Current Balance</Label>
                    <p className="font-bold text-2xl text-purple-600 dark:text-purple-400 mt-1">{user.balance.toLocaleString()} PKR</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700 rounded-lg">
                    <Label className="text-gray-600 dark:text-gray-400 text-sm">Withdrawal Status</Label>
                    <p className="font-bold text-lg text-orange-600 dark:text-orange-400 mt-1">{user.withdrawalStatus}</p>
                </div>
            </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white">Today's Progress</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-center mb-4">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">3 / 20</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Videos Watched</p>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-500" style={{width: '15%'}}></div>
                </div>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">17 videos remaining</p>
            </CardContent>
        </Card>
    </div>
);

const DailyTasks: React.FC = () => {
    const videos = Array.from({ length: 20 }, (_, i) => ({ 
        id: i + 1, 
        title: `Promotional Video ${i + 1}`, 
        watched: i < 3,
        duration: Math.floor(Math.random() * 3) + 1,
        earnings: Math.floor(Math.random() * 10) + 5
    }));
    
    const watchedCount = videos.filter(v => v.watched).length;
    const totalEarnings = videos.filter(v => v.watched).reduce((sum, v) => sum + v.earnings, 0);
    
    return (
        <Card className="border-0 shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white">Daily Tasks</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                    Watch videos to earn. You have {20 - watchedCount} videos left for today.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{watchedCount}/20</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Videos Watched</p>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">{totalEarnings} PKR</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Earned Today</p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">17</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Remaining</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {videos.map(video => (
                        <div key={video.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">{video.title}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{video.duration} min • {video.earnings} PKR</p>
                                </div>
                                <div className={`w-3 h-3 rounded-full ${video.watched ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                            </div>
                            <Button 
                                size="sm" 
                                disabled={video.watched}
                                className={video.watched ? 'bg-green-500 text-white' : 'bg-cyan-500 hover:bg-cyan-600 text-white'}
                            >
                                {video.watched ? '✓ Watched' : 'Watch Now'}
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

const Referrals: React.FC = () => {
    const [copied, setCopied] = useState(false);
    
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText('https://vidcash.com/ref/alex123');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <Card className="border-0 shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white">Referral System</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                    Invite friends and earn bonuses for each successful referral
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg mb-6">
                    <Label className="text-gray-700 dark:text-gray-300 text-sm font-medium">Your Referral Link</Label>
                    <div className="flex items-center space-x-2 mt-2">
                        <Input 
                            readOnly 
                            value="https://vidcash.com/ref/alex123" 
                            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                        />
                        <Button 
                            onClick={handleCopy}
                            className="bg-cyan-500 hover:bg-cyan-600 text-white min-w-[80px]"
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </Button>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-lg">
                        <p className="text-3xl font-bold text-green-600 dark:text-green-400">23</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Referrals</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg">
                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">18</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Active Referrals</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-lg">
                        <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">3,450 PKR</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Commission Earned</p>
                    </div>
                </div>
                
                <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Your Team</h4>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="p-3 text-left text-gray-700 dark:text-gray-300">User</th>
                                <th className="p-3 text-left text-gray-700 dark:text-gray-300">Join Date</th>
                                <th className="p-3 text-left text-gray-700 dark:text-gray-300">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="p-3 text-gray-900 dark:text-white">user1@example.com</td>
                                <td className="p-3 text-gray-600 dark:text-gray-400">2023-10-15</td>
                                <td className="p-3"><span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs">Active</span></td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="p-3 text-gray-900 dark:text-white">user2@example.com</td>
                                <td className="p-3 text-gray-600 dark:text-gray-400">2023-10-12</td>
                                <td className="p-3"><span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs">Active</span></td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="p-3 text-gray-900 dark:text-white">user3@example.com</td>
                                <td className="p-3 text-gray-600 dark:text-gray-400">2023-10-11</td>
                                <td className="p-3"><span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full text-xs">Inactive</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
};

const Withdraw: React.FC<{ user: User }> = ({ user }) => {
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('JazzCash');
    const [accountNumber, setAccountNumber] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || !accountNumber) return;
        
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        // Reset form
        setAmount('');
        setAccountNumber('');
    };

    return (
        <Card className="border-0 shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white">Withdraw Earnings</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                    Your current balance is <span className="font-semibold text-green-600 dark:text-green-400">{user.balance.toLocaleString()} PKR</span>.
                </CardDescription>
            </CardHeader>
            <CardContent className="max-w-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label className="text-gray-700 dark:text-gray-300">Amount (PKR)</Label>
                        <Input 
                            type="number"
                            placeholder="Enter amount to withdraw" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            min="100"
                            max={user.balance}
                            className="h-12"
                        />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Minimum withdrawal: 100 PKR
                        </p>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-gray-700 dark:text-gray-300">Payment Method</Label>
                        <select 
                            value={method}
                            onChange={(e) => setMethod(e.target.value)}
                            className="flex h-12 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        >
                            <option value="JazzCash">JazzCash</option>
                            <option value="EasyPaisa">EasyPaisa</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-gray-700 dark:text-gray-300">Account Number</Label>
                        <Input 
                            placeholder="Your account number" 
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            className="h-12"
                        />
                    </div>
                    <Button 
                        type="submit"
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 h-12" 
                        disabled={user.withdrawalStatus !== 'Eligible' || isSubmitting}
                    >
                        {isSubmitting ? 'Processing...' : 'Request Withdrawal'}
                    </Button>
                    {user.withdrawalStatus !== 'Eligible' && (
                        <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                            <p className="text-sm text-red-600 dark:text-red-400">{user.withdrawalStatus}</p>
                        </div>
                    )}
                </form>
            </CardContent>
        </Card>
    );
};

const PaymentHistory: React.FC = () => (
    <Card className="border-0 shadow-lg">
        <CardHeader>
            <CardTitle className="text-xl text-gray-900 dark:text-white">Payment History</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
                Track all your deposits and withdrawals
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th className="p-3 text-left text-gray-700 dark:text-gray-300 font-medium">Date</th>
                            <th className="p-3 text-left text-gray-700 dark:text-gray-300 font-medium">Type</th>
                            <th className="p-3 text-left text-gray-700 dark:text-gray-300 font-medium">Amount</th>
                            <th className="p-3 text-left text-gray-700 dark:text-gray-300 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="p-3 text-gray-900 dark:text-white">2023-10-20</td>
                            <td className="p-3 text-gray-600 dark:text-gray-400">Withdrawal</td>
                            <td className="p-3 font-semibold text-gray-900 dark:text-white">5,000 PKR</td>
                            <td className="p-3">
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full text-xs">
                                    Pending
                                </span>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="p-3 text-gray-900 dark:text-white">2023-09-28</td>
                            <td className="p-3 text-gray-600 dark:text-gray-400">Withdrawal</td>
                            <td className="p-3 font-semibold text-gray-900 dark:text-white">7,500 PKR</td>
                            <td className="p-3">
                                <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs">
                                    Approved
                                </span>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="p-3 text-gray-900 dark:text-white">2023-09-01</td>
                            <td className="p-3 text-gray-600 dark:text-gray-400">Deposit</td>
                            <td className="p-3 font-semibold text-gray-900 dark:text-white">5,000 PKR</td>
                            <td className="p-3">
                                <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs">
                                    Approved
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </CardContent>
    </Card>
);

export default DashboardPage;
