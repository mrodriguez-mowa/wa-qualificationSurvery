import React from 'react'
import { Chart } from "react-google-charts";

const PieChart = (props: any) => {
    const quantities = props.data

    const data = [["Tipificación", "Cantidad"]]

    quantities.forEach((element: any) => {
        data.push([element.new_type, parseInt(element.total)])
    });

    return (
        <div >
            <Chart chartType="PieChart" width={"50%"}
                height={"400px"} data={data} />
        </div>

    )
}

export default PieChart