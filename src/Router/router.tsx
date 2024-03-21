import { Navigate, createBrowserRouter } from "react-router-dom";
import List from '../Pages/Main/List'
import Signin from '../Pages/Customer/Signin'
import AddKoronaDetails from "../Pages/Customer/AddDetails";
import Layout from "../Component/Layout";
import Report from "../Pages/KoronaDetails/Report";
export const router = createBrowserRouter([
    {
      path:'/',
      element: <Layout/>,
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
      path: '*',
      element: <h1>404 - Not Found</h1>
    }
  ]);
  