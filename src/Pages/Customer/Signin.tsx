import React, { useRef, FormEvent, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import {useForm} from 'react-hook-form'
import * as yup  from "yup"
import {yupResolver} from '@hookform/resolvers/yup'
import {useAppDispatch} from '../../Redux/store'
import {selectCustomers} from '../../Redux/Customer/CustomerSelector'
import { useSelector } from 'react-redux';
import { addCustomer, getCustomers } from '../../Services/CustomerService';
import { addCustomer  as addCustomerRedux, setCustomers} from '../../Redux/Customer/CustomerSlice';
import ErrorDialog from '../../Component/Error';
import { Avatar } from '@mui/material';
import { Link, Navigate, useNavigate } from 'react-router-dom';


const CustomerRegistrationForm = () => {
  const [error,setError]= useState<{message:string}|null>(null)
  const Customers =useSelector(selectCustomers)
  const dispatch= useAppDispatch()
  const [image, setImage]=useState();

  const [imageToShow, setImageToShow]=useState<string | undefined>(undefined)
  const [selectedPicture, setSelectedPicture] = useState<any>(); // State to store selected picture


   const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName : yup.string().required(),
    street:yup.string(),
    city:yup.string(),
    houseNumber :yup.number().positive().integer(),
    idNumber : yup.string().min(9).max(9).required(),
    birthDay: yup.date(),
    phone: yup.string().matches(/^\d{9}$/).nullable(), 
    mobile: yup.string().matches(/^\d{10}$/).required()
   })
 
  const {register , handleSubmit, formState:{errors}} = useForm({
    resolver:yupResolver(schema)
  })

  
  const onSubmit = async (data:any) => {
   try{
    const address = {
      city: data.city,
      street: data.street,
      houseNumber: data.houseNumber
    };
    const { firstName, lastName, idNumber, phone, mobile } = data;
    const customer = {
      firstName, lastName, idNumber, phone, mobile,
      address
    };
    const formData = new FormData()
    for (const [key, value] of Object.entries(customer)) {
      if (typeof value === 'object') {
        for (const [nestedKey, nestedValue] of Object.entries(value)) {
          formData.append(`${key}[${nestedKey}]`, nestedValue as string);
        }
      } else {
        formData.append(key, value);

      }
    }
    formData.append('picture', image!);
    formData.append('birthDay', data.birthDay.toISOString()); // Convert Date to string
    const newCustomer = await addCustomer(formData);
    console.log(newCustomer);
    alert("add patient successed")
    dispatch(addCustomerRedux(newCustomer));
    
   } 
   catch(error1:any)
   {
    console.log(error1)
       if (error1.response) {
           setError({message:`Request failed with status code ${error1.response.status} message ${error1.response.data}`});
       } else if (error1.request) {
           setError({message:'No response received from server'});
       } else {
           setError({message:'An error occurred while processing the request'});
       }                     
  }
  };

  
 const handleFileChange = (event:any) => {
  const selectedImage = event.target.files[0];
  setImage(selectedImage);
  setImageToShow(URL.createObjectURL(selectedImage))
};


  return (
    <Container maxWidth="sm"  >
     <Typography variant="h4" align="center" gutterBottom style={{ color: 'Dodger Blue', fontFamily: 'Trebuchet MS' }}>
      Add Patient
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="first name "
              variant="outlined"
              fullWidth
             
              required
              {...register("firstName")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label=" last name"
              variant="outlined"
              fullWidth
              {...register("lastName")}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="id"
              variant="outlined"
              fullWidth
              {...register("idNumber")}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="street"
              variant="outlined"
              fullWidth
              {...register("street")}
            />
              <Grid item xs={12}>
            <TextField
              label="city"
              variant="outlined"
              fullWidth
              {...register("city")}
            />
         
          </Grid>
          <TextField
              label="house number"
              variant="outlined"
              fullWidth
              type="number"
              {...register("houseNumber")}
            />
            
          </Grid>
          <Grid item xs={12}>
          <TextField
           label="birthdate"
            {...register("birthDay")}
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
              label="phone"
              variant="outlined"
              fullWidth
              {...register("phone")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="mobile"
              variant="outlined"
              fullWidth
              {...register("mobile")}
              required
            />
          </Grid >
          <Grid item xs={12}>
          {image && <Avatar alt="Uploaded" src={imageToShow} style={{ width: 150, height: 150 }} />}
          </Grid>
          <Grid item xs={12}>
                <input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span" >
                    Upload Image
                  </Button>
                </label>
          </Grid>
          <Grid item xs={12}>
          <Grid container justifyContent="center">
            <Button variant="contained" color="primary" type="submit"   endIcon={<SendIcon />}>
              Send
            </Button>
            </Grid>
          </Grid>
        </Grid>
        
      </form>
      {error&&<ErrorDialog error={error} onClose={()=>{setError(null)}}/>}
    </Container>
    
  );
};

export default CustomerRegistrationForm;
