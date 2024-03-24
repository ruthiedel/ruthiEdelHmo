import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import React from 'react';
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import SendIcon from '@mui/icons-material/Send';
import { Customer, KoronaDetails } from "../../Type/types"
import { useSelector } from 'react-redux';
import { selectCustomers } from '../../Redux/Customer/CustomerSelector'
import { getCustomers, deleteCustomer, updateCustomer as UpdateCustomerApi } from '../../Services/CustomerService'
import { getKoronaDetails } from '../../Services/KoronaDetailsService'
import { useAppDispatch } from '../../Redux/store'
import { setCustomers, deleteCustomer as deleteCustomerRedux, updateCustomer } from '../../Redux/Customer/CustomerSlice';
import { Button, Grid, IconButton, TextField } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import ErrorDialog from '../../Component/Error';


interface CustomerUpdateModalProps {
    id: String | null;
    onClose: () => void;
  }
  
  const CustomerUpdateModal: React.FC<CustomerUpdateModalProps> = ({ id, onClose }) => {
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const customers = useSelector(selectCustomers)
    const [error,setError]= useState<{message:any}|null>(null)
   
    useEffect(() => {
      console.log(id)
      const selectedCustomer = customers.find((d) => d.idNumber === id);
      setSelectedCustomer(selectedCustomer || null);
    }, [id])
  
    const schema = yup.object().shape({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      street: yup.string().nullable(),
      city: yup.string().nullable(),
      houseNumber: yup.number().positive().integer().nullable(),
      idNumber: yup.string().min(9).max(9).required(),
      birthDay: yup.date().nullable(),
      phone: yup.string().matches(/^\d{9}$/).nullable(),
      mobile: yup.string().matches(/^\d{10}$/).required()
    })
    const dispatch = useAppDispatch()
  
  
    const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema)
    })
    const onSubmit = async (data: any) => {
      try {
        // Extracting address fields and creating an address object
        const address = {
            city: data.city,
            street: data.street,
            houseNumber: data.houseNumber
          };
          const { firstName, lastName, idNumber, birthDay, phone, mobile } = data;
        const customer = {
            firstName, lastName, idNumber, birthDay, phone, mobile ,
          address
        }
       
        console.log(customer)
        const  updatedCustomer =await UpdateCustomerApi(customer);
        console.log(updatedCustomer)
        dispatch(updateCustomer(customer));
        onClose()
      }  catch(error:any)
      {
       console.log(error)
        if (error.response) {
            // The request was made and the server responded with a status code
            setError({message:`Request failed with status code ${error.response.status}`});
        } else if (error.request) {
            // The request was made but no response was received
            setError({message:'No response received from server'});
        } else {
            // Something else happened in setting up the request
            setError({message:'An error occurred while processing the request'});
        }         
     }
    }
  
    return (
      <Dialog open={!!id} onClose={onClose}>
        {selectedCustomer && (
          <DialogContent>
            <Container maxWidth="sm"  >
              <Typography variant="h4" align="center" gutterBottom style={{ color: 'Dodger Blue', fontFamily: 'Trebuchet MS' }}>
                עדכון לקוח
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="שם פרטי"
                      variant="outlined"
                      fullWidth
                      defaultValue={selectedCustomer.firstName}
                      required
                      {...register("firstName")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="שם משפחה"
                      variant="outlined"
                      fullWidth
                      {...register("lastName")}
                      required
                      defaultValue={selectedCustomer.lastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="תעודת זהות"
                      variant="outlined"
                      fullWidth
                      {...register("idNumber")}
                      defaultValue={selectedCustomer.idNumber}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="רחוב"
                      variant="outlined"
                      fullWidth
                      defaultValue={selectedCustomer.address?.city}
                      {...register("street")}
                    />
                    <Grid item xs={12}>
                      <TextField
                        label="עיר"
                        variant="outlined"
                        fullWidth
                        defaultValue={selectedCustomer.address?.street}
                        {...register("city")}
                      />
  
                    </Grid>
                    <TextField
                      label="מספר בית"
                      variant="outlined"
                      fullWidth
                      type="number"
                      {...register("houseNumber")}
                      defaultValue={selectedCustomer.address?.houseNumber}
                    />
  
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="תאריך לידה"
                      {...register("birthDay")}
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      defaultValue={selectedCustomer.birthDay}
  
                      variant="outlined"
                      InputProps={{ inputProps: { min: '1900-01-01', max: '2100-12-31' } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="טלפון"
                      variant="outlined"
                      fullWidth
                      {...register("phone")}
                      defaultValue={selectedCustomer.phone}
  
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="טלפון נייד"
                      variant="outlined"
                      fullWidth
                      {...register("mobile")}
                      required
                      defaultValue={selectedCustomer.mobile}
  
                    />
                  </Grid>
  
                  <Grid item xs={12}>
                    <Grid container justifyContent="center">
                      <Button variant="contained" color="primary" type="submit"  endIcon={<SendIcon />}>
                        שלח
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
  
              </form>
            </Container>
  
          </DialogContent>
        )}
    
    <ErrorDialog error={error} onClose={()=>setError(null)}/>


      </Dialog>
    );
  };
  
  
  export default CustomerUpdateModal;
  