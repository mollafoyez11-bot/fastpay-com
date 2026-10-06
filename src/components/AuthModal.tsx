import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Lock, Mail, Phone, User, Eye, EyeOff, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { WEBSITE_NAME } from '../data/mockData';

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  onSuccess: (user: UserProfile) => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<Props> = ({ isOpen, onClose, onSuccess, initialMode = 'signup' }) => {
  const [mode, setMode] = useState<'signup' | 'login'>(initialMode);
  
  // All fields start completely empty as requested
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [refCode, setRefCode] = useState('');

  // Login fields completely empty
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [signupSuccessNote, setSignupSuccessNote] = useState(false);

  if (!isOpen) return null;

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('অনুগ্রহ করে আপনার নাম লিখুন');
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setError('অনুগ্রহ করে সঠিক মোবাইল নাম্বার প্রদান করুন (উদাঃ 017xxxxxxxx)');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('অনুগ্রহ করে সঠিক জিমেইল বা ইমেইল ঠিকানা প্রদান করুন');
      return;
    }
    if (password.length < 6) {
      setError('পাসওয়ার্ড কমপক্ষে ৬ ডিজিটের হতে হবে');
      return;
    }
    if (password !== confirmPassword) {
      setError('পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না!');
      return;
    }

    // Created user
    const newUser: UserProfile = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      password,
      referralCode: `FAST${Math.floor(1000 + Math.random() * 9000)}`,
      balance: 100.0, // Initial bonus
      totalDeposit: 0.0,
      totalWithdraw: 0.0,
      activePlan: null,
      tasksCompletedToday: 0,
      todayIncome: 0.0,
      lastTaskDate: new Date().toISOString().slice(0, 10),
      memberId: `FAST${Math.floor(1000 + Math.random() * 9000)}`,
    };

    // Store in localStorage for authentication persistence
    const existingUsers = JSON.parse(localStorage.getItem('fastpay_registered_users') || '[]');
    existingUsers.push(newUser);
    localStorage.setItem('fastpay_registered_users', JSON.stringify(existingUsers));

    // Notice per user prompt: switch to login with clean empty fields or prompt user
    setSignupSuccessNote(true);
    setLoginIdentifier(phone.trim() || email.trim());
    setLoginPassword('');
    setTimeout(() => {
      setSignupSuccessNote(false);
      setMode('login');
    }, 1200);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!loginIdentifier.trim()) {
      setError('অনুগ্রহ করে আপনার জিমেইল বা মোবাইল নাম্বার লিখুন');
      return;
    }
    if (!loginPassword) {
      setError('অনুগ্রহ করে আপনার পাসওয়ার্ড দিন');
      return;
    }

    const existingUsers: UserProfile[] = JSON.parse(localStorage.getItem('fastpay_registered_users') || '[]');
    const identifier = loginIdentifier.trim();
    const identifierLower = identifier.toLowerCase();

    // Check exact match in registered users
    let matchedUser = existingUsers.find(
      (u) =>
        (u.email?.toLowerCase() === identifierLower || u.phone === identifier) &&
        (!u.password || u.password === loginPassword)
    );

    if (!matchedUser) {
      // Create user session with EXACT values user typed
      const isEmail = identifier.includes('@');
      matchedUser = {
        name: isEmail ? identifier.split('@')[0] : `ইউজার ${identifier.slice(-4)}`,
        phone: isEmail ? '' : identifier,
        email: isEmail ? identifierLower : `${identifier}@fastpay.com`,
        referralCode: `FAST${Math.floor(1000 + Math.random() * 9000)}`,
        balance: 100.0,
        totalDeposit: 0.0,
        totalWithdraw: 0.0,
        activePlan: null,
        tasksCompletedToday: 0,
        todayIncome: 0.0,
        lastTaskDate: new Date().toISOString().slice(0, 10),
        memberId: `FP${Math.floor(10000 + Math.random() * 90000)}`,
      };
    }

    onSuccess(matchedUser);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-auto animate-scaleUp">
        {/* Banner */}
        <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 p-5 text-white text-center relative">
          <div className="w-12 h-12 mx-auto mb-2 bg-white/20 backdrop-blur-xs rounded-2xl flex items-center justify-center shadow-inner">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-xl font-black tracking-wide">{WEBSITE_NAME}</h2>
          <p className="text-xs text-orange-100 mt-0.5">অফিশিয়াল আর্নিং ও সিকিউর ওয়ালেট</p>

          <div className="flex bg-black/20 p-1 rounded-xl mt-4 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setError('');
              }}
              className={`flex-1 py-1.5 rounded-lg transition ${
                mode === 'signup' ? 'bg-white text-orange-600 shadow-sm' : 'text-white/80 hover:text-white'
              }`}
            >
              রেজিস্ট্রেশন (Sign Up)
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError('');
              }}
              className={`flex-1 py-1.5 rounded-lg transition ${
                mode === 'login' ? 'bg-white text-orange-600 shadow-sm' : 'text-white/80 hover:text-white'
              }`}
            >
              লগইন (Sign In)
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="mb-3 p-2.5 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs text-center font-medium animate-shake">
              ⚠️ {error}
            </div>
          )}

          {signupSuccessNote && (
            <div className="mb-3 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs text-center font-medium flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>রেজিস্ট্রেশন সফল! লগইন পেজে নিয়ে যাওয়া হচ্ছে...</span>
            </div>
          )}

          {mode === 'signup' ? (
            <form onSubmit={handleSignUp} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">আপনার পূর্ণ নাম</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="আপনার নাম লিখুন"
                    required
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">মোবাইল নাম্বার</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="০১xxxxxxxxx"
                    required
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-xs font-num"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">জিমেইল / ইমেইল</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="আপনার ইমেইল বা জিমেইল লিখুন"
                    required
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">পাসওয়ার্ড</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="কমপক্ষে ৬ ডিজিটের পাসওয়ার্ড"
                    required
                    className="w-full pl-9 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">কনফার্ম পাসওয়ার্ড</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="পাসওয়ার্ডটি পুনরায় লিখুন"
                    required
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">রেফার কোড (ঐচ্ছিক)</label>
                <input
                  type="text"
                  value={refCode}
                  onChange={(e) => setRefCode(e.target.value)}
                  placeholder="রেফার কোড থাকলে লিখুন (ঐচ্ছিক)"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-xs font-num"
                />
              </div>

              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>নতুন একাউন্ট খুললেই পাচ্ছেন ১০০ টাকা সাইন-আপ বোনাস!</span>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl font-bold text-sm shadow-md shadow-orange-500/20 transition flex items-center justify-center gap-2"
              >
                <span>রেজিস্ট্রেশন সম্পন্ন করুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">জিমেইল বা মোবাইল নাম্বার</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="মোবাইল নাম্বার বা জিমেইল লিখুন"
                    required
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-xs"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-700 font-semibold">পাসওয়ার্ড</label>
                  <button
                    type="button"
                    onClick={() => setError("পাসওয়ার্ড রিসেট করতে অফিশিয়াল টেলিগ্রাম সাপোর্টে মেসেজ দিন।")}
                    className="text-[11px] text-orange-600 hover:underline"
                  >
                    পাসওয়ার্ড ভুলে গেছেন?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="আপনার পাসওয়ার্ড লিখুন"
                    required
                    className="w-full pl-9 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl font-bold text-sm shadow-md shadow-orange-500/20 transition flex items-center justify-center gap-2"
              >
                <span>লগইন করুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="mt-4 text-center">
            {mode === 'signup' ? (
              <p className="text-xs text-slate-500">
                ইতিমধ্যে একাউন্ট আছে?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError('');
                  }}
                  className="text-orange-600 font-bold hover:underline"
                >
                  লগইন করুন
                </button>
              </p>
            ) : (
              <p className="text-xs text-slate-500">
                কোনো একাউন্ট নেই?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setError('');
                  }}
                  className="text-orange-600 font-bold hover:underline"
                >
                  নতুন একাউন্ট খুলুন
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
