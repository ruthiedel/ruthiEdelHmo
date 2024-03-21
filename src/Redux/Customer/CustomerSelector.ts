import { RootState } from "../store";
 

export const selectCustomers = (state: RootState) => state.customer.customers
export const selectCustomerById = (state: RootState, customerId: string) =>
state.customer.customers.find(customer => customer.idNumber === customerId);