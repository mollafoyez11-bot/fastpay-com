export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  password?: string;
  referralCode: string;
  balance: number;
  totalDeposit: number;
  totalWithdraw: number;
  activePlan: ActivePlan | null;
  tasksCompletedToday: number;
  todayIncome: number;
  lastTaskDate: string;
  memberId: string;
}

export interface ActivePlan {
  id: string;
  name: string;
  vipLevel?: string;
  price: number;
  dailyTasks: number;
  dailyIncome: number;
  taskCommission: number;
  validityDays: number;
  bonusText?: string;
}

export interface PlanItem {
  id: string;
  vipLevel: string;
  price: number;
  validityDays: number;
  dailyTasks: number;
  dailyIncome: number;
  taskCommission: number;
  bonusText?: string;
  colorScheme?: string;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'task' | 'bonus' | 'plan';
  amount: number;
  method?: 'bKash' | 'Nagad' | 'Rocket';
  accountNumber?: string;
  trxId?: string;
  status: 'completed' | 'pending' | 'rejected';
  timestamp: string;
  title: string;
  subtitle?: string;
}

export interface PaymentProof {
  id: string;
  name: string;
  phone: string;
  timeAgo: string;
  text: string;
  likes: number;
  userLiked?: boolean;
}

export interface LivePayout {
  id: string;
  name: string;
  city: string;
  amount: number;
  method: 'bKash' | 'Nagad' | 'Rocket';
  type: string;
  timeAgo: string;
}
