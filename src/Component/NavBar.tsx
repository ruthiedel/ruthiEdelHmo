import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import StoreIcon from '@mui/icons-material/Store';
import Typography from '@mui/material/Typography';
import ViewListIcon from '@mui/icons-material/ViewList';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import {  BarChart } from '@mui/icons-material';
function App() {

    return (
      <AppBar position="static">
        <Toolbar>
        <ViewListIcon></ViewListIcon>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                fontWeight: 200,
                fontFamily:'roboto',
                color:'white',
                letterSpacing: '.2rem',
                textDecoration: 'none',
              }}
            >
              Main Page
            </Typography>
            <ExitToAppIcon></ExitToAppIcon>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/signcust"
              sx={{
                mr: 2,
                fontWeight: 200,
                fontFamily:'roboto',
                color:'white',
                letterSpacing: '.2rem',
                textDecoration: 'none',
              }}
            >
              Add Patient
            </Typography>
            <LocalHospitalIcon></LocalHospitalIcon>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/addDetails"
              sx={{
                mr: 2,
                fontWeight: 200,
                fontFamily:'roboto',
                color:'white',
                letterSpacing: '.2rem',
                textDecoration: 'none',
              }}
            >
              Add patient's Details
            </Typography>
            <BarChart></BarChart>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/report"
              sx={{
                mr: 2,
                fontWeight: 200,
                fontFamily:'roboto',
                color:'white',
                letterSpacing: '.2rem',
                textDecoration: 'none',
              }}
            >
                Report
             </Typography>
        
        </Toolbar>
        
      </AppBar>
    );
  }
export default App;