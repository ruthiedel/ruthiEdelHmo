import React from 'react';
import logo from './logo.svg';
import './App.css';
import Signin from './Pages/Customer/Signin'
import List from './Pages/Main/List'
import { Provider } from 'react-redux';
import {store} from './Redux/store'
import AddKoronaDetails from './Pages/Customer/AddDetails';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router/router';
function App() {
  return (
    <>
    <Provider store={store}>
    <RouterProvider router={router} />

        {/* <List/> */}
    </Provider> 
    
   
    </>
  );
}

export default App;