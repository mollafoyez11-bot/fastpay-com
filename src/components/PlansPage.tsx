import React, { useState } from 'react';
import { ArrowLeft, Monitor, DollarSign, Calendar, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { PLANS } from '../data/mockData';
import { PlanItem, UserProfile, Transaction } from '../types';

interface Props {
  user: UserProfile;
  onBack: () => void;
  onNavigateTasks: () => void;
  onNavigateDeposit: () => void;
  onUnlockPlan: (plan: PlanItem, tx: Transaction, bonusTx?: Transaction) => void;
}

export const PlansPage: React.FC<Props> = ({
  user,
  onBack,
  onNavigateTasks,
  onNavigateDeposit,
  onUnlockPlan,
}) => {
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<PlanItem | null>(null);
  const [insufficientModal, setInsufficientModal] = useState<boolean>(false);
  const [successModal, setSuccessModal] = useState<boolean>(false);

  const handleAttemptUnlock = (plan: PlanItem) => {
    if (user.activePlan?.id === plan.id) {
      onNavigateTasks();
      return;
    }

    if (user.balance < plan.price) {
      setSelectedPlanForModal(plan);
      setInsufficientModal(true);
      return;
    }

    // Deduct balance and unlock
    const tx: Transaction = {
      id: `PLN-${Date.now()}`,
      type: 'plan',
      amount: plan.price,
      status: 'completed',
      timestamp: new Date().toLocaleString('bn-BD', {
        dateStyle: 'short',
        timeStyle: 'short',
      }),
      title: `${plan.vipLevel} প্যাকেজ সাবস্ক্রিপশন`,
      subtitle: `মূল্য: ৳${plan.price}`,
    };

    let bonusTx: Transaction | undefined;
    if (plan.price === 1000) {
      bonusTx = {
        id: `BON-${Date.now()}`,
        type: 'bonus',
        amount: 500,
        status: 'completed',
        timestamp: new Date().toLocaleString('bn-BD', {
          dateStyle: 'short',
          timeStyle: 'short',
        }),
        title: `ভিআইপি-১০০০ স্পেশাল বোনাস`,
        subtitle: `৫০০ টাকা বোনাস যুক্ত হয়েছে`,
      };
    } else if (plan.price === 1500) {
      bonusTx = {
        id: `BON-${Date.now()}`,
        type: 'bonus',
        amount: 800,
        status: 'completed',
        timestamp: new Date().toLocaleString('bn-BD', {
          dateStyle: 'short',
          timeStyle: 'short',
        }),
        title: `ভিআইপি-১৫০০ ক্যাশব্যাক বোনাস`,
        subtitle: `৮০০ টাকা বোনাস যুক্ত হয়েছে`,
      };
    } else if (plan.price === 2000) {
      bonusTx = {
        id: `BON-${Date.now()}`,
        type: 'bonus',
        amount: 1000,
        status: 'completed',
        timestamp: new Date().toLocaleString('bn-BD', {
          dateStyle: 'short',
          timeStyle: 'short',
        }),
        title: `ভিআইপি-২ ক্যাশব্যাক বোনাস`,
        subtitle: `১০০০ টাকা বোনাস যুক্ত হয়েছে`,
      };
    } else if (plan.price === 5000) {
      bonusTx = {
        id: `BON-${Date.now()}`,
        type: 'bonus',
        amount: 5000,
        status: 'completed',
        timestamp: new Date().toLocaleString('bn-BD', {
          dateStyle: 'short',
          timeStyle: 'short',
        }),
        title: `ভিআইপি-৩ ক্যাশব্যাক বোনাস`,
        subtitle: `৫০০০ টাকা বোনাস যুক্ত হয়েছে`,
      };
    } else if (plan.price === 10000) {
      bonusTx = {
        id: `BON-${Date.now()}`,
        type: 'bonus',
        amount: 15000,
        status: 'completed',
        timestamp: new Date().toLocaleString('bn-BD', {
          dateStyle: 'short',
          timeStyle: 'short',
        }),
        title: `ভিআইপি-৪ সুপার বোনাস`,
        subtitle: `১৫০০০ টাকা বোনাস যুক্ত হয়েছে`,
      };
    }

    onUnlockPlan(plan, tx, bonusTx);
    setSelectedPlanForModal(plan);
    setSuccessModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 pb-20 flex flex-col justify-start max-w-md mx-auto shadow-2xl relative">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-30 flex items-center justify-between shadow-2xs">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center transition active:scale-95"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="font-bold text-slate-800 text-base">ভিআইপি প্লান সমূহ</h1>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 block leading-none">ব্যালেন্স</span>
          <span className="text-xs font-black text-emerald-600 font-num">
            ৳{user.balance.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-5">
        {PLANS.map((plan) => {
          const isCurrentActive = user.activePlan?.id === plan.id;

          return (
            <div
              key={plan.id}
              className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-200/80 transition transform hover:-translate-y-0.5"
            >
              {/* Optional Top Ribbon for bonus */}
              {plan.bonusText && (
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-bold text-center py-1.5 px-3">
                  {plan.bonusText}
                </div>
              )}

              {/* Green Header Box */}
              <div className="bg-[#057A55] text-white p-5 text-center relative overflow-hidden">
                <div className="text-xs font-bold text-emerald-200 tracking-wider mb-0.5">
                  {plan.vipLevel}
                </div>
                <div className="text-3xl font-black font-num mb-1">
                  ৳{plan.price.toLocaleString()}
                </div>
                <div className="inline-flex items-center gap-1 bg-black/20 text-emerald-100 px-2.5 py-0.5 rounded-full text-[11px] font-medium">
                  <Calendar className="w-3 h-3 text-emerald-300" />
                  <span>মেয়াদ: {plan.validityDays} দিন</span>
                </div>
              </div>

              {/* Plan Specs */}
              <div className="p-4 space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Monitor className="w-4 h-4 text-emerald-600" />
                    <span>দৈনিক টাস্ক</span>
                  </div>
                  <span className="font-bold text-slate-900 font-num">{plan.dailyTasks}টি</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-slate-600">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span>দৈনিক আয়</span>
                  </div>
                  <span className="font-bold text-emerald-600 font-num">৳{plan.dailyIncome.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <span>প্রতি টাস্ক কমিশন</span>
                  </div>
                  <span className="font-bold text-slate-900 font-num">৳{plan.taskCommission}</span>
                </div>

                {/* Action button */}
                <div className="pt-2">
                  {isCurrentActive ? (
                    <button
                      onClick={onNavigateTasks}
                      className="w-full py-3 rounded-xl bg-[#057A55] text-white font-bold text-xs shadow-md shadow-emerald-700/20 hover:bg-emerald-800 transition flex items-center justify-center gap-2 active:scale-95"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                      <span>কাজ করুন (Active)</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAttemptUnlock(plan)}
                      className={`w-full py-3 rounded-xl text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 active:scale-95 ${
                        plan.id === 'vip-1'
                          ? 'bg-[#057A55] hover:bg-emerald-800 shadow-emerald-700/20'
                          : 'bg-[#E02424] hover:bg-red-700 shadow-red-600/20'
                      }`}
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>আনলক করুন (Unlock Plan)</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Insufficient balance modal */}
      {insufficientModal && selectedPlanForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-xs bg-white rounded-3xl p-5 text-center shadow-2xl border border-slate-100 animate-scaleUp">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <AlertCircle className="w-8 h-8" />
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-1">
              পর্যাপ্ত ব্যালেন্স নেই!
            </h3>
            <p className="text-xs text-slate-500 mb-3">
              {selectedPlanForModal.vipLevel} আনলক করতে ৳{selectedPlanForModal.price} প্রয়োজন। আপনার বর্তমান ব্যালেন্স ৳{user.balance.toFixed(2)}।
            </p>

            <div className="space-y-2">
              <button
                onClick={() => {
                  setInsufficientModal(false);
                  onNavigateDeposit();
                }}
                className="w-full py-2.5 bg-[#057A55] hover:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow-md shadow-emerald-700/20 transition"
              >
                এখনই ব্যালেন্স ডিপোজিট করুন
              </button>
              <button
                onClick={() => setInsufficientModal(false)}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs transition"
              >
                বাতিল করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success unlock modal */}
      {successModal && selectedPlanForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-xs bg-white rounded-3xl p-6 text-center shadow-2xl border border-slate-100 animate-scaleUp">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center ring-8 ring-emerald-50">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-1">
              প্ল্যান সফলভাবে আনলক হয়েছে!
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              অভিনন্দন! {selectedPlanForModal.vipLevel} এখন সক্রিয়। প্রতিদিন {selectedPlanForModal.dailyTasks}টি টাস্ক সম্পন্ন করে ৳{selectedPlanForModal.dailyIncome} আয় করুন।
            </p>

            <button
              onClick={() => {
                setSuccessModal(false);
                onNavigateTasks();
              }}
              className="w-full py-2.5 bg-[#057A55] text-white rounded-xl font-bold text-xs shadow-md shadow-emerald-700/20 hover:bg-emerald-800 transition"
            >
              টাস্ক শুরু করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
