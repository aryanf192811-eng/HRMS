// Mock data for HRMS application

export interface User {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  role: 'employee' | 'hr';
  department: string;
  position: string;
  joinDate: string;
  profilePicture?: string;
  phoneNumber?: string;
  address?: string;
  profileCompleteness: number;
}

export interface LeaveBalance {
  paid: number;
  sick: number;
  unpaid: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'Paid Leave' | 'Sick Leave' | 'Unpaid Leave';
  startDate: string;
  endDate: string;
  days: number;
  remarks: string;
  status: 'pending' | 'approved' | 'rejected';
  autoApproved?: boolean;
  autoDecisionReason?: string;
  appliedDate: string;
  reviewedDate?: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'late' | 'half-day' | 'leave';
}

export interface SalaryStructure {
  baseSalary: number;
  hra: number;
  transport: number;
  bonus: number;
  deductions: number;
  netSalary: number;
}

export interface Notification {
  id: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export interface WorkforceSignal {
  id: string;
  title: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  insight: string;
}

export interface SmartNudge {
  id: string;
  title: string;
  impact: string;
  owner: string;
  dueBy: string;
  priority: 'high' | 'medium' | 'low';
}

export interface RecognitionEvent {
  id: string;
  employee: string;
  team: string;
  reason: string;
  points: number;
  date: string;
}

// Mock users
export const mockUsers: User[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@dayflow.com',
    role: 'employee',
    department: 'Engineering',
    position: 'Senior Developer',
    joinDate: '2022-01-15',
    phoneNumber: '+1 234-567-8900',
    profileCompleteness: 85,
  },
  {
    id: '2',
    employeeId: 'HR001',
    name: 'Michael Chen',
    email: 'michael.chen@dayflow.com',
    role: 'hr',
    department: 'Human Resources',
    position: 'HR Manager',
    joinDate: '2020-05-10',
    phoneNumber: '+1 234-567-8901',
    profileCompleteness: 100,
  },
];

// Mock leave balances
export const mockLeaveBalances: Record<string, LeaveBalance> = {
  '1': { paid: 12, sick: 5, unpaid: 3 },
  '2': { paid: 15, sick: 10, unpaid: 5 },
};

// Mock leave requests
export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: 'L001',
    employeeId: '1',
    employeeName: 'Sarah Johnson',
    type: 'Paid Leave',
    startDate: '2026-01-20',
    endDate: '2026-01-22',
    days: 3,
    remarks: 'Family vacation',
    status: 'approved',
    autoApproved: true,
    autoDecisionReason: 'Team has 80% availability during requested period. Leave balance sufficient.',
    appliedDate: '2026-01-05',
    reviewedDate: '2026-01-05',
  },
  {
    id: 'L002',
    employeeId: '3',
    employeeName: 'Alex Kumar',
    type: 'Sick Leave',
    startDate: '2026-01-10',
    endDate: '2026-01-11',
    days: 2,
    remarks: 'Medical appointment',
    status: 'pending',
    autoApproved: false,
    autoDecisionReason: 'Requires HR review: Multiple team members on leave during this period.',
    appliedDate: '2026-01-08',
  },
  {
    id: 'L003',
    employeeId: '4',
    employeeName: 'Emma Wilson',
    type: 'Paid Leave',
    startDate: '2026-01-15',
    endDate: '2026-01-16',
    days: 2,
    remarks: 'Personal matters',
    status: 'rejected',
    appliedDate: '2026-01-03',
    reviewedDate: '2026-01-04',
  },
];

// Mock attendance records
export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: 'A001',
    employeeId: '1',
    date: '2026-01-03',
    checkIn: '09:00',
    checkOut: '18:00',
    status: 'present',
  },
  {
    id: 'A002',
    employeeId: '1',
    date: '2026-01-02',
    checkIn: '09:30',
    checkOut: '18:00',
    status: 'late',
  },
  {
    id: 'A003',
    employeeId: '1',
    date: '2026-01-01',
    status: 'absent',
  },
];

// Mock salary structure
export const mockSalaryStructure: Record<string, SalaryStructure> = {
  '1': {
    baseSalary: 80000,
    hra: 16000,
    transport: 2400,
    bonus: 5000,
    deductions: 8000,
    netSalary: 95400,
  },
  '2': {
    baseSalary: 100000,
    hra: 20000,
    transport: 2400,
    bonus: 8000,
    deductions: 10000,
    netSalary: 120400,
  },
};

// Mock notifications
export const mockNotifications: Notification[] = [
  {
    id: 'N001',
    type: 'warning',
    title: 'Low Leave Balance',
    message: 'Your paid leave balance is running low (12 days remaining)',
    date: '2026-01-03',
    read: false,
  },
  {
    id: 'N002',
    type: 'success',
    title: 'Leave Approved',
    message: 'Your leave request for Jan 20-22 has been auto-approved',
    date: '2026-01-05',
    read: false,
  },
  {
    id: 'N003',
    type: 'alert',
    title: 'Late Check-in Alert',
    message: 'You checked in late on Jan 2nd at 09:30 AM',
    date: '2026-01-02',
    read: true,
  },
  {
    id: 'N004',
    type: 'info',
    title: 'Payslip Available',
    message: 'Your December payslip is now available for download',
    date: '2026-01-01',
    read: true,
  },
];

// Analytics data
export const attendanceChartData = [
  { month: 'Jul', present: 22, absent: 0, late: 1 },
  { month: 'Aug', present: 21, absent: 1, late: 2 },
  { month: 'Sep', present: 23, absent: 0, late: 0 },
  { month: 'Oct', present: 20, absent: 1, late: 3 },
  { month: 'Nov', present: 22, absent: 0, late: 1 },
  { month: 'Dec', present: 21, absent: 1, late: 1 },
];

export const leaveUsageData = [
  { name: 'Paid Leave', value: 8, color: '#10b981' },
  { name: 'Sick Leave', value: 5, color: '#f59e0b' },
  { name: 'Unpaid Leave', value: 2, color: '#ef4444' },
  { name: 'Available', value: 15, color: '#6366f1' },
];

export const workforceSignals: WorkforceSignal[] = [
  {
    id: 'WS001',
    title: 'Engagement Pulse',
    score: 81,
    trend: 'up',
    insight: 'Team sentiment improved after flexible Friday policy.',
  },
  {
    id: 'WS002',
    title: 'Retention Stability',
    score: 74,
    trend: 'stable',
    insight: 'Mid-level engineering attrition risk remains moderate.',
  },
  {
    id: 'WS003',
    title: 'Burnout Risk',
    score: 32,
    trend: 'down',
    insight: 'Overtime hours dropped 14% from last month.',
  },
];

export const smartNudges: SmartNudge[] = [
  {
    id: 'SN001',
    title: 'Schedule 1:1 with Backend Team',
    impact: 'Expected +6% engagement for Team A',
    owner: 'HRBP - Priya',
    dueBy: '2026-03-09',
    priority: 'high',
  },
  {
    id: 'SN002',
    title: 'Push wellness credit reminder',
    impact: 'Projected 18 fewer fatigue flags',
    owner: 'People Ops',
    dueBy: '2026-03-12',
    priority: 'medium',
  },
  {
    id: 'SN003',
    title: 'Close pending leave approvals',
    impact: 'Reduce SLA breach risk by 24%',
    owner: 'HR Desk',
    dueBy: '2026-03-07',
    priority: 'high',
  },
];

export const recognitionFeed: RecognitionEvent[] = [
  {
    id: 'RC001',
    employee: 'Sarah Johnson',
    team: 'Engineering',
    reason: 'Mentored 2 new joiners this sprint',
    points: 120,
    date: '2026-03-01',
  },
  {
    id: 'RC002',
    employee: 'Emma Wilson',
    team: 'Design',
    reason: 'Shipped accessibility overhaul for employee portal',
    points: 90,
    date: '2026-02-27',
  },
  {
    id: 'RC003',
    employee: 'Alex Kumar',
    team: 'Support',
    reason: 'Resolved 40 high-priority tickets in 5 days',
    points: 110,
    date: '2026-02-25',
  },
];
