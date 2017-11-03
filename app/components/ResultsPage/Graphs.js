import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Legend, Tooltip } from 'recharts';

const Graphs = (props) => {
    let barChartData = [];

    Object.keys(props.question.options).map((key)=>{
        let obj = {};
        obj['name'] = key.toUpperCase();
        obj['value'] = props.question.options[key];
        barChartData.push(obj);
    });

    return (
        <div className="row">
            <div className="col-md-offset-1 col-md-4">
              <BarChart width={350} height={300} data={barChartData}
                        margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                    <XAxis dataKey="name"/>
                     <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </div>
            <div className=" col-md-4" >
                <PieChart width={500} height={300} margin={{top: -50, right: 0, left: 0, bottom: 0}}>
                    <Pie isAnimationActive={true} dataKey="value"  data={barChartData} cx={200} cy={200} outerRadius={100} fill="#8884d8" label />
                    <Tooltip/>
                </PieChart>
            </div>
        </div>
    );
}

export default Graphs;
