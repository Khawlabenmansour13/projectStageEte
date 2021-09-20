import React, {Component} from "react";
import {Helmet} from "react-helmet";
import Navbar from "../Navbar";
import Sidebar from "../SideBar";
import CanvasJSReact from "./canvasjs.react";
import axios from "axios";
import { Grid, Image } from 'semantic-ui-react'

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class Chart extends Component {

    state={
        teachers:0,
        student:0,
        employee:0,
    }

    componentDidMount() {

        //COUNT TEACHER
        axios.get("http://localhost:8000/user/countTeacher").then(res=>{console.log(res)

            this.setState({teachers:res.data})
        });
        //COUNT STUDENT
        axios.get("http://localhost:8000/user/countStudent").then(res=>{console.log(res)

            this.setState({student:res.data})
        });
        //COUNT EMPLOYEE
        axios.get("http://localhost:8000/user/countEmployee").then(res=>{console.log(res)

            this.setState({employee:res.data})
        });

    }

    render() {
        const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "Chart Version 0"
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} {y}%",
				dataPoints: [
					{ y: this.state.student, label: "Students" },
					{ y: this.state.teachers, label: "Teachers" },
					{ y: this.state.employee, label: "Employee" },
					
				]
			}]
		}
        return (
            <div id="wrapper" className="theme-cyan">
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>Admin</title>

                    <script src="https://cdnjs.cloudflare.com/ajax/libs/waypoints/4.0.0/jquery.waypoints.min.js"/>


                    <link rel="stylesheet" href="assetsAdminD/vendor/bootstrap/css/bootstrap.min.css"/>
                    <link rel="stylesheet" href="assetsAdminD/vendor/font-awesome/css/font-awesome.min.css"/>
                    <link rel="stylesheet" href="assetsAdminD/vendor/charts-c3/plugin.css"/>

                    <link rel="stylesheet" href="assetsAdminD/vendor/jvectormap/jquery-jvectormap-2.0.3.min.css"/>
                    <link rel="stylesheet" href="assetsAdminD/css/main.css"/>

                    <script src="assetsAdminD/bundles/libscripts.bundle.js" type="text/javascript"/>
                    <script src="assetsAdminD/bundles/vendorscripts.bundle.js" type="text/javascript"/>

                    <script src="assetsAdminD/bundles/apexcharts.bundle.js" type="text/javascript"/>
                    <script src="assetsAdminD/bundles/c3.bundle.js" type="text/javascript"/>
                    <script src="assetsAdminD/bundles/jvectormap.bundle.js" type="text/javascript"/>
                    <script src="assetsAdminD/bundles/mainscripts.bundle.js" type="text/javascript"/>
                    <script src="assetsAdminD/custom.js" type="text/javascript"/>

                </Helmet>

                <Navbar/>
                <Sidebar/>

                <div id="main-content">





                    <div className="container-fluid">
                        <div className="block-header">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <h2>Analytical</h2>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="index.html"><i
                                            className="fa fa-dashboard"></i></a>
                                        </li>
                                        <li className="breadcrumb-item">Dashboard</li>
                                        <li className="breadcrumb-item active">Analytical</li>
                                    </ul>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">

                                </div>

                                <div>
                            </div>
                        </div>
                        <br/>
                       
                        <Grid>
    <Grid.Row columns={3}>
      <Grid.Column>
                            <div class="card top_counter">
                                <div class="body">
                                    <div class="icon text-warning"><i class="fa fa-users"></i> </div>
                                    <div class="content">
                                        <div class="text">Students</div>
                                        <h5 class="number">{this.state.student}</h5>
                                    </div>
                                </div>
                            </div>
                             </Grid.Column>
      <Grid.Column>
                            <div class="card top_counter">
                                <div class="body">
                                    <div class="icon text-danger"><i class="fa fa-briefcase"></i> </div>
                                    <div class="content">
                                        <div class="text">Employee</div>
                                        <h5 class="number">{this.state.employee}</h5>
                                    </div>
                                </div>
                            </div>
                              </Grid.Column>
      <Grid.Column>
                            <div class="card top_counter">
                                <div class="body">
                                    <div class="icon"><i class="fa fa-users"></i> </div>
                                    <div class="content">
                                        <div class="text">Teachers</div>
                                        <h5 class="number">{this.state.teachers}</h5>
                                    </div>
                                </div>
                        </div>
                              </Grid.Column>
    </Grid.Row>
    </Grid>
    
                        
                        

                            <div className="container">


                                <CanvasJSChart options={options}
                                    /* onRef = {ref => this.chart = ref} */
                                />
                            </div>

                        </div>
                        </div>
                    </div>
                </div>
            



        );
    }
}
    export default Chart;
