import { Account } from './account';
import { Department } from './department';

export interface Position {
  id: number;
  name: string;
  status: 'Active' | 'Inactive';
  hierarchyLevel: 'Worker' | 'Supervisor' | 'Manager';
  departmentId?: string;
   department?: string;
  createdAt?: string;
  updatedAt?: string;
}