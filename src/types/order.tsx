export interface OrderData {
  email: string;
  paymentId: string;
  advicedAt: string;
  otherText: string;
  amount: string;
}

export interface OrderSliceState {
  data: OrderData | null;
}
