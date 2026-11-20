import { Category, Product, DashboardStats, User } from '../types';
export { initialCategories } from './categoriesData';

export const initialProducts: Product[] = [];

export const defaultUser: User = {
  id: "usr-admin-1",
  name: "Shree Shiv Shakti Art Admin",
  email: "admin@shreeshivshaktiart.com",
  role: "SUPERADMIN"
};
