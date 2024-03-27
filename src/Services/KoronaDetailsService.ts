import axios from '../Axios/axios' 
import { KoronaDetails } from '../Type/types'


//get all controller from the server
export const getKoronaDetails= async ()=>
{
    try{
        const response =await axios.get<KoronaDetails[]>('/details')
        const details = response.data;
        return details;
    }
    catch (error: any) {
        console.log(error)
      }
}

//get details by given customerId from server
export const getKoronaDetailsByCustomerId = async (id:string)=>
{
    try{
        const response =await axios.get(`/details/id/${id}`)
        const details = response.data;
        return details;
    }
    catch (error: any) {
        console.log(error)
      }
    
   
}
//add request for server
export const addKoronaDetails = async (details: Omit<KoronaDetails, 'id'>) => {
    const response = await axios.post<KoronaDetails>('/details', details)
    const newdetails = response.data
    return newdetails
}
//update request for server
export const updateKoronaDetails = async (details:KoronaDetails) => {
    
      const response = await axios.put(`details`, details)
      const updateDetails = response.data
      return updateDetails
    
   
}



//delete request from server
export const deleteKoronaDetails = async (id: string) => {
        const response = await axios.delete(`/details/id/${id}`)
        return response
}