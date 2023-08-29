export interface Payment {
  id: string;
  internalFieldA: string;
  receiver: string;
  status: string;
  xYZRandomField: string;
}

export interface ModifiedPayment {
  status: string;
  count: number;
}
