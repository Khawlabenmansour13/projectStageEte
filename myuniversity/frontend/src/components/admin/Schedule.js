import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Sidebar from "../admin/SideBar";
import {Helmet} from "react-helmet";
import { extend, isNullOrUndefined } from "@syncfusion/ej2-base";
import Header from "./Navbar";
import Navbar from "./Navbar";
import axios from "axios";
import { DataManager, UrlAdaptor,Query  } from '@syncfusion/ej2-data';
import {
    ScheduleComponent,
    ViewsDirective,
    ViewDirective,
    Day,
    Week,
    WorkWeek,
    Month,
    Agenda,
    Inject,
    Resize,
    DragAndDrop
} from "@syncfusion/ej2-react-schedule";import Swal from "sweetalert2"
class Schedule extends React.Component {
    dataManager;
    constructor() {
        super(...arguments);
        this.dataManager = new DataManager({
            url: 'http://localhost:8000/schedule/get',

            adaptor: new UrlAdaptor
        });



        this.data = this.dataManager

    }

    onActionBegin(args) {
        if (args.requestType == "eventCreate") {
            console.log(args.addedRecords[0]);
            axios.post("http://localhost:8000/schedule",args.addedRecords[0]).then(res=>Swal.fire(res.data.message));


        } else if (args.requestType == "eventChange") {
            console.log(args.changedRecords[0]);
            console.log(args.changedRecords[0]._id);
            axios.put("http://localhost:8000/schedule/"+args.changedRecords[0]._id,args.changedRecords[0]).then(res=>Swal.fire(res.data.message));

        }
        else if(args.requestType == "eventRemove") {
            let Id = isNullOrUndefined(args.data[0]) ? args.data._id : args.data[0]._id;
            console.log("Appointment ID : " + Id);
            axios.delete("http://localhost:8000/schedule/"+Id).then(res=>Swal.fire(res.data.message));

        }
    }


    render() {

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
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/waypoints/4.0.0/jquery.waypoints.min.js"/>


                    <link rel="stylesheet" href="../../Pages/assetsAdminD/vendor/bootstrap/css/bootstrap.min.css"/>
                    <link rel="stylesheet" href="../../Pages/assetsAdminD/vendor/font-awesome/css/font-awesome.min.css"/>
                    <link rel="stylesheet" href="../../Pages/assetsAdminD/vendor/charts-c3/plugin.css"/>

                    <link rel="stylesheet" href="
                    /vendor/jvectormap/jquery-jvectormap-2.0.3.min.css"/>
                    <link rel="stylesheet" href="assetsAdminD/css/main.css"/>

                    <script src=".assetsAdminD/bundles/libscripts.bundle.js" type="text/javascript"/>
                    <script src="assetsAdminD/bundles/vendorscripts.bundle.js" type="text/javascript"/>

                    <script src="assetsAdminD/bundles/apexcharts.bundle.js" type="text/javascript"/>
                    <script src="assetsAdminD/bundles/c3.bundle.js" type="text/javascript"/>
                    <script src="assetsAdminD/bundles/jvectormap.bundle.js" type="text/javascript"/>
                    <script src="assetsAdminD/bundles/mainscripts.bundle.js" type="text/javascript"/>
                    <script src="assetsAdminD/custom.js" type="text/javascript"/>



                    <link href="https://cdn.syncfusion.com/ej2/ej2-base/styles/material.css" rel="stylesheet" />
                    <link href="https://cdn.syncfusion.com/ej2/ej2-react-buttons/styles/material.css" rel="stylesheet" />
                    <link href="https://cdn.syncfusion.com/ej2/ej2-react-calendars/styles/material.css" rel="stylesheet" />
                    <link href="https://cdn.syncfusion.com/ej2/ej2-react-dropdowns/styles/material.css" rel="stylesheet" />
                    <link href="https://cdn.syncfusion.com/ej2/ej2-react-inputs/styles/material.css" rel="stylesheet" />
                    <link href="https://cdn.syncfusion.com/ej2/ej2-react-navigations/styles/material.css" rel="stylesheet" />
                    <link href="https://cdn.syncfusion.com/ej2/ej2-react-popups/styles/material.css" rel="stylesheet" />
                    <link href="https://cdn.syncfusion.com/ej2/ej2-react-schedule/styles/material.css" rel="stylesheet" />
                    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/0.19.38/system.js"></script>
                    <script src="systemjs.config.js"></script>

                </Helmet>


                        <Sidebar/>
                <div id="main-content">




                <div className="container-fluid">
                <div className="block-header">

                <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                <h2>Schedule(Emploi de temps)</h2>
                <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="index.html"><i
                className="fa fa-dashboard"></i></a></li>
                <li className="breadcrumb-item active">Schedule</li>
                </ul>
                </div>
                    <div className='schedule-control-section'>
                        <div className='control-section'>
                            <div className='control-wrapper'>
                                <ScheduleComponent width='100%' height='650px' eventSettings={{
                                    dataSource: this.data, fields: { id: 'workEventId' }
                                }} actionBegin={(this.onActionBegin.bind(this))}>
                                    <ViewsDirective>
                                        <ViewDirective option="Day" />
                                        <ViewDirective option="Week" />
                                        <ViewDirective option="WorkWeek" />
                                        <ViewDirective option="Month" />
                                        <ViewDirective option="Agenda" />
                                    </ViewsDirective>
                                    <Inject
                                        services={[
                                            Day,
                                            Week,
                                            WorkWeek,
                                            Month,
                                            Agenda,
                                            Resize,
                                            DragAndDrop
                                        ]}
                                    />
                                </ScheduleComponent>
                            </div>
                        </div>
                    </div>
                </div>
                </div></div></div></div>



                    );
                    }
                    }



export default Schedule;
