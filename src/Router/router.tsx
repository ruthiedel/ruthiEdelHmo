import { Navigate, createBrowserRouter } from "react-router-dom";
import List from '../Pages/Main/List'
import Signin from '../Pages/Customer/Signin'
import AddKoronaDetails from "../Pages/Customer/AddDetails";
import Layout from "../Component/Layout";
import Report from "../Pages/KoronaDetails/Report";
import AuthGuard from "../auth/AuthGuard";
import GuestGuard from "../auth/GuestGuard";
import Login from "../Pages/log-in/login";
import SigninUser from '../Pages/sign-in/sign-in'
export const router = createBrowserRouter([
    {
      path:'/',
      element: <AuthGuard ><Layout/></AuthGuard>,
      children: [
        {
          path:'',
          index: true,
          element: <List/> // Replace with your desired content for the home page
        },
        {
          path: '/signcust',
          element: <Signin />
        },
        {
          path: '/addDetails',
          element: <AddKoronaDetails />
        },
        {
          path: '/report',
          element: <Report />
        }
      ]
    },
    
    {
      path: '/login',
      element: <GuestGuard><Login/></GuestGuard>
    },
    {
      path: '/signin',
      element: <GuestGuard><SigninUser/></GuestGuard>
    },
    {
      path: '*',
      element: <h1>404 - Not Found</h1>
    }
  ]);
  