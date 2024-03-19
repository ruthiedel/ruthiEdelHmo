import axios from '../Axios/axios' 
import { Customer } from '../Type/types'

export const getCustomers = async ()=>
{
    try{
        console.log("hei from react")
        const response =await axios.get<Customer[]>('/customer')
        const customers = response.data;
        return customers;
    }
    catch (error: any) {
        console.log(error)
      }
}

export const getPicture = async (id: string): Promise<Blob | null> => {
    try {
        const response = await axios.get(`/customer/picture/${id}`, {
            responseType: 'blob' // Specify response type as blob
        });
        return response.data; // Return the blob data
    } catch (error) {
        console.error('Error fetching picture:', error);
        return null;
    }
}

export const getCustomerById = async (id:string)=>
{
    try{
        const response =await axios.get(`/customer/id/${id}`)
        const customers = response.data;
        return customers;
    }
    catch (error: any) {
        console.log(error)
    
      }
}

export const addCustomer = async (customer: Omit<Customer, 'id'>) => {
    const response = await axios.post<Customer>('/customer', customer)
    const newbook = response.data
    return newbook
}

export const updateCustomer = async (customer:Customer) => {
    try {
      const response = await axios.put(`/customers`, customer)
      const updateCustomer = response.data
      return updateCustomer
    }
    catch (error) {
        console.log("error updateing customer", error)
      }
}




export const deleteCustomer = async (id: string) => {
        const response = await axios.delete(`/customer/id/${id}`)
        return response
}