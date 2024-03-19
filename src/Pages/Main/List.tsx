import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { format } from 'date-fns';
import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {Customer,KoronaDetails} from "../../Type/types"
import { useSelector } from 'react-redux';
import {selectCustomers} from '../../Redux/Customer/CustomerSelector'
import {selectDetails} from '../../Redux/KoronaDetails/KOronaDetailsSelector'
import {getCustomers} from '../../Services/CustomerService'
import {getKoronaDetails} from '../../Services/KoronaDetailsService'
import {useAppDispatch} from '../../Redux/store'
import {setCustomers} from '../../Redux/Customer/CustomerSlice';
import {setDetails} from '../../Redux/KoronaDetails/KoronaDetailsSlice'



export default  function CustomerListPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  
  const Customers =useSelector(selectCustomers)
  const Details =useSelector(selectDetails)
  const dispatch = useAppDispatch()
  async function getData() {
    if(Customers.length==0){
      const customers = await getCustomers()
      if(customers)
        dispatch(setCustomers(customers))
      
    }
    if(Details.length==0){
      const details = await getKoronaDetails()
      if(details) 
         dispatch(setDetails(details))

    }
  }
  useEffect(() => {
 
      
      if(Customers.length==0||Details.length==0)
          getData()
      
    }, []);

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        List of Customers
      </Typography>
      {Customers.map(customer => (
        <CustomerListItem
        key={Number(customer.idNumber)}
          customer={customer}
          onClick={() => handleCustomerClick(customer)}
        />
      ))}
      <CustomerDetailsModal
        customer={selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      />
    </Container>
  );
};






interface CustomerListItemProps {
  customer: Customer;
  onClick: () => void;
}

const CustomerListItem: React.FC<CustomerListItemProps> = ({ customer, onClick }) => {
  return (
    <ListItem button onClick={onClick}>
      <ListItemText primary={`${customer.firstName} ${customer.lastName}`} />
    </ListItem>
  );
};






interface CustomerDetailsModalProps {
  customer: Customer | null;
  onClose: () => void;
}

const CustomerDetailsModal: React.FC<CustomerDetailsModalProps> = ({ customer, onClose }) => {
  const [selectedDetails,setSelectedDetails] = useState<KoronaDetails|null>(null);
  const Details =useSelector(selectDetails)

  useEffect(()=>{
    const selectedDetail = Details.find((d) => d.customerId === customer?.idNumber);
    setSelectedDetails(selectedDetail || null);
  },[customer])
  return (
    <Dialog open={!!customer} onClose={onClose}>
      {customer && (
        <DialogContent>
          <Typography variant="h6">{`${customer.firstName} ${customer.lastName}`}</Typography>
          <Typography>ID: {customer.idNumber}</Typography>
          <Typography>adress: {`${customer.address.city} , ${customer.address.street} ${customer.address.houseNumber}`}</Typography>
          <Typography>tel_phone: {customer.phone}</Typography>
          <Typography>mobile: {customer.mobile}</Typography>
          <Typography> num of vaccinations: {selectedDetails?. vaccinationDates.length}</Typography>
          {selectedDetails?.positiveTestDate&& <Typography>Positive Test Date: {format(selectedDetails.positiveTestDate, 'dd/MM/yyyy')}</Typography>}
          {selectedDetails?.recoveryDate&& <Typography>Recovery Test Date: {format(selectedDetails.recoveryDate, 'dd/MM/yyyy')}</Typography>}
        </DialogContent>
      )}
    </Dialog>
  );
};



// export default CustomerListItem;
