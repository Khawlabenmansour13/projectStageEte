import Header from '../Navbar';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../../admin/SideBar';


//LIBRARY DESIGN ADMIN ISSUES
import {Helmet} from "react-helmet";

import axios from "axios";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import {getUserById} from "../../../Reducers/userSlice";
import {useDispatch} from "react-redux";
import ReactTimeAgo from "react-time-ago";
import {Button} from "semantic-ui-react";




export class ListClaims extends Component {


    constructor(props) {
        super(props)
        this.state = {
            claims: [],
            subject: "",
            description: "",
            user: {},
            _iduser:"",
            status:""
            ,visibleBtn:true
        }
    }







    componentDidMount() {




        //GET ALL NOTES
        axios.get('http://localhost:8000/claim/claims').then((res) => {

            console.log(res.data.data);

            this.setState({ claims:res.data.data});
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





    //INPUT HANDLE CHANGE
    handleInputChange = e => {
        e.preventDefault();
        this.setState(
            {
                [e.target.name] : e.target.value
            }
        )
    }


    //PENDING CLAIM
    onAnalyse =(e,id)  => {
        e.preventDefault();
        axios.put('http://localhost:8000/claim/pending/'+id).then((res) => {


            this.setState({status :res.data});
            window.location.reload();

        });    }


    //REJECT CLAIM
    onReject =(e,id)  => {
        e.preventDefault();
        axios.put('http://localhost:8000/claim/reject/'+id).then((res) => {


            this.setState({status :res.data});
            window.location.reload();

        });    }

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

                    <Header/>
                    <Sidebar/>

                    <div id="main-content">
                        <div className="container-fluid">
                            <div className="block-header">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <h2>Notice Board</h2>
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="index.html"><i
                                                className="fa fa-dashboard"></i></a></li>
                                            <li className="breadcrumb-item">Professors</li>
                                            <li className="breadcrumb-item active">Notice Board</li>
                                        </ul>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="d-flex flex-row-reverse">
                                            <div className="page_action">
                                                <a href="javascript:void(0);" className="btn btn-primary"
                                                   data-toggle="modal" data-target="#Add_Notice">Add Notice</a>
                                            </div>
                                            <div className="p-2 d-flex">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row clearfix">

                                {this.state.claims.map((p, i) => (
                                        <div key={i} className="col-lg-4 col-md-12">
                                            <div className="card">
                                                <div className="header">
                                                    <h2><strong>ID:</strong>{p._id} </h2>
                                                    <small>Created by student with id {p._id}
                                                        <br/>
                                                        <strong>{p.date.slice(0,10)}</strong>

                                                    </small>
                                                </div>
                                                <div className="body">
                                                        <h5>Subject : {p.subject}</h5>
                                                    <br/>
                                                    <h6>Description : </h6>
                                                    <p className="m-b-0">
                                                        {p.description}
                                                    </p>
                                                    <br/>
                                                    <div className="col-lg-12 col-md-6 col-sm-12">
                                                        <a className="item">
                                                            {
                                                                (


                                                                    p.status ==="IN PROGRESS" ?
                                                                        <div className="ui orange horizontal label"
                                                                        >{p.status}</div>:
                                                                        p.status ==="PENDING" ?

                                                                            <div className="ui yellow horizontal label"
                                                                        >{p.status}
                                                                        </div>
                                                                            :
                                                                            <div className="ui red horizontal label"
                                                                            >{p.status}
                                                                            </div>





                                                                )
                                                            }
                                                        </a>
                                                    </div>
                                                    <hr/>

                                                    <div className="col-sm-12">


                                                        {

                                                            p.status === "PENDING" ?
                                                                <div>
                                                                    <Button inverted color='blue'
                                                                            onClick={event => this.onAnalyse(event, p._id)}
                                                                    >
                                                                        Contact Employee
                                                                    </Button>
                                                                </div> :



                                                            p.status === "IN PROGRESS" ?

                                                               <div>
                                                                   <Button inverted color='green'
                                                                           onClick={event => this.onAnalyse(event,p._id)}
                                                                   >
                                                                       Analyse
                                                                   </Button>
                                                                   <Button inverted color='red'

                                                                           onClick={event => this.onReject(event,p._id)}

                                                                   >
                                                                       Reject
                                                                   </Button>
                                                               </div>
                                                                : null
                                                        }




                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    ))}
                                }

                            </div>
                        </div>
                    </div>
                </div>
        )
    }


}


export default ListClaims
