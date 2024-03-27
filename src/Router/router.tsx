import {  createBrowserRouter } from "react-router-dom";
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
      element: <AuthGuard ><Layout/></AuthGuard>,// Protected route requiring authentication
      children: [
        {
          path:'',
          index: true,
          element: <List/> 
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
      element: <GuestGuard><Login/></GuestGuard>// Route for login, accessible to guests only
    },
    {
      path: '/signin',
      element: <GuestGuard><SigninUser/></GuestGuard>// Route for signing in, accessible to guests only
    },
    
    {
      path: '*',
      element: <h1>404 - Not Found</h1>
    }
  ]);
  