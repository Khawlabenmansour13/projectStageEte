import Navbar from '../components/admin/Navbar.js';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../components/admin/SideBar';

//EXCEL LIBRARIE
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import  JQuery from 'jquery'

//LIBRARY DESIGN ADMIN ISSUES
import {Helmet} from "react-helmet";
import {Col, Container, Row} from "reactstrap";
import {getUsers} from "../actions/userActions";
import {connect} from "react-redux";
import axios from "axios";
import {GET_ALL_USERS} from "../actions/types";
import {addNote, getAllNotes} from "../actions/noteActions";
import {toast} from "react-toastify";
//NOTIFICATION
import {apiNotification} from "../actions/notificationAction";
import io from "socket.io-client";
import {isAuth} from "../_helper/auth";
import ReactSearchBox from "react-search-box";
import Swal from "sweetalert2";
import {Divider, Grid, Header, Icon, Label} from "semantic-ui-react";
import {Link} from "react-router-dom";



export class Admin extends Component {



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



        state = {
            users: [],
            notes:[],
            sections:[],
            codeELab:"" ,
            identifiant :"" ,
            modality :"",
            year: "",
            groupeName: "",
            EEName:"",
            numInscription:"",
            mark: "",
            exam:"",
            moyTp:"",
            moyCC:"",
            test:"",
            ds:"",
            section:"",
            cin:"",
            email: "",
            session:"",
            Message:"",
            searchnotfound:"",
            Owner:{},

            _idNote:0 ,
            _idUser:0,
            Notes:{},
             socket : io("http://localhost:3000/"),
            updated: false,
            resultMark:false,



        }








componentDidMount() {

            //GET ALL  STUDENT
            axios.get('http://localhost:8000/user/getAllUsers/').then((res)=>{
                console.log(res.data);
                this.setState({users:res.data});
            })


            //GET ALL NOTES
            axios.get('http://localhost:8000/mark/marks/').then((res) => {

                console.log(res.data.data);

                this.setState({ notes:res.data.data});
            });

            //GET ALL  Sections
    axios.get('http://localhost:8000/section/getAllsections/').then((res) => {

        console.log(res.data.data);

        this.setState({ sections:res.data.data});
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







    //INPUT HANDLE CHANGE
    handleInputChange = e => {
        e.preventDefault();
        this.setState(
            {
                [e.target.name] : e.target.value
            }
        )
    }

    //INPUT UPDATE CHANGE
    handleChange = e => {
        this.setState({ ...this.state, Notes: { state: e.target.value } });
    };




    /**************************CRUD + CALCULATE MARK*******************************************/
    //ADD NOTE
    onAddMark= (e) => {
        e.preventDefault();

        //CALCULATE MARK
        //BEFORE CALCULATE WE NEED TO CHECK VALIDATION FORM
        if(this.state.test.length === 0) {
            Swal.fire("mark test required ")
            return;
        }
        else if(parseFloat(this.state.test) <0) {
            Swal.fire("mark test must be positive number ")
            return;
        }
        else if(!(parseFloat(this.state.test) >= 0 && parseFloat(this.state.test) <= 20) ) {
            Swal.fire("mark test must be between 0 and 20 ")
            return;
        }
        if(this.state.ds.length === 0) {
            Swal.fire("mark Ds required ")
            return;
        }
        else if(parseFloat(this.state.ds) <0) {
            Swal.fire("mark DS must be positive number ")
            return;
        }
        else if(!(parseFloat(this.state.ds) >= 0 && parseFloat(this.state.ds) <= 20) ) {
            Swal.fire("mark DS must be between 0 and 20 ")
            return;
        }
        if(this.state.exam.length === 0) {
            Swal.fire("mark exam required ")
            return;
        }
        else if(parseFloat(this.state.exam) <0) {
            Swal.fire("mark exam must be positive number ")
            return;
        }

        else if(!(parseFloat(this.state.exam) >= 0 && parseFloat(this.state.exam) <= 20) ) {
            Swal.fire("mark exam must be between 0 and 20 ")
            return;
        }

        else {


            let MoyCC =  ((parseFloat(this.state.test ) +(parseFloat(this.state.ds)*2))/3).toFixed(2);
            //convert result moyCC to string

            let resMoyCC = MoyCC.toString();
            //SET STATE
            this.setState({moyCC: resMoyCC});



            let mark = (0.2 *(MoyCC) + 0.1 *(parseFloat(this.state.moyTp)) + 0.7 *(parseFloat(this.state.exam))).toFixed(2);
            let resMark = mark.toString();


            this.setState({mark: resMark});





            let note = {
                codeELab: this.state.codeELab,
                identifiant: this.state.identifiant,
                modality: this.state.modality,
                year: this.state.year,
                groupeName: this.state.groupeName,
                EEName: this.state.EEName,
                numInscription: this.state.numInscription,
                test: this.state.test,
                exam: this.state.exam,
                ds :this.state.ds,
                moyCC :resMoyCC,
                moyTp :this.state.moyTp,
                mark :resMark,
                section :this.state.section,
                cin: this.state.cin,
                email: this.state.email,
                session: this.state.session
            }

            console.log("NOTE ===>" + JSON.stringify(note));

            axios
                .post('http://localhost:8000/mark/addMark', note)
                .then(res => {

                    this.setState({_idNote : res.data.data._id});

                    this.props.history.push('/admin');
                    toast.success(res.data.message)
                    axios.get('http://localhost:8000/user/findIdUserByEmail/' + res.data.data.email)
                        .then(res1 => {



                            this.setState({
                                Owner:res1.data
                            })






                    let notifData = {
                        Note :res.data.data,
                        Owner: this.state.Owner,
                        Message: "You have New Mark!!"

                    }



                    console.log("OWNER ="+this.state.Owner)
                    const res2 = apiNotification.addNotification(notifData);
                    this.state.socket.emit("addNewNotification",this.state.Owner );
                    console.log(res2);

                    //   window.location.reload();


                        })

                });


        }









    }

    //DELETE NOTE
    onDelete =   (e,id) => {


        e.preventDefault();

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to return this mark!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                //DELETE NOTE

                 axios.get('http://localhost:8000/mark/deleteMark/' + id);
                this.setState({ notes: this.state.notes.splice(this.state.identifiant, 1) });

                Swal.fire(
                    'Deleted!',
                    'Mark has been deleted.',
                    'success'
                )

                window.location.reload();
            }
        })


    };

    detail = (id, e) => {
        e.preventDefault()
        //DETAIL

        axios.get('http://localhost:8000/mark/getNoteById/' + id).then(data=>{
            this.setState({ Notes:data.data.data});
            console.log("NOTE=="+this.state.Notes)



        })
    };

    //UPDATE NOTE

    update = (i, e) => {
        this.props.history.push('/markInfo/update/' + i);
    };




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

            </Helmet>

            <Navbar/>
            <Sidebar/>

            <div id="main-content">




                <div className="container-fluid">
                    <div className="block-header">

                        <br/>
                        <div className="row">
                            <div className="col-lg-12 col-md-6 col-sm-12">
                                <div className="d-flex flex-row-reverse">
                                    <div className="page_action">
                                        <a href="javascript:void(0);" className="btn btn-primary" style={{backgroundColor:"#59C4BC"}}
                                           data-toggle="modal" data-target="#add_mark">Add Note</a>
                                    </div>
                                    <div className="p-2 d-flex">

                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-6 col-sm-12">
                                <h2>Mark space</h2>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to={"admin"}><i
                                        className="fa fa-dashboard"></i></Link></li>
                                    <li className="breadcrumb-item active">Mark</li>
                                </ul>
                            </div>






                        </div>
                    </div>

                    <div className="row clearfix">

                        <div className="card">
                            <div className="body">
                                <div className="body">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" onClick={event => this.search(event)} style={{cursor:"pointer"}}>

                                                <i className="icon-magnifier"></i>
                                            </span>
                                        </div>
                                        <input type="text"


                                               name="email"
                                               onChange={this.onChange}
                                               value ={this.state.email}

                                               className="form-control"
                                               placeholder="Search here..."/>
                                    </div>
                                </div>

                            </div>
                            <div className="body">

                                <strong className="mb-0">Search Result For {this.state.email}</strong>

                        {/*<div className="card">*/}
                        {/*    <div className="body">*/}
                        {/*        <ul className="list-unstyled">*/}
                        {/*            <li><p><i className="fa fa-graduation-cap mr-2"></i><strong>Code Elab</strong> 043*/}
                        {/*            </p></li>*/}
                        {/*            <li><p><i className="fa fa-star mr-2"></i><strong>Identifiant</strong> 18043451*/}
                        {/*            </p></li>*/}
                        {/*            <li><p><i className="fa fa-heart mr-2"></i><strong>Modalité</strong> Examen*/}
                        {/*            </p></li>*/}
                        {/*            <li><p><i className="fa fa-tag mr-2"></i><strong>Année</strong> 2018*/}
                        {/*            </p></li>*/}
                        {/*            <li><p><i className="fa fa-tag mr-2"></i><strong>LFDRT1 17</strong> Nom Groupe*/}
                        {/*            </p></li>*/}

                        {/*            <li><p><i className="fa fa-tag mr-2"></i><strong>Nom EE</strong> قانون دولي*/}
                        {/*            </p></li>*/}


                        {/*            <li><p><i className="fa fa-tag mr-2"></i><strong>Session</strong>Session Principale*/}
                        {/*            </p></li>*/}
                        {/*        </ul>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <div className="col-lg-12 col-md-12">


                            <br/>
                            <br/>
                                {this.state.searchnotfound ==='Student with this email not found' ?
                                    <h1>NOT FOUND</h1>
                                    :
                                        <div className="table-responsive">
                                            <div className="col-lg-12 col-md-12">


                                                <table id="table-to-xls"
                                                       className="table table-bordered table-striped table-hover table-custom js-basic-example dataTable">


                                                    <thead>


                                                    <th>N_inscrip</th>
                                                    <th>CIN</th>
                                                    <th>email</th>
                                                    <th>identifiant</th>
                                                    <th>Groupe Name</th>
                                                    <th>Note</th>
                                                    <th>Actions</th>
                                                    </thead>
                                                    <tbody>
                                                    {this.state.notes.map((p, i) => (
                                                        <tr key={i}>
                                                            <td>
                                                                <b>{p.numInscription}</b>
                                                            </td>
                                                            <td>
                                                                <b>{p.cin}</b>
                                                            </td>
                                                            <td>
                                                                <b>{p.email}</b>
                                                            </td>
                                                            <td>
                                                                <b>{p.identifiant}</b>
                                                            </td>
                                                            <td>
                                                                <b>{p.groupeName}</b>
                                                            </td>
                                                            <td>
                                                                <b>{p.mark}</b>
                                                            </td>

                                                            <td>

                                                                <button  style={{background:"none",border:"none"}} className="btn-info"
                                                                         data-toggle="modal" data-target="#update_mark"
                                                                         onClick={this.update.bind(this, p._id)}

                                                                         className="btn-danger">
                                                                <i style={{color:"#0dcaf0"}}
                                                                    className="fa fa-pencil"></i></button>
                                                                &emsp;
                                                                <button  style={{background:"none",border:"none"}}
                                                                         onClick={event => this.onDelete(event,p._id)}>


                                                                <i
                                                                    style={{color:"red"}}

                                                                    className="fa fa-trash">

                                                                </i></button>
                                                                &emsp;
                                                                <button  style={{background:"none",border:"none"}} className="btn-info"
                                                                        onClick={event => this.detail(p._id,event)} data-toggle="modal" data-target="#detail_mark">
                                                                    <i
                                                                        style={{color:"gold"}}

                                                                        className="fa fa-info-circle">

                                                                    </i></button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                    }


                                                    </tbody>
                                                </table>
                                            </div>
                                            <ReactHTMLTableToExcel
                                                style={{backgroundColor: "red"}}
                                                table="table-to-xls"
                                                filename="tablexls"
                                                a
                                                className="btn btn-secondary"
                                                buttonText="Exporter Excel"/>

                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>



                    {/*ADD MARK MODAL*/}
                <div className="modal fade" id="add_mark" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h6 className="title" id="defaultModalLabel">Add Note</h6>
                            </div>
                            <div className="modal-body">
                                <h6>Note Basic Info</h6>
                                <div className="row clearfix">


                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <input type="text" className="form-control"
                                                    name="codeELab"

                                                   onChange={this.handleInputChange}
                                                   value ={this.state.codeELab}

                                                   placeholder="Code Elab "/>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <input type="text" className="form-control"
                                                   name="identifiant"

                                                   onChange={this.handleInputChange}
                                                   value ={this.state.identifiant}

                                                   placeholder="identifiant "/>
                                        </div>
                                    </div>


                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Modality "

                                                   name="modality"

                                                   onChange={this.handleInputChange}
                                                   value ={this.state.modality}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <input type="text"
                                                   name="year"

                                                   onChange={this.handleInputChange}
                                                   value ={this.state.year}

                                                   className="form-control" placeholder="Year "/>
                                        </div>
                                    </div>


                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Groupe Name "
                                                   name="groupeName"

                                                   onChange={this.handleInputChange}
                                                   value ={this.state.groupeName}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="EE Name "

                                                   name="EEName"

                                                   onChange={this.handleInputChange}
                                                   value ={this.state.EEName}
                                            />
                                        </div>

                                        <h6>Calculate Mark:</h6>


                                    </div>
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <select className="form-control"

                                                    name="section"


                                                    onChange={this.handleInputChange}
                                                    value ={this.state.formation}
                                            >
                                                <option value="Business">Business</option>
                                                <option value="Computer science">Computer science</option>
                                                <option value="Mecanic">Mecanic</option>
                                                <option value="Continu">Continu</option>
                                                <option value="Civilize">Civilize</option>
                                            </select>




                                        </div>
                                        <span style={{color:"green"}}>Calculate Control Continu:</span>

                                    </div>


                                    <br/>
                                    <br/>
                                    <br/>

                                    <div className="col-md-3 col-sm-12">
                                        <div className="form-group">
                                            <input type="text"
                                                   name="test"
                                                   onChange={this.handleInputChange}
                                                   value={this.state.test}
                                                   className="form-control" placeholder="Enter Test"/>
                                        </div>
                                    </div>




                                    <div className="col-md-3 col-sm-12">
                                        <div className="form-group">
                                            <input type="text"
                                                   onChange={this.handleInputChange}
                                                   value={this.state.ds}
                                                   name="ds"
                                                   className="form-control" placeholder="Enter DS"/>
                                        </div>
                                    </div>


                                    <div className="col-md-3 col-sm-12">
                                        <div className="form-group">
                                            <input type="text"

                                                   name ="moyTp"
                                                   onChange={this.handleInputChange}
                                                   value={this.state.moyTp}
                                                   className="form-control" placeholder="Enter mark Tp"/>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-12">
                                        <div className="form-group">
                                            <input type="text"
                                                   name ="exam"
                                                   onChange={this.handleInputChange}
                                                   value={this.state.exam}
                                                   className="form-control" placeholder="Enter Exam"/>
                                        </div>
                                    </div>

                                    <div className="col-sm-12">

                                    {
                                        (this.state.moyCC>0  ?                                     <div className="col-sm-12">

                                        <span style={{color:"green"}}>Result Moy CC:</span>
                                            <div className="form-group">
                                                <input type="text" disabled="true"
                                                       name ="moyCC"
                                                       onChange={this.handleInputChange}
                                                       value={this.state.moyCC}
                                                       className="form-control" placeholder="Enter Control continu"/>
                                            </div>
                                        </div> : null)

                                    }
                                    </div>
                                    <div className="col-sm-12">
                                        {
                                            (this.state.mark>0  ?

                                                <div className="col-sm-12">
                                                    <span style={{color:"green"}}>final Mark:</span>

                                                <div className="form-group">
                                            <input  disabled="true" type="text" className="form-control" placeholder="Result Mark : "

                                                   name="mark"
                                                   style={{color:"#00ACEE"}}

                                                   value ={this.state.mark}
                                            />

                                        </div>
                                    </div>:null)
                                        }
                                    </div>


                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Session "

                                                   name="session"

                                                   onChange={this.handleInputChange}
                                                   value ={this.state.session}

                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="CIN "

                                                   name="cin"

                                                   onChange={this.handleInputChange}
                                                   value ={this.state.cin}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Numero inscription "

                                                   name="numInscription"

                                                   onChange={this.handleInputChange}
                                                   value ={this.state.numInscription}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="form-group">



                                            <select className="form-control"

                                                    name="email"

                                                    onChange={this.handleInputChange}
                                                    value ={this.state.email}
                                            >
                                                <option>--Choose Student--</option>

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



                                {/*<h6 className="mt-3">Staff Member Account Info</h6>*/}
                                {/*<div className="row clearfix">*/}
                                {/*    <div className="col-sm-12">*/}
                                {/*        <div className="form-group">*/}
                                {/*            <input type="text" className="form-control" placeholder="Email"/>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*    <div className="col-sm-12">*/}
                                {/*        <div className="form-group">*/}
                                {/*            <input type="text" className="form-control" placeholder="Phone"/>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary"
                                        onClick={e => this.onAddMark(e)}>Save</button>
                                        <button className="btn btn-secondary" data-dismiss="modal">CLOSE</button>
                            </div>
                        </div>
                    </div>
                </div>


                    {/*/!*UPDATE MARK MODAL*!/*/}
                    {/*<div className="modal fade" id="update_mark" tabIndex="-1" role="dialog">*/}
                    {/*    <div className="modal-dialog modal-lg" role="document">*/}
                    {/*        <div className="modal-content">*/}
                    {/*            <div className="modal-header">*/}
                    {/*                <h6 className="modal-title w-100 text-center" style={{fontSize:"30px",color:"#FF6A4A"}} id="defaultModalLabel">Update Mark informations</h6>*/}
                    {/*            </div>*/}
                    {/*            <div className="modal-body">*/}
                    {/*                <div className="row clearfix">*/}


                    {/*                    <input type="text" className="form-control"*/}
                    {/*                           name="id"*/}

                    {/*                           hidden="true"*/}
                    {/*                           onChange={this.handleChange}*/}
                    {/*                           value ={this.state.Notes._id}/>*/}

                    {/*                    <div className="col-sm-12">*/}
                    {/*                        <div className="form-group">*/}
                    {/*                            <label>codeELab</label>*/}
                    {/*                            <input type="text" className="form-control"*/}
                    {/*                                   name="codeELab"*/}

                    {/*                                   onChange={this.handleChange}*/}
                    {/*                                   value ={this.state.Notes.codeELab}*/}

                    {/*                                   placeholder="Code Elab "/>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                    <div className="col-sm-12">*/}
                    {/*                        <div className="form-group">*/}
                    {/*                            <input type="text" className="form-control"*/}
                    {/*                                   name="identifiant"*/}

                    {/*                                   onChange={this.handleChange}*/}
                    {/*                                   value ={this.state.Notes.identifiant}*/}

                    {/*                                   placeholder="identifiant "/>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}


                    {/*                    <div className="col-sm-12">*/}
                    {/*                        <div className="form-group">*/}
                    {/*                            <input type="text" className="form-control" placeholder="Modality "*/}

                    {/*                                   name="modality"*/}

                    {/*                                   onChange={this.handleChange}*/}
                    {/*                                   value ={this.state.Notes.modality}*/}
                    {/*                            />*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                    <div className="col-sm-12">*/}
                    {/*                        <div className="form-group">*/}
                    {/*                            <input type="text"*/}
                    {/*                                   name="year"*/}

                    {/*                                   onChange={this.handleChange}*/}
                    {/*                                   value ={this.state.Notes.year}*/}

                    {/*                                   className="form-control" placeholder="Year "/>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}


                    {/*                    <div className="col-sm-12">*/}
                    {/*                        <div className="form-group">*/}
                    {/*                            <input type="text" className="form-control" placeholder="Groupe Name "*/}
                    {/*                                   name="groupeName"*/}

                    {/*                                   onChange={this.handleChange}*/}
                    {/*                                   value ={this.state.Notes.groupeName}*/}
                    {/*                            />*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}

                    {/*                    <div className="col-sm-12">*/}
                    {/*                        <div className="form-group">*/}
                    {/*                            <input type="text" className="form-control" placeholder="EE Name "*/}

                    {/*                                   name="EEName"*/}

                    {/*                                   onChange={this.handleChange}*/}
                    {/*                                   value ={this.state.Notes.EEName}*/}
                    {/*                            />*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                    <div className="col-sm-12">*/}
                    {/*                        <div className="form-group">*/}
                    {/*                            <input type="number" className="form-control" placeholder="Mark "*/}

                    {/*                                   name="mark"*/}

                    {/*                                   onChange={this.handleChange}*/}
                    {/*                                   value ={this.state.Notes.mark}*/}
                    {/*                            />*/}

                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                    <div className="col-sm-12">*/}
                    {/*                        <div className="form-group">*/}
                    {/*                            <input type="text" className="form-control" placeholder="Session "*/}

                    {/*                                   name="session"*/}

                    {/*                                   onChange={this.handleChange}*/}
                    {/*                                   value ={this.state.Notes.session}*/}

                    {/*                            />*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                    <div className="col-sm-12">*/}
                    {/*                        <div className="form-group">*/}
                    {/*                            <input type="text" className="form-control" placeholder="CIN "*/}

                    {/*                                   name="cin"*/}

                    {/*                                   onChange={this.handleChange}*/}
                    {/*                                   value ={this.state.Notes.cin}*/}
                    {/*                            />*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                    <div className="col-sm-12">*/}
                    {/*                        <div className="form-group">*/}
                    {/*                            <input type="text" className="form-control" placeholder="Numero inscription "*/}

                    {/*                                   name="numInscription"*/}

                    {/*                                   onChange={this.handleChange}*/}
                    {/*                                   value ={this.state.Notes.numInscription}*/}
                    {/*                            />*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                    <div className="col-sm-12">*/}
                    {/*                        <div className="form-group">*/}







                    {/*                        </div>*/}
                    {/*                    </div>*/}

                    {/*                </div>*/}
                    {/*                /!*<h6 className="mt-3">Staff Member Account Info</h6>*!/*/}
                    {/*                /!*<div className="row clearfix">*!/*/}
                    {/*                /!*    <div className="col-sm-12">*!/*/}
                    {/*                /!*        <div className="form-group">*!/*/}
                    {/*                /!*            <input type="text" className="form-control" placeholder="Email"/>*!/*/}
                    {/*                /!*        </div>*!/*/}
                    {/*                /!*    </div>*!/*/}
                    {/*                /!*    <div className="col-sm-12">*!/*/}
                    {/*                /!*        <div className="form-group">*!/*/}
                    {/*                /!*            <input type="text" className="form-control" placeholder="Phone"/>*!/*/}
                    {/*                /!*        </div>*!/*/}
                    {/*                /!*    </div>*!/*/}
                    {/*                /!*</div>*!/*/}
                    {/*            </div>*/}
                    {/*            <div className="modal-footer">*/}
                    {/*                */}
                    {/*                <button type="button" className="btn btn-primary"*/}

                    {/*                        onClick={e => this.update(this.state.Notes._id,e)}>Save</button>*/}
                    {/*                <button className="btn btn-secondary" data-dismiss="modal">CLOSE</button>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}



                    {/*DETAIL MARK MODAL*/}
                    <div className="modal fade" id="detail_mark" tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h6 className="title" id="defaultModalLabel">Detail Mark</h6>
                                </div>
                                <div className="modal-body">
                                    <Grid stackable>
                                        <Grid.Row>
                                            <Grid.Column width={1}></Grid.Column>
                                            <Grid.Column width={14}>

                                                <Divider/>
                                                <br />
                                                <Container>
                                                    <div className="body">

                                                        <Header as="h6"  style={{color:"black",fontsize:"40px"}}>Numero Inscription :{this.state.Notes.numInscription}</Header>
                                                        <Header as="h6"  style={{color:"black",fontsize:"40px"}}>Code Elab :{this.state.Notes.codeELab}</Header>
                                                        <Header as="h6"  style={{color:"black",fontsize:"40px"}}>Cin :{this.state.Notes.cin}</Header>
                                                        <Header as="h6"  style={{color:"black",fontsize:"40px"}}>Session :{this.state.Notes.session}</Header>
                                                        <Header as="h6"  style={{color:"black",fontsize:"40px"}}>EEName :{this.state.Notes.EEName}</Header>
                                                        <Header as="h6"  style={{color:"green",fontsize:"40px"}}>Year :{this.state.Notes.year}</Header>
                                                    </div>

                                                    <Divider></Divider>
                                                    <Label >Year : {this.state.Notes.year}</Label>
                                                </Container>
                                                <br />

                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>



                                    {/*<h6 className="mt-3">Staff Member Account Info</h6>*/}
                                    {/*<div className="row clearfix">*/}
                                    {/*    <div className="col-sm-12">*/}
                                    {/*        <div className="form-group">*/}
                                    {/*            <input type="text" className="form-control" placeholder="Email"/>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*    <div className="col-sm-12">*/}
                                    {/*        <div className="form-group">*/}
                                    {/*            <input type="text" className="form-control" placeholder="Phone"/>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </div>
                                <div className="modal-footer">

                                    <button className="btn btn-secondary" data-dismiss="modal">CLOSE</button>
                                </div>
                            </div>
                        </div>
                    </div>





                </div>

        </div>
        </div>
    )
}}


export default Admin;
