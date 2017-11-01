import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Legend, Tooltip } from 'recharts';
import NavBar from '../NavBar/index';

const data01 = [{name: 'Yes', value: 60}, {name: 'No', value: 70},
    {name: 'Not Answered', value: 50}]

const data = [
    {name: 'Very Bad', feeling: 20, amt: 120},
    {name: 'Bad', feeling: 10, amt: 120},
    {name: 'Good', feeling: 10, amt: 120},
    {name: 'Very Good', feeling: 10, amt: 120},
];

export default class ResultsPage extends Component { // eslint-disable-line react/prefer-stateless-function

    render() {
        return (
            <div>
                <NavBar/>
                {/*<div className="container">*/}
                {/*<div className="col-md-6">*/}
                {/*<PieChart width={800} height={400}>*/}
                {/*<Pie isAnimationActive={false} dataKey="value"  data={data01} cx={200} cy={200} outerRadius={80} fill="#8884d8" label />*/}
                {/*<Tooltip/>*/}
                {/*</PieChart>*/}
                {/*</div>*/}
                {/*<div className="col-md-6">*/}
                {/*<BarChart width={600} height={300} data={data}*/}
                {/*margin={{top: 120, right: 80, left: 0, bottom: 5}}>*/}
                {/*<XAxis dataKey="name"/>*/}
                {/*<YAxis/>*/}
                {/*<CartesianGrid strokeDasharray="3 3"/>*/}
                {/*<Tooltip/>*/}
                {/*<Legend />*/}
                {/*<Bar dataKey="feeling" fill="#82ca9d" />*/}
                {/*</BarChart>*/}
                {/*</div>*/}
                {/*</div>*/}
                <div id="container">
                    <div className="panel-group" id="accordion">
                        <div className="panel panel-default" id="panel1">
                            <div className="panel-heading">
                                <h4 className="panel-title">
                                    <a data-toggle="collapse" data-target="#collapseOne"
                                       href="#collapseOne">
                                        Question #1
                                    </a>
                                </h4>
                            </div>
                            <div id="collapseOne" className="panel-collapse collapse in">
                                <div className="panel-body">
                                    <div className="container">
                                        <div className="col-md-6">
                                            <PieChart width={800} height={500} margin={{top: -50, right: 0, left: 0, bottom: 0}}>
                                                <Pie isAnimationActive={true} dataKey="value"  data={data01} cx={200} cy={200} outerRadius={100} fill="#8884d8" label />
                                                <Tooltip/>
                                            </PieChart>
                                        </div>
                                        <div className="col-md-6">
                                            <BarChart width={600} height={300} data={data}
                                                      margin={{top: 0, right: 0, left: 0, bottom: 0}}>
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
                            </div>
                        </div>


                        <div className="panel panel-default" id="panel2">
                            <div className="panel-heading">
                                <h4 className="panel-title">
                                    <a data-toggle="collapse" data-target="#collapseTwo"
                                       href="#collapseTwo" className="collapsed">
                                        Question #2
                                    </a>
                                </h4>
                            </div>
                            <div id="collapseTwo" className="panel-collapse collapse in">
                                <div className="panel-body">
                                    <div className="container">
                                        <div className="col-md-6">
                                            <PieChart width={800} height={500} margin={{top: -50, right: 0, left: 0, bottom: 0}}>
                                                <Pie isAnimationActive={true} dataKey="value"  data={data01} cx={200} cy={200} outerRadius={100} fill="#8884d8" label />
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
                            </div>
                        </div>
                        <div className="panel panel-default" id="panel3">
                            <div className="panel-heading">
                                <h4 className="panel-title">
                                    <a data-toggle="collapse" data-target="#collapseThree"
                                       href="#collapseThree" className="collapsed">
                                        Question #3
                                    </a>
                                </h4>
                            </div>
                            <div id="collapseThree" className="panel-collapse collapse">
                                <div className="panel-body">
                                    <div className="container">
                                        <div className="col-md-6">
                                            <PieChart width={800} height={500} margin={{top: -50, right: 0, left: 0, bottom: 0}}>
                                                <Pie isAnimationActive={true} dataKey="value"  data={data01} cx={200} cy={200} outerRadius={100} fill="#8884d8" label />
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
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}