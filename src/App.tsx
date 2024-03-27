
import { Provider } from 'react-redux';
import {store} from './Redux/store'
import { RouterProvider } from 'react-router-dom';
import { router } from './Router/router';
import InitializeAuth from './auth/InitializeAuth';

function App() {
  return (
    <>
    <Provider store={store}>
      <InitializeAuth>
    <RouterProvider router={router} />
    </InitializeAuth>
    </Provider> 
    
   
    </>
  );
}

export default App;