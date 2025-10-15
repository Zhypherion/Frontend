export interface Position {
  id: number;
  name: string;
  status: 'Active' | 'Inactive';
  hierarchyLevel: 'Worker' | 'Supervisor' | 'Manager';
  departmentId?: string;
   department?: string;
  createdAt?: string;
  updatedAt?: string;
//   workflowId?: number;
//   workflow?: { id: number, name: string };
}