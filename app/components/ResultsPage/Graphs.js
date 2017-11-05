import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Legend, Cell, Tooltip } from 'recharts';

const colors = ['#90cc38', '#c60e2d', '#068c35', '#9de219', '#004d38', '#033939'];

const Graphs = (props) => {
    let chartData = [];

    Object.keys(props.question.options).map((key) => {
        let obj = {};
        obj['name'] = key.toUpperCase();
        obj['value'] = props.question.options[key];
        chartData.push(obj);
    });

    return (
        <div className="row">
            <div className="col-md-offset-1 col-md-4">
              <BarChart width={350} height={300} data={chartData}
                        margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                    <XAxis dataKey="name"/>
                     <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    <Bar dataKey="value" fill="#90cc38" >
                        { chartData.map((entry, index) => <Cell fill={colors[index % colors.length]}/>) }
                    </Bar>
              </BarChart>
            </div>
            <div className=" col-md-4" >
                <PieChart width={500} height={300} margin={{ top: -50, right: 0, left: 0, bottom: 0}}>
                    <Pie isAnimationActive={true} dataKey="value"  data={chartData} cx={200} cy={200} outerRadius={100} fill="#228B22" label >
                        { chartData.map((entry, index) => <Cell fill={colors[index % colors.length]}/>) }
                    </Pie>
                    <Tooltip/>
                </PieChart>
            </div>
        </div>
    );
}

export default Graphs;
