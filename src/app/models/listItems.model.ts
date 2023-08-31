import { ICountry } from './country.model';
import { IModifiedPayment, IPayment } from './payment.model';
import { IUser } from './user.model';

export interface IListItems {
  payment?: IPayment[];
  country?: ICountry[];
  user?: IUser[];
  modifiedPayment?: IModifiedPayment[];
}
