export interface OrderData {
  name: string;
  email: string;
  paymentId: string;
  advicedAt: string;
  otherText: string;
  amount: string;
  phone: string;
}

export interface OrderSliceState {
  data: OrderData | null;
}
