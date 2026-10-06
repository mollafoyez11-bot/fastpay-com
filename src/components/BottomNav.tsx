import React from 'react';
import { ShoppingBag, Users, Home, Wallet, User } from 'lucide-react';

interface Props {
  activeTab: 'home' | 'tasks' | 'team' | 'withdraw' | 'account' | 'plans' | 'deposit';
  onSelectTab: (tab: 'home' | 'tasks' | 'team' | 'withdraw' | 'account') => void;
}

export const BottomNav: React.FC<Props> = ({ activeTab, onSelectTab }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
      <div className="w-full max-w-md bg-white border-t border-slate-200/90 py-1.5 px-3 flex items-end justify-around shadow-xl pointer-events-auto">
        {/* TASKS */}
        <button
          onClick={() => onSelectTab('tasks')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition group relative ${
            activeTab === 'tasks' ? 'text-[#FF5500]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <ShoppingBag className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-extrabold uppercase tracking-tight">TASKS</span>
          {activeTab === 'tasks' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] absolute -bottom-1"></span>
          )}
        </button>

        {/* TEAM */}
        <button
          onClick={() => onSelectTab('team')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition group relative ${
            activeTab === 'team' ? 'text-[#FF5500]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Users className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-extrabold uppercase tracking-tight">TEAM</span>
          {activeTab === 'team' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] absolute -bottom-1"></span>
          )}
        </button>

        {/* HOME (Prominent Center Circle) */}
        <button
          onClick={() => onSelectTab('home')}
          className="flex-1 flex flex-col items-center justify-center -mt-5 transition group relative"
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 border-2 border-white ${
              activeTab === 'home'
                ? 'bg-[#FF5500] text-white ring-2 ring-orange-400/40'
                : 'bg-orange-500 text-white'
            }`}
          >
            <Home className="w-6 h-6" />
          </div>
          <span
            className={`text-[10px] font-extrabold uppercase tracking-tight mt-1 ${
              activeTab === 'home' ? 'text-[#FF5500]' : 'text-slate-500'
            }`}
          >
            HOME
          </span>
          {activeTab === 'home' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] absolute -bottom-1"></span>
          )}
        </button>

        {/* WITHDRAW */}
        <button
          onClick={() => onSelectTab('withdraw')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition group relative ${
            activeTab === 'withdraw' ? 'text-[#FF5500]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Wallet className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-extrabold uppercase tracking-tight">WITHDRAW</span>
          {activeTab === 'withdraw' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] absolute -bottom-1"></span>
          )}
        </button>

        {/* ACCOUNT */}
        <button
          onClick={() => onSelectTab('account')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition group relative ${
            activeTab === 'account' ? 'text-[#FF5500]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-extrabold uppercase tracking-tight">ACCOUNT</span>
          {activeTab === 'account' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] absolute -bottom-1"></span>
          )}
        </button>
      </div>
    </div>
  );
};
