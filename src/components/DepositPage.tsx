import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, Copy, AlertTriangle, ShieldCheck, Clock, CheckCircle } from 'lucide-react';
import { OFFICIAL_DEPOSIT_NUMBER } from '../data/mockData';
import { Transaction } from '../types';

interface Props {
  onBack: () => void;
  onSuccessDeposit: (tx: Transaction) => void;
}

export const DepositPage: React.FC<Props> = ({ onBack, onSuccessDeposit }) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [method, setMethod] = useState<'bKash' | 'Rocket' | 'Nagad'>('bKash');
  const [trxId, setTrxId] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationProgress, setVerificationProgress] = useState<number>(0);
  const [verificationStepText, setVerificationStepText] = useState<string>('তথ্য যাচাই করা হচ্ছে...');
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [createdTx, setCreatedTx] = useState<Transaction | null>(null);
  const [error, setError] = useState<string>('');

  const amounts = [300, 500, 1000, 1500, 2000, 5000, 10000];

  const handleCopy = () => {
    navigator.clipboard.writeText(OFFICIAL_DEPOSIT_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentAmount = customAmount ? Number(customAmount) : selectedAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!trxId.trim()) {
      setError('TrxID অবশ্যই পূরণ করতে হবে!');
      return;
    }
    if (trxId.trim().length < 6) {
      setError('সঠিক ট্রানজেকশন আইডি (কমপক্ষে ৬ সংখ্যার) প্রদান করুন');
      return;
    }

    // Start 5-6 seconds multi-stage realistic verification
    setIsVerifying(true);
    setVerificationProgress(5);
    setVerificationStepText('ট্রানজেকশন তথ্য সার্ভারে পাঠানো হচ্ছে...');

    let progress = 5;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 12) + 6;
      if (progress > 95) progress = 95;
      setVerificationProgress(progress);

      if (progress > 25 && progress <= 50) {
        setVerificationStepText('পেমেন্ট গেটওয়ে ও ব্যাংক নেটওয়ার্ক চেক করা হচ্ছে...');
      } else if (progress > 50 && progress <= 75) {
        setVerificationStepText('সেন্ড মানি ট্রানজেকশন ভ্যালিডেশন চলছে...');
      } else if (progress > 75) {
        setVerificationStepText('সার্ভার অটো-ভেরিফিকেশন সম্পন্ন হচ্ছে...');
      }
    }, 450);

    // Complete after ~5.5 seconds
    setTimeout(() => {
      clearInterval(interval);
      setVerificationProgress(100);
      setIsVerifying(false);

      const tx: Transaction = {
        id: `DEP-${Date.now()}`,
        type: 'deposit',
        amount: currentAmount,
        method,
        accountNumber: OFFICIAL_DEPOSIT_NUMBER,
        trxId: trxId.trim().toUpperCase(),
        status: 'pending',
        timestamp: new Date().toLocaleString('bn-BD', {
          dateStyle: 'short',
          timeStyle: 'short',
        }),
        title: `${method} সেন্ড মানি ডিপোজিট`,
        subtitle: `TrxID: ${trxId.trim().toUpperCase()}`,
      };

      setCreatedTx(tx);
      setShowSuccessModal(true);
      onSuccessDeposit(tx);
    }, 5500);
  };

  return (
    <div className="min-h-screen bg-slate-100 pb-20 flex flex-col justify-start max-w-md mx-auto shadow-2xl relative">
      {/* Top Header - Green as in screenshot */}
      <div className="bg-[#057A55] text-white px-4 py-3 sticky top-0 z-30 flex items-center justify-between shadow-md">
        <button
          onClick={onBack}
          className="p-1 hover:bg-white/20 rounded-full transition active:scale-95"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <div className="text-center">
          <div className="font-extrabold text-sm tracking-wide font-num">
            BDT {currentAmount.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-100 font-medium">
            কম বা বেশি সেন্ড মানি করবেন না
          </div>
        </div>

        <span className="text-[10px] bg-white text-[#057A55] font-black px-2 py-0.5 rounded shadow-xs tracking-wider">
          PAY SERVICE
        </span>
      </div>

      <div className="p-4 space-y-4">
        {/* Warning Note in Red */}
        <div className="text-center">
          <p className="text-[11px] text-red-600 font-bold leading-tight">
            আপনি যদি টাকার পরিমাণ পরিবর্তন করেন (BDT {currentAmount}), আপনি ক্রেডিট পেতে সক্ষম হবেন না।
          </p>
        </div>

        {/* Amount Selector */}
        <div className="bg-white p-3 rounded-2xl shadow-xs border border-slate-200">
          <label className="block text-xs font-bold text-slate-700 mb-2">টাকার পরিমাণ:</label>
          <div className="grid grid-cols-4 gap-2">
            {amounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => {
                  setSelectedAmount(amt);
                  setCustomAmount('');
                }}
                className={`py-2 text-xs font-bold rounded-xl transition ${
                  selectedAmount === amt && !customAmount
                    ? 'bg-[#057A55] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                ৳{amt.toLocaleString()}
              </button>
            ))}
          </div>

          <div className="mt-2.5 flex items-center gap-2">
            <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">অন্যান্য পরিমাণ:</span>
            <input
              type="number"
              placeholder="পরিমাণ লিখুন (৳)"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 font-bold focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white p-3 rounded-2xl shadow-xs border border-slate-200">
          <label className="block text-xs font-bold text-slate-700 mb-2.5">
            পেমেন্ট মাধ্যম সিলেক্ট করুন:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {/* bKash */}
            <button
              type="button"
              onClick={() => setMethod('bKash')}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition ${
                method === 'bKash'
                  ? 'border-pink-500 bg-pink-50/50 shadow-xs ring-2 ring-pink-500/20'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100'
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-[#E2136E] text-white font-black text-[11px] flex items-center justify-center shadow-xs mb-1">
                bKash
              </div>
              <span className="text-[11px] font-bold text-slate-800">bKash</span>
            </button>

            {/* Rocket */}
            <button
              type="button"
              onClick={() => setMethod('Rocket')}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition ${
                method === 'Rocket'
                  ? 'border-purple-600 bg-purple-50/50 shadow-xs ring-2 ring-purple-600/20'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100'
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-[#8C3494] text-white font-black text-[11px] flex items-center justify-center shadow-xs mb-1">
                Rocket
              </div>
              <span className="text-[11px] font-bold text-slate-800">Rocket</span>
            </button>

            {/* Nagad */}
            <button
              type="button"
              onClick={() => setMethod('Nagad')}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition ${
                method === 'Nagad'
                  ? 'border-orange-500 bg-orange-50/50 shadow-xs ring-2 ring-orange-500/20'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100'
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-[#F7941D] text-white font-black text-[11px] flex items-center justify-center shadow-xs mb-1">
                Nagad
              </div>
              <span className="text-[11px] font-bold text-slate-800">Nagad</span>
            </button>
          </div>
        </div>

        {/* Selected Method Banner */}
        <div
          className={`py-2 px-3 rounded-xl text-white font-black text-xs text-center tracking-wider shadow-sm flex items-center justify-center gap-2 ${
            method === 'bKash'
              ? 'bg-[#E2136E]'
              : method === 'Rocket'
              ? 'bg-[#8C3494]'
              : 'bg-[#F7941D]'
          }`}
        >
          <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">
            {method.toUpperCase().slice(0, 3)}
          </span>
          <span>{method.toUpperCase()} SEND MONEY</span>
        </div>

        {/* Wallet Number Box */}
        <div className="bg-white p-3.5 rounded-2xl shadow-xs border border-slate-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-slate-800">
              Wallet No <span className="text-red-500">*</span>
            </span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
              অটো ভেরিফিকেশন সচল
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mb-2">এই নাম্বারে শুধুমাত্র সেন্ড মানি গ্রহণ করা হয়</p>

          <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-2.5">
            <span className="font-mono font-bold text-slate-900 text-base tracking-wider">
              {OFFICIAL_DEPOSIT_NUMBER}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border transition ${
                copied
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'কপি হয়েছে' : 'কপি করুন'}</span>
            </button>
          </div>
        </div>

        {/* TrxID Input Form */}
        <form onSubmit={handleSubmit} className="bg-white p-3.5 rounded-2xl shadow-xs border border-slate-200 space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              সেন্ড মানির TrxID নাম্বারটি লিখুন <span className="text-red-500">(প্রয়োজন)</span>
            </label>
            <input
              type="text"
              value={trxId}
              onChange={(e) => setTrxId(e.target.value)}
              placeholder="TrxID অবশ্যই পূরণ করতে হবে!"
              className={`w-full p-2.5 text-xs font-mono rounded-xl border ${
                error ? 'border-red-500 bg-red-50/30' : 'border-slate-300 bg-slate-50 focus:bg-white'
              } text-slate-900 placeholder-red-400 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
            />
            {error && <p className="text-[11px] text-red-600 font-semibold mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-white text-slate-900 border-2 border-slate-700 font-bold text-sm hover:bg-slate-800 hover:text-white transition shadow-sm active:scale-[0.99]"
          >
            নিশ্চিত
          </button>
        </form>

        {/* Warning Alert Bottom */}
        <div className="bg-red-50/70 border border-red-200 rounded-xl p-3 text-[11px] text-red-700 leading-relaxed">
          <div className="flex items-center gap-1.5 font-bold mb-0.5 text-red-800">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            <span>সতর্কতা:</span>
          </div>
          <p>
            ট্রানজেকশন আইডি সঠিকভাবে পূরণ করতে হবে, অন্যথায় রিকোয়েস্ট পেন্ডিং বা বাতিল হতে পারে !!
          </p>
        </div>
      </div>

      {/* 5-6 Seconds Loading Animation Modal */}
      {isVerifying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-xs bg-white rounded-3xl p-6 text-center shadow-2xl border border-slate-100 flex flex-col items-center">
            {/* Spinning multi-ring / multi-wheel animation */}
            <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 rounded-full border-4 border-emerald-200 animate-ping opacity-40"></div>
              {/* Spinning ring 1 */}
              <div className="absolute inset-1 rounded-full border-4 border-t-emerald-600 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
              {/* Spinning ring 2 (reverse) */}
              <div
                className="absolute inset-3 rounded-full border-4 border-r-orange-500 border-t-transparent border-b-transparent border-l-transparent animate-spin"
                style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}
              ></div>
              {/* Center icon / percentage */}
              <div className="text-center font-black text-slate-800 font-num text-sm">
                {verificationProgress}%
              </div>
            </div>

            <h4 className="text-sm font-bold text-slate-900 mb-1">
              ট্রানজেকশন যাচাই করা হচ্ছে
            </h4>
            <p className="text-xs text-slate-500 min-h-[36px] flex items-center justify-center px-2">
              {verificationStepText}
            </p>

            <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${verificationProgress}%` }}
              ></div>
            </div>
            <span className="text-[10px] text-slate-400 mt-2">দয়া করে ৫-৬ সেকেন্ড অপেক্ষা করুন...</span>
          </div>
        </div>
      )}

      {/* Success Animation Modal per prompt */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 text-center shadow-2xl border border-slate-100 animate-scaleUp">
            {/* Animated Checkmark */}
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center ring-8 ring-emerald-50 animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2">
              পেমেন্ট তথ্য গৃহীত হয়েছে!
            </h3>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 mb-4 text-xs text-emerald-950 text-left leading-relaxed space-y-1.5">
              <p className="font-semibold text-emerald-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                আপনার লেনদেনটি সফলভাবে সাবমিট হয়েছে:
              </p>
              <div className="text-slate-700 space-y-0.5 pt-1 text-[11px]">
                <div>পরিমাণ: <span className="font-bold text-slate-900">৳{currentAmount}</span></div>
                <div>পদ্ধতি: <span className="font-bold text-slate-900">{method}</span></div>
                <div>TrxID: <span className="font-mono font-bold text-slate-900">{trxId.toUpperCase()}</span></div>
              </div>
              <div className="mt-2 pt-2 border-t border-emerald-200/80 text-[11px] font-medium text-emerald-900">
                ⏳ <span className="font-bold">এডমিন আপনার ট্রানজেকশন আইডি চেক করে ব্যালেন্স যুক্ত করে দেবে, অনুগ্রহ করে অপেক্ষা করুন।</span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowSuccessModal(false);
                onBack();
              }}
              className="w-full py-3 bg-[#057A55] hover:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow-md shadow-emerald-700/20 transition active:scale-95"
            >
              ড্যাশবোর্ডে ফিরে যান
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
