import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getCustomerById } from '../../Services/CustomerService'; // Import your function to fetch customer details
import { addKoronaDetails, getKoronaDetailsByCustomerId, updateKoronaDetails } from '../../Services/KoronaDetailsService';
import ErrorDialog from '../../Component/Error';


const AddKoronaDetails = () => {
    const [customerExists, setCustomerExists] = useState<boolean>(false);
    const [error, setError] = useState<{ message: string } | null>(null)
    const [isNew, setIsNew] = useState<boolean>(true)
    const schema = yup.object().shape({
        customerId: yup.string(),
        positiveTestDate: yup.date().nullable().transform((value, originalValue) => {
            if (originalValue === "") return null;
            return value;
        }),
        recoveryDate:  yup.date().nullable().transform((value, originalValue) => {
            if (originalValue === "") return null;
            return value;
        }),
        vaccinationDates: yup.array().of(
            yup.object().shape({
                date: yup.date().nullable().transform((value, originalValue) => {
                    if (originalValue === "") return null;
                    return value;
                }),
                manufacturer: yup.string().nullable()
            })
        ).max(4, 'Vaccination dates cannot exceed 4 entries').nullable()
    });

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    

    const catchHandle = (error1: any) => {
        if (error1.response) {
            setError({ message: `Request failed with status code ${error1.response.status} message ${error1.response.data}` });
        } else if (error1.request) {
            setError({ message: 'No response received from server' });
        } else {
            setError({ message: 'An error occurred while processing the request' });
        }
    }


    const handleIdChange = async (e: any) => {
        const value = e.target.value;
        if (value) {
            try {
                if (value.length === 9) {
                    const customer = await getCustomerById(value);
                    if (customer) {
                        setCustomerExists(true);
                        try {
                            let details = await getKoronaDetailsByCustomerId(customer.idNumber);
                            if (details) {
                                setIsNew(false);
                            } else {
                                setIsNew(true);
                            }
                        } catch (error1: any) {
                            catchHandle(error1);
                        }
                    } else {
                        setCustomerExists(false);
                    }
                }
            } catch (error1: any) {
                catchHandle(error1);
            }
        } else {
            setCustomerExists(false);
        }
    };
    
  
    
    const commit = async (commitfunction: (data: any) => any, data: any) => {
        try {
            let a =  await commitfunction(data)
            console.log(a)
            reset(); // Reset the form after submission

        }
        catch (error1: any) {
            catchHandle(error1)
        }
    }

    const onSubmit = (data: any) => {
        if (data.positiveTestDate === "") {
            data.positiveTestDate = null;
        }
        if (data.recoveryDate === "") {
            data.recoveryDate = null;
        }
        // Handle null values for vaccination dates
        data.vaccinationDates = data.vaccinationDates.map((vaccination: any) => ({
            date: vaccination.date === "" ? null : vaccination.date,
            manufacturer: vaccination.manufacturer
        }));
        if(isNew)
           commit(addKoronaDetails, data)
        else{
            commit(updateKoronaDetails, data)
        }
    };
  

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Add Korona Details
            </Typography>
            <form onSubmit={handleSubmit(onSubmit) }>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid item xs={12}>
                            <TextField
                                label="id "
                                variant="outlined"
                                fullWidth
                                {...register("customerId")}
                                onChange={handleIdChange}
                                required
                                error={!!errors.customerId}
                            />
                        </Grid>
                    </Grid>
                    {customerExists &&
                        <>
                            <Grid item xs={12}>
                                <TextField
                                    type="date"
                                    label="_____Positive Test Date"
                                    variant="outlined"
                                    fullWidth
                                    {...register("positiveTestDate")}
                                    error={!!errors.positiveTestDate}
                                    helperText={errors.positiveTestDate?.message}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type="date"
                                    label="____recoveryDate"
                                    variant="outlined"
                                    defaultValue={null}
                                    fullWidth
                                    {...register("recoveryDate")}

                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Vaccination Date"
                                    type="date"

                                    {...register("vaccinationDates.0.date")}

                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Manufacturer"
                                    {...register("vaccinationDates.0.manufacturer")}
                                    fullWidth
                                    variant="outlined"
                                                             />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Vaccination Date"
                                    type="date"
                                    {...register("vaccinationDates.1.date")}
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Manufacturer"
                                    {...register("vaccinationDates.1.manufacturer")}
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Vaccination Date"
                                    type="date"
                                    {...register("vaccinationDates.2.date")}
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Manufacturer"
                                    {...register("vaccinationDates.2.manufacturer")}
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Vaccination Date"
                                    type="date"

                                    {...register("vaccinationDates.3.date")}

                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Manufacturer"
                                    {...register("vaccinationDates.3.manufacturer")}
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                        </>

                    }
                </Grid>

                <ErrorDialog error={error} onClose={() => setError(null)} />
                <br />
                    <Button type="submit" variant="contained" color="primary" >
                        {isNew?"Submit":"Update"}
                    </Button> :      
                
            </form>
        </Container>
    );
};

export default AddKoronaDetails;
