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
import {AffecterUserSection, clearErrors, getCurrentSection, getSection} from "../../../actions/sectionActions";
import connect from "react-redux/lib/connect/connect";
import {withRouter} from "react-router-dom";
import Swal from "sweetalert2";
import {AFFECTER_USER_SECTION, GET_ERRORS} from "../../../actions/types";



export class  AffectUserSection extends Component {



        state = {
            notes: [],
            title: "",
            nombreCredit: 0,
            formation: "",
            typeCycle: "",
            annee: "",
            description: "",
            users: [],
            enableBtn:false,
            _idUser:0


        }


    componentDidMount() {

        //GET ALL  STUDENT
        axios.get('http://localhost:8000/user/getAllUsers/').then((res) => {
            console.log(res.data);
            this.setState({users: res.data});
        })


        // //GET SECTION BY ID
        // axios.get('http://localhost:8000/section/getSectionById/' + this.props.match.params.id).then(async (data) => {
        //     this.setState({title: data.data.title});
        //     this.setState({_id: data.data._id});
        //     console.log(this.state);
        //
        // });

        //GET ALL Sections
        axios.get('http://localhost:8000/section/getAllsections').then((res) => {

            console.log(res.data.data);

            this.setState({notes: res.data.data});
        });


    }



    // alertSelectStudent = e => {
    //     let timerInterval
    //     Swal.fire({
    //         title: 'Select Student!',
    //         html: 'Loading...',
    //         timer: 2000,
    //         timerProgressBar: true,
    //         didOpen: () => {
    //             Swal.showLoading()
    //             const b = Swal.getHtmlContainer().querySelector('b')
    //             timerInterval = setInterval(() => {
    //                 b.textContent = Swal.getTimerLeft()
    //             }, 100)
    //         },
    //         willClose: () => {
    //             clearInterval(timerInterval)
    //         }
    //     }).then((result) => {
    //         /* Read more about handling dismissals below */
    //         if (result.dismiss === Swal.DismissReason.timer) {
    //             console.log('I was closed by the timer')
    //         }
    //     })
    // }


    //INPUT HANDLE CHANGE
    handleInputChange = e => {
        e.preventDefault();
        if(e.target.value) {

            // SWAL ALERT AFTER SELECT STUDENT
        //    this.alertSelectStudent();
            this.setState({
                enableBtn: true
            })
            //GET ID BY EMAIL USER
            axios.get('http://localhost:8000/user/findIdUserByEmail/' + e.target.value).then(async (data) => {


                    this.setState({_idUser: data.data});
                    console.log("id="+this.state._idUser)



            });
        }
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    //AFFECT USER TO SECTION
    onAffect=(e)  => {

            e.preventDefault();

           let idSection = this.props.match.params.idSection;
           let idStudent = this.state._idUser;
            axios.put(`http://localhost:8000/section/affecterUserToSection/${idSection}/${idStudent}`)
                .then(res =>
        Swal.fire({
            title: 'Done!',
            text: res.data.message,
            imageUrl:'https://i0.wp.com/www.wishesquotesimages.com/wp-content/uploads/2020/05/love-emoji-gif-for-whatsapp.gif?resize=620%2C620',
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
        })
                )
                .catch(error => {
                   // alert(JSON.stringify(error.response.data.message))
                    Swal.fire({
                        title: 'Exist!',
                        text: error.response.data.message,
                        imageUrl: 'https://c.tenor.com/zTKB-sgR15sAAAAM/smile-eyes-smiley.gif',
                        imageWidth: 200,
                        imageHeight: 200,
                        imageAlt: 'Custom image',
                    })
                })
        };


    render() {
        const { section } = this.props;


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
                                        <img  className="img-responsive" style={{width:"50%",marginRight:"auto",display:"block",marginLeft:"auto"}}  src="../../img/affectUserToSection.svg"/>
                                        <form onSubmit={event => this.onAddSection(event)}>

                                            <div className="row clearfix">

                                                <div className="col-md-12 col-sm-12">

                                                    <select className="form-control"

                                                            name="email"


                                                            onChange={this.handleInputChange}
                                                            value ={this.state.email}
                                                    >
                                                        <option>--Choose Student for this section--</option>

                                                        {

                                                            this.state.users.filter(person =>
                                                                person.role === "STUDENT").map(student => (
                                                                <option>{student.email}</option>
                                                            ))
                                                        }
                                                        }

                                                    </select>
                                                </div>




                                            </div>
                                            <div className="row clearfix">





                                            </div>
                                        </form>
                                        <div className="col-sm-offset-6"
                                             style={{display:"block",marginLeft:"0",marginRight:"0",padding:"15px"}}
                                        >
                                            {this.state.enableBtn?


                                                <div>
                                                    <button  className="btn btn-primary"
                                                             onClick={event => this.onAffect(event)}

                                                    >Affect
                                                    </button>
                                                </div>
                                                : null }







                                        </div>

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
