import React, { Component } from 'react';
import PropTypes from 'prop-types';

//EXCEL LIBRARIE
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import  JQuery from 'jquery'

//LIBRARY DESIGN ADMIN ISSUES
import {Helmet} from "react-helmet";
import axios from "axios";
import Header from "../Navbar";
import Sidebar from "../../admin/SideBar";
import {toast} from "react-toastify";
import Swal from "sweetalert2";




export class FormSectionEdit extends Component {



    constructor(props) {
        super(props)
        this.state = {
            notes: [],
            nombreCredit: 0,
            formation: "",
            typeCycle: "",
            description:"",
            annee: "",
            users: []


        }
    }


    componentDidMount() {


            axios
                .get(`http://localhost:8000/section/getSectionById/${this.props.match.params.id}`).then(async (data) => {


                this.setState({ nombreCredit: data.data.data.nombreCredit });
                this.setState({ formation: data.data.data.formation });
                this.setState({ typeCycle: data.data.data.typeCycle });
                this.setState({ annee: data.data.data.annee });
                this.setState({ description: data.data.data.description });

                this.setState({ _id: data.data.data._id });
            })


    }


    //INPUT HANDLE CHANGE
    handleInputChange = e => {
        e.preventDefault();
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }







    //UPDATE Section
    onFormSubmit = (e) => {

        e.preventDefault()
        //DETAIL
        if (this.state.formation.length === 0) {
            Swal.fire("Section formation required ")
            return;
        }

        else if (this.state.typeCycle.length  === 0) {
            Swal.fire("typeCycle  required ")
            return;
        }
        else if (this.state.description.length  === 0) {
            Swal.fire("description  required ")
            return;
        }
        else if (this.state.nombreCredit <= 0 ) {
            Swal.fire("nombreCredit  must be positive number ")
            return;
        }
        else if(this.state.nombreCredit < 4 ||this.state.nombreCredit > 16 ) {
            Swal.fire("nombreCredit test must be between 4 and 16 ")
            return;
        }
        if (this.state.typeCycle.length === 0) {
            Swal.fire("typeCycle required ")
            return;
        }

        if (this.state.annee.length === 0) {
            Swal.fire("annee  required ")
            return;
        }
        if (this.state.description.length === 0) {
            Swal.fire("description  required ")
            return;
        } else {


            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, updated it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {

                    //UPDATE MARK INFO
                    axios
                        .put('http://localhost:8000/section/updateSection/' + this.state._id, {


                            nombreCredit: this.state.nombreCredit,
                            formation: this.state.formation,
                            typeCycle: this.state.typeCycle,
                            annee: this.state.annee,

                        })
                        .then((data) => {
                            this.props.history.push('/listSection');

                        });

                    swalWithBootstrapButtons.fire(
                        'Updated!',
                        'Section information with id' + this.state._id + " was updated!",
                        'success'
                    )


                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        'Cancelled',
                        'action was canceled:)',
                        'error'
                    )
                }
            })

        }
    }








    render() {


        return (


            <div id="wrapper" className="theme-cyan">
                <Header/>
                <Sidebar/>
                <div id="main-content">


                    <div id="wrapper" className="theme-cyan">
                        <Helmet>
                            <meta charSet="utf-8"/>
                            <title>Admin</title>

                            <script src="https://cdnjs.cloudflare.com/ajax/libs/waypoints/4.0.0/jquery.waypoints.min.js"/>


                            <link rel="stylesheet" href="../../assetsAdminD/vendor/bootstrap/css/bootstrap.min.css"/>
                            <link rel="stylesheet" href="../../assetsAdminD/vendor/font-awesome/css/font-awesome.min.css"/>
                            <link rel="stylesheet" href="../../assetsAdminD/vendor/charts-c3/plugin.css"/>

                            <link rel="stylesheet" href="../../assetsAdminD/vendor/jvectormap/jquery-jvectormap-2.0.3.min.css"/>
                            <link rel="stylesheet" href="../../assetsAdminD/css/main.css"/>

                            <script src="../../assetsAdminD/bundles/libscripts.bundle.js" type="text/javascript"/>
                            <script src="../../assetsAdminD/bundles/vendorscripts.bundle.js" type="text/javascript"/>

                            <script src="../../assetsAdminD/bundles/apexcharts.bundle.js" type="text/javascript"/>
                            <script src="../../assetsAdminD/bundles/c3.bundle.js" type="text/javascript"/>
                            <script src="../../assetsAdminD/bundles/jvectormap.bundle.js" type="text/javascript"/>
                            <script src="../../assetsAdminD/bundles/mainscripts.bundle.js" type="text/javascript"/>
                            <script src="../../assetsAdminD/custom.js" type="text/javascript"/>

                        </Helmet>



                        <div className="container-fluid">
                            <div className="block-header">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <h2>Add Section</h2>
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="index.html"><i
                                                className="fa fa-dashboard"></i></a></li>
                                            <li className="breadcrumb-item">Section</li>
                                            <li className="breadcrumb-item active">Add</li>
                                        </ul>
                                    </div>

                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="card">


                                        <div className="body"  >
                                            <img  className="img-responsive" style={{width:"50%",marginRight:"auto",display:"block",marginLeft:"auto"}}  src="../../img/addSection.svg"/>
                                            <form onSubmit={event => this.onFormSubmit(event)}>

                                                <div className="row clearfix">
                                                    <div className="col-md-6 col-sm-12">
                                                        <select className="form-control show-tick"
                                                                onChange={this.handleInputChange}
                                                                value ={this.state.formation}
                                                                name="formation"
                                                        >
                                                            <option value="">--Formation--</option>
                                                            <option value="Business">Business</option>
                                                            <option value="Computer science">Computer science</option>
                                                            <option value="Mecanic">Mecanic</option>
                                                            <option value="Continu">Continu</option>
                                                            <option value="Civilize">Civilize</option>



                                                        </select>
                                                    </div>

                                                    <div className="col-md-6 col-sm-12">
                                                        <select className="form-control show-tick"
                                                                onChange={this.handleInputChange}
                                                                value ={this.state.typeCycle}
                                                                name="typeCycle"

                                                        >
                                                            <option value="">--TypeCycle--</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                        </select>
                                                    </div>






                                                </div>
                                                <div className="row clearfix">



                                                    <div className="col-sm-12">
                                                        <div className="form-group mt-3">
                                <textarea rows="4" className="form-control no-resize"
                                          onChange={this.handleInputChange}
                                          name="description"
                                          value={this.state.description}
                                />
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 col-sm-12">
                                                        <div className="form-group">
                                                            <input type="number" className="form-control"
                                                                   name="nombreCredit"
                                                                   onChange={this.handleInputChange}
                                                                value={this.state.nombreCredit}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 col-sm-12">
                                                        <select className="form-control show-tick"
                                                                onChange={this.handleInputChange}
                                                                name="annee"
                                                                value ={this.state.annee}
                                                        >
                                                            <option value="">--Annee--</option>
                                                            <option value="1er">1er</option>
                                                            <option value="2eme">2eme</option>
                                                            <option value="3eme">3eme</option>
                                                            <option value="4eme">4eme</option>
                                                            <option value="5eme">5eme</option>


                                                        </select>
                                                    </div>
                                                    <div className="col-sm-offset-6"
                                                         style={{display:"block",marginLeft:"auto",marginRight:"auto",padding:"15px"}}
                                                    >
                                                        <button type="submit" className="btn btn-primary"

                                                        >Submit</button>
                                                        <button type="submit" className="btn btn-outline-secondary">Cancel
                                                        </button>

                                                    </div>
                                                </div>
                                            </form>
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
export default FormSectionEdit;




