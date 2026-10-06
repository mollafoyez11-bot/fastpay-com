import React, { useState } from 'react';
import { ArrowLeft, Gift, Copy, Check, Users, Award, TrendingUp, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';
import { WEBSITE_NAME } from '../data/mockData';

interface Props {
  user: UserProfile;
  onBack: () => void;
}

export const TeamPage: React.FC<Props> = ({ user, onBack }) => {
  const [copied, setCopied] = useState(false);
  const refCode = user.referralCode || 'FAST7780';
  const inviteLink = `https://${WEBSITE_NAME.toLowerCase()}/register?ref=${refCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-100 pb-20 flex flex-col justify-start max-w-md mx-auto shadow-2xl relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-3.5 sticky top-0 z-30 flex items-center justify-between shadow-md">
        <button
          onClick={onBack}
          className="p-1 hover:bg-white/20 rounded-full transition active:scale-95"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <h1 className="font-bold text-base">টিম ও রেফার কমিশন</h1>

        <div className="w-6"></div>
      </div>

      <div className="p-4 space-y-4">
        {/* Purple Gradient Hero Banner */}
        <div className="bg-gradient-to-br from-[#4F46E5] via-[#6366F1] to-[#7C3AED] rounded-3xl p-5 text-white shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold mb-1">
            <Gift className="w-4 h-4 text-amber-300" />
            <span>লাইফটাইম রেফারেল বোনাস</span>
          </div>

          <h2 className="text-lg font-black tracking-tight mb-1 text-white">
            প্রতিটি সফল রেফারে পান <span className="text-amber-300">১০% - ২০%</span>
          </h2>

          <p className="text-[11px] text-indigo-100/90 leading-relaxed mb-4">
            আপনার বন্ধুদের {WEBSITE_NAME} এ আমন্ত্রণ জানান এবং তাদের প্রতিটি ডিপোজিট ও টাস্ক থেকে আজীবন কমিশন পান।
          </p>

          <div className="bg-black/25 backdrop-blur-xs rounded-2xl p-2.5 flex items-center justify-between gap-2 border border-white/10">
            <span className="text-[11px] text-indigo-100 font-mono truncate select-all pl-1">
              {inviteLink}
            </span>
            <button
              onClick={handleCopy}
              className="bg-[#FBBF24] hover:bg-amber-400 text-amber-950 px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 shrink-0 transition shadow-sm active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'কপি হয়েছে' : 'কপি'}</span>
            </button>
          </div>
        </div>

        {/* 3 Summary Stats Box */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="bg-white rounded-2xl p-3 text-center border border-slate-200/80 shadow-2xs">
            <span className="text-[11px] text-slate-500 block mb-0.5">মোট সদস্য</span>
            <span className="text-base font-black text-slate-900 font-num">১২ জন</span>
          </div>
          <div className="bg-white rounded-2xl p-3 text-center border border-slate-200/80 shadow-2xs">
            <span className="text-[11px] text-slate-500 block mb-0.5">লেভেল ১ কমিশন</span>
            <span className="text-base font-black text-[#7C3AED] font-num">৳৭২০</span>
          </div>
          <div className="bg-white rounded-2xl p-3 text-center border border-slate-200/80 shadow-2xs">
            <span className="text-[11px] text-slate-500 block mb-0.5">লেভেল ২ কমিশন</span>
            <span className="text-base font-black text-emerald-600 font-num">৳৩৫০</span>
          </div>
        </div>

        {/* Level Commission Breakdown Card */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <Award className="w-4 h-4 text-orange-500" />
            <span>রেফারেল লেভেল কমিশন স্কেল</span>
          </div>

          {/* Level 1 */}
          <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-3 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-purple-950">লেভেল ১ (সরাসরি রেফার)</div>
              <div className="text-[11px] text-purple-700">ডিপোজিট ও কাজের কমিশন</div>
            </div>
            <div className="text-sm font-black text-purple-700 font-num">১০%</div>
          </div>

          {/* Level 2 */}
          <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-3 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-blue-950">লেভেল ২ (পরোক্ষ রেফার)</div>
              <div className="text-[11px] text-blue-700">পরবর্তী স্তর কমিশন</div>
            </div>
            <div className="text-sm font-black text-blue-700 font-num">৫%</div>
          </div>

          {/* Level 3 */}
          <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-3 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-emerald-950">লেভেল ৩</div>
              <div className="text-[11px] text-emerald-700">নেটওয়ার্ক টিম বোনাস</div>
            </div>
            <div className="text-sm font-black text-emerald-700 font-num">২%</div>
          </div>
        </div>

        {/* Tips Box */}
        <div className="bg-amber-50/80 border border-amber-200/70 rounded-2xl p-3 text-xs text-amber-900 leading-relaxed">
          <div className="font-bold flex items-center gap-1 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>টিপস:</span>
          </div>
          <p className="text-[11px] text-slate-700">
            আপনার রেফারেল লিঙ্ক ফেসবুক, টেলিগ্রাম এবং হোয়াটসঅ্যাপে শেয়ার করে আজই টিম তৈরি করুন এবং নিষ্ক্রিয় আয় শুরু করুন।
          </p>
        </div>
      </div>
    </div>
  );
};
