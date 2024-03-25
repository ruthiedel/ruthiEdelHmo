
import React from 'react'
import  ProfileImage from './ProfilImage'
import UpdateIcon from '@mui/icons-material/Update';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Customer, KoronaDetails } from "../../Type/types"

import { Button, Grid, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorDialog from '../../Component/Error';

interface CustomerListItemProps {
    customer: Customer;
    onClick: () => void;
    handleDelete: (id: string) => void;
    handleUpdateClick: (id: string) => void
  }
  
  const CustomerListItem: React.FC<CustomerListItemProps> = ({ customer, onClick, handleDelete, handleUpdateClick }) => {
    return (
      <ListItem button>
        <ListItemText primary={`${customer.firstName} ${customer.lastName}`}  onClick={onClick}  />
        <ListItemText primary={`${customer.idNumber}`}  onClick={onClick} />
        <ProfileImage id ={customer.idNumber}  onClick={onClick}   />
        
        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(customer.idNumber)}  >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
        <IconButton edge="end" aria-label="update" onClick={() => handleUpdateClick(customer.idNumber)}>
          <UpdateIcon fontSize="inherit" />
        </IconButton>
      </ListItem>
    );
  };

  export default CustomerListItem
  
  
  
  
  