import { I_GigTiming } from './gig-timing.interface';

export interface I_GigExtraServices {
  id: string;
  gigId: string;
  title: string;
  description: string;
  price: {
    value: number;
    currency: string;
  };
  deliveryTime: I_GigTiming;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  updatedAt: string;
}
