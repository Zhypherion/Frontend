import { Account } from './account';
import { Department } from './department';
import { Position } from './position';

export interface Employee {
  accountId: number;
  email: string;
  status: string;
  employeeId?: string;
  account?: Account;     // relation to Account
  position?: string;
  department?: string;
  hireDate?: string;
  
  
}
