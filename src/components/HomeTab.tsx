import React, { useState, useEffect } from 'react';
import {
  Bell,
  Download,
  ShieldCheck,
  Headphones,
  Plus,
  ArrowDownLeft,
  ArrowUpRight,
  Sparkles,
  PlayCircle,
  ThumbsUp,
  MessageCircle,
  Send,
  CheckCircle2,
  Package,
  Wallet,
  Users,
  ChevronRight,
  Code
} from 'lucide-react';
import { UserProfile, PaymentProof, LivePayout } from '../types';
import { OFFICIAL_DEPOSIT_NUMBER, WEBSITE_NAME, INITIAL_REVIEWS, INITIAL_LIVE_PAYOUTS } from '../data/mockData';

interface Props {
  user: UserProfile;
  onNavigateTasks: () => void;
  onNavigatePlans: () => void;
  onNavigateTeam: () => void;
  onOpenDeposit: () => void;
  onOpenWithdraw: () => void;
  onOpenSupport: () => void;
  onOpenHtmlExport: () => void;
  onOpenSuspensionPolicy: () => void;
}

export const HomeTab: React.FC<Props> = ({
  user,
  onNavigateTasks,
  onNavigatePlans,
  onNavigateTeam,
  onOpenDeposit,
  onOpenWithdraw,
  onOpenSupport,
  onOpenHtmlExport,
  onOpenSuspensionPolicy,
}) => {
  const [reviews, setReviews] = useState<PaymentProof[]>(INITIAL_REVIEWS);
  const [newReviewText, setNewReviewText] = useState('');
  const [livePayouts, setLivePayouts] = useState<LivePayout[]>(INITIAL_LIVE_PAYOUTS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Realistic live payout ticker auto simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const names = ['সাকিব হাসান', 'মেহেদী হাসান', 'জান্নাতুল ফেরদৌস', 'কামরুল ইসলাম', 'সুমন আহমেদ', 'নাজমুল হুদা'];
      const cities = ['ঢাকা', 'চট্টগ্রাম', 'সিলেট', 'বরিশাল', 'রাজশাহী', 'কুমিল্লা'];
      const methods: ('bKash' | 'Nagad' | 'Rocket')[] = ['bKash', 'Nagad', 'Rocket'];
      const amounts = [500, 1000, 2000, 3500, 5000, 10000];

      const newPayout: LivePayout = {
        id: `lp-${Date.now()}`,
        name: names[Math.floor(Math.random() * names.length)],
        city: cities[Math.floor(Math.random() * cities.length)],
        amount: amounts[Math.floor(Math.random() * amounts.length)],
        method: methods[Math.floor(Math.random() * methods.length)],
        type: `${methods[Math.floor(Math.random() * methods.length)]} পেমেন্ট নিয়েছেন`,
        timeAgo: 'মাত্র এইমাত্র',
      };

      setLivePayouts((prev) => [newPayout, ...prev.slice(0, 7)]);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;

    const newRev: PaymentProof = {
      id: `rev-${Date.now()}`,
      name: user.name || 'সম্মানিত ইউজার',
      phone: `${user.phone?.slice(0, 3)}*****${user.phone?.slice(-2)}`,
      timeAgo: 'এইমাত্র',
      text: newReviewText.trim(),
      likes: 1,
      userLiked: true,
    };

    setReviews([newRev, ...reviews]);
    setNewReviewText('');
  };

  const handleToggleLike = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const liked = !r.userLiked;
          return {
            ...r,
            likes: liked ? r.likes + 1 : r.likes - 1,
            userLiked: liked,
          };
        }
        return r;
      })
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 pb-24 flex flex-col justify-start max-w-md mx-auto shadow-2xl relative">
      {/* Top Header matching screenshot */}
      <div className="bg-[#FF5500] text-white px-4 pt-3 pb-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg tracking-wide">{WEBSITE_NAME}</span>
              <span className="text-[10px] bg-white text-[#FF5500] font-bold px-1.5 py-0.2 rounded shadow-2xs">
                অফিসিয়াল
              </span>
            </div>
            <p className="text-xs text-orange-100">
              আবার স্বাগতম, <span className="font-bold">{user.name || 'সম্মানিত ইউজার'}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* HTML Code Copy Shortcut button */}
            <button
              onClick={onOpenHtmlExport}
              title="HTML কোড কপি করুন"
              className="flex items-center gap-1 text-[11px] bg-black/20 hover:bg-black/30 text-white font-medium px-2 py-1 rounded-lg transition border border-white/20"
            >
              <Code className="w-3.5 h-3.5" />
              <span>HTML কোড</span>
            </button>

            {/* App download button */}
            <button
              onClick={() => showToast("অ্যান্ড্রয়েড অ্যাপ দ্রুত চালু হচ্ছে!")}
              className="flex items-center gap-1 text-[11px] bg-white/20 hover:bg-white/30 text-white font-medium px-2 py-1 rounded-lg transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>অ্যাপ</span>
            </button>

            {/* Notification */}
            <button
              onClick={onOpenSuspensionPolicy}
              className="p-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-white transition relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-400"></span>
            </button>

            {/* Support */}
            <button
              onClick={onOpenSupport}
              className="p-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-white transition"
              title="সাপোর্ট"
            >
              <Headphones className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-6 space-y-4">
        {/* Main Floating Balance Card */}
        <div className="bg-white rounded-3xl p-4 shadow-lg border border-slate-200/80">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-medium">বর্তমান ব্যালেন্স</span>
              <div className="text-3xl font-black text-slate-900 font-num tracking-tight">
                ৳{user.balance.toFixed(2)}
              </div>
              <div className="flex items-center gap-2 mt-1">
                {user.activePlan ? (
                  <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold">
                    {user.activePlan.vipLevel || user.activePlan.name} (সক্রিয়)
                  </span>
                ) : (
                  <button
                    onClick={onNavigatePlans}
                    className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold hover:bg-emerald-100 transition"
                  >
                    কোন প্লান নেই (আনলক করুন)
                  </button>
                )}
                <span className="text-[11px] text-slate-400 font-mono">
                  আইডি: {user.memberId}
                </span>
              </div>
            </div>

            {/* User Avatar */}
            <div className="w-13 h-13 rounded-full bg-slate-100 border-2 border-orange-200 p-0.5 flex items-center justify-center overflow-hidden shadow-inner">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-orange-400 to-amber-300 flex items-center justify-center text-white font-black text-lg">
                {user.name ? user.name.charAt(0).toUpperCase() : '👤'}
              </div>
            </div>
          </div>

          {/* Action Buttons: per prompt, placing Deposit beside Withdraw and Plan */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3.5 border-t border-slate-100">
            <button
              onClick={onNavigatePlans}
              className="py-2.5 px-2 rounded-xl bg-[#057A55] hover:bg-emerald-800 text-white font-bold text-xs shadow-md shadow-emerald-700/20 transition active:scale-95 flex items-center justify-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>প্ল্যান</span>
            </button>

            <button
              onClick={onOpenDeposit}
              className="py-2.5 px-2 rounded-xl bg-[#FF5500] hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition active:scale-95 flex items-center justify-center gap-1"
            >
              <ArrowDownLeft className="w-3.5 h-3.5" />
              <span>ডিপোজিট</span>
            </button>

            <button
              onClick={onOpenWithdraw}
              className="py-2.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow-md shadow-slate-800/20 transition active:scale-95 flex items-center justify-center gap-1"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>উত্তোলন</span>
            </button>
          </div>

          {/* Carousel dots indicator */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            <span className="w-4 h-1.5 rounded-full bg-orange-500"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
          </div>
        </div>

        {/* 2 Mini Stats Boxes matching screenshot */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-2xs text-center">
            <span className="text-[11px] text-slate-500 block mb-0.5">আজকের আয়</span>
            <span className="text-base font-black text-emerald-600 font-num">
              ৳{user.todayIncome ? user.todayIncome.toFixed(2) : '0.00'}
            </span>
          </div>
          <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-2xs text-center">
            <span className="text-[11px] text-slate-500 block mb-0.5">মোট রেফার আয়</span>
            <span className="text-base font-black text-[#7C3AED] font-num">
              ৳0.00
            </span>
          </div>
        </div>

        {/* দ্রুত কার্যক্রম (Quick actions) */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1 font-bold text-xs text-slate-800">
              <span className="text-amber-500">⚡</span>
              <span>দ্রুত কার্যক্রম</span>
            </div>
            <button onClick={onNavigatePlans} className="text-[11px] text-slate-400 hover:text-slate-600">
              See All
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            {/* কাজ */}
            <button
              onClick={onNavigateTasks}
              className="flex flex-col items-center group active:scale-95 transition"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform mb-1.5">
                <Package className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-700">কাজ</span>
            </button>

            {/* প্ল্যান */}
            <button
              onClick={onNavigatePlans}
              className="flex flex-col items-center group active:scale-95 transition"
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform mb-1.5">
                <Wallet className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-700">প্ল্যান</span>
            </button>

            {/* উত্তোলন */}
            <button
              onClick={onOpenWithdraw}
              className="flex flex-col items-center group active:scale-95 transition"
            >
              <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform mb-1.5">
                <ArrowUpRight className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-700">উত্তোলন</span>
            </button>

            {/* ডিপোজিট / রেফার (User asked deposit option prominently placed) */}
            <button
              onClick={onOpenDeposit}
              className="flex flex-col items-center group active:scale-95 transition"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-600/20 group-hover:scale-105 transition-transform mb-1.5">
                <ArrowDownLeft className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-700">ডিপোজিট</span>
            </button>
          </div>
        </div>

        {/* এড ব্যালেন্স ব্যানার matching screenshot */}
        <div className="bg-[#057A55] rounded-2xl p-3 text-white flex items-center justify-between shadow-md">
          <div className="flex-1 pr-2">
            <div className="flex items-center gap-1.5 text-xs font-extrabold">
              <span>এড ব্যালেন্স</span>
              <span className="text-[10px] bg-white text-[#057A55] px-1.5 py-0.2 rounded font-bold">
                ইনস্ট্যান্ট বিকাশ/নগদ
              </span>
            </div>
            <p className="text-[11px] text-emerald-100 mt-0.5">
              শুধুমাত্র সেন্ড মানি করুন: <span className="font-mono font-bold text-amber-300">{OFFICIAL_DEPOSIT_NUMBER}</span>
            </p>
          </div>

          <button
            onClick={onOpenDeposit}
            className="bg-white hover:bg-emerald-50 text-[#057A55] font-extrabold text-xs px-3 py-1.5 rounded-xl transition shadow-xs shrink-0 active:scale-95"
          >
            ডিপোজিট →
          </button>
        </div>

        {/* পেমেন্ট প্রুফ ও রিভিউ (Payment Proof & Reviews) */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
              <span>📊</span>
              <span>পেমেন্ট প্রুফ ও রিভিউ</span>
            </div>
            <button
              onClick={() => showToast("কাজের ভিডিও গাইড শীঘ্রই প্রকাশ করা হবে।")}
              className="flex items-center gap-1 text-[11px] bg-red-500 hover:bg-red-600 text-white px-2 py-0.5 rounded-full font-bold transition shadow-xs"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>কাজের ভিডিও</span>
            </button>
          </div>

          {/* Reviews list */}
          <div className="space-y-3">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-slate-50/80 border border-slate-200/60 rounded-2xl p-3 text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-300 flex items-center justify-center font-bold text-slate-700 text-xs">
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 leading-none">{rev.name}</h4>
                      <span className="text-[10px] text-slate-400 font-num">{rev.phone}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400">{rev.timeAgo}</span>
                </div>

                <p className="text-slate-700 leading-relaxed pl-9 mb-2 text-[11px]">
                  {rev.text}
                </p>

                <div className="flex items-center gap-4 pl-9 text-[11px] text-slate-500">
                  <button
                    onClick={() => handleToggleLike(rev.id)}
                    className={`flex items-center gap-1 transition ${rev.userLiked ? 'text-orange-600 font-bold' : 'hover:text-slate-700'}`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{rev.likes} লাইক</span>
                  </button>
                  <button
                    onClick={() => showToast("মন্তব্য করতে রিভিউ বক্সে লিখুন।")}
                    className="flex items-center gap-1 hover:text-slate-700 transition"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>জবাব দিন</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add review form */}
          <form onSubmit={handleAddReview} className="flex items-center gap-2 pt-2">
            <input
              type="text"
              value={newReviewText}
              onChange={(e) => setNewReviewText(e.target.value)}
              placeholder="আপনার অভিজ্ঞতা বা পেমেন্ট প্রুফ লিখুন..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
            <button
              type="submit"
              disabled={!newReviewText.trim()}
              className="px-3 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition shrink-0"
            >
              পোস্ট
            </button>
          </form>
        </div>

        {/* লাইভ পেমেন্ট আপডেট (Live Payment Update) */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>লাইভ পেমেন্ট আপডেট</span>
            </div>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <span>🟢</span>
              <span>অটো পে সচল</span>
            </span>
          </div>

          <div className="space-y-2">
            {livePayouts.map((lp) => (
              <div
                key={lp.id}
                className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs transition hover:bg-slate-100"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-[10px] text-white shrink-0 ${
                      lp.method === 'bKash'
                        ? 'bg-[#E2136E]'
                        : lp.method === 'Rocket'
                        ? 'bg-[#8C3494]'
                        : 'bg-[#F7941D]'
                    }`}
                  >
                    {lp.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-[11px] leading-tight">
                      {lp.name} <span className="text-slate-400 font-normal">({lp.city})</span>
                    </div>
                    <div className="text-[10px] text-slate-500">
                      সফলভাবে <span className="font-bold text-slate-900 font-num">৳{lp.amount.toLocaleString()}</span> {lp.type}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap pl-2">
                  {lp.timeAgo}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer / Trust Note */}
        <div className="p-3 bg-slate-200/50 rounded-2xl text-center text-[10px] text-slate-500 leading-relaxed">
          {WEBSITE_NAME} - বাংলাদেশের সর্বাধিক বিশ্বস্ত ও দ্রুততম সেন্ড মানি আর্নিং প্ল্যাটফর্ম। শুধুমাত্র অফিশিয়াল নাম্বারে লেনদেন করুন।
        </div>
      </div>

      {/* Floating In-App Toast */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white text-xs px-4 py-2.5 rounded-2xl shadow-xl backdrop-blur-xs border border-white/10 animate-bounce">
          {toastMessage}
        </div>
      )}
    </div>
  );
};
