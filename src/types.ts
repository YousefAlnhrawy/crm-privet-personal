export type CustomerStatus = 'مهتم' | 'غير مهتم' | 'تم التعاقد';
export type CustomerSize = 'صغير' | 'متوسط' | 'كبير';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  image?: string;
  status: CustomerStatus;
  industry: string;
  size: CustomerSize;
  agentId: string;
  notes: string;
  createdAt: string;
}

export interface Agent {
  id: string;
  name: string;
  phone: string;
  email: string;
}
