import React from 'react';
import { AlertTriangle, CheckCircle2, PlayCircle, X } from 'lucide-react';
import { OFFICIAL_DEPOSIT_NUMBER } from '../data/mockData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNavigatePlan: () => void;
}

export const SuspensionPolicyModal: React.FC<Props> = ({ isOpen, onClose, onNavigatePlan }) => {
  const [videoNotice, setVideoNotice] = React.useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-5 border border-slate-100 text-center animate-scaleUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning Icon */}
        <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500 shadow-xs">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2">
          অ্যাকাউন্ট নিরাপত্তা ও <span className="text-red-600">সাসপেনশন নীতি</span>
        </h3>

        {/* Reason Box */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-left mb-3 text-xs leading-relaxed text-red-900">
          <div className="flex items-center gap-1 font-semibold text-red-700 mb-1">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping inline-block"></span>
            সাসপেন্ড হওয়ার কারণ ও নিয়ম:
          </div>
          <p className="text-slate-700">
            আপনাকে বোনাসের ১০০ টাকা দেওয়া হয়েছিল প্যাকেজ কেনার জন্য, কিন্তু আপনি তা নিয়মবহির্ভূতভাবে উত্তোলন করলে একাউন্ট সাময়িকভাবে সাসপেন্ড হতে পারে। সঠিক নিয়মে কাজ করুন ও উপার্জিত টাকা তুলুন।
          </p>
        </div>

        {/* Video Tutorial Button */}
        <button
          onClick={() => setVideoNotice(!videoNotice)}
          className="w-full mb-2 py-2 px-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 font-medium text-xs flex items-center justify-center gap-1.5 hover:bg-sky-100 transition shadow-xs"
        >
          <PlayCircle className="w-4 h-4 text-sky-600" />
          <span>কিভাবে একাউন্টটি সচল করবেন দেখুন!</span>
        </button>
        {videoNotice && (
          <p className="text-[10px] text-sky-600 mb-2">অফিশিয়াল ভিডিও গাইড শীঘ্রই আসছে!</p>
        )}

        {/* Safety Guidelines */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-left mb-4 text-xs">
          <p className="font-semibold text-slate-800 mb-2">নিরাপদ আর্নিং করার নিয়মাবলী:</p>
          <ul className="space-y-1.5 text-slate-600">
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>শুধুমাত্র অফিশিয়াল নাম্বারে সেন্ড মানি করুন ({OFFICIAL_DEPOSIT_NUMBER})!</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>প্রতিদিন নির্ধারিত টাস্ক সম্পন্ন করে কমিশন সংগ্রহ করুন।</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>উইথড্র করার সময় নিজের বিকাশ/নগদ নাম্বার সতর্কভাবে লিখুন।</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
          <button
            onClick={() => {
              onClose();
              onNavigatePlan();
            }}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-1"
          >
            💳 প্লান কিনুন
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-700 hover:bg-slate-800 text-white shadow-md shadow-slate-700/20 transition flex items-center justify-center gap-1"
          >
            📊 ড্যাশবোর্ড
          </button>
        </div>
      </div>
    </div>
  );
};
