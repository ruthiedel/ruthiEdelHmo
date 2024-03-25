
import { useState } from 'react';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';
import { login } from '../../Services/userServic';
import { useAppDispatch } from '../../Redux/store';
import { setUser } from '../../Redux/auth2/auth.slice';
import { setSession } from '../../auth/auth.utils';
import { Navigate, useLocation } from "react-router-dom"
import ErrorDialog from '../../Component/Error';


export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState<{ message: string } | null>(null)
  const [makeAccount,setMakeAccount] = useState(false)
  const dispatch = useAppDispatch();

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {

      const authUser = await login(formData.email, formData.password);

      dispatch(setUser(authUser.user));
      setSession(authUser);
    } catch (error1 : any) {
      if (error1.response) {
        setError({ message: `Request failed with status code ${error1.response.status} message ${error1.response.data}` });
    } else if (error1.request) {
        setError({ message: 'No response received from server' });
    } else {
        setError({ message: 'An error occurred while processing the request' });
    }    }
  };

  const HandleCreateClick=()=>
  {
     setMakeAccount(true)
  }
  if (makeAccount) {
    return <Navigate to={'/signin'} />
}
  return (
    <Container maxWidth="sm">
       <Typography variant="h4" align="center" gutterBottom style={{ color: 'Dodger Blue', fontFamily: 'Trebuchet MS' }}>
        Log in
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
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

              <Grid item xs={12} justifyContent="center">
                <Button variant="contained" color="primary" type="submit" >
                  Log In
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
      <br/>
      <br/>
      <Grid   justifyContent="center">
      <Button variant="contained"onClick={HandleCreateClick}>
                  Craete an account
        </Button>
      </Grid>
      {error&&<ErrorDialog error={error} onClose={()=>{setError(null)}}/>}

    </Container>
    
  );
}
