import React from 'react';
import { Home, User, ChevronRight, Package, History, Users, ShieldAlert, LogOut, Wallet, CheckCircle } from 'lucide-react';
import { UserProfile } from '../types';

interface Props {
  user: UserProfile;
  onNavigateHome: () => void;
  onNavigatePlans: () => void;
  onNavigateTeam: () => void;
  onOpenTransactions: () => void;
  onOpenSuspensionPolicy: () => void;
  onLogout: () => void;
}

export const AccountPage: React.FC<Props> = ({
  user,
  onNavigateHome,
  onNavigatePlans,
  onNavigateTeam,
  onOpenTransactions,
  onOpenSuspensionPolicy,
  onLogout,
}) => {
  return (
    <div className="min-h-screen bg-slate-100 pb-24 flex flex-col justify-start max-w-md mx-auto shadow-2xl relative">
      {/* Top Header matching screenshot */}
      <div className="bg-[#FF5500] text-white px-4 py-3 sticky top-0 z-30 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-1.5 font-bold text-sm">
          <User className="w-4 h-4" />
          <span>অ্যাকাউন্ট প্রোফাইল</span>
        </div>

        <button
          onClick={onNavigateHome}
          className="flex items-center gap-1 text-xs bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded-lg font-medium transition"
        >
          <Home className="w-3.5 h-3.5" />
          <span>হোম</span>
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Big Orange Profile Card */}
        <div className="bg-gradient-to-b from-[#FF5500] to-[#FF6B00] rounded-3xl p-6 text-white text-center shadow-lg relative overflow-hidden">
          {/* Avatar Icon */}
          <div className="w-18 h-18 mx-auto mb-3 rounded-full bg-white text-[#FF5500] flex items-center justify-center shadow-md ring-4 ring-white/30">
            <User className="w-10 h-10" />
          </div>

          <h2 className="text-lg font-extrabold capitalize tracking-wide">{user.name || 'সম্মানিত ইউজার'}</h2>
          <p className="text-xs text-orange-100 font-num tracking-wide mt-0.5">{user.phone || user.email || 'তথ্য যুক্ত করুন'}</p>

          <div className="mt-3 inline-block bg-black/25 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-semibold text-white/95 border border-white/10">
            রেফার কোড: <span className="font-mono text-amber-300 font-bold">{user.referralCode}</span>
          </div>
        </div>

        {/* Financial Overview Card */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs space-y-3 text-xs">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <Package className="w-4 h-4 text-orange-500" />
              <span>বর্তমান প্যাকেজ</span>
            </div>
            {user.activePlan ? (
              <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                {user.activePlan.vipLevel || user.activePlan.name} (সক্রিয়)
              </span>
            ) : (
              <button
                onClick={onNavigatePlans}
                className="text-emerald-700 font-bold hover:underline bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[11px]"
              >
                কোন প্ল্যান নেই (আনলক করুন)
              </button>
            )}
          </div>

          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <Wallet className="w-4 h-4 text-orange-500" />
              <span>মূল ব্যালেন্স</span>
            </div>
            <span className="font-black text-slate-900 font-num text-sm">৳{user.balance.toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-bold">↓</span>
              <span>মোট ডিপোজিট</span>
            </div>
            <span className="font-bold text-slate-700 font-num">৳{user.totalDeposit.toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold">↑</span>
              <span>মোট উত্তোলন</span>
            </div>
            <span className="font-bold text-slate-700 font-num">৳{user.totalWithdraw.toFixed(2)}</span>
          </div>
        </div>

        {/* Menu Items List */}
        <div className="space-y-2">
          {/* আমার প্লানসমূহ */}
          <button
            onClick={onNavigatePlans}
            className="w-full bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex items-center justify-between text-xs font-semibold text-slate-800 shadow-2xs transition group"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base">🍱</span>
              <span>আমার প্লানসমূহ</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* লেনদেন হিস্ট্রি */}
          <button
            onClick={onOpenTransactions}
            className="w-full bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex items-center justify-between text-xs font-semibold text-slate-800 shadow-2xs transition group"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base">🔄</span>
              <span>লেনদেন হিস্ট্রি</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* রেফার কমিশন ও টিম */}
          <button
            onClick={onNavigateTeam}
            className="w-full bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex items-center justify-between text-xs font-semibold text-slate-800 shadow-2xs transition group"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base">👥</span>
              <span>রেফার কমিশন ও টিম</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* আইন ও সাসপেনশন নিয়মাবলী */}
          <button
            onClick={onOpenSuspensionPolicy}
            className="w-full bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex items-center justify-between text-xs font-semibold text-slate-800 shadow-2xs transition group"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base">🛡️</span>
              <span>আইন ও সাসপেনশন নিয়মাবলী</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* লগআউট করুন */}
          <button
            onClick={onLogout}
            className="w-full bg-red-50/70 hover:bg-red-100/70 border border-red-200 rounded-2xl p-3.5 flex items-center justify-between text-xs font-bold text-red-600 shadow-2xs transition group"
          >
            <div className="flex items-center gap-2.5">
              <LogOut className="w-4 h-4 text-red-500" />
              <span>লগআউট করুন</span>
            </div>
            <ChevronRight className="w-4 h-4 text-red-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
