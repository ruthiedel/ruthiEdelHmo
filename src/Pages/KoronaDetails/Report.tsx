import React, { useState, useEffect } from 'react';
import { getKoronaDetails } from '../../Services/KoronaDetailsService'// Assuming you have an API function to fetch Korona details
import Graph from './graph'; // Assuming you have a Graph component
import VaccinateBar from './VaccinateBar'
interface KoronaDetails {
  positiveTestDate: string;
}

interface Point {
  x: number;
  y: number;
}

const Report: React.FC = () => {
  const [pointsArray, setPointsArray] = useState<Point[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await getKoronaDetails(); // Assuming getKoronaDetails returns KoronaDetails[]

        const today = new Date();
        const lastDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        const numberOfDaysInLastMonth = lastDayOfPreviousMonth.getDate();
        const points: Point[] = []
        for(let i =1;i <=numberOfDaysInLastMonth;i++)
        {
            points.push({x:i,y:0})
        }
        if(details)
        try{
         details.forEach(detail => {
          const positiveTestDate = new Date(detail.positiveTestDate);
          if (
            positiveTestDate.getFullYear() === lastDayOfPreviousMonth.getFullYear() &&
            positiveTestDate.getMonth() === lastDayOfPreviousMonth.getMonth()
          ) {
            const dayOfMonth = positiveTestDate.getDate();
            console.log(positiveTestDate.getDate())
            points[dayOfMonth-1].y++;
          }
        
        });
    }
    catch(error:any)
    {
     console.log(error)
    }
    

        setPointsArray(points);
      } catch (error) {
        console.error('Error fetching Korona details:', error);
      }
     }
    

    fetchData();
  }, []);

  return (
    <div style={{ marginTop: '20px' }}>
      <Graph dataPoints={pointsArray} />
      <VaccinateBar totalPatients={20} vaccinatedPatients={15} />
    </div>
  );
  
};

export default Report;
