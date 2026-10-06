import React, { useState } from 'react';
import { ArrowLeft, Wallet, AlertCircle, CheckCircle, Clock, ShieldCheck } from 'lucide-react';
import { Transaction, UserProfile } from '../types';

interface Props {
  user: UserProfile;
  onBack: () => void;
  onSuccessWithdraw: (tx: Transaction, amount: number) => void;
  onOpenDeposit: () => void;
}

export const WithdrawPage: React.FC<Props> = ({ user, onBack, onSuccessWithdraw, onOpenDeposit }) => {
  const [method, setMethod] = useState<'bKash' | 'Nagad' | 'Rocket'>('bKash');
  const [accountNumber, setAccountNumber] = useState<string>(user.phone || '');
  const [amount, setAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [loadingText, setLoadingText] = useState<string>('রিকোয়েস্ট যাচাই করা হচ্ছে...');
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [lastTx, setLastTx] = useState<Transaction | null>(null);

  const quickAmounts = [300, 500, 1000, 2000];

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const withdrawAmount = Number(amount);
    if (!withdrawAmount || isNaN(withdrawAmount) || withdrawAmount <= 0) {
      setError('সঠিক উত্তোলন পরিমাণ লিখুন');
      return;
    }
    if (withdrawAmount < 300) {
      setError('সর্বনিম্ন উত্তোলন পরিমাণ ৩০০ টাকা');
      return;
    }
    if (withdrawAmount > user.balance) {
      setError(`আপনার একাউন্টে পর্যাপ্ত ব্যালেন্স নেই! বর্তমান ব্যালেন্স: ৳${user.balance.toFixed(2)}`);
      return;
    }
    if (!accountNumber.trim() || accountNumber.trim().length < 11) {
      setError('সঠিক ১১ ডিজিটের মোবাইল ব্যাংকিং নাম্বার লিখুন');
      return;
    }

    // 5-second loader as requested
    setIsLoading(true);
    setLoadingProgress(10);
    setLoadingText('উইথড্র তথ্য যাচাই করা হচ্ছে...');

    let prog = 10;
    const interval = setInterval(() => {
      prog += 18;
      if (prog > 95) prog = 95;
      setLoadingProgress(prog);

      if (prog > 30 && prog <= 65) {
        setLoadingText('পেমেন্ট গেটওয়েতে সাবমিট করা হচ্ছে...');
      } else if (prog > 65) {
        setLoadingText('অ্যাকাউন্ট ভেরিফিকেশন সম্পন্ন হচ্ছে...');
      }
    }, 900);

    setTimeout(() => {
      clearInterval(interval);
      setLoadingProgress(100);
      setIsLoading(false);

      const tx: Transaction = {
        id: `WTH-${Date.now()}`,
        type: 'withdraw',
        amount: withdrawAmount,
        method,
        accountNumber: accountNumber.trim(),
        status: 'pending',
        timestamp: new Date().toLocaleString('bn-BD', {
          dateStyle: 'short',
          timeStyle: 'short',
        }),
        title: `${method} ক্যাশআউট রিকোয়েস্ট`,
        subtitle: `নাম্বার: ${accountNumber.trim()}`,
      };

      setLastTx(tx);
      setShowSuccessModal(true);
      onSuccessWithdraw(tx, withdrawAmount);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 flex flex-col justify-start max-w-md mx-auto shadow-2xl relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-3 sticky top-0 z-30 flex items-center justify-between shadow-md">
        <button
          onClick={onBack}
          className="p-1 hover:bg-white/20 rounded-full transition active:scale-95"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <h1 className="font-bold text-base">উত্তোলন (Cashout)</h1>

        <div className="w-6"></div>
      </div>

      <div className="p-4 space-y-4">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-4 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 translate-x-4 -translate-y-4">
            <Wallet className="w-36 h-36" />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
            <span>উত্তোলনযোগ্য মূল ব্যালেন্স</span>
            <span className="bg-emerald-500/20 text-emerald-400 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
              সক্রিয়
            </span>
          </div>
          <div className="text-3xl font-extrabold text-white font-num tracking-tight mb-2">
            ৳{user.balance.toFixed(2)}
          </div>
          <p className="text-[11px] text-slate-400">
            সর্বনিম্ন উত্তোলন: ৳৩০০ | প্রসেসিং সময়: ১০ মিনিট - ২ ঘণ্টা
          </p>
        </div>

        {/* Payment Methods */}
        <div className="bg-white p-3.5 rounded-2xl shadow-xs border border-slate-200">
          <label className="block text-xs font-bold text-slate-800 mb-2.5">
            উত্তোলনের মাধ্যম নির্বাচন করুন:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {/* bKash */}
            <button
              type="button"
              onClick={() => setMethod('bKash')}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition ${
                method === 'bKash'
                  ? 'border-pink-500 bg-pink-50/50 shadow-xs ring-2 ring-pink-500/20'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-[#E2136E] text-white font-black text-[11px] flex items-center justify-center shadow-xs mb-1">
                bKash
              </div>
              <span className="text-[11px] font-bold text-slate-800">বিকাশ</span>
            </button>

            {/* Nagad */}
            <button
              type="button"
              onClick={() => setMethod('Nagad')}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition ${
                method === 'Nagad'
                  ? 'border-orange-500 bg-orange-50/50 shadow-xs ring-2 ring-orange-500/20'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-[#F7941D] text-white font-black text-[11px] flex items-center justify-center shadow-xs mb-1">
                Nagad
              </div>
              <span className="text-[11px] font-bold text-slate-800">নগদ</span>
            </button>

            {/* Rocket */}
            <button
              type="button"
              onClick={() => setMethod('Rocket')}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition ${
                method === 'Rocket'
                  ? 'border-purple-600 bg-purple-50/50 shadow-xs ring-2 ring-purple-600/20'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-[#8C3494] text-white font-black text-[11px] flex items-center justify-center shadow-xs mb-1">
                Rocket
              </div>
              <span className="text-[11px] font-bold text-slate-800">রকেট</span>
            </button>
          </div>
        </div>

        {/* Withdraw Form */}
        <form onSubmit={handleWithdraw} className="bg-white p-4 rounded-2xl shadow-xs border border-slate-200 space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              আপনার {method} একাউন্ট নাম্বার (ব্যক্তিগত):
            </label>
            <input
              type="tel"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="01XXXXXXXXX"
              className="w-full p-2.5 text-xs font-num font-semibold rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              উত্তোলন পরিমাণ (টাকা):
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="সর্বনিম্ন ৩০০ টাকা"
              className="w-full p-2.5 text-xs font-num font-semibold rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            {/* Quick chips */}
            <div className="flex gap-2 mt-2">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmount(String(amt))}
                  className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-num"
                >
                  ৳{amt}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setAmount(String(Math.floor(user.balance)))}
                className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-orange-100 hover:bg-orange-200 text-orange-700"
              >
                সব
              </button>
            </div>
          </div>

          {error && (
            <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs flex items-center gap-1.5 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm shadow-md shadow-orange-500/20 transition active:scale-95 flex items-center justify-center gap-1.5"
          >
            <span>উইথড্র নিশ্চিত করুন</span>
          </button>
        </form>

        {/* Withdrawal notice rules */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-900 space-y-1.5">
          <p className="font-bold flex items-center gap-1 text-amber-950">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            উত্তোলন নীতিমালা:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 text-[11px]">
            <li>প্রতিদিন সকাল ১০টা থেকে রাত ১০টা পর্যন্ত উইথড্র দেওয়া যায়।</li>
            <li>উইথড্র করার আগে নিশ্চিত করুন আপনার নাম্বারটি বিকাশ/নগদে পার্সোনাল একাউন্ট।</li>
            <li>আপনার একাউন্টে পর্যাপ্ত ব্যালেন্স না থাকলে ডিপোজিট করে কাজ করুন।</li>
          </ul>
        </div>
      </div>

      {/* 5-second Loading Animation Modal */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-xs bg-white rounded-3xl p-6 text-center shadow-2xl border border-slate-100 flex flex-col items-center">
            <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-orange-200 animate-ping opacity-30"></div>
              <div className="absolute inset-1 rounded-full border-4 border-t-orange-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
              <div className="text-center font-black text-slate-800 font-num text-sm">
                {loadingProgress}%
              </div>
            </div>

            <h4 className="text-sm font-bold text-slate-900 mb-1">
              উইথড্র রিকোয়েস্ট লোডিং হচ্ছে
            </h4>
            <p className="text-xs text-slate-500 min-h-[30px] flex items-center justify-center px-2">
              {loadingText}
            </p>

            <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-orange-500 to-amber-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <span className="text-[10px] text-slate-400 mt-2">দয়া করে ৫ সেকেন্ড অপেক্ষা করুন...</span>
          </div>
        </div>
      )}

      {/* Success Animation Modal per prompt */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 text-center shadow-2xl border border-slate-100 animate-scaleUp">
            {/* Animated Clock / Pending Icon */}
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center ring-8 ring-amber-50 animate-bounce">
              <Clock className="w-10 h-10" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2">
              উইথড্র রিকোয়েস্ট সফল হয়েছে!
            </h3>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4 text-xs text-amber-950 text-left leading-relaxed space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>আপনার উইথড্র পেন্ডিং রয়েছে, দয়া করে অপেক্ষা করুন</span>
              </div>
              
              <div className="bg-white/80 p-2.5 rounded-xl space-y-1 text-slate-700 text-[11px] border border-amber-200/60 font-medium">
                <div>উত্তোলন পরিমাণ: <span className="font-bold text-slate-900 font-num">৳{lastTx?.amount}</span></div>
                <div>পদ্ধতি: <span className="font-bold text-slate-900">{lastTx?.method}</span></div>
                <div>নাম্বার: <span className="font-bold text-slate-900 font-num">{lastTx?.accountNumber}</span></div>
                <div>স্ট্যাটাস: <span className="bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded text-[10px] font-bold">পেন্ডিং (Pending)</span></div>
              </div>

              <p className="text-[11px] text-slate-600">
                এডমিন আপনার অ্যাকাউন্ট তথ্য যাচাই করে স্বয়ংক্রিয়ভাবে পেমেন্ট প্রদান করবে।
              </p>
            </div>

            <button
              onClick={() => {
                setShowSuccessModal(false);
                onBack();
              }}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 text-white rounded-xl font-bold text-xs shadow-md shadow-orange-500/20 transition active:scale-95"
            >
              ড্যাশবোর্ডে ফিরে যান
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
