import axios from '../Axios/axios' 
import { Customer } from '../Type/types'
//get all controller frim the server
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
//get picture from the server
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
//getById request for the server
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
//add request for the server
export const addCustomer = async (customer: any) => {
    const response = await axios.post<Customer>('/customer', customer)
    const newbook = response.data
    return newbook
}
//update request for the server
export const updateCustomer = async (customer:any) => {
    
      const response = await axios.put(`/customer`, customer)
      const updateCustomer = response.data
      console.log(updateCustomer)
      return updateCustomer
    
 
}



//delete request for the server
export const deleteCustomer = async (id: string) => {
        const response = await axios.delete(`/customer/id/${id}`)
        return response
}