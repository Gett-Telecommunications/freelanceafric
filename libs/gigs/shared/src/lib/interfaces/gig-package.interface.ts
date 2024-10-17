import { I_GigTiming } from './gig-timing.interface';

export interface I_GigPackage {
  id: string;
  gigId: string;
  title: string;
  description: string;
  price: {
    value: number;
    currency: string;
  };
  deliveryTime: I_GigTiming;
  status: 'active' | 'inactive' | 'pending' | 'deleted';
  createdAt: string;
  updatedAt: string;
  allowedRevisions: number;
  approval?: {
    approvalStatus: 'pending' | 'approved' | 'rejected' | 'revoked';
    approvedBy: string;
    approvedAt: string;
    message?: string;
  };
}
