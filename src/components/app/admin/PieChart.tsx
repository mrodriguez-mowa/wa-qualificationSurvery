import React from 'react'


import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const PieChart = (props: any) => {
    const quantities = props.data

    // const data = [["Tipificación", "Cantidad"]]

     const data = {
        labels: quantities.map((el:any)=>el.new_type),
        datasets: [
          {
            label: '# Respuestas',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.4)',
              'rgba(54, 162, 235, 0.4)',
              'rgba(255, 206, 86, 0.4)',
              'rgba(75, 192, 192, 0.4)',
              'rgba(153, 102, 255, 0.4)',
              'rgba(255, 159, 64, 0.4)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
            hoverOffset: 10
          },
        ],
      };


      /*
    quantities.forEach((element: any) => {
        data.push([element.new_type, parseInt(element.total)])
    
    }); */

    return <Doughnut style={{width: "300px", height: "100px"}}  data={data} />
    
    
}

export default PieChart