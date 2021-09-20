import Header from '../Navbar';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../../admin/SideBar';


//LIBRARY DESIGN ADMIN ISSUES
import {Helmet} from "react-helmet";

import axios from "axios";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import {isAuth} from "../../../_helper/auth";
import {Button} from "semantic-ui-react";




export class ListTeacher extends Component {



    /*
    exportToExcel= ({apiData,fileName})=>{
        const fileType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";

        const exportToCV=({apiData,fileName}) =>{
            const ws = XLSX.utils.json_to_sheet(apiData);
            const wb = {Sheets:{data:ws}, SheetNames:["data"]};
            const excelToBuffer = XLSX.write(wb, {bookType:"xlsx", type:"array"});
            const data = new Blob([excelToBuffer],{type:fileType});
            FileSaver.saveAs(data,fileName + fileExtension);
        }

    };

     */
    constructor(props) {
        super(props)
        this.state = {
            teachers: [],


        }
    }







    componentDidMount() {




        //GET ALL Teachers
        axios.get('http://localhost:8000/user/getTeachers').then((res) => {



                this.setState({teachers:res.data})

        });




    }


    onChange = e => {
        if(e.target.value.length ===0) {
            axios.get('http://localhost:8000/mark/marks/').then((res) => {

                console.log(res.data.data);

                this.setState({ notes:res.data.data});
                window.location.reload()
            });

        }
        this.setState({ [e.target.name]: e.target.value });
    };

    //SEARCH MARK BY USER
    search = (e) => {

        e.preventDefault();

        axios.get('http://localhost:8000/mark/search?email='+this.state.email).then((res) => {
            if(res.data.length === 0) {
                this.setState({searchnotfound:"Student with this email not found"})
            }
            this.setState({ notes: res.data });
        }).catch(err=>
            alert(JSON.stringify(err)));
    };


    //AFFECT USER TO SECTION

    affect = (idSection, e) => {
        this.props.history.push('/affectUserSection/' + idSection);
    };

    //DELETE NOTE
    onDelete =   (e,id) => {


        e.preventDefault();

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to return this Teacher!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                //DELETE NOTE

                axios.delete('http://localhost:8000/user/deleteUser/' + id);

                this.state.teachers.splice(id, 1);


                Swal.fire(
                    'Deleted!',
                    'Teacher has been deleted.',
                    'success'
                )
                window.location.reload();
            }
        })


    };




    //INPUT HANDLE CHANGE
    handleInputChange = e => {
        e.preventDefault();
        this.setState(
            {
                [e.target.name] : e.target.value
            }
        )
    }




    render() {

        const urlImage = "http://localhost:8000/user/getImage/images"


        return (




            <div id="admin">




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

                    <Header/>
                    <Sidebar/>
                    <div id="main-content">


                        <div className="container-fluid">
                            <div className="block-header">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <h2>Professors List</h2>
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="index.html"><i
                                                className="fa fa-dashboard"></i></a></li>
                                            <li className="breadcrumb-item">Professors</li>
                                            <li className="breadcrumb-item active">List</li>
                                        </ul>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        {/*<div className="d-flex flex-row-reverse">*/}
                                        {/*    <div className="page_action">*/}
                                        {/*        <button type="button" className="btn btn-primary"><i*/}
                                        {/*            className="fa fa-download"></i> Download report*/}
                                        {/*        </button>*/}
                                        {/*        <button type="button" className="btn btn-secondary"><i*/}
                                        {/*            className="fa fa-send"></i> Send report*/}
                                        {/*        </button>*/}
                                        {/*    </div>*/}
                                        {/*    <div className="p-2 d-flex">*/}

                                        {/*    </div>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                            </div>

                            <div className="row clearfix">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="body">
                                            <ul className="nav nav-tabs-new">
                                                <li className="nav-item"><a className="nav-link active"
                                                                            data-toggle="tab"
                                                                            href="#Permanent">Permanent</a></li>
                                                <li className="nav-item"><a className="nav-link" data-toggle="tab"
                                                                            href="#Consultant">Consultant</a></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="tab-content padding-0">
                                        <div className="tab-pane active" id="Permanent">
                                            <div className="row clearfix">




                                                {

                                                        this.state.teachers.map((teacher, i) => (

                                                            <div  key={i} className="col-lg-3 col-md-6 col-sm-12">
                                                                <div className="card member-card">
                                                                    <div className="body">
                                                                        <div className="member-thumb">
                                                        <img src={`${urlImage}${teacher.image}`}
                                                                                 className="img-fluid rounded" alt="profile-image"/>
                                                                        </div>
                                                                        <div className="detail mt-3">
                                                                            <h4 className="mb-0">{teacher.firstName} {teacher.lastName}</h4>
                                                                            {/*<p className="text-muted">Mathematics</p>*/}
                                                                            <ul className="social-links list-inline mt-2">
                                                                                <li><a title="facebook"
                                                                                       href="javascript:void(0);"><i
                                                                                    className="fa fa-facebook"></i></a></li>
                                                                                <li><a title="twitter" href="javascript:void(0);"><i
                                                                                    className="fa fa-twitter"></i></a></li>
                                                                                <li><a title="instagram" href="javascript:void(0);"><i
                                                                                    className="fa fa-instagram"></i></a></li>
                                                                            </ul>
                                                                            <p className="text-muted">{teacher.country}
                                                                                </p>
                                                                            <Button
                                                                                onClick={event => this.onDelete(event,teacher._id)}
                                                                               color="red">REJECT
                                                                                </Button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))


                                                }


                                            </div>
                                        </div>
                                        {/*<div className="tab-pane" id="Consultant">*/}
                                        {/*    <div className="row clearfix">*/}
                                        {/*        <div className="col-lg-3 col-md-6 col-sm-12">*/}
                                        {/*            <div className="card member-card">*/}
                                        {/*                <div className="body">*/}
                                        {/*                    <div className="member-thumb">*/}
                                        {/*                        <img src="../assets/images/lg/avatar2.jpg"*/}
                                        {/*                             className="img-fluid rounded" alt="profile-image"/>*/}
                                        {/*                    </div>*/}
                                        {/*                    <div className="detail mt-3">*/}
                                        {/*                        <h4 className="mb-0">Pro. Amelia</h4>*/}
                                        {/*                        <p className="text-muted">Mathematics</p>*/}
                                        {/*                        <ul className="social-links list-inline mt-2">*/}
                                        {/*                            <li><a title="facebook"*/}
                                        {/*                                   href="javascript:void(0);"><i*/}
                                        {/*                                className="fa fa-facebook"></i></a></li>*/}
                                        {/*                            <li><a title="twitter" href="javascript:void(0);"><i*/}
                                        {/*                                className="fa fa-twitter"></i></a></li>*/}
                                        {/*                            <li><a title="instagram" href="javascript:void(0);"><i*/}
                                        {/*                                className="fa fa-instagram"></i></a></li>*/}
                                        {/*                        </ul>*/}
                                        {/*                        <p className="text-muted">795 Folsom Ave, Suite 600 San*/}
                                        {/*                            Francisco, CADGE 94107</p>*/}
                                        {/*                        <a href="javascript:void(0);"*/}
                                        {/*                           className="btn btn-default btn-simple">View*/}
                                        {/*                            Profile</a>*/}
                                        {/*                    </div>*/}
                                        {/*                </div>*/}
                                        {/*            </div>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="col-lg-3 col-md-6 col-sm-12">*/}
                                        {/*            <div className="card member-card">*/}
                                        {/*                <div className="body">*/}
                                        {/*                    <div className="member-thumb">*/}
                                        {/*                        <img src="../assets/images/lg/avatar4.jpg"*/}
                                        {/*                             className="img-fluid rounded" alt="profile-image"/>*/}
                                        {/*                    </div>*/}
                                        {/*                    <div className="detail mt-3">*/}
                                        {/*                        <h4 className="mb-0">Pro. Jack </h4>*/}
                                        {/*                        <p className="text-muted">Architecture</p>*/}
                                        {/*                        <ul className="social-links list-inline mt-2">*/}
                                        {/*                            <li><a title="facebook"*/}
                                        {/*                                   href="javascript:void(0);"><i*/}
                                        {/*                                className="fa fa-facebook"></i></a></li>*/}
                                        {/*                            <li><a title="twitter" href="javascript:void(0);"><i*/}
                                        {/*                                className="fa fa-twitter"></i></a></li>*/}
                                        {/*                            <li><a title="instagram" href="javascript:void(0);"><i*/}
                                        {/*                                className="fa fa-instagram"></i></a></li>*/}
                                        {/*                        </ul>*/}
                                        {/*                        <p className="text-muted">795 Folsom Ave, Suite 600 San*/}
                                        {/*                            Francisco, CADGE 94107</p>*/}
                                        {/*                        <a href="javascript:void(0);"*/}
                                        {/*                           className="btn btn-default btn-simple">View*/}
                                        {/*                            Profile</a>*/}
                                        {/*                    </div>*/}
                                        {/*                </div>*/}
                                        {/*            </div>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="col-lg-3 col-md-6 col-sm-12">*/}
                                        {/*            <div className="card member-card">*/}
                                        {/*                <div className="body">*/}
                                        {/*                    <div className="member-thumb">*/}
                                        {/*                        <img src="../assets/images/lg/avatar1.jpg"*/}
                                        {/*                             className="img-fluid rounded" alt="profile-image"/>*/}
                                        {/*                    </div>*/}
                                        {/*                    <div className="detail mt-3">*/}
                                        {/*                        <h4 className="mb-0">Pro. Joseph </h4>*/}
                                        {/*                        <p className="text-muted">Chemistry</p>*/}
                                        {/*                        <ul className="social-links list-inline mt-2">*/}
                                        {/*                            <li><a title="facebook"*/}
                                        {/*                                   href="javascript:void(0);"><i*/}
                                        {/*                                className="fa fa-facebook"></i></a></li>*/}
                                        {/*                            <li><a title="twitter" href="javascript:void(0);"><i*/}
                                        {/*                                className="fa fa-twitter"></i></a></li>*/}
                                        {/*                            <li><a title="instagram" href="javascript:void(0);"><i*/}
                                        {/*                                className="fa fa-instagram"></i></a></li>*/}
                                        {/*                        </ul>*/}
                                        {/*                        <p className="text-muted">795 Folsom Ave, Suite 600 San*/}
                                        {/*                            Francisco, CADGE 94107</p>*/}
                                        {/*                        <a href="javascript:void(0);"*/}
                                        {/*                           className="btn btn-default btn-simple">View*/}
                                        {/*                            Profile</a>*/}
                                        {/*                    </div>*/}
                                        {/*                </div>*/}
                                        {/*            </div>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="col-lg-3 col-md-6 col-sm-12">*/}
                                        {/*            <div className="card member-card">*/}
                                        {/*                <div className="body">*/}
                                        {/*                    <div className="member-thumb">*/}
                                        {/*                        <img src="../assets/images/lg/avatar6.jpg"*/}
                                        {/*                             className="img-fluid rounded" alt="profile-image"/>*/}
                                        {/*                    </div>*/}
                                        {/*                    <div className="detail mt-3">*/}
                                        {/*                        <h4 className="mb-0">Pro. Charlie </h4>*/}
                                        {/*                        <p className="text-muted">Chemistry</p>*/}
                                        {/*                        <ul className="social-links list-inline mt-2">*/}
                                        {/*                            <li><a title="facebook"*/}
                                        {/*                                   href="javascript:void(0);"><i*/}
                                        {/*                                className="fa fa-facebook"></i></a></li>*/}
                                        {/*                            <li><a title="twitter" href="javascript:void(0);"><i*/}
                                        {/*                                className="fa fa-twitter"></i></a></li>*/}
                                        {/*                            <li><a title="instagram" href="javascript:void(0);"><i*/}
                                        {/*                                className="fa fa-instagram"></i></a></li>*/}
                                        {/*                        </ul>*/}
                                        {/*                        <p className="text-muted">795 Folsom Ave, Suite 600 San*/}
                                        {/*                            Francisco, CADGE 94107</p>*/}
                                        {/*                        <a href="javascript:void(0);"*/}
                                        {/*                           className="btn btn-default btn-simple">View*/}
                                        {/*                            Profile</a>*/}
                                        {/*                    </div>*/}
                                        {/*                </div>*/}
                                        {/*            </div>*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                            </div>

                        </div>



                    </div>

                </div>
            </div>
        )
    }}


export default ListTeacher
