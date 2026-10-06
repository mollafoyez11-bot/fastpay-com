import React, { useState, useEffect } from 'react';
import { UserProfile, Transaction, PlanItem } from './types';
import { DEFAULT_USER } from './data/mockData';
import { HomeTab } from './components/HomeTab';
import { TasksPage } from './components/TasksPage';
import { PlansPage } from './components/PlansPage';
import { TeamPage } from './components/TeamPage';
import { DepositPage } from './components/DepositPage';
import { WithdrawPage } from './components/WithdrawPage';
import { AccountPage } from './components/AccountPage';
import { BottomNav } from './components/BottomNav';
import { SuspensionPolicyModal } from './components/SuspensionPolicyModal';
import { SupportModal } from './components/SupportModal';
import { AuthModal } from './components/AuthModal';
import { TransactionHistoryModal } from './components/TransactionHistoryModal';
import { HtmlExportModal } from './components/HtmlExportModal';

export default function App() {
  // Load persisted user or default
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('fastpay_active_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return DEFAULT_USER;
  });

  // Persistent transactions
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('fastpay_transactions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      {
        id: 'INIT-BONUS',
        type: 'bonus',
        amount: 100,
        status: 'completed',
        timestamp: new Date().toLocaleString('bn-BD', {
          dateStyle: 'short',
          timeStyle: 'short',
        }),
        title: 'সাইন-আপ বোনাস',
        subtitle: 'অফিশিয়াল ওয়েলকাম বোনাস',
      },
    ];
  });

  // Current view tab
  const [activeTab, setActiveTab] = useState<'home' | 'tasks' | 'team' | 'withdraw' | 'account' | 'plans' | 'deposit'>('home');

  // Modals state
  const [isSuspensionOpen, setIsSuspensionOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isTxHistoryOpen, setIsTxHistoryOpen] = useState(false);
  const [isHtmlExportOpen, setIsHtmlExportOpen] = useState(false);

  // Sync user and transactions to localStorage
  useEffect(() => {
    localStorage.setItem('fastpay_active_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('fastpay_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Handlers
  const handleDepositSuccess = (tx: Transaction) => {
    setTransactions((prev) => [tx, ...prev]);
    // The prompt asks to show pending animation and admin will check to add balance.
    // Also update totalDeposit metric slightly for demo visualization after review
    setUser((prev) => ({
      ...prev,
      totalDeposit: prev.totalDeposit + tx.amount,
    }));
  };

  const handleWithdrawSuccess = (tx: Transaction, amount: number) => {
    setTransactions((prev) => [tx, ...prev]);
    setUser((prev) => ({
      ...prev,
      balance: Math.max(0, prev.balance - amount),
      totalWithdraw: prev.totalWithdraw + amount,
    }));
  };

  const handleUnlockPlan = (plan: PlanItem, tx: Transaction, bonusTx?: Transaction) => {
    const newTxList = [tx];
    let newBalance = user.balance - plan.price;

    if (bonusTx) {
      newTxList.push(bonusTx);
      newBalance += bonusTx.amount;
    }

    setTransactions((prev) => [...newTxList, ...prev]);
    setUser((prev) => ({
      ...prev,
      balance: newBalance,
      activePlan: {
        id: plan.id,
        name: plan.vipLevel,
        price: plan.price,
        dailyTasks: plan.dailyTasks,
        dailyIncome: plan.dailyIncome,
        taskCommission: plan.taskCommission,
        validityDays: plan.validityDays,
        bonusText: plan.bonusText,
      },
    }));
  };

  const handleTaskComplete = (earned: number, updatedUser: UserProfile, tx: Transaction) => {
    setTransactions((prev) => [tx, ...prev]);
    setUser(updatedUser);
  };

  const handleLogout = () => {
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = (loggedUser: UserProfile) => {
    setUser(loggedUser);
    setIsAuthOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center text-slate-800 antialiased selection:bg-orange-500 selection:text-white">
      {/* Mobile viewport frame container */}
      <div className="w-full max-w-md min-h-screen bg-slate-100 flex flex-col relative shadow-2xl">
        {/* Active View */}
        {activeTab === 'home' && (
          <HomeTab
            user={user}
            onNavigateTasks={() => setActiveTab('tasks')}
            onNavigatePlans={() => setActiveTab('plans')}
            onNavigateTeam={() => setActiveTab('team')}
            onOpenDeposit={() => setActiveTab('deposit')}
            onOpenWithdraw={() => setActiveTab('withdraw')}
            onOpenSupport={() => setIsSupportOpen(true)}
            onOpenHtmlExport={() => setIsHtmlExportOpen(true)}
            onOpenSuspensionPolicy={() => setIsSuspensionOpen(true)}
          />
        )}

        {activeTab === 'tasks' && (
          <TasksPage
            user={user}
            onBack={() => setActiveTab('home')}
            onNavigatePlans={() => setActiveTab('plans')}
            onCompleteTask={handleTaskComplete}
          />
        )}

        {activeTab === 'plans' && (
          <PlansPage
            user={user}
            onBack={() => setActiveTab('home')}
            onNavigateTasks={() => setActiveTab('tasks')}
            onNavigateDeposit={() => setActiveTab('deposit')}
            onUnlockPlan={handleUnlockPlan}
          />
        )}

        {activeTab === 'team' && (
          <TeamPage
            user={user}
            onBack={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'deposit' && (
          <DepositPage
            onBack={() => setActiveTab('home')}
            onSuccessDeposit={handleDepositSuccess}
          />
        )}

        {activeTab === 'withdraw' && (
          <WithdrawPage
            user={user}
            onBack={() => setActiveTab('home')}
            onSuccessWithdraw={handleWithdrawSuccess}
            onOpenDeposit={() => setActiveTab('deposit')}
          />
        )}

        {activeTab === 'account' && (
          <AccountPage
            user={user}
            onNavigateHome={() => setActiveTab('home')}
            onNavigatePlans={() => setActiveTab('plans')}
            onNavigateTeam={() => setActiveTab('team')}
            onOpenTransactions={() => setIsTxHistoryOpen(true)}
            onOpenSuspensionPolicy={() => setIsSuspensionOpen(true)}
            onLogout={handleLogout}
          />
        )}

        {/* Bottom Navigation */}
        <BottomNav
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
        />

        {/* Global Modals */}
        <SuspensionPolicyModal
          isOpen={isSuspensionOpen}
          onClose={() => setIsSuspensionOpen(false)}
          onNavigatePlan={() => {
            setIsSuspensionOpen(false);
            setActiveTab('plans');
          }}
        />

        <SupportModal
          isOpen={isSupportOpen}
          onClose={() => setIsSupportOpen(false)}
        />

        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onSuccess={handleAuthSuccess}
        />

        <TransactionHistoryModal
          isOpen={isTxHistoryOpen}
          onClose={() => setIsTxHistoryOpen(false)}
          transactions={transactions}
        />

        <HtmlExportModal
          isOpen={isHtmlExportOpen}
          onClose={() => setIsHtmlExportOpen(false)}
        />
      </div>
    </div>
  );
}
