import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { format } from 'date-fns';
import React from 'react';
import { Customer, KoronaDetails } from "../../Type/types"
import { getKoronaDetailsByCustomerId } from '../../Services/KoronaDetailsService';
import ErrorDialog from '../../Component/Error';
interface CustomerDetailsModalProps {
  customer: Customer | null;
  onClose: () => void;
}

const CustomerDetailsModal: React.FC<CustomerDetailsModalProps> = ({ customer, onClose }) => {
  const [selectedDetails, setSelectedDetails] = useState<KoronaDetails | null>(null);
  const [error, setError] = useState<{ message: string } | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      if (customer) {
        try {
          const selectedDetail = await getKoronaDetailsByCustomerId(customer.idNumber);
          setSelectedDetails(selectedDetail || null);
        } catch (error1: any) {

          if (error1.response) {
            setError({ message: `Request failed with status code ${error1.response.status} message ${error1.response.data}` });
          } else if (error1.request) {
            setError({ message: 'No response received from server' });
          } else {
            setError({ message: 'An error occurred while processing the request' });
          }
        }
      }
    };

    fetchData();
  }, [customer])
  return (
    <Dialog open={!!customer} onClose={onClose}>
      {customer && (
        <DialogContent>
          <Typography variant="h6">{`${customer.firstName} ${customer.lastName}`}</Typography>
          <Typography>ID: {customer.idNumber}</Typography>
          <Typography>adress: {customer.address ? `${customer.address.city} , ${customer.address.street} ${customer.address.houseNumber}` : 'un known address'}</Typography>
          <Typography>tel_phone: {customer.phone}</Typography>
          <Typography>mobile: {customer.mobile}</Typography>
          {customer.birthDay!=null&&<Typography>birth day: {format(customer.birthDay, 'dd/MM/yyyy')}</Typography>}
          {selectedDetails && <h3>Korona Details</h3>}
          {selectedDetails?.vaccinationDates && <> 
            {selectedDetails.vaccinationDates.map((v, index) => (
              v && (
                <div key={index}>
                  <Typography>Vaccination number {index+1}</Typography>
                  <Typography>Date of the Vaccination: {v.date && format(v.date, 'dd/MM/yyyy')}</Typography>
                  <Typography>Manufacturer: {v.manufacturer}</Typography>
                </div>
              )
            ))}
          </>}
          {selectedDetails?.positiveTestDate && <Typography>Positive Test Date: {format(selectedDetails.positiveTestDate, 'dd/MM/yyyy')}</Typography>}
          {selectedDetails?.recoveryDate && <Typography>Recovery Test Date: {format(selectedDetails.recoveryDate, 'dd/MM/yyyy')}</Typography>}

        </DialogContent>
      )}
      <ErrorDialog error={error} onClose={() => setError(null)} />

    </Dialog>
  );
};


export default CustomerDetailsModal