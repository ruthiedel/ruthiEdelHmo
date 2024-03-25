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

export const addCustomer = async (customer: any) => {
    const response = await axios.post<Customer>('/customer', customer)
    const newbook = response.data
    return newbook
}

export const updateCustomer = async (customer:any) => {
    
        console.log('hjk')
      const response = await axios.put(`/customer`, customer)
      const updateCustomer = response.data
      console.log(updateCustomer)
      return updateCustomer
    
 
}




export const deleteCustomer = async (id: string) => {
        const response = await axios.delete(`/customer/id/${id}`)
        return response
}