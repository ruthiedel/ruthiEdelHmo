import axios from '../Axios/axios' 
import { User } from '../Type/types'



//login request from server
export const login = async (email:string,pin:string)=>
{
    try{
        const response =await axios.post(`/user/login/`,{email:email,pin:pin})
        const token  = response.data;
        return token;
    }
    catch (error: any) {
        console.log(error)
      }
}
//add server from request
export const addUser = async (user: Omit<User, 'id'>) => {
    const response = await axios.post<User>('/User', user)
    const newbook = response.data
    return newbook
}





