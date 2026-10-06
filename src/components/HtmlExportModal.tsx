import React, { useState } from 'react';
import { X, Copy, Check, Code, Download } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const HtmlExportModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  const standaloneHtmlCode = `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Fastpay.com - অনলাইন আর্নিং ও পেমেন্ট প্ল্যাটফর্ম</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Outfit:wght@500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Hind Siliguri', sans-serif; }
    .font-num { font-family: 'Outfit', sans-serif; }
  </style>
</head>
<body class="bg-slate-900 text-slate-800 flex justify-center min-h-screen">
  <div class="w-full max-w-md bg-slate-100 min-h-screen relative pb-20 shadow-2xl flex flex-col">
    
    <!-- Top Header -->
    <div class="bg-[#FF5500] text-white px-4 pt-3 pb-8">
      <div class="flex items-center justify-between mb-2">
        <div>
          <div class="flex items-center gap-1.5">
            <span class="font-black text-lg tracking-wide">Fastpay.com</span>
            <span class="text-[10px] bg-white text-[#FF5500] font-bold px-1.5 py-0.5 rounded shadow-xs">অফিসিয়াল</span>
          </div>
          <p class="text-xs text-orange-100" id="headerGreeting">স্বাগতম, ইউজার</p>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="openSupport()" class="p-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-white text-xs font-semibold flex items-center gap-1">
            🎧 <span>সাপোর্ট</span>
          </button>
          <button onclick="openAuthModal('signup')" class="p-1.5 bg-black/20 hover:bg-black/30 rounded-lg text-white text-xs font-semibold" id="authBtn">
            👤 একাউন্ট
          </button>
        </div>
      </div>
    </div>

    <!-- Main Container / Views -->
    <div id="mainView" class="px-4 -mt-6 space-y-4">
      
      <!-- Balance Card -->
      <div class="bg-white rounded-3xl p-4 shadow-lg border border-slate-200">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-xs text-slate-500 font-medium">বর্তমান ব্যালেন্স</span>
            <div class="text-3xl font-black text-slate-900 font-num" id="userBalanceText">৳100.00</div>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold" id="userActivePlanText">কোন প্ল্যান নেই</span>
              <span class="text-[11px] text-slate-400 font-mono" id="userMemberIdText">আইডি: FP7780</span>
            </div>
          </div>
          <div class="w-12 h-12 rounded-full bg-gradient-to-tr from-orange-400 to-amber-300 text-white font-black flex items-center justify-center text-lg shadow-inner" id="userAvatarText">
            U
          </div>
        </div>

        <!-- Action Buttons (Deposit placed beside Withdraw as requested) -->
        <div class="grid grid-cols-3 gap-2 mt-4 pt-3.5 border-t border-slate-100">
          <button onclick="switchTab('plans')" class="py-2.5 rounded-xl bg-[#057A55] text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm">
            ➕ প্ল্যান
          </button>
          <button onclick="openDepositModal()" class="py-2.5 rounded-xl bg-[#FF5500] text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm">
            📥 ডিপোজিট
          </button>
          <button onclick="openWithdrawModal()" class="py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm">
            📤 উত্তোলন
          </button>
        </div>
      </div>

      <!-- Quick 2 stats -->
      <div class="grid grid-cols-2 gap-2.5">
        <div class="bg-white rounded-2xl p-3 border border-slate-200 text-center">
          <span class="text-[11px] text-slate-500 block">আজকের আয়</span>
          <span class="text-base font-black text-emerald-600 font-num" id="todayEarnText">৳0.00</span>
        </div>
        <div class="bg-white rounded-2xl p-3 border border-slate-200 text-center">
          <span class="text-[11px] text-slate-500 block">মোট রেফার আয়</span>
          <span class="text-base font-black text-purple-600 font-num">৳0.00</span>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-3xl p-4 border border-slate-200">
        <div class="flex items-center justify-between mb-3">
          <span class="font-bold text-xs text-slate-800">⚡ দ্রুত কার্যক্রম</span>
          <span class="text-[11px] text-slate-400">অ্যাক্টিভ</span>
        </div>
        <div class="grid grid-cols-4 gap-2 text-center">
          <button onclick="switchTab('tasks')" class="flex flex-col items-center">
            <div class="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl mb-1 shadow-sm">🛍️</div>
            <span class="text-xs font-bold text-slate-700">কাজ</span>
          </button>
          <button onclick="switchTab('plans')" class="flex flex-col items-center">
            <div class="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center text-xl mb-1 shadow-sm">📦</div>
            <span class="text-xs font-bold text-slate-700">প্ল্যান</span>
          </button>
          <button onclick="openWithdrawModal()" class="flex flex-col items-center">
            <div class="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center text-xl mb-1 shadow-sm">💳</div>
            <span class="text-xs font-bold text-slate-700">উত্তোলন</span>
          </button>
          <button onclick="openDepositModal()" class="flex flex-col items-center">
            <div class="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-xl mb-1 shadow-sm">📥</div>
            <span class="text-xs font-bold text-slate-700">ডিপোজিট</span>
          </button>
        </div>
      </div>

      <!-- Add Balance Notice Banner with 01874345861 -->
      <div class="bg-[#057A55] rounded-2xl p-3 text-white flex items-center justify-between shadow-md">
        <div class="flex-1 pr-2">
          <div class="text-xs font-extrabold flex items-center gap-1">
            <span>এড ব্যালেন্স</span>
            <span class="text-[10px] bg-white text-[#057A55] px-1.5 py-0.2 rounded font-bold">ইনস্ট্যান্ট বিকাশ/নগদ</span>
          </div>
          <p class="text-[11px] text-emerald-100 mt-0.5">
            শুধুমাত্র সেন্ড মানি করুন: <span class="font-mono font-bold text-amber-300">01874345861</span>
          </p>
        </div>
        <button onclick="openDepositModal()" class="bg-white hover:bg-emerald-50 text-[#057A55] font-extrabold text-xs px-3 py-1.5 rounded-xl shadow-xs">
          ডিপোজিট →
        </button>
      </div>

      <!-- Live Payments -->
      <div class="bg-white rounded-3xl p-4 border border-slate-200">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>লাইভ পেমেন্ট আপডেট</span>
          </div>
          <span class="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">🟢 অটো পে সচল</span>
        </div>
        <div class="space-y-2 text-xs" id="liveTickerList">
          <div class="flex items-center justify-between p-2 bg-slate-50 rounded-xl">
            <span>ইব্রাহিম খলিল (ঢাকা)</span>
            <span class="font-bold text-purple-700 font-num">৳10,000 Rocket</span>
          </div>
          <div class="flex items-center justify-between p-2 bg-slate-50 rounded-xl">
            <span>ফারহানা রহমান (সিলেট)</span>
            <span class="font-bold text-pink-600 font-num">৳500 bKash</span>
          </div>
          <div class="flex items-center justify-between p-2 bg-slate-50 rounded-xl">
            <span>তানভীর হাসান (রাজশাহী)</span>
            <span class="font-bold text-orange-600 font-num">৳1,500 Nagad</span>
          </div>
        </div>
      </div>

    </div>

    <!-- PLANS VIEW (Hidden by default) -->
    <div id="plansView" class="hidden px-4 py-4 space-y-4">
      <div class="flex items-center justify-between pb-2 border-b border-slate-200">
        <h2 class="font-bold text-base text-slate-800">ভিআইপি প্লান সমূহ (টাস্ক)</h2>
        <button onclick="switchTab('home')" class="text-xs bg-slate-200 px-3 py-1 rounded-lg">← ফিরে যান</button>
      </div>
      <div id="plansContainer" class="space-y-3">
        <!-- Rendered via JS -->
      </div>
    </div>

    <!-- TASKS VIEW (Hidden by default) -->
    <div id="tasksView" class="hidden px-4 py-4 space-y-4 text-center">
      <div class="flex items-center justify-between pb-2 border-b border-slate-200 text-left">
        <h2 class="font-bold text-base text-slate-800">অর্ডার গ্র্যাবিং পেজ</h2>
        <button onclick="switchTab('home')" class="text-xs bg-slate-200 px-3 py-1 rounded-lg">← ফিরে যান</button>
      </div>
      <div class="bg-white p-4 rounded-3xl border border-slate-200 flex flex-col items-center">
        <div class="w-28 h-28 rounded-full bg-[#057A55] text-white flex flex-col items-center justify-center my-4 shadow-lg">
          <span class="text-2xl">🎁</span>
          <span class="text-[10px] text-emerald-200 font-bold">FASTPAY.COM</span>
          <span class="text-xs font-black">TASK READY</span>
        </div>
        <p class="text-xs text-slate-600 mb-4">ক্লিক করে আপনার দৈনিক অর্ডার কমিশন সংগ্রহ করুন</p>
        <button onclick="grabTask()" class="w-full py-3 bg-[#057A55] text-white rounded-xl font-bold text-sm shadow-md">
          👉 অর্ডার গ্র্যাব শুরু করুন
        </button>
        <div id="taskNotice" class="text-xs text-amber-700 bg-amber-50 p-2 rounded-xl mt-3 hidden w-full"></div>
      </div>
    </div>

    <!-- TEAM VIEW -->
    <div id="teamView" class="hidden px-4 py-4 space-y-4">
      <div class="flex items-center justify-between pb-2 border-b border-slate-200">
        <h2 class="font-bold text-base text-slate-800">টিম ও রেফার কমিশন</h2>
        <button onclick="switchTab('home')" class="text-xs bg-slate-200 px-3 py-1 rounded-lg">← ফিরে যান</button>
      </div>
      <div class="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-5 text-white">
        <h3 class="font-black text-base mb-1">প্রতিটি সফল রেফারে পান ১০% - ২০%</h3>
        <p class="text-xs text-indigo-100 mb-3">আপনার বন্ধুদের আমন্ত্রণ জানিয়ে কমিশন পান</p>
        <div class="bg-black/30 p-2 rounded-xl flex items-center justify-between text-xs">
          <span class="font-mono truncate select-all" id="teamRefLink">https://fastpay.com/register?ref=FAST7780</span>
          <button onclick="copyRefLink()" class="bg-amber-400 text-amber-950 px-3 py-1 rounded-lg font-bold">কপি</button>
        </div>
      </div>
    </div>

    <!-- Bottom Navigation Bar -->
    <div class="fixed bottom-0 max-w-md w-full bg-white border-t border-slate-200 py-2 px-3 flex items-center justify-around z-40">
      <button onclick="switchTab('tasks')" class="flex flex-col items-center text-[10px] font-bold text-slate-500 hover:text-orange-500">
        <span class="text-lg">🛍️</span> টাস্ক
      </button>
      <button onclick="switchTab('team')" class="flex flex-col items-center text-[10px] font-bold text-slate-500 hover:text-orange-500">
        <span class="text-lg">👥</span> টিম
      </button>
      <button onclick="switchTab('home')" class="flex flex-col items-center text-[10px] font-bold text-[#FF5500]">
        <div class="w-10 h-10 -mt-5 bg-[#FF5500] text-white rounded-full flex items-center justify-center text-xl shadow-lg border-2 border-white">🏠</div>
        হোম
      </button>
      <button onclick="openWithdrawModal()" class="flex flex-col items-center text-[10px] font-bold text-slate-500 hover:text-orange-500">
        <span class="text-lg">💳</span> উত্তোলন
      </button>
      <button onclick="openAuthModal('signup')" class="flex flex-col items-center text-[10px] font-bold text-slate-500 hover:text-orange-500">
        <span class="text-lg">👤</span> অ্যাকাউন্ট
      </button>
    </div>

    <!-- MODAL: DEPOSIT -->
    <div id="depositModal" class="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
      <div class="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl relative text-xs">
        <button onclick="closeDepositModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg">✕</button>
        <h3 class="font-bold text-sm text-[#057A55] mb-2">এড ব্যালেন্স (শুধুমাত্র সেন্ড মানি)</h3>
        
        <p class="text-[11px] text-red-600 font-bold mb-2">কম বা বেশি সেন্ড মানি করবেন না</p>
        
        <label class="font-bold text-slate-700 block mb-1">টাকার পরিমাণ নির্বাচন করুন:</label>
        <div class="grid grid-cols-4 gap-1.5 mb-3" id="depositAmountChips">
          <!-- amounts -->
        </div>

        <div class="bg-slate-50 border border-slate-200 p-2.5 rounded-xl mb-3 flex items-center justify-between">
          <div>
            <span class="text-[10px] text-slate-500 block">সেন্ড মানি নাম্বার (বিকাশ/নগদ/রকেট):</span>
            <span class="font-mono font-bold text-base text-slate-900">01874345861</span>
          </div>
          <button onclick="navigator.clipboard.writeText('01874345861'); alert('নাম্বার কপি হয়েছে: 01874345861');" class="bg-emerald-600 text-white px-2.5 py-1 rounded-lg text-xs font-bold">কপি</button>
        </div>

        <label class="font-bold text-slate-700 block mb-1">সেন্ড মানির TrxID লিখুন:</label>
        <input type="text" id="depositTrxInput" placeholder="TrxID অবশ্যই দিতে হবে" class="w-full p-2.5 border border-slate-300 rounded-xl mb-3 font-mono">

        <button onclick="submitDeposit()" class="w-full py-3 bg-[#057A55] text-white rounded-xl font-bold text-sm">নিশ্চিত করুন</button>
      </div>
    </div>

    <!-- MODAL: WITHDRAW -->
    <div id="withdrawModal" class="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
      <div class="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl relative text-xs">
        <button onclick="closeWithdrawModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg">✕</button>
        <h3 class="font-bold text-sm text-slate-800 mb-2">উত্তোলন (Cashout)</h3>

        <div class="bg-slate-900 text-white p-3 rounded-2xl mb-3">
          <span class="text-[11px] text-slate-400">উত্তোলনযোগ্য ব্যালেন্স:</span>
          <div class="text-xl font-black font-num" id="modalWithdrawBalance">৳100.00</div>
        </div>

        <label class="font-bold text-slate-700 block mb-1">আপনার বিকাশ/নগদ নাম্বার:</label>
        <input type="tel" id="withdrawPhoneInput" placeholder="০১xxxxxxxxx" class="w-full p-2.5 border border-slate-300 rounded-xl mb-3 font-num">

        <label class="font-bold text-slate-700 block mb-1">উত্তোলন পরিমাণ (সর্বনিম্ন ৩০০ টাকা):</label>
        <input type="number" id="withdrawAmountInput" placeholder="টাকা লিখুন" class="w-full p-2.5 border border-slate-300 rounded-xl mb-3 font-num">

        <button onclick="submitWithdraw()" class="w-full py-3 bg-[#FF5500] text-white rounded-xl font-bold text-sm">উইথড্র নিশ্চিত করুন</button>
      </div>
    </div>

    <!-- MODAL: AUTH (Sign up / Login with completely empty fields) -->
    <div id="authModal" class="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
      <div class="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl relative text-xs">
        <button onclick="closeAuthModal()" class="absolute top-3 right-3 text-white text-lg z-10">✕</button>
        
        <div class="bg-gradient-to-r from-orange-500 to-amber-500 p-4 text-white text-center">
          <h3 class="text-base font-black">Fastpay.com</h3>
          <p class="text-[11px] text-orange-100">ইউজার রেজিস্ট্রেশন ও লগইন</p>
          <div class="flex bg-black/20 p-1 rounded-xl mt-3 text-xs font-semibold">
            <button onclick="setAuthMode('signup')" id="tabSignupBtn" class="flex-1 py-1 rounded-lg bg-white text-orange-600">রেজিস্ট্রেশন</button>
            <button onclick="setAuthMode('login')" id="tabLoginBtn" class="flex-1 py-1 rounded-lg text-white/80">লগইন</button>
          </div>
        </div>

        <div class="p-4 space-y-3">
          <div id="signupFields">
            <label class="block font-semibold text-slate-700 mb-1">আপনার নাম:</label>
            <input type="text" id="authName" placeholder="আপনার নাম লিখুন" class="w-full p-2.5 border border-slate-300 rounded-xl mb-2">
            
            <label class="block font-semibold text-slate-700 mb-1">মোবাইল নাম্বার:</label>
            <input type="tel" id="authPhone" placeholder="০১xxxxxxxxx" class="w-full p-2.5 border border-slate-300 rounded-xl mb-2 font-num">
            
            <label class="block font-semibold text-slate-700 mb-1">জিমেইল / ইমেইল:</label>
            <input type="email" id="authEmail" placeholder="আপনার জিমেইল লিখুন" class="w-full p-2.5 border border-slate-300 rounded-xl mb-2">
          </div>

          <div id="loginFieldContainer" class="hidden">
            <label class="block font-semibold text-slate-700 mb-1">জিমেইল বা মোবাইল নাম্বার:</label>
            <input type="text" id="loginIdentifier" placeholder="মোবাইল নাম্বার বা জিমেইল লিখুন" class="w-full p-2.5 border border-slate-300 rounded-xl mb-2">
          </div>

          <label class="block font-semibold text-slate-700 mb-1">পাসওয়ার্ড:</label>
          <input type="password" id="authPass" placeholder="পাসওয়ার্ড লিখুন" class="w-full p-2.5 border border-slate-300 rounded-xl mb-2">

          <div id="confirmPassField">
            <label class="block font-semibold text-slate-700 mb-1">কনফার্ম পাসওয়ার্ড:</label>
            <input type="password" id="authConfirmPass" placeholder="পাসওয়ার্ড পুনরায় লিখুন" class="w-full p-2.5 border border-slate-300 rounded-xl mb-2">
          </div>

          <div id="authError" class="text-red-600 font-semibold text-center hidden"></div>

          <button onclick="handleAuthSubmit()" class="w-full py-3 bg-[#FF5500] text-white rounded-xl font-bold text-sm" id="authSubmitBtn">
            রেজিস্ট্রেশন সম্পন্ন করুন
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL: SUPPORT (Telegram & Live Chat) -->
    <div id="supportModal" class="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
      <div class="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl relative text-xs">
        <button onclick="closeSupport()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg">✕</button>
        <h3 class="font-bold text-sm text-slate-900 mb-1">২৪/৭ কাস্টমার সাপোর্ট</h3>
        <p class="text-slate-500 mb-4">আপনার যেকোনো সমস্যার সমাধানের জন্য বেছে নিন:</p>

        <a href="https://t.me/FastpayOfficialSupport" target="_blank" class="flex items-center gap-3 p-3 bg-sky-50 border border-sky-200 rounded-2xl mb-2.5">
          <div class="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center text-lg">✈️</div>
          <div>
            <h4 class="font-bold text-sky-950">টেলিগ্রাম সাপোর্ট চ্যানেল</h4>
            <p class="text-[11px] text-slate-600">সব আপডেট ও সাহায্যের জন্য যুক্ত হন</p>
          </div>
        </a>

        <button onclick="alert('লাইভ এজেন্ট অনলাইনে আছেন! অফিশিয়াল নাম্বারে যোগাযোগ করুন: 01874345861')" class="w-full flex items-center gap-3 p-3 bg-orange-50 border border-orange-200 rounded-2xl text-left">
          <div class="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center text-lg">💬</div>
          <div>
            <h4 class="font-bold text-orange-950">লাইভ সাপোর্ট এজেন্ট</h4>
            <p class="text-[11px] text-slate-600">ইনস্ট্যান্ট সমস্যার সমাধান নিন</p>
          </div>
        </button>
      </div>
    </div>

    <!-- MODAL: 5-6s LOADER -->
    <div id="loaderModal" class="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4 text-center">
      <div class="w-full max-w-xs bg-white rounded-3xl p-6 shadow-2xl">
        <div class="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h4 class="font-bold text-sm text-slate-900 mb-1" id="loaderTitle">যাচাই করা হচ্ছে...</h4>
        <p class="text-xs text-slate-500" id="loaderSubtitle">অনুগ্রহ করে ৫-৬ সেকেন্ড অপেক্ষা করুন</p>
      </div>
    </div>

  </div>

  <script>
    // State
    let user = {
      name: '',
      phone: '',
      email: '',
      balance: 100.0,
      activePlan: null,
      todayIncome: 0.0,
      referralCode: 'FAST7780'
    };

    const PLANS = [
      { id: 'p-300', name: 'VIP - ৩০০', price: 300, dailyIncome: 150, tasks: 4, bonus: '🎁 ৩০০ টাকার স্পেশাল স্টার্টার প্ল্যান!' },
      { id: 'p-500', name: 'VIP - ১ (৫০০)', price: 500, dailyIncome: 300, tasks: 6, bonus: '' },
      { id: 'p-1000', name: 'VIP - ১০০০', price: 1000, dailyIncome: 500, tasks: 10, bonus: '🎁 ১০০০ টাকার প্লান কিনলে ৫০০ টাকা বোনাস!' },
      { id: 'p-1500', name: 'VIP - ১৫০০', price: 1500, dailyIncome: 750, tasks: 15, bonus: '🎁 ১৫০০ টাকার প্লান কিনলে ৮০০ টাকা বোনাস!' },
      { id: 'p-2000', name: 'VIP - ২ (২০০০)', price: 2000, dailyIncome: 1200, tasks: 24, bonus: '🎁 ২০০০ টাকার প্লান কিনলে ১০০০ টাকা বোনাস!' },
      { id: 'p-5000', name: 'VIP - ৩ (৫০০০)', price: 5000, dailyIncome: 3500, tasks: 70, bonus: '🎁 ৫০০০ টাকার প্লান কিনলে ৫০০০ টাকা বোনাস!' },
      { id: 'p-10000', name: 'VIP - ৪ (১০০০০)', price: 10000, dailyIncome: 8000, tasks: 160, bonus: '🎁 ১০০০০ টাকার প্লান কিনলে ১৫০০০ টাকা বোনাস!' }
    ];

    let currentAuthMode = 'signup';
    let selectedDepositAmount = 500;

    function renderUI() {
      document.getElementById('userBalanceText').innerText = '৳' + user.balance.toFixed(2);
      document.getElementById('modalWithdrawBalance').innerText = '৳' + user.balance.toFixed(2);
      document.getElementById('todayEarnText').innerText = '৳' + user.todayIncome.toFixed(2);
      
      if(user.name) {
        document.getElementById('headerGreeting').innerText = 'স্বাগতম, ' + user.name;
        document.getElementById('userAvatarText').innerText = user.name.charAt(0).toUpperCase();
      }
      if(user.activePlan) {
        document.getElementById('userActivePlanText').innerText = user.activePlan.name + ' (সক্রিয়)';
      }

      // Render plans
      const pContainer = document.getElementById('plansContainer');
      pContainer.innerHTML = PLANS.map(p => \`
        <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm text-xs">
          \${p.bonus ? \`<div class="bg-amber-500 text-white text-[10px] font-bold p-1 rounded-md text-center mb-2">\${p.bonus}</div>\` : ''}
          <div class="flex justify-between items-center mb-1">
            <span class="font-bold text-sm text-slate-800">\${p.name}</span>
            <span class="font-black text-emerald-600 text-base font-num">৳\${p.price}</span>
          </div>
          <div class="text-slate-500 mb-3">দৈনিক আয়: ৳\${p.dailyIncome} | দৈনিক টাস্ক: \${p.tasks}টি</div>
          <button onclick="unlockPlan('\${p.id}')" class="w-full py-2 bg-[#057A55] text-white rounded-xl font-bold">
            \${user.activePlan && user.activePlan.id === p.id ? 'সক্রিয় প্ল্যান (কাজ করুন)' : '🔓 আনলক করুন'}
          </button>
        </div>
      \`).join('');

      // Deposit Chips
      const chipsContainer = document.getElementById('depositAmountChips');
      const depositAmounts = [300, 500, 1000, 1500, 2000, 5000, 10000];
      chipsContainer.innerHTML = depositAmounts.map(amt => \`
        <button onclick="selectDepositAmt(\${amt})" class="py-1.5 rounded-lg font-bold text-xs \${selectedDepositAmount === amt ? 'bg-[#057A55] text-white' : 'bg-slate-100 text-slate-700'}">৳\${amt}</button>
      \`).join('');
    }

    function selectDepositAmt(amt) {
      selectedDepositAmount = amt;
      renderUI();
    }

    function switchTab(tab) {
      document.getElementById('mainView').classList.add('hidden');
      document.getElementById('plansView').classList.add('hidden');
      document.getElementById('tasksView').classList.add('hidden');
      document.getElementById('teamView').classList.add('hidden');

      if(tab === 'home') document.getElementById('mainView').classList.remove('hidden');
      if(tab === 'plans') document.getElementById('plansView').classList.remove('hidden');
      if(tab === 'tasks') document.getElementById('tasksView').classList.remove('hidden');
      if(tab === 'team') document.getElementById('teamView').classList.remove('hidden');
    }

    function openDepositModal() {
      document.getElementById('depositModal').classList.remove('hidden');
    }
    function closeDepositModal() {
      document.getElementById('depositModal').classList.add('hidden');
    }

    function submitDeposit() {
      const trx = document.getElementById('depositTrxInput').value.trim();
      if(!trx || trx.length < 6) {
        alert('সঠিক TrxID নাম্বার প্রদান করুন!');
        return;
      }
      closeDepositModal();
      showLoader('ট্রানজেকশন যাচাই করা হচ্ছে...', 'অনুগ্রহ করে ৫-৬ সেকেন্ড অপেক্ষা করুন...');
      
      setTimeout(() => {
        hideLoader();
        alert('আপনার লেনদেনটি সফলভাবে গ্রহণ করা হয়েছে! এডমিন আপনার ট্রানজেকশন চেক করে ব্যালেন্স যুক্ত করে দেবে, অনুগ্রহ করে অপেক্ষা করুন।');
      }, 5500);
    }

    function openWithdrawModal() {
      document.getElementById('withdrawModal').classList.remove('hidden');
    }
    function closeWithdrawModal() {
      document.getElementById('withdrawModal').classList.add('hidden');
    }

    function submitWithdraw() {
      const ph = document.getElementById('withdrawPhoneInput').value.trim();
      const amt = Number(document.getElementById('withdrawAmountInput').value);

      if(!ph || ph.length < 11) {
        alert('সঠিক ১১ ডিজিটের মোবাইল ব্যাংকিং নাম্বার লিখুন!');
        return;
      }
      if(!amt || amt < 300) {
        alert('সর্বনিম্ন উত্তোলন পরিমাণ ৩০০ টাকা!');
        return;
      }
      if(amt > user.balance) {
        alert('আপনার একাউন্টে পর্যাপ্ত ব্যালেন্স নেই!');
        return;
      }

      closeWithdrawModal();
      showLoader('উইথড্র রিকোয়েস্ট লোডিং হচ্ছে...', 'দয়া করে ৫ সেকেন্ড অপেক্ষা করুন...');

      setTimeout(() => {
        hideLoader();
        user.balance -= amt;
        renderUI();
        alert('আপনার উইথড্র রিকোয়েস্ট সফলভাবে সাবমিট হয়েছে এবং পেন্ডিং রয়েছে! দয়া করে অপেক্ষা করুন।');
      }, 5000);
    }

    function unlockPlan(id) {
      const p = PLANS.find(x => x.id === id);
      if(!p) return;

      if(user.balance < p.price) {
        alert('পর্যাপ্ত ব্যালেন্স নেই! ' + p.name + ' আনলক করতে ৳' + p.price + ' প্রয়োজন। ডিপোজিট করুন।');
        openDepositModal();
        return;
      }

      user.balance -= p.price;
      user.activePlan = p;
      alert(p.name + ' সফলভাবে আনলক হয়েছে!');
      renderUI();
      switchTab('tasks');
    }

    function grabTask() {
      if(!user.activePlan) {
        alert('আপনার কোনো ভিআইপি প্ল্যান সক্রিয় নেই! অনুগ্রহ করে একটি প্ল্যান আনলক করুন।');
        switchTab('plans');
        return;
      }

      showLoader('মার্কেটপ্লেস অর্ডার গ্র্যাব হচ্ছে...', 'কমিশন হিসাব সম্পন্ন করা হচ্ছে...');
      setTimeout(() => {
        hideLoader();
        const earned = 50;
        user.balance += earned;
        user.todayIncome += earned;
        renderUI();
        alert('অর্ডার গ্র্যাবিং সফল! +৳' + earned + ' কমিশন যুক্ত হয়েছে।');
      }, 2500);
    }

    function openAuthModal(mode) {
      setAuthMode(mode);
      document.getElementById('authModal').classList.remove('hidden');
    }
    function closeAuthModal() {
      document.getElementById('authModal').classList.add('hidden');
    }

    function setAuthMode(mode) {
      currentAuthMode = mode;
      const err = document.getElementById('authError');
      err.classList.add('hidden');
      
      // Keep fields empty as requested
      document.getElementById('authName').value = '';
      document.getElementById('authPhone').value = '';
      document.getElementById('authEmail').value = '';
      document.getElementById('loginIdentifier').value = '';
      document.getElementById('authPass').value = '';
      document.getElementById('authConfirmPass').value = '';

      if(mode === 'signup') {
        document.getElementById('signupFields').classList.remove('hidden');
        document.getElementById('confirmPassField').classList.remove('hidden');
        document.getElementById('loginFieldContainer').classList.add('hidden');
        document.getElementById('tabSignupBtn').className = 'flex-1 py-1 rounded-lg bg-white text-orange-600';
        document.getElementById('tabLoginBtn').className = 'flex-1 py-1 rounded-lg text-white/80';
        document.getElementById('authSubmitBtn').innerText = 'রেজিস্ট্রেশন সম্পন্ন করুন';
      } else {
        document.getElementById('signupFields').classList.add('hidden');
        document.getElementById('confirmPassField').classList.add('hidden');
        document.getElementById('loginFieldContainer').classList.remove('hidden');
        document.getElementById('tabLoginBtn').className = 'flex-1 py-1 rounded-lg bg-white text-orange-600';
        document.getElementById('tabSignupBtn').className = 'flex-1 py-1 rounded-lg text-white/80';
        document.getElementById('authSubmitBtn').innerText = 'লগইন করুন';
      }
    }

    function handleAuthSubmit() {
      const err = document.getElementById('authError');
      err.classList.add('hidden');

      if(currentAuthMode === 'signup') {
        const name = document.getElementById('authName').value.trim();
        const phone = document.getElementById('authPhone').value.trim();
        const email = document.getElementById('authEmail').value.trim();
        const pass = document.getElementById('authPass').value;
        const confirmPass = document.getElementById('authConfirmPass').value;

        if(!name || !phone || !email || !pass) {
          err.innerText = 'সবগুলো তথ্য পূরণ করুন!';
          err.classList.remove('hidden');
          return;
        }
        if(pass !== confirmPass) {
          err.innerText = 'পাসওয়ার্ড দুটি মিলছে না!';
          err.classList.remove('hidden');
          return;
        }

        user.name = name;
        user.phone = phone;
        user.email = email;
        alert('রেজিস্ট্রেশন সফল! ১০০ টাকা সাইন-আপ বোনাস যোগ হয়েছে।');
        closeAuthModal();
        renderUI();
      } else {
        const id = document.getElementById('loginIdentifier').value.trim();
        const pass = document.getElementById('authPass').value;

        if(!id || !pass) {
          err.innerText = 'মোবাইল/জিমেইল ও পাসওয়ার্ড দিন!';
          err.classList.remove('hidden');
          return;
        }

        user.name = id.includes('@') ? id.split('@')[0] : 'ইউজার ' + id.slice(-4);
        if(!user.phone && !id.includes('@')) user.phone = id;
        if(!user.email && id.includes('@')) user.email = id;
        
        alert('লগইন সফল হয়েছে!');
        closeAuthModal();
        renderUI();
      }
    }

    function openSupport() {
      document.getElementById('supportModal').classList.remove('hidden');
    }
    function closeSupport() {
      document.getElementById('supportModal').classList.add('hidden');
    }

    function showLoader(title, subtitle) {
      document.getElementById('loaderTitle').innerText = title;
      document.getElementById('loaderSubtitle').innerText = subtitle;
      document.getElementById('loaderModal').classList.remove('hidden');
    }
    function hideLoader() {
      document.getElementById('loaderModal').classList.add('hidden');
    }

    function copyRefLink() {
      navigator.clipboard.writeText(document.getElementById('teamRefLink').innerText);
      alert('রেফার লিঙ্ক কপি হয়েছে!');
    }

    // Initialize
    renderUI();
  </script>
</body>
</html>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(standaloneHtmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([standaloneHtmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fastpay.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[85vh] animate-scaleUp">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            <div>
              <h3 className="font-bold text-sm">সম্পূর্ণ HTML কোড কপি করুন</h3>
              <p className="text-[11px] text-orange-100">সিঙ্গেল ফাইল এইচটিএমএল ভার্সন</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Box */}
        <div className="p-3 bg-amber-50 border-b border-amber-200 text-xs text-amber-900 flex items-center justify-between">
          <span>নিচের সম্পূর্ণ কোডটি ১-ক্লিকে কপি করুন অথবা ডাউনলোড করুন:</span>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold text-xs flex items-center gap-1 transition shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'কপি হয়েছে!' : 'কোড কপি করুন'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-bold text-xs flex items-center gap-1 transition shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ডাউনলোড</span>
            </button>
          </div>
        </div>

        {/* Code display */}
        <div className="flex-1 p-3 overflow-y-auto bg-slate-950 text-slate-200 font-mono text-[11px] leading-relaxed">
          <pre>{standaloneHtmlCode}</pre>
        </div>
      </div>
    </div>
  );
};
