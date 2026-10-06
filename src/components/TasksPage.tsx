import React, { useState } from 'react';
import { ArrowLeft, Bell, Gift, CheckCircle2, ShoppingBag, Sparkles, AlertCircle } from 'lucide-react';
import { UserProfile, Transaction } from '../types';

interface Props {
  user: UserProfile;
  onBack: () => void;
  onNavigatePlans: () => void;
  onCompleteTask: (earned: number, updatedUser: UserProfile, tx: Transaction) => void;
}

export const TasksPage: React.FC<Props> = ({ user, onBack, onNavigatePlans, onCompleteTask }) => {
  const [isGrabbing, setIsGrabbing] = useState<boolean>(false);
  const [grabStage, setGrabStage] = useState<string>('');
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const [lastEarned, setLastEarned] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const maxTasks = user.activePlan ? user.activePlan.dailyTasks : 6;
  const currentTaskCount = user.tasksCompletedToday || 0;
  const planPrice = user.activePlan ? user.activePlan.price : 0;
  const taskCommission = user.activePlan ? user.activePlan.taskCommission : 50;

  const handleStartGrabbing = () => {
    setErrorMsg('');

    if (!user.activePlan) {
      setErrorMsg('আপনার কোনো ভিআইপি প্ল্যান সক্রিয় নেই! কাজ করার জন্য অনুগ্রহ করে একটি প্ল্যান আনলক করুন।');
      return;
    }

    if (currentTaskCount >= maxTasks) {
      setErrorMsg('আজকের দৈনিক টাস্ক লিমিট শেষ! আগামীকাল রাত ১২:০০ টার পর আবার নতুন কাজ করতে পারবেন।');
      return;
    }

    setIsGrabbing(true);
    setGrabStage('মার্কেটপ্লেস অর্ডার অনুসন্ধান করা হচ্ছে...');

    setTimeout(() => {
      setGrabStage('অর্ডার কনফার্মেশন ও ভেন্ডর ম্যাচিং হচ্ছে...');
    }, 1000);

    setTimeout(() => {
      setGrabStage('কমিশন হিসাব সম্পন্ন করা হচ্ছে...');
    }, 2000);

    setTimeout(() => {
      setIsGrabbing(false);
      const earned = taskCommission;
      setLastEarned(earned);

      const updatedUser: UserProfile = {
        ...user,
        balance: user.balance + earned,
        todayIncome: (user.todayIncome || 0) + earned,
        tasksCompletedToday: currentTaskCount + 1,
      };

      const tx: Transaction = {
        id: `TSK-${Date.now()}`,
        type: 'task',
        amount: earned,
        status: 'completed',
        timestamp: new Date().toLocaleString('bn-BD', {
          dateStyle: 'short',
          timeStyle: 'short',
        }),
        title: `দৈনিক টাস্ক কমিশন (#${currentTaskCount + 1})`,
        subtitle: `প্ল্যান: ${user.activePlan?.name || 'ভিআইপি'}`,
      };

      onCompleteTask(earned, updatedUser, tx);
      setShowResultModal(true);
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 flex flex-col justify-start max-w-md mx-auto shadow-2xl relative">
      {/* Header matching screenshot 3 */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-30 flex items-center justify-between shadow-2xs">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center transition active:scale-95"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="font-bold text-slate-800 text-sm">অর্ডার গ্র্যাবিং পেজ</h1>

        <div className="flex items-center gap-2">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block leading-none">ব্যালেন্স</span>
            <span className="text-xs font-black text-slate-800 font-num">
              {user.balance.toFixed(2)}৳
            </span>
          </div>
          <button className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
            <Bell className="w-4 h-4 text-emerald-600" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Stats Row */}
        <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-2xs grid grid-cols-3 divide-x divide-slate-100 text-center">
          <div className="px-1">
            <span className="text-[11px] text-slate-500 block">আজকের টাস্ক</span>
            <span className="text-sm font-black text-slate-800 font-num">
              {currentTaskCount} / {maxTasks}
            </span>
          </div>
          <div className="px-1">
            <span className="text-[11px] text-slate-500 block">আজকের আয়</span>
            <span className="text-sm font-black text-emerald-600 font-num">
              {user.todayIncome ? user.todayIncome.toFixed(2) : '0.00'}৳
            </span>
          </div>
          <div className="px-1">
            <span className="text-[11px] text-slate-500 block">প্ল্যান মূল্য</span>
            <span className="text-sm font-black text-slate-800 font-num">
              {planPrice}৳
            </span>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">{errorMsg}</p>
              {!user.activePlan && (
                <button
                  onClick={onNavigatePlans}
                  className="mt-2 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-xs"
                >
                  ভিআইপি প্ল্যান দেখুন →
                </button>
              )}
            </div>
          </div>
        )}

        {/* Center Task Ready Circle Graphic */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs flex flex-col items-center justify-center text-center">
          <div className="relative mb-5">
            {/* Outer animated gradient glow */}
            <div className="w-36 h-36 rounded-full bg-emerald-100/60 border-2 border-emerald-300 flex items-center justify-center p-2 shadow-inner">
              <div className="w-28 h-28 rounded-full bg-[#057A55] text-white flex flex-col items-center justify-center shadow-lg shadow-emerald-700/30 transform hover:scale-105 transition-all">
                <Gift className="w-8 h-8 text-amber-300 mb-1" />
                <span className="text-[10px] font-black tracking-wider text-emerald-200">FASTPAY.COM</span>
                <span className="text-xs font-extrabold tracking-wide text-white">TASK READY</span>
              </div>
            </div>
            {isGrabbing && (
              <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
            )}
          </div>

          <p className="text-xs text-slate-600 font-medium mb-5">
            ক্লিক করে আপনার দৈনিক অর্ডার সংগ্রহ করুন
          </p>

          {/* Green Action Button */}
          <button
            onClick={handleStartGrabbing}
            disabled={isGrabbing}
            className="w-full py-3.5 px-4 rounded-xl bg-[#057A55] hover:bg-emerald-800 disabled:opacity-60 text-white font-bold text-sm shadow-md shadow-emerald-700/25 transition active:scale-95 flex items-center justify-center gap-2"
          >
            {isGrabbing ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>{grabStage}</span>
              </span>
            ) : (
              <span>👉 অর্ডার গ্র্যাব শুরু করুন</span>
            )}
          </button>
        </div>

        {/* Rules Box matching screenshot */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-900 leading-relaxed">
          <div className="font-bold text-amber-800 mb-1">। নিয়মাবলী:</div>
          <p className="text-slate-700 text-[11px] leading-relaxed">
            প্রতিদিন নির্দিষ্ট সংখ্যক টাস্ক সম্পন্ন করে সরাসরি মূল একাউন্টে কমিশন যোগ করতে পারবেন। দৈনিক লিমিট শেষ হলে আগামীকাল আবার কাজ করতে পারবেন। রাত ১২টার পর আবার নতুন করে কাজ পাবে।
          </p>
        </div>
      </div>

      {/* Result Modal */}
      {showResultModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-xs bg-white rounded-3xl p-6 text-center shadow-2xl border border-slate-100 animate-scaleUp">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center ring-8 ring-emerald-50">
              <Sparkles className="w-9 h-9" />
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-1">
              অর্ডার গ্র্যাবিং সফল!
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              আপনার কমিশন মূল অ্যাকাউন্টে যুক্ত হয়েছে
            </p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 mb-4 text-center">
              <span className="text-[11px] text-emerald-800 block font-medium">অর্জিত কমিশন</span>
              <span className="text-2xl font-black text-emerald-600 font-num">
                +৳{lastEarned.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => setShowResultModal(false)}
              className="w-full py-2.5 bg-[#057A55] text-white rounded-xl font-bold text-xs shadow-md shadow-emerald-700/20 hover:bg-emerald-800 transition"
            >
              ঠিক আছে
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
