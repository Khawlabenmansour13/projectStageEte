import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../../admin/SideBar';


//LIBRARY DESIGN ADMIN ISSUES
import {Helmet} from "react-helmet";

import axios from "axios";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import {toast} from "react-toastify";
import {apiNotification} from "../../../actions/notificationAction";
import Navbar from "../Navbar";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import {Card, Divider, Grid, Header, Icon, Label} from "semantic-ui-react";
import {Container} from "reactstrap";




export class ListEmployee extends Component {


    constructor(props) {
        super(props)
        this.state = {
            employees: [],
            firstName: "",
            lastName: 0,
            email: "",
            annee: "",
            description: "",
            users: [],
            searchnotfound: "",
            Section: {}

        }
    }


    componentDidMount() {


        //GET ALL  Sections
        axios.get('http://localhost:8000/section/getEmployees/').then((res) => {

            console.log(res.data);

            this.setState({employees: res.data});
        });


    }


    onChange = e => {
        if (e.target.value.length === 0) {
            axios.get('http://localhost:8000/section/getAllsections/').then((res) => {

                console.log(res.data.data);

                this.setState({notes: res.data.data});
                window.location.reload()
            });

        }
        this.setState({[e.target.name]: e.target.value});
    };

    // //SEARCH MARK BY USER
    // search = (e) => {
    //
    //     e.preventDefault();
    //
    //     axios.get('http://localhost:8000/section/search?formation=' + this.state.formation).then((res) => {
    //         if (res.data.length === 0) {
    //             this.setState({searchnotfound: "Speciality  not found"})
    //         }
    //         this.setState({notes: res.data});
    //     }).catch(err =>
    //         alert(JSON.stringify(err)));
    // };
    //

    //INPUT HANDLE CHANGE
    handleInputChange = e => {
        e.preventDefault();
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    //INPUT UPDATE CHANGE
    handleChange = e => {
        this.setState({...this.state, Section: {state: e.target.value}});
    };



    //DELETE NOTE
    onDelete = (e, id) => {


        e.preventDefault();

        Swal.fire({
            formation: 'Are you sure?',
            text: "You won't be able to return this Employee!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                //DELETE Section

                axios.delete('http://localhost:8000/user/deleteUser/' + id);
                this.setState({sections: this.state.user.splice(this.state.index, 1)});
                //GET ALL  Sections
                axios.get('http://localhost:8000/section/getEmployees/').then((res) => {

                    console.log(res.data);

                    this.setState({employees: res.data});
                });

                Swal.fire(
                    'Deleted!',
                    'Section has been deleted.',
                    'success'
                )
            }
        })


    };

    detail = (id, e) => {
        e.preventDefault()
        //DETAIL

        axios.get('http://localhost:8000/section/getSectionById/' + id).then(data => {
            this.setState({Section: data.data.data});
            console.log("Section==" + this.state.Section)


        })
    };

    //UPDATE Section

    update = (i, e) => {
          this.props.history.push('/section/update/' + i);
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
                                            <Link to={"/addSection"} className="btn btn-primary"
                                               style={{backgroundColor: "#59C4BC"}}
                                               data-toggle="modal" data-target="#add_mark">Add Section</Link>
                                        </div>
                                        <div className="p-2 d-flex">

                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-6 col-sm-12">
                                    <h2>Section space</h2>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to={"admin"}><i
                                            className="fa fa-dashboard"></i></Link></li>
                                        <li className="breadcrumb-item active">Section</li>
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
                                            <span className="input-group-text" onClick={event => this.search(event)}
                                                  style={{cursor: "pointer"}}>

                                                <i className="icon-magnifier"></i>
                                            </span>
                                            </div>
                                            <input type="text"


                                                   name="formation"
                                                   onChange={this.onChange}
                                                   value={this.state.formation}

                                                   className="form-control"
                                                   placeholder="Search here..."/>
                                        </div>
                                    </div>

                                </div>
                                <div className="body">

                                    <strong className="mb-0">Search Result For {this.state.formation}</strong>

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
                                        {this.state.searchnotfound === 'Speciality  not found' ?
                                            <h1 style={{textAlign:"center"}}>NOT FOUND</h1>
                                            :
                                            <div className="table-responsive">
                                                <div className="col-lg-12 col-md-12">

                                                    {this.state.sections.length === 0 ?
                                                        <h1 style={{textAlign: "center"}}>No Sections </h1> :

                                                        <table id="table-to-xls"
                                                               className="table table-bordered table-striped table-hover table-custom js-basic-example dataTable">


                                                            <thead>


                                                            <th>Formation</th>
                                                            <th>NombreCredit</th>
                                                            <th>Date</th>
                                                            <th>TypeCycle</th>
                                                            <th>Annee</th>
                                                            <th>Actions</th>
                                                            </thead>
                                                            <tbody>

                                                            {this.state.sections.map((p, i) => (
                                                                <tr key={i}>
                                                                    <td>
                                                                        <b>{p.formation}</b>
                                                                    </td>
                                                                    <td>
                                                                        <b>{p.nombreCredit}</b>
                                                                    </td>
                                                                    <td>
                                                                        <b>{p.date}</b>
                                                                    </td>
                                                                    <td>
                                                                        <b>{p.typeCycle}</b>
                                                                    </td>
                                                                    <td>
                                                                        <b>{p.annee}</b>
                                                                    </td>


                                                                    <td>

                                                                        <button style={{
                                                                            background: "none",
                                                                            border: "none"
                                                                        }} className="btn-info"
                                                                                data-toggle="modal"
                                                                                data-target="#update_mark"
                                                                                onClick={this.update.bind(this, p._id)}

                                                                                className="btn-danger">
                                                                            <i style={{color: "#0dcaf0"}}
                                                                               className="fa fa-pencil"></i>
                                                                        </button>
                                                                        &emsp;
                                                                        <button style={{
                                                                            background: "none",
                                                                            border: "none"
                                                                        }}
                                                                                onClick={event => this.onDelete(event, p._id)}>


                                                                            <i
                                                                                style={{color: "red"}}

                                                                                className="fa fa-trash">

                                                                            </i></button>
                                                                        &emsp;
                                                                        <button style={{
                                                                            background: "none",
                                                                            border: "none"
                                                                        }} className="btn-info"
                                                                                onClick={event => this.detail(p._id, event)}
                                                                                data-toggle="modal"
                                                                                data-target="#detail_mark">
                                                                            <i
                                                                                style={{color: "gold"}}

                                                                                className="fa fa-info-circle">

                                                                            </i></button>
                                                                        <button  type="button"

                                                                                 onClick={this.affect.bind(this, p._id)}
                                                                                 >Affect</button>


                                                                    </td>
                                                                </tr>
                                                            ))
                                                            }


                                                            </tbody>
                                                        </table>
                                                    }
                                                </div>


                                            </div>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>


                        {/*/!*UPDATE MARK MODAL*!/*/}
                        {/*<div className="modal fade" id="update_mark" tabIndex="-1" role="dialog">*/}
                        {/*    <div className="modal-dialog modal-lg" role="document">*/}
                        {/*        <div className="modal-content">*/}
                        {/*            <div className="modal-header">*/}
                        {/*                <h6 className="modal-formation w-100 text-center" style={{fontSize:"30px",color:"#FF6A4A"}} id="defaultModalLabel">Update Section informations</h6>*/}
                        {/*            </div>*/}
                        {/*            <div className="modal-body">*/}
                        {/*                <div className="row clearfix">*/}


                        {/*                    <input type="text" className="form-control"*/}
                        {/*                           name="id"*/}

                        {/*                           hidden="true"*/}
                        {/*                           onChange={this.handleChange}*/}
                        {/*                           value ={this.state.Section._id}/>*/}

                        {/*                    <div className="col-sm-12">*/}
                        {/*                        <div className="form-group">*/}
                        {/*                            <label>codeELab</label>*/}
                        {/*                            <input type="text" className="form-control"*/}
                        {/*                                   name="codeELab"*/}

                        {/*                                   onChange={this.handleChange}*/}
                        {/*                                   value ={this.state.Section.codeELab}*/}

                        {/*                                   placeholder="Code Elab "/>*/}
                        {/*                        </div>*/}
                        {/*                    </div>*/}
                        {/*                    <div className="col-sm-12">*/}
                        {/*                        <div className="form-group">*/}
                        {/*                            <input type="text" className="form-control"*/}
                        {/*                                   name="identifiant"*/}

                        {/*                                   onChange={this.handleChange}*/}
                        {/*                                   value ={this.state.Section.identifiant}*/}

                        {/*                                   placeholder="identifiant "/>*/}
                        {/*                        </div>*/}
                        {/*                    </div>*/}


                        {/*                    <div className="col-sm-12">*/}
                        {/*                        <div className="form-group">*/}
                        {/*                            <input type="text" className="form-control" placeholder="Modality "*/}

                        {/*                                   name="modality"*/}

                        {/*                                   onChange={this.handleChange}*/}
                        {/*                                   value ={this.state.Section.modality}*/}
                        {/*                            />*/}
                        {/*                        </div>*/}
                        {/*                    </div>*/}
                        {/*                    <div className="col-sm-12">*/}
                        {/*                        <div className="form-group">*/}
                        {/*                            <input type="text"*/}
                        {/*                                   name="year"*/}

                        {/*                                   onChange={this.handleChange}*/}
                        {/*                                   value ={this.state.Section.year}*/}

                        {/*                                   className="form-control" placeholder="Year "/>*/}
                        {/*                        </div>*/}
                        {/*                    </div>*/}


                        {/*                    <div className="col-sm-12">*/}
                        {/*                        <div className="form-group">*/}
                        {/*                            <input type="text" className="form-control" placeholder="Groupe Name "*/}
                        {/*                                   name="groupeName"*/}

                        {/*                                   onChange={this.handleChange}*/}
                        {/*                                   value ={this.state.Section.groupeName}*/}
                        {/*                            />*/}
                        {/*                        </div>*/}
                        {/*                    </div>*/}

                        {/*                    <div className="col-sm-12">*/}
                        {/*                        <div className="form-group">*/}
                        {/*                            <input type="text" className="form-control" placeholder="EE Name "*/}

                        {/*                                   name="EEName"*/}

                        {/*                                   onChange={this.handleChange}*/}
                        {/*                                   value ={this.state.Section.EEName}*/}
                        {/*                            />*/}
                        {/*                        </div>*/}
                        {/*                    </div>*/}
                        {/*                    <div className="col-sm-12">*/}
                        {/*                        <div className="form-group">*/}
                        {/*                            <input type="number" className="form-control" placeholder="Section "*/}

                        {/*                                   name="mark"*/}

                        {/*                                   onChange={this.handleChange}*/}
                        {/*                                   value ={this.state.Section.mark}*/}
                        {/*                            />*/}

                        {/*                        </div>*/}
                        {/*                    </div>*/}
                        {/*                    <div className="col-sm-12">*/}
                        {/*                        <div className="form-group">*/}
                        {/*                            <input type="text" className="form-control" placeholder="Session "*/}

                        {/*                                   name="session"*/}

                        {/*                                   onChange={this.handleChange}*/}
                        {/*                                   value ={this.state.Section.session}*/}

                        {/*                            />*/}
                        {/*                        </div>*/}
                        {/*                    </div>*/}
                        {/*                    <div className="col-sm-12">*/}
                        {/*                        <div className="form-group">*/}
                        {/*                            <input type="text" className="form-control" placeholder="CIN "*/}

                        {/*                                   name="cin"*/}

                        {/*                                   onChange={this.handleChange}*/}
                        {/*                                   value ={this.state.Section.cin}*/}
                        {/*                            />*/}
                        {/*                        </div>*/}
                        {/*                    </div>*/}
                        {/*                    <div className="col-sm-12">*/}
                        {/*                        <div className="form-group">*/}
                        {/*                            <input type="text" className="form-control" placeholder="Numero inscription "*/}

                        {/*                                   name="numInscription"*/}

                        {/*                                   onChange={this.handleChange}*/}
                        {/*                                   value ={this.state.Section.numInscription}*/}
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

                        {/*                        onClick={e => this.update(this.state.Section._id,e)}>Save</button>*/}
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
                                        <h6 className="formation" id="defaultModalLabel">Detail Section</h6>
                                    </div>
                                    <div className="modal-body">
                                        <Grid stackable>
                                            <Grid.Row>
                                                <Grid.Column width={1}></Grid.Column>
                                                <Grid.Column width={14}>

                                                    <br/>
                                                    <Container>
                                                        <Grid celled>
                                                            <Grid.Row>
                                                                <Grid.Column width={3}>
                                                                    <Icon name='graduation cap' size='huge'
                                                                          color="red"/>
                                                                </Grid.Column>
                                                                <Grid.Column width={13}>
                                                                    <Header as="h6"
                                                                            style={{color: "black", fontsize: "40px"}}>formation
                                                                        :{this.state.Section.formation}</Header>
                                                                    <Header as="h6" style={{
                                                                        color: "black",
                                                                        fontsize: "40px"
                                                                    }}> typeCycle:{this.state.Section.typeCycle}</Header>
                                                                    <Header as="h6"
                                                                            style={{color: "black", fontsize: "40px"}}>nombreCredit
                                                                        :{this.state.Section.nombreCredit}</Header>
                                                                    <p as="h6" style={{
                                                                        color: "black",
                                                                        fontsize: "40px"
                                                                    }}>description :{this.state.Section.description}</p>
                                                                    <Label>Year : {this.state.Section.date}</Label>

                                                                </Grid.Column>
                                                            </Grid.Row>

                                                        </Grid>


                                                    </Container>
                                                    <br/>

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
    }


//
//
//     }
//
//
//     onChange = e => {
//         if(e.target.value.length ===0) {
//             axios.get('http://localhost:8000/mark/marks/').then((res) => {
//
//                 console.log(res.data.data);
//
//                 this.setState({ notes:res.data.data});
//                 window.location.reload()
//             });
//
//         }
//         this.setState({ [e.target.name]: e.target.value });
//     };
//

    //AFFECT USER TO SECTION

    affect = (idSection, e) => {
        this.props.history.push('/affectUserSection/' + idSection);
    };

//
//
//
//
//     //INPUT HANDLE CHANGE
//     handleInputChange = e => {
//         e.preventDefault();
//         this.setState(
//             {
//                 [e.target.name] : e.target.value
//             }
//         )
//     }
//
//
//
//
//     render() {
//
//
//
//         return (
//
//
//
//
//             <div id="admin">
//
//
//
//
//                 <div id="wrapper" className="theme-cyan">
//                     <Helmet>
//                         <meta charSet="utf-8"/>
//                         <formation>Admin</formation>
//
//                         <script src="https://cdnjs.cloudflare.com/ajax/libs/waypoints/4.0.0/jquery.waypoints.min.js"/>
//
//
//                         <link rel="stylesheet" href="assetsAdminD/vendor/bootstrap/css/bootstrap.min.css"/>
//                         <link rel="stylesheet" href="assetsAdminD/vendor/font-awesome/css/font-awesome.min.css"/>
//                         <link rel="stylesheet" href="assetsAdminD/vendor/charts-c3/plugin.css"/>
//
//                         <link rel="stylesheet" href="assetsAdminD/vendor/jvectormap/jquery-jvectormap-2.0.3.min.css"/>
//                         <link rel="stylesheet" href="assetsAdminD/css/main.css"/>
//
//                         <script src="assetsAdminD/bundles/libscripts.bundle.js" type="text/javascript"/>
//                         <script src="assetsAdminD/bundles/vendorscripts.bundle.js" type="text/javascript"/>
//
//                         <script src="assetsAdminD/bundles/apexcharts.bundle.js" type="text/javascript"/>
//                         <script src="assetsAdminD/bundles/c3.bundle.js" type="text/javascript"/>
//                         <script src="assetsAdminD/bundles/jvectormap.bundle.js" type="text/javascript"/>
//                         <script src="assetsAdminD/bundles/mainscripts.bundle.js" type="text/javascript"/>
//                         <script src="assetsAdminD/custom.js" type="text/javascript"/>
//
//                     </Helmet>
//
//                     <Header/>
//                     <Sidebar/>
//                     <div id="main-content">
//
//
//
//
//                         <div className="container-fluid">
//                             <div className="block-header">
//
//
//                                 <div className="row">
//                                     <div className="col-lg-6 col-md-6 col-sm-12">
//                                         <h2>Dashboard</h2>
//                                         <ul className="breadcrumb">
//                                             <li className="breadcrumb-item"><a href="index.html"><i
//                                                 className="fa fa-dashboard"></i></a></li>
//                                             <li className="breadcrumb-item active">Section</li>
//                                         </ul>
//                                     </div>
//
//
//                                     <div className="col-lg-6 col-md-6 col-sm-12">
//                                         <div className="d-flex flex-row-reverse">
//                                             <div className="page_action">
//                                                 <Link to={"addSection"} className="btn btn-primary" role="button">Add
//                                                     new Section</Link>
//                                             </div>
//                                             <div className="p-2 d-flex">
//
//                                             </div>
//                                         </div>
//                                     </div>
//
//
//                                 </div>
//                             </div>
//
//                             <div className="row clearfix">
//
//                                 <div className="card">
//                                     <div className="body">
//                                         <div className="input-group" id="adv-search">
//
//
//                                             <input type="text"
//
//
//                                                    name="email"
//                                                    onChange={this.onChange}
//                                                    value ={this.state.formation}
//
//                                                    className="form-control" placeholder="Search here..."/>
//                                             <div className="input-group-btn">
//                                                 <div className="btn-group" role="group">
//                                                     <button type="button" className="btn btn-primary"
//                                                             onClick={event => this.search(event)}><span
//                                                         className="icon-magnifier" aria-hidden="true"></span></button>
//                                                     <div className="dropdown dropdown-lg">
//                                          <span
//                                              className="caret"></span>
//                                                     </div>
//
//                                                 </div>
//
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="body">
//
//                                         <strong className="mb-0">Search Result For {this.state.formation}</strong>
//                                     </div>
//                                 </div>
//                                 {/*<div className="card">*/}
//                                 {/*    <div className="body">*/}
//                                 {/*        <ul className="list-unstyled">*/}
//                                 {/*            <li><p><i className="fa fa-graduation-cap mr-2"></i><strong>Code Elab</strong> 043*/}
//                                 {/*            </p></li>*/}
//                                 {/*            <li><p><i className="fa fa-star mr-2"></i><strong>Identifiant</strong> 18043451*/}
//                                 {/*            </p></li>*/}
//                                 {/*            <li><p><i className="fa fa-heart mr-2"></i><strong>Modalité</strong> Examen*/}
//                                 {/*            </p></li>*/}
//                                 {/*            <li><p><i className="fa fa-tag mr-2"></i><strong>Année</strong> 2018*/}
//                                 {/*            </p></li>*/}
//                                 {/*            <li><p><i className="fa fa-tag mr-2"></i><strong>LFDRT1 17</strong> Nom Groupe*/}
//                                 {/*            </p></li>*/}
//
//                                 {/*            <li><p><i className="fa fa-tag mr-2"></i><strong>Nom EE</strong> قانون دولي*/}
//                                 {/*            </p></li>*/}
//
//
//                                 {/*            <li><p><i className="fa fa-tag mr-2"></i><strong>Session</strong>Session Principale*/}
//                                 {/*            </p></li>*/}
//                                 {/*        </ul>*/}
//                                 {/*    </div>*/}
//                                 {/*</div>*/}
//
//                                 <div className="col-lg-12 col-md-12">
//
//
//                                     <br/>
//                                     <br/>
//                                     <div className="card">
//                                         {this.state.searchnotfound ==='Section with this Title not found' ?
//                                             <h1>NOT FOUND</h1>
//                                             :
//                                             <div className="body">
//                                                 <div className="table-responsive">
//                                                     <div className="col-lg-12 col-md-12">
//
//
//                                                         <table id="table-to-xls"
//                                                                className="table table-bordered table-striped table-hover table-custom js-basic-example dataTable">
//
//
//                                                             <thead>
//
//
//                                                             <th>Title</th>
//                                                             <th>Formation</th>
//                                                             <th>TypeCycle</th>
//                                                             <th>Annee</th>
//                                                             <th>nombreCredit</th>
//                                                             <th>Actions</th>
//                                                             </thead>
//                                                             <tbody>
//                                                             {this.state.sections.map((p, i) => (
//                                                                 <tr key={i}>
//                                                                     <td>
//                                                                         <b>{p.formation}</b>
//                                                                     </td>
//                                                                     <td>
//                                                                         <b>{p.formation}</b>
//                                                                     </td>
//                                                                     <td>
//                                                                         <b>{p.typeCycle}</b>
//                                                                     </td>
//                                                                     <td>
//                                                                         <b>{p.annee}</b>
//                                                                     </td>
//                                                                     <td>
//                                                                         <b>{p.nombreCredit}</b>
//                                                                     </td>
//
//
//                                                                     <td>
//                                                                         <button type="button"
//                                                                                 className="btn btn-sm btn-outline-primary
//                                                                                 "><i
//                                                                             className="fa fa-pencil"></i></button>
//                                                                         <button type="button"
//                                                                                 className="btn btn-sm btn-outline-danger js-sweetalert"
//                                                                                 formation="Declined" data-type="confirm"><i
//                                                                             className="fa fa-trash-o"></i></button>
//
//                                                                         <button  type="button"
//                                                                                  onClick={this.affect.bind(this, p._id)}
//
//
//
//                                                                                 className="btn btn-sm btn-outline-success"><i
//                                                                             className="fa fa-check"></i></button>
//                                                                     </td>
//                                                                 </tr>
//                                                             ))
//                                                             }
//
//
//                                                             </tbody>
//                                                         </table>
//                                                     </div>
//
//
//                                                 </div>
//                                             </div>
//                                         }
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//
//
//
//
//                     </div>
//
//                 </div>
//             </div>
//         )
//     }}
//
//
}
 export default ListEmployee;
