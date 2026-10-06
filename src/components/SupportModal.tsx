import React, { useState } from 'react';
import { Send, MessageSquare, Headphones, X, Check, Bot, User } from 'lucide-react';
import { WEBSITE_NAME } from '../data/mockData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'options' | 'live-chat'>('options');
  const [messages, setMessages] = useState<{ sender: 'bot' | 'user'; text: string; time: string }[]>([
    {
      sender: 'bot',
      text: `আসসালামু আলাইকুম! ${WEBSITE_NAME} এর লাইভ সাপোর্ট হেল্পডেস্কে স্বাগতম। আপনার যেকোনো ডিপোজিট, উইথড্র অথবা প্ল্যান সংক্রান্ত সমস্যার কথা বলুন, আমি আপনাকে সাহায্য করব।`,
      time: 'এখন',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const userMsg = inputText.trim();
    const newMsg = {
      sender: 'user' as const,
      text: userMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let botReply = "ধন্যবাদ মেসেজের জন্য। অনুগ্রহ করে আপনার ইউজার আইডি এবং সমস্যা বিস্তারিত লিখুন।";
      const lower = userMsg.toLowerCase();
      if (lower.includes('ডিপোজিট') || lower.includes('deposit') || lower.includes('টাকা') || lower.includes('ব্যালেন্স')) {
        botReply = "ডিপোজিট করার পর ৫-১০ মিনিটের মধ্যে এডমিন ট্রানজেকশন আইডি চেক করে আপনার ব্যালেন্স যুক্ত করে দেবে। শুধুমাত্র সেন্ড মানি করুন অফিশিয়াল নাম্বারে: 01874345861।";
      } else if (lower.includes('উইথড্র') || lower.includes('উত্তোলন') || lower.includes('withdraw')) {
        botReply = "উইথড্র রিকোয়েস্ট সফলভাবে সাবমিট হলে সাধারণত ৩০ মিনিট থেকে ২ ঘণ্টার মধ্যে পেমেন্ট সফল করা হয়। আপনার উইথড্র হিস্ট্রি চেক করতে পারেন।";
      } else if (lower.includes('প্ল্যান') || lower.includes('plan') || lower.includes('প্যাকেজ')) {
        botReply = "আমাদের ভিআইপি প্ল্যানগুলো দেখতে 'প্ল্যান' অপশনে যান। VIP-1 (৫০০ টাকা), VIP-2 (২০০০ টাকা), VIP-3 (৫০০০ টাকা), VIP-4 (১০০০০ টাকা) রয়েছে।";
      } else if (lower.includes('টাস্ক') || lower.includes('task') || lower.includes('কাজ')) {
        botReply = "প্রতিদিন আপনার কেনা প্ল্যানের টাস্ক সংখ্যা অনুযায়ী অর্ডার গ্র্যাব করে প্রতিদিনের ইনকাম সংগ্রহ করুন। প্রতিদিন রাত ১২টার পর নতুন টাস্ক আসে।";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 animate-scaleUp">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Headphones className="w-5 h-5" />
            <div>
              <h3 className="font-bold text-sm leading-tight">২৪/৭ কাস্টমার সাপোর্ট</h3>
              <p className="text-[11px] text-orange-100">{WEBSITE_NAME} হেল্প সেন্টার</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {activeTab === 'options' ? (
          <div className="p-5 space-y-4">
            <p className="text-xs text-slate-600 text-center">
              আপনার সমস্যার দ্রুত সমাধানের জন্য যেকোনো একটি মাধ্যমে যোগাযোগ করুন:
            </p>

            {/* Option 1: Telegram Channel */}
            <a
              href="https://t.me/FastpayOfficialSupport"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 p-3.5 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-xl transition group text-left"
            >
              <div className="w-11 h-11 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
                <Send className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-sky-950">টেলিগ্রাম সাপোর্ট চ্যানেল</h4>
                  <span className="text-[10px] bg-sky-600 text-white px-2 py-0.5 rounded-full font-medium">অফিশিয়াল</span>
                </div>
                <p className="text-[11px] text-slate-600 truncate mt-0.5">সব খবর ও টেলিগ্রাম লাইভ সাপোর্ট পেতে যুক্ত হন</p>
              </div>
            </a>

            {/* Option 2: Live Support Agent */}
            <button
              onClick={() => setActiveTab('live-chat')}
              className="w-full flex items-center gap-3.5 p-3.5 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-xl transition group text-left"
            >
              <div className="w-11 h-11 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-orange-950">লাইভ সাপোর্ট এজেন্ট</h4>
                  <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-medium">অনলাইন</span>
                </div>
                <p className="text-[11px] text-slate-600 truncate mt-0.5">সরাসরি এজেন্টের সাথে চ্যাট করে সমাধান নিন</p>
              </div>
            </button>

            <div className="pt-2 text-center">
              <span className="text-[11px] text-slate-400">সাপোর্ট টিম সকাল ৯:০০ - রাত ১১:৫৯ পর্যন্ত সক্রিয়</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-[380px]">
            {/* Sub-header */}
            <div className="px-3 py-2 bg-slate-100 flex items-center justify-between text-xs border-b border-slate-200">
              <button
                onClick={() => setActiveTab('options')}
                className="text-orange-600 font-medium hover:underline text-[11px]"
              >
                ← মাধ্যম পরিবর্তন
              </button>
              <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                এজেন্ট অনলাইন আছেন
              </span>
            </div>

            {/* Messages body */}
            <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-slate-50 text-xs">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] rounded-2xl p-2.5 shadow-2xs ${
                      m.sender === 'user'
                        ? 'bg-orange-500 text-white rounded-tr-none'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                    }`}
                  >
                    <p className="leading-relaxed">{m.text}</p>
                    <span
                      className={`text-[9px] block mt-1 text-right ${
                        m.sender === 'user' ? 'text-orange-100' : 'text-slate-400'
                      }`}
                    >
                      {m.time}
                    </span>
                  </div>
                  {m.sender === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-slate-400 text-white flex items-center justify-center shrink-0 mt-1">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] p-2 bg-white rounded-xl w-fit border border-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce [animation-delay:0.4s]"></span>
                  <span>এজেন্ট টাইপ করছেন...</span>
                </div>
              )}
            </div>

            {/* Input area */}
            <div className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="মেসেজ লিখুন..."
                className="flex-1 bg-slate-100 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="w-9 h-9 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white flex items-center justify-center transition shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
