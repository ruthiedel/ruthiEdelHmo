import React, { useState, useEffect } from 'react';

type props ={
    totalPatients:number,
    vaccinatedPatients:number
}

const VaccinationProgressBar = (p:props) => {
  const [vaccinationPercentage, setVaccinationPercentage] = useState(0);

  useEffect(() => {
     
    if (p.totalPatients > 0 && p.vaccinatedPatients > 0) {
      const percentage = (p.vaccinatedPatients / p.totalPatients) * 100;
      setVaccinationPercentage(percentage);
    }
  },);

  return (
    <>
     <div style={{ display: 'flex', justifyContent: 'center' }}>

    <h1>UnVaccinated patient Vs. total Patient : {100-parseFloat(vaccinationPercentage.toFixed(2))}%</h1>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
    
    <div style={{ width: '95%', height: '60px', backgroundColor: 'lightgray' }}>
      <div
        style={{
          width: `${100-vaccinationPercentage}%`,
          height: '100%',
          backgroundColor: 'blue',
        }}
      />
    </div>
    </div>
    </>
  );
};

export default VaccinationProgressBar;
