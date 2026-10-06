import React, { useState } from 'react';
import { X, ArrowDownLeft, ArrowUpRight, CheckCircle, Clock, XCircle, Gift, Sparkles } from 'lucide-react';
import { Transaction } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
}

export const TransactionHistoryModal: React.FC<Props> = ({ isOpen, onClose, transactions }) => {
  const [filter, setFilter] = useState<'all' | 'deposit' | 'withdraw' | 'task'>('all');

  if (!isOpen) return null;

  const filtered = transactions.filter((t) => {
    if (filter === 'all') return true;
    return t.type === filter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[85vh] animate-scaleUp">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm">লেনদেন হিস্ট্রি</h3>
            <p className="text-[11px] text-slate-400">সর্বমোট লেনদেন: {transactions.length}টি</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex p-2 bg-slate-100 gap-1 text-xs border-b border-slate-200">
          {(['all', 'deposit', 'withdraw', 'task'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-1.5 rounded-xl font-bold transition text-[11px] capitalize ${
                filter === f
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'bg-transparent text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f === 'all' ? 'সবগুলো' : f === 'deposit' ? 'ডিপোজিট' : f === 'withdraw' ? 'উইথড্র' : 'টাস্ক'}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="p-3 overflow-y-auto space-y-2 flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs">
              কোনো লেনদেন রেকর্ড পাওয়া যায়নি
            </div>
          ) : (
            filtered.map((t) => (
              <div
                key={t.id}
                className="bg-white border border-slate-200 rounded-2xl p-3 flex items-center justify-between shadow-2xs hover:border-slate-300 transition"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      t.type === 'deposit'
                        ? 'bg-emerald-100 text-emerald-600'
                        : t.type === 'withdraw'
                        ? 'bg-rose-100 text-rose-600'
                        : t.type === 'bonus'
                        ? 'bg-amber-100 text-amber-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    {t.type === 'deposit' ? (
                      <ArrowDownLeft className="w-5 h-5" />
                    ) : t.type === 'withdraw' ? (
                      <ArrowUpRight className="w-5 h-5" />
                    ) : t.type === 'bonus' ? (
                      <Gift className="w-5 h-5" />
                    ) : (
                      <Sparkles className="w-5 h-5" />
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">{t.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{t.timestamp}</p>
                    {t.subtitle && <p className="text-[10px] text-slate-500 font-mono">{t.subtitle}</p>}
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`text-xs font-black font-num ${
                      t.type === 'withdraw' || t.type === 'plan' ? 'text-rose-600' : 'text-emerald-600'
                    }`}
                  >
                    {t.type === 'withdraw' || t.type === 'plan' ? '-' : '+'}৳{t.amount.toLocaleString()}
                  </div>

                  <span
                    className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                      t.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : t.status === 'pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {t.status === 'completed' ? 'সফল' : t.status === 'pending' ? 'পেন্ডিং' : 'বাতিল'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
