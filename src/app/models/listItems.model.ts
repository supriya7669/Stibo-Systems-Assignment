import { Country } from './country.model';
import { ModifiedPayment, Payment } from './payment.model';
import { User } from './user.model';

export interface listItems {
  payment?: Payment[];
  country?: Country[];
  user?: User[];
  modifiedPayment?: ModifiedPayment[];
}
