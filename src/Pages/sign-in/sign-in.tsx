import React, { useState } from 'react';
import { TextField, Button, Container, Grid, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { Form } from 'react-bootstrap'; // Import Form from react-bootstrap if still needed
import { useAppDispatch } from "../../Redux/store"
import { setUser } from "../../Redux/auth2/auth.slice"
import { setSession } from "../../auth/auth.utils"
import {addUser as addUserApi} from '../../Services/userServic'
import ErrorDialog from '../../Component/Error';
import { useForm } from 'react-hook-form';

export default function SignIn() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState<{ message: string } | null>(null);
  const dispatch= useAppDispatch()

  const onSubmit = async (data: any) => {
    if (data.confirmPassword === data.password) {
      try {
       
        
          try{
          const value:any = await addUserApi(data)
          dispatch(setUser(value.user))
          setSession(value)
          }
          catch(error1:any)
          {
            
          }
        } catch (error1: any) {
        setError(error1);
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email address"
                  type="email"
                  {...register('email', { required: true })}
                />
                {errors.email && <span>This field is required</span>}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  {...register('password', { required: true })}
                />
                {errors.password && <span>This field is required</span>}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  {...register('confirmPassword', { required: true })}
                />
                {errors.confirmPassword && <span>This field is required</span>}
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    {...register('role', { required: true })}
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="doctor">Doctor</MenuItem>
                  </Select>
                  {errors.role && <span>This field is required</span>}
                </FormControl>
              </Grid>

              <Grid item xs={12} justifyContent="center">
                <Button variant="contained" color="primary" type="submit">
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
      <ErrorDialog error={error} onClose={() => setError(null)} />
    </Container>
  );
}
