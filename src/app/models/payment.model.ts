export interface IPayment {
  id: string;
  internalFieldA: string;
  receiver: string;
  status: string;
  xYZRandomField: string;
}

export interface IModifiedPayment {
  status: string;
  count: number;
}
