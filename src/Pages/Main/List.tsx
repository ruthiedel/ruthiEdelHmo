import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CustomerListItem from './CustomerListItem';
import { Customer, KoronaDetails } from "../../Type/types"
import { useSelector } from 'react-redux';
import { selectCustomers } from '../../Redux/Customer/CustomerSelector'
import { getCustomers, deleteCustomer, updateCustomer as UpdateCustomerApi } from '../../Services/CustomerService'
import { useAppDispatch } from '../../Redux/store'
import { setCustomers, deleteCustomer as deleteCustomerRedux, updateCustomer } from '../../Redux/Customer/CustomerSlice';
import CustomerUpdateModal from './CustomerUpdateModal';
import CustomerDetailsModal from './CustomerDetailModal';
import ErrorDialog from '../../Component/Error';

export default function CustomerListPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error,setError]= useState<{message:string}|null>(null)


  const Customers = useSelector(selectCustomers)
  const dispatch = useAppDispatch()
  const handleDelete = async (id: string) => {
    try{
    await deleteCustomer(id)
    dispatch(deleteCustomerRedux(id))
    }
    catch(error1:any)
    {
     
        if (error1.response) {
            // The request was made and the server responded with a status code
            setError({message:`Request failed with status code ${error1.response.status} message ${error1.response.data}`});
        } else if (error1.request) {
            // The request was made but no response was received
            setError({message:'No response received from server'});
        } else {
            // Something else happened in setting up the request
            setError({message:'An error occurred while processing the request'});
        }                     
   }
  };


  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
  };
  const handleUpdateClick = (id: string) => {
    setSelectedId(id);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom style={{ color: 'Dodger Blue', fontFamily: 'Trebuchet MS' }}>
        Menual
       </Typography>
      {Customers.map(customer => (
        <CustomerListItem
          key={Number(customer.idNumber)}
          customer={customer}
          onClick={() => handleCustomerClick(customer)}
          handleDelete={handleDelete}
          handleUpdateClick={handleUpdateClick}
        />
      ))}
      <CustomerDetailsModal
        customer={selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      />
      {selectedId&&
       <CustomerUpdateModal
        id={selectedId}
        onClose={() =>{ setSelectedId(null)}}
      />
}
    <ErrorDialog error={error} onClose={()=>setError(null)}/>
    </Container>
  );
};

