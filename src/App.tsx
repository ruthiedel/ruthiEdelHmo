import React from 'react';
import logo from './logo.svg';
import './App.css';
import Signin from './Pages/Customer/Signin'
import List from './Pages/Main/List'
import { Provider } from 'react-redux';
import {store} from './Redux/store'
function App() {
  return (
    <>
    <Provider store={store}>
    {/* <Signin/> */}
        <List/>
    </Provider>

  
    {/* <List/> */}
    </>
  );
}

export default App;
