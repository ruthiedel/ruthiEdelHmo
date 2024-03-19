import React, { useRef, FormEvent, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import {Customer} from '../../Type/types'
import {useForm} from 'react-hook-form'
import * as yup  from "yup"
import {yupResolver} from '@hookform/resolvers/yup'
import {useAppDispatch, useAppSelector} from '../../Redux/store'
import {selectCustomers} from '../../Redux/Customer/CustomerSelector'
import { useSelector } from 'react-redux';
import { addCustomer, getCustomers } from '../../Services/CustomerService';
import { addCustomer  as addCustomerRedux, setCustomers} from '../../Redux/Customer/CustomerSlice';
import { selectDetails } from '../../Redux/KoronaDetails/KOronaDetailsSelector';
import { setDetails } from '../../Redux/KoronaDetails/KoronaDetailsSlice';
import { getKoronaDetails } from '../../Services/KoronaDetailsService';
const defaultPicture = './google_contacts_logo.jpg'; // Default picture filename
const CustomerRegistrationForm = () => {
  
  const Details =useSelector(selectDetails)

 
  const Customers =useSelector(selectCustomers)
  const dispatch= useAppDispatch()
 
  // const [selectedPicture, setSelectedPicture] = useState((defaultPicture)); // State to store selected picture
  async function getData() {

    if(Details.length==0){
      const details = await getKoronaDetails()
      if(details) 
         dispatch(setDetails(details))
    }
    if(Customers.length==0){
      const customers = await getCustomers()
      console.log(customers)
      if(customers)
        dispatch(setCustomers(customers))
      
    }
  
  }
  useEffect(() => {
 
      
    if(Customers.length==0)
        getData()
    
  }, []);


  // const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   setSelectedPicture(file ? URL.createObjectURL(file) : defaultPicture);  }; 

   const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName : yup.string().required(),
    street:yup.string(),
    city:yup.string(),
    houseNumber :yup.number().positive().integer(),
    idNumber : yup.string().min(9).max(9).required(),
    birthDate: yup.date().required(),
    phone: yup.string().matches(/^\d{9}$/).nullable(), 
    mobile: yup.string().matches(/^\d{10}$/).required(),
    picture: yup
    .mixed()
    .default('./google_contacts_logo.jpg') // Set a default picture
    .test('fileRequired', 'Please select a picture', (value) => {
      return value !== null;
    }),
   })
 
  const {register , handleSubmit, formState:{errors}} = useForm({
    resolver:yupResolver(schema)
  })
  const onSubmit = async (data:any) => {
   try{
    console.log(data)
       
       const customer = await addCustomer(data) 
       console.log(customer)
       dispatch(addCustomerRedux(customer))
   } 
   catch
   {
      console.log("there is aproblem")
   }
  };
  return (
    <Container maxWidth="sm"  >
     <Typography variant="h4" align="center" gutterBottom style={{ color: 'Dodger Blue', fontFamily: 'Trebuchet MS' }}>
        רישום ראשוני
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="שם פרטי"
              variant="outlined"
              fullWidth
             
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
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="תעודת זהות"
              variant="outlined"
              fullWidth
              {...register("idNumber")}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="רחוב"
              variant="outlined"
              fullWidth
              {...register("street")}
            />
              <Grid item xs={12}>
            <TextField
              label="עיר"
              variant="outlined"
              fullWidth
              {...register("city")}
            />
         
          </Grid>
          <TextField
              label="מספר בית"
              variant="outlined"
              fullWidth
              type="number"
              {...register("houseNumber")}
            />
            
          </Grid>
          <Grid item xs={12}>
          <TextField
           label="תאריך לידה"
            {...register("birthDate")}
            type="date"
            InputLabelProps={{
                shrink: true,
            }}
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
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="טלפון נייד"
              variant="outlined"
              fullWidth
              {...register("mobile")}
              required
            />
          </Grid>
          {/* <Grid item xs={12}>
            <input type="file" accept="image/*" onChange={handlePictureChange} />
          </Grid>
          {/* Display selected picture */}
          {/* {selectedPicture && (
            <Grid item xs={12} >
              <img src={selectedPicture} alt="Selected" style={{ width: '50px',height:'50px'}} />
            </Grid>
          )} */} 
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
  );
};

export default CustomerRegistrationForm;
