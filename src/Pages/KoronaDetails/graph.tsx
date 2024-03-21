import React, { useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
type Point={
    x:number,
    y:number
}
 type promps ={
    dataPoints:Point[]
  }
 export default function  LineChart (p:promps)  {
  const options = {
    theme: 'light2',
    title: {
      text: 'covid 19 positive patients in the last month'
    },
    axisY: {
      title: 'num of patients',
      includeZero: false
    },
    data: [
      {
        type: 'spline',
        dataPoints: p.dataPoints
      }
    ]
  };
 
  return (
    <div>
       
      <CanvasJSChart options={options} />
    </div>
  );
};

