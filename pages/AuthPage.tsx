
import React, { useState } from 'react';
import { Page, AuthStep, Package, PaymentMethod, UserRole } from '../types';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label } from '../components/ui/shadcn';
import { PACKAGES } from '../constants';

interface AuthPageProps {
    navigate: (page: Page) => void;
    onLogin: (role: UserRole) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ navigate, onLogin }) => {
    const [step, setStep] = useState<AuthStep>('login');
    const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('JazzCash');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phone: '',
        code: '',
        tid: '',
        screenshot: null as File | null
    });

    const handlePackageSelect = (pkg: Package) => {
        setSelectedPackage(pkg);
        setStep('payment');
    };

    const validateForm = (step: AuthStep) => {
        const newErrors: Record<string, string> = {};
        
        if (step === 'login' || step === 'signup') {
            if (!formData.email) newErrors.email = 'Email is required';
            else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
            
            if (!formData.password) newErrors.password = 'Password is required';
            else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
            
            if (step === 'signup' && !formData.phone) newErrors.phone = 'Phone number is required';
        }
        
        if (step === 'verify' && !formData.code) newErrors.code = 'Verification code is required';
        
        if (step === 'payment') {
            if (!formData.tid) newErrors.tid = 'Transaction ID is required';
            if (!formData.screenshot) newErrors.screenshot = 'Payment screenshot is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: string, value: string | File) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handlePaymentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm('payment')) return;
        
        setIsSubmitting(true);
        setMessage('');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            setMessage('Your payment has been submitted for verification. An admin will review it and activate your account within 24 hours. You will be notified via email.');
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 'login':
                return <LoginForm setStep={setStep} onLogin={onLogin} formData={formData} errors={errors} handleInputChange={handleInputChange} validateForm={validateForm} />;
            case 'signup':
                return <SignupForm setStep={setStep} formData={formData} errors={errors} handleInputChange={handleInputChange} validateForm={validateForm} />;
            case 'verify':
                return <VerificationForm setStep={setStep} formData={formData} errors={errors} handleInputChange={handleInputChange} validateForm={validateForm} />;
            case 'package':
                return <PackageSelectionForm onPackageSelect={handlePackageSelect} />;
            case 'payment':
                if (!selectedPackage) {
                    setStep('package');
                    return null;
                }
                return (
                    <PaymentForm
                        pkg={selectedPackage}
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                        onSubmit={handlePaymentSubmit}
                        isSubmitting={isSubmitting}
                        message={message}
                        formData={formData}
                        errors={errors}
                        handleInputChange={handleInputChange}
                    />
                );
            default:
                return <LoginForm setStep={setStep} onLogin={onLogin} formData={formData} errors={errors} handleInputChange={handleInputChange} validateForm={validateForm} />;
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8 cursor-pointer" onClick={() => navigate('landing')}>
                    <span className="text-4xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">VidCash</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Earn by Watching</p>
                </div>
                {renderStep()}
            </div>
        </div>
    );
};

// --- Child Components for each step ---

const LoginForm: React.FC<{ setStep: (step: AuthStep) => void, onLogin: (role: UserRole) => void }> = ({ setStep, onLogin }) => {
    const handleLogin = (role: UserRole) => {
        if (validateForm('login')) {
            onLogin(role);
        }
    };

    return (
        <Card className="border-0 shadow-xl">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl text-gray-900 dark:text-white">Welcome Back</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">Login to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                    <Input 
                        id="email" 
                        type="email" 
                        placeholder="m@example.com" 
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                    <Input 
                        id="password" 
                        type="password" 
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={errors.password ? 'border-red-500' : ''}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                <Button 
                    className="w-full btn-primary" 
                    onClick={() => handleLogin('viewer')}
                >
                    Login as Viewer
                </Button>
                <Button 
                    variant="outline" 
                    className="w-full hover:bg-gray-50 dark:hover:bg-gray-800" 
                    onClick={() => handleLogin('youtuber')}
                >
                    Login as YouTuber
                </Button>
                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account? <span className="text-cyan-500 cursor-pointer hover:underline" onClick={() => setStep('signup')}>Sign Up</span>
                </div>
            </CardContent>
        </Card>
    );
};

const SignupForm: React.FC<{ 
    setStep: (step: AuthStep) => void,
    formData: any,
    errors: any,
    handleInputChange: (field: string, value: string | File) => void,
    validateForm: (step: AuthStep) => boolean
}> = ({ setStep, formData, errors, handleInputChange, validateForm }) => {
    const handleContinue = () => {
        if (validateForm('signup')) {
            setStep('verify');
        }
    };

    return (
        <Card className="border-0 shadow-xl">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl text-gray-900 dark:text-white">Create an Account</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">Enter your details to get started.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                    <Input 
                        id="email" 
                        type="email" 
                        placeholder="your.email@example.com" 
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={errors.email ? 'border-red-500' : ''}
                        required
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">Phone Number</Label>
                    <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="03001234567" 
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={errors.phone ? 'border-red-500' : ''}
                        required
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                    <Input 
                        id="password" 
                        type="password" 
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={errors.password ? 'border-red-500' : ''}
                        required
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                <Button 
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3" 
                    onClick={handleContinue}
                >
                    Continue
                </Button>
                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account? <span className="text-cyan-500 cursor-pointer hover:underline" onClick={() => setStep('login')}>Login</span>
                </div>
            </CardContent>
        </Card>
    );
};

const VerificationForm: React.FC<{ 
    setStep: (step: AuthStep) => void,
    formData: any,
    errors: any,
    handleInputChange: (field: string, value: string | File) => void,
    validateForm: (step: AuthStep) => boolean
}> = ({ setStep, formData, errors, handleInputChange, validateForm }) => {
    const handleVerify = () => {
        if (validateForm('verify')) {
            setStep('package');
        }
    };

    return (
        <Card className="border-0 shadow-xl">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl text-gray-900 dark:text-white">Two-Step Verification</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">We've sent a code to your email. Please enter it below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="code" className="text-gray-700 dark:text-gray-300">Verification Code</Label>
                    <Input 
                        id="code" 
                        type="text" 
                        placeholder="123456" 
                        value={formData.code}
                        onChange={(e) => handleInputChange('code', e.target.value)}
                        className={errors.code ? 'border-red-500' : ''}
                    />
                    {errors.code && <p className="text-red-500 text-sm">{errors.code}</p>}
                </div>
                <Button 
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3" 
                    onClick={handleVerify}
                >
                    Verify
                </Button>
            </CardContent>
        </Card>
    );
};

const PackageSelectionForm: React.FC<{ onPackageSelect: (pkg: Package) => void }> = ({ onPackageSelect }) => (
    <Card className="max-w-4xl w-full border-0 shadow-xl">
        <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-900 dark:text-white">Choose Your Package</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">Select a package to start your earning journey.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PACKAGES.map(pkg => (
                <div 
                    key={pkg.name} 
                    className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 cursor-pointer hover:border-cyan-500 hover:shadow-lg transition-all duration-200 hover:scale-105" 
                    onClick={() => onPackageSelect(pkg)}
                >
                    <div className="text-center">
                        <h3 className="font-bold text-xl text-cyan-500 mb-2">{pkg.name}</h3>
                        <p className="font-bold text-3xl text-gray-900 dark:text-white mb-4">{pkg.price} PKR</p>
                        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                            <li className="flex items-center justify-center">
                                <span className="mr-2">📱</span>
                                {pkg.videosPerDay} videos/day
                            </li>
                            <li className="flex items-center justify-center">
                                <span className="mr-2">💰</span>
                                {pkg.referralBonus} PKR per referral
                            </li>
                            <li className="flex items-center justify-center">
                                <span className="mr-2">📊</span>
                                {pkg.referralWithdrawalBonus}% commission
                            </li>
                        </ul>
                    </div>
                </div>
            ))}
        </CardContent>
    </Card>
);

const PaymentForm: React.FC<{
    pkg: Package,
    paymentMethod: PaymentMethod,
    setPaymentMethod: (method: PaymentMethod) => void,
    onSubmit: (e: React.FormEvent) => void,
    isSubmitting: boolean,
    message: string,
    formData: any,
    errors: any,
    handleInputChange: (field: string, value: string | File) => void,
}> = ({ pkg, paymentMethod, setPaymentMethod, onSubmit, isSubmitting, message, formData, errors, handleInputChange }) => {
    const paymentDetails = {
        JazzCash: { number: '0300-1234567', name: 'VidCash Admin' },
        EasyPaisa: { number: '0300-1234567', name: 'VidCash Admin' },
        Bank: { number: '0123-4567890123', name: 'VidCash Inc.', bank: 'Meezan Bank' },
    };

    if (message) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Submission Received!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-green-600 dark:text-green-400">{message}</p>
                </CardContent>
            </Card>
        );
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Final Step: Payment</CardTitle>
                <CardDescription>Send {pkg.price} PKR to one of the accounts below to activate your <span className="font-bold text-cyan-500">{pkg.name}</span> package.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex space-x-2 mb-4">
                    {(['JazzCash', 'EasyPaisa', 'Bank'] as PaymentMethod[]).map(method => (
                        <Button key={method} variant={paymentMethod === method ? 'default' : 'outline'} onClick={() => setPaymentMethod(method)}>
                            {method}
                        </Button>
                    ))}
                </div>
                <div className="bg-secondary dark:bg-dark-secondary p-4 rounded-md text-sm mb-6">
                    <p><span className="font-semibold">Account Title:</span> {paymentDetails[paymentMethod].name}</p>
                    <p><span className="font-semibold">Account Number:</span> {paymentDetails[paymentMethod].number}</p>
                    {paymentMethod === 'Bank' && <p><span className="font-semibold">Bank Name:</span> {paymentDetails[paymentMethod].bank}</p>}
                </div>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="tid" className="text-gray-700 dark:text-gray-300">Transaction ID (TID)</Label>
                        <Input 
                            id="tid" 
                            placeholder="Enter the transaction ID" 
                            value={formData.tid}
                            onChange={(e) => handleInputChange('tid', e.target.value)}
                            className={errors.tid ? 'border-red-500' : ''}
                            required
                        />
                        {errors.tid && <p className="text-red-500 text-sm">{errors.tid}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="screenshot" className="text-gray-700 dark:text-gray-300">Payment Screenshot</Label>
                        <Input 
                            id="screenshot" 
                            type="file" 
                            onChange={(e) => handleInputChange('screenshot', e.target.files?.[0] || null)}
                            className={errors.screenshot ? 'border-red-500' : ''}
                            required 
                        />
                        {errors.screenshot && <p className="text-red-500 text-sm">{errors.screenshot}</p>}
                    </div>
                    <Button 
                        type="submit" 
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3" 
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default AuthPage;
