import React, { useState } from 'react';
import { TextField, Button, Container, Grid, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { Form } from 'react-bootstrap'; // Import Form from react-bootstrap if still needed
import { KeyboardEvent, ChangeEvent} from "react";
import { useAppDispatch } from "../../Redux/store"
import { setUser } from "../../Redux/auth2/auth.slice"
import { setSession } from "../../auth/auth.utils"
import {addUser as addUserApi} from '../../Services/userServic'
import {User} from '../../Type/types'
import axios  from 'axios';
import ErrorDialog from '../../Component/Error';




export default function SignIn()
 {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role:'',
    confirmPassword: ''
  });
  const [error,setError]= useState<{message:string}|null>(null)

 

  const dispatch = useAppDispatch()

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e:any) => {
    e.preventDefault();
    if(formData.confirmPassword==formData.password) 
    {
      try{
      const value:any = await addUserApi({pin:formData.password,email:formData.email,role:formData.role})
      dispatch(setUser(value.user))
      setSession(value)
      }
      catch(error1:any)
      {
        
      }
    }
  };

 
  return (
    <Container maxWidth="sm">
       <Typography variant="h4" align="center" gutterBottom style={{ color: 'Dodger Blue', fontFamily: 'Trebuchet MS' }}>
        Sign in
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Form onSubmit={handleSubmit}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="doctor">Doctor</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} justifyContent="center">
                <Button variant="contained" color="primary" type="submit">
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Grid>
      </Grid>
      <ErrorDialog error={error} onClose={()=>setError(null)}/>
    </Container>
  );
}

