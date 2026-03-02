// Core Data Model Types for Challan Resolution Admin Panel

// Base interface for all entities
interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Lead - Prospective B2B client
export interface Lead extends BaseEntity {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  source: 'website' | 'referral' | 'partner' | 'cold_outreach' | 'event';
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  notes?: string;
  assignedTo?: string; // Employee ID
}

// Subscriber - Active B2B client
export interface Subscriber extends BaseEntity {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  gstNumber?: string;
  address: string;
  status: 'active' | 'inactive' | 'suspended';
  plan: 'basic' | 'standard' | 'premium' | 'enterprise';
  fleetSize: number;
  convertedFromLeadId?: string;
}

// Incident - Traffic challan submitted for resolution
export interface Incident extends BaseEntity {
  subscriberId: string;
  challanNumber: string;
  vehicleNumber: string;
  violationType: string;
  violationDate: Date;
  amount: number;
  courtName?: string;
  courtDate?: Date;
  status: 'pending_screening' | 'screened' | 'assigned' | 'in_progress' | 'resolved' | 'failed' | 'refunded';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  slaDeadline?: Date;
  resolutionDate?: Date;
  resolutionOutcome?: 'disposed' | 'reduced' | 'contested' | 'paid' | 'failed';
}

// Lawyer - External legal professional
export interface Lawyer extends BaseEntity {
  fullName: string;
  email: string;
  phone: string;
  barCouncilNumber: string;
  specializations: string[];
  jurisdictions: string[]; // Courts they can appear in
  status: 'active' | 'inactive' | 'suspended' | 'onboarding';
  commissionRate: number; // Percentage
  bankDetails: {
    accountNumber: string;
    ifscCode: string;
    bankName: string;
  };
  rating?: number;
  totalResolved: number;
  successRate: number;
}

// Partner - External organization
export interface Partner extends BaseEntity {
  organizationName: string;
  contactName: string;
  email: string;
  phone: string;
  type: 'data_provider' | 'referral' | 'technology' | 'legal_services';
  status: 'active' | 'inactive' | 'pending_approval';
  contractStartDate: Date;
  contractEndDate?: Date;
  commissionStructure?: string;
}

// Assignment - Connection between incident and lawyer
export interface Assignment extends BaseEntity {
  incidentId: string;
  lawyerId: string;
  assignedAt: Date;
  acceptedAt?: Date;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'rejected' | 'reassigned';
  slaDeadline: Date;
  notes?: string;
  reassignmentReason?: string;
  previousAssignmentId?: string;
}

// Commission - Payment to lawyer for resolved incident
export interface Commission extends BaseEntity {
  lawyerId: string;
  incidentId: string;
  assignmentId: string;
  amount: number;
  percentage: number;
  status: 'pending' | 'approved' | 'paid' | 'disputed';
  paymentId?: string;
  approvedAt?: Date;
  paidAt?: Date;
}

// Refund - Money returned to subscriber
export interface Refund extends BaseEntity {
  subscriberId: string;
  incidentId: string;
  amount: number;
  reason: string;
  status: 'pending' | 'approved' | 'processed' | 'rejected';
  paymentId?: string;
  approvedAt?: Date;
  processedAt?: Date;
}

// Dispute - Customer challenge
export interface Dispute extends BaseEntity {
  subscriberId: string;
  incidentId?: string;
  type: 'charge' | 'refund' | 'service' | 'billing';
  description: string;
  status: 'open' | 'under_review' | 'resolved' | 'escalated' | 'closed';
  resolution?: string;
  resolvedAt?: Date;
  assignedTo?: string; // Employee ID
}

// Support Ticket - Subscriber inquiry
export interface SupportTicket extends BaseEntity {
  subscriberId: string;
  incidentId?: string;
  subject: string;
  description: string;
  category: 'technical' | 'billing' | 'general' | 'complaint' | 'feedback';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'waiting_customer' | 'resolved' | 'closed';
  assignedTo?: string; // Employee ID
  resolvedAt?: Date;
}

// Payment - Financial transaction
export interface Payment extends BaseEntity {
  type: 'commission' | 'refund';
  referenceId: string; // Commission ID or Refund ID
  amount: number;
  method: 'bank_transfer' | 'upi' | 'cheque';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  transactionId?: string;
  processedAt?: Date;
  failureReason?: string;
}

// Audit Log - System activity tracking
export interface AuditLog extends BaseEntity {
  entityType: string;
  entityId: string;
  action: 'create' | 'update' | 'delete' | 'status_change';
  performedBy: string; // User ID
  previousValues?: Record<string, unknown>;
  newValues?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

// Employee - Internal team member
export interface Employee extends BaseEntity {
  fullName: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  status: 'active' | 'inactive';
  permissions: {
    modules: string[];
    actions: Record<string, string[]>;
  };
}

// Team - Group of employees
export interface Team extends BaseEntity {
  name: string;
  description?: string;
  leaderId?: string; // Employee ID
  memberIds: string[]; // Employee IDs
  status: 'active' | 'inactive';
}
