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
import {getNoteInfo} from "../../../actions/noteActions";
import {useDispatch} from "react-redux";
import {GET_NOTES} from "../../../actions/types";
import Swal from "sweetalert2";




export class FormMarkInfoEdit extends Component {


    state={
        notes:[],
        C:"" ,
        identifiant :"" ,
        modality :"",
        year: "",
        groupeName: "",
        EEName:"",
        numInscription:"",
        session:"",

    }

    componentDidMount() {

        axios
            .get(`http://localhost:8000/mark/getNoteById/${this.props.match.params.id}`).then(async (data) => {

            this.setState({ codeELab: data.data.data.codeELab });
            this.setState({ identifiant: data.data.data.identifiant });
            this.setState({ modality: data.data.data.modality });
            this.setState({ year: data.data.data.year });
            this.setState({ groupeName: data.data.data.groupeName });
            this.setState({ EEName: data.data.data.EEName });
            this.setState({ numInscription: data.data.data.numInscription });
            this.setState({ session: data.data.data.session });
            this.setState({ _id: data.data.data._id });
        })
    }




    onInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state);
    };

    //UPDATE Mark
    onFormSubmit = (e) => {

            e.preventDefault()
            //DETAIL



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
                    .put('http://localhost:8000/mark/updateNote/' + this.state._id, {

                        codeELab: this.state.codeELab,
                        identifiant: this.state.identifiant,
                        modality: this.state.modality,
                        year: this.state.year,
                        groupeName: this.state.groupeName,
                        EEName: this.state.EEName,
                        numInscription: this.state.numInscription,
                        mark: this.state.mark,
                        cin: this.state.cin,
                        email: this.state.email,
                        session: this.state.session,
                    })
                    .then((data) => {
                        this.props.history.push('/admin');

                    });

                swalWithBootstrapButtons.fire(
                    'Updated!',
                    'Mark information with id' +this.state._id+" was updated!",
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






    render() {


        return (


            <div id="wrapper" className="font-nunito layout-fullwidth sidebar_toggle">
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
                                        <h2>Update Mark Information</h2>
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
                                            <img  className="img-responsive" style={{width:"50%",marginRight:"auto",display:"block",marginLeft:"auto"}}  src="../../img/updateSvg.svg"/>
                                            <form onSubmit={event => this.onFormSubmit(event)}>

                                                <div className="row clearfix">

                                                    <div className="col-md-6 col-sm-12">
                                                        <div className="form-group">
                                                            <input type="text" className="form-control"
                                                                   name="codeELab"
                                                                   onChange={this.onInputChange}
                                                                   value ={this.state.codeELab}
                                                                   placeholder="codeElab"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-12">
                                                        <div className="form-group">

                                                        <input type="text" className="form-control"
                                                               name="identifiant"

                                                               onChange={this.onInputChange}
                                                               value ={this.state.identifiant}

                                                               placeholder="identifiant "/>
                                                    </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-12">
                                                        <div className="form-group">



                                                        <input type="text" className="form-control" placeholder="Modality "

                                                               name="modality"

                                                               onChange={this.onInputChange}
                                                               value ={this.state.modality}
                                                        />

                                                         </div>
                                                         </div>
                                                    <div className="col-md-6 col-sm-12">



                                                        <select className="form-control"

                                                                name="year"

                                                                onChange={this.handleInputChange}
                                                                value ={this.state.year}
                                                        >
                                                            <option value={this.state.year}>{this.state.year}</option>
                                                            <option value="2010">2010</option>
                                                            <option value="2011">2011</option>
                                                            <option value="2012">2012</option>
                                                            <option value="2013">2013</option>
                                                            <option value="2014">2014</option>
                                                            <option value="2015">2015</option>
                                                            <option value="2016">2016</option>
                                                            <option value="2017">2017</option>
                                                            <option value="2018">2018</option>
                                                            <option value="2019">2019</option>
                                                            <option value="2020">2020</option>
                                                            <option value="2021">2021</option>
                                                            <option value="2022">2022</option>



                                                        </select>
                                                    </div>
                                                    <div className="col-md-6 col-sm-12">

                                                        <div className="form-group">


                                                    <input type="text" className="form-control" placeholder="Groupe Name "
                                                               name="groupeName"

                                                               onChange={this.onInputChange}
                                                               value ={this.state.groupeName}
                                                        />
                                                    </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-12">

                                                        <div className="form-group">

                                                    <input type="text" className="form-control" placeholder="EE Name "

                                                           name="EEName"

                                                           onChange={this.onInputChange}
                                                           value ={this.state.EEName}
                                                    />
                                                    </div>
                                                    </div>



                                                    <div className="col-md-6 col-sm-12">
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" placeholder="Session "

                                                                   name="session"

                                                                   onChange={this.onInputChange}
                                                                   value ={this.state.session}

                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-12">
                                                        <div className="form-group">

                                                        <input type="text" className="form-control" placeholder="Numero inscription "

                                                               name="numInscription"

                                                               onChange={this.onInputChange}
                                                               value ={this.state.numInscription}
                                                        />

                                                    </div>
                                                    </div>




                                                </div>
                                                <div className="row clearfix">



                                                    <div className="col-md-1 col-sm-offset-12"
                                                         style={{display:"block",marginLeft:"auto",marginRight:"auto",padding:"15px"}}
                                                    >
                                                        <button type="submit" className="btn btn-primary"

                                                        >Update</button>
                                                        {/*<button type="submit" className="btn btn-outline-secondary">Cancel*/}
                                                        {/*</button>*/}

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
export default FormMarkInfoEdit;




