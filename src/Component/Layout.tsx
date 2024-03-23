import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { useEffect } from "react";
import { setCustomers } from "../Redux/Customer/CustomerSlice";
import { getCustomers } from "../Services/CustomerService";
import { useSelector } from "react-redux";
import { selectCustomers } from "../Redux/Customer/CustomerSelector";
import { useAppDispatch } from "../Redux/store";

export default function Layout() {
    const Customers =useSelector(selectCustomers)
    const dispatch = useAppDispatch()

    async function getData() {

        if(Customers.length==0){
          const customers = await getCustomers()
          console.log(customers)
          if(customers)
            dispatch(setCustomers(customers))
          
        }
      
      }
      useEffect(() => {
            getData()
        
      }, []);
    

    return <>
        <header><NavBar /></header>
        <main><Outlet /></main>
        <footer></footer>
    </>

}

function dispatch(arg0: any) {
    throw new Error("Function not implemented.");
}
