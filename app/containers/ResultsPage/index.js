/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Legend, Tooltip } from 'recharts';
import NavBar from '../../components/NavBar';

const data01 = [{name: 'Yes', value: 60}, {name: 'No', value: 70},
  {name: 'Not Answered', value: 50}]

const data = [
    {name: 'Very Bad', feeling: 20, amt: 120},
    {name: 'Bad', feeling: 10, amt: 120},
    {name: 'Good', feeling: 10, amt: 120},
    {name: 'Very Good', feeling: 10, amt: 120},
];

export default class HomePage extends Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div>
        <NavBar/>
        <div className="container">
          <div className="col-md-6">
            <PieChart width={800} height={400}>
              <Pie isAnimationActive={false} dataKey="value"  data={data01} cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
              <Tooltip/>
            </PieChart>
          </div>
          <div className="col-md-6">
            <BarChart width={600} height={300} data={data}
                      margin={{top: 120, right: 80, left: 0, bottom: 5}}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Legend />
              <Bar dataKey="feeling" fill="#82ca9d" />
            </BarChart>
          </div>
        </div>
      </div>
    );
  }
}
