import React, { useState, useEffect } from 'react';
import { getKoronaDetails } from '../../Services/KoronaDetailsService'// Assuming you have an API function to fetch Korona details
import Graph from './graph'; // Assuming you have a Graph component
import VaccinateBar from './VaccinateBar'
import { useSelector } from 'react-redux';
import { selectCustomers } from '../../Redux/Customer/CustomerSelector';
interface KoronaDetails {
  positiveTestDate: string;
}

interface Point {
  x: number;
  y: number;
}

const Report: React.FC = () => {
  const [pointsArray, setPointsArray] = useState<Point[]>([]);
  const [totalPatients,setTotalPatients] = useState<number>(0)
  const [vaccinatedPatients,setVaccinatedPateints] = useState<number>(0)
  const Customers =useSelector(selectCustomers)

  const pointsArrayInitilize = (detailsArray: KoronaDetails[]|any[],numberOfDaysInLastMonth:number,lastDayOfPreviousMonth:any) => {
    try{
      const points: Point[] = []
      for(let i =1;i <=numberOfDaysInLastMonth;i++)
      {
          points.push({x:i,y:0})
      }
      detailsArray.forEach(detail => {
       const positiveTestDate = new Date(detail.positiveTestDate);
       if (
         positiveTestDate.getFullYear() === lastDayOfPreviousMonth.getFullYear() &&
         positiveTestDate.getMonth() === lastDayOfPreviousMonth.getMonth()
       ) 
       {
         const dayOfMonth = positiveTestDate.getDate();
         console.log(positiveTestDate.getDate())
         points[dayOfMonth-1].y++;
       }
       setPointsArray(points);
     });
 }
 catch(error:any)
 {
  console.log(error)
 }
  }

const SetNuberOfVaccinatedPateintMethod=(details:KoronaDetails[]|any[])=>
{
    const vaccinated = details.filter(d=>{
      return d.positiveTestDate!=null
    })
     return vaccinated.length
}
useEffect(() => {
  const fetchData = async () => {
    try {
      const details = await getKoronaDetails(); 
      const today = new Date();
      const lastDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      const numberOfDaysInLastMonth = lastDayOfPreviousMonth.getDate();
      
      if (details) {
        const vaccinatedPatients = SetNuberOfVaccinatedPateintMethod(details);
        setVaccinatedPateints(vaccinatedPatients);
        setTotalPatients(Customers.length);
        pointsArrayInitilize(details, numberOfDaysInLastMonth, lastDayOfPreviousMonth);
       
      }
    } catch (error) {
      console.error('Error fetching Korona details:', error);
    }
  }

  fetchData();
}, [Customers.length]); // Add Customers.length as a dependency
// Add Customers.length as a dependency


  return (
    <div style={{ marginTop: '20px' }}>
      <Graph dataPoints={pointsArray} />
      <VaccinateBar totalPatients={totalPatients} vaccinatedPatients={vaccinatedPatients} />    </div>
  );
  
};

export default Report;
