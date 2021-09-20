
import axios from "axios";import io from "socket.io-client";
import {isAuth} from "../../_helper/auth";
import Footer from "../../components/footer";
import React, {Component} from "react";
import HeaderUser from "../../components/HeaderUser";
import Header from "../../components/header";
import {Link} from "react-router-dom";
import {useParams} from "react-router";
import {matches} from "@testing-library/jest-dom/dist/utils";



export class MyMark extends Component {



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

        Notes:{},
        socket : io("http://localhost:3000/"),
        updated: false,
        resultMark:false,



    }








    componentDidMount() {

   const     match= new URLSearchParams(this.props.location.search).get("id")
        let email =isAuth().email;
        axios.get('http://localhost:8000/mark/getNoteById/'+this.props.match.params.id).then((res) => {

            console.log(res.data.data);

            this.setState({ Notes:res.data.data});
        });
    }







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


    render() {


        return (
            <div className="main-wrapper">

                <Header/>


                <section className="page-title">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12">

                                <div className="breadcrumbs-wrap">
                                    <h1 className="breadcrumb-title">My Mark</h1>
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">Mark</li>
                                        </ol>
                                    </nav>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-light">

                    <div className="container">


                        <div className="row">

                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="dashboard_container">
                                    <div className="dashboard_container_header">
                                        <div className="dashboard_fl_1">
                                            <h4>Recent Mark</h4>
                                        </div>
                                    </div>
                                    <div className="dashboard_container_body">


                                        <div className="row align-items-center">
                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                <div className="dashboard_container">
                                                    <div className="dashboard_container_body p-4">
                                                        <div className="viewer_detail_wraps">

                                                            <div className="caption">
                                                                <div className="viewer_header"><h4>{isAuth().firstName} {isAuth().lastName}</h4><span
                                                                    className="viewer_location"></span>
                                                                    <ul>
                                                                        <li><Link to={"/myResult"}><strong>click here to see Result :</strong></Link></li>


                                                                    </ul>

                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="tab_box_info mt-8">

                                                            <div className="tab-content" id="pills-tabContent">

                                                                <div className="tab-pane  active fade show" id="overview" role="tabpanel"
                                                                     aria-labelledby="overview-tab" aria-expanded="false">
                                                                    <div className="edu_wraper">
                                                                        <h2 className="edu_title">Mark # {this.state.Notes._id}</h2>
                                                                        <div className="container">

                                                                            <button className="btn-primary">Detailed Mark</button>
                                                                            <hr/>
                                                                            <h6>Section :{this.state.Notes.section}</h6>

                                                                            <h6> Test : {this.state.Notes.test}</h6>
                                                                            <h6> Moyenne Tp : {this.state.Notes.moyTp}</h6>
                                                                            <h6> Ds : {this.state.Notes.ds}</h6>
                                                                            <h6> MoyCC : {this.state.Notes.moyCC}</h6>
                                                                            <h6 style={{color:"black"}}> Exam :{this.state.Notes.exam}</h6>
                                                                            <hr/>

                                                                            <h1>Final Mark :{this.state.Notes.mark}
                                                                            {(this.state.Notes.mark > 8   ?
                                                                            <span><br/><span className="payment_status complete">Success</span>
                                                                            <img
                                                                                style={{display:"block",marginLeft:"auto",marginRight:"auto",width:"20%"}}
                                                                                src="https://i0.wp.com/www.wishesquotesimages.com/wp-content/uploads/2020/05/love-emoji-gif-for-whatsapp.gif?resize=620%2C620"/>

                                                                            </span> : <span><span className="payment_status danger">Failure</span>
                                                                                <img
                                                                                style={{display:"block",marginLeft:"auto",marginRight:"auto",width:"20%"}}
                                                                                src="
https://c.tenor.com/tjKiPyLdR-IAAAAi/dm4uz3-foekoe.gif"/>
                                                                                </span>

                                                                                )}
                                                                            </h1>
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                                <div className="tab-pane fade" id="curriculum" role="tabpanel"
                                                                     aria-labelledby="curriculum-tab" aria-expanded="true">
                                                                </div>

                                                                <div className="tab-pane fade" id="instructor" role="tabpanel"
                                                                     aria-labelledby="instructor-tab" aria-expanded="false">
                                                                    <div className="single_instructor">
                                                                        <div className="single_instructor_thumb">
                                                                            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/628/628436.png" className="img-fluid"
                                                                                             alt=""/></a>
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>

                                            </div>




                                        </div>







                                    </div>
                                </div>

                            </div>
                        </div>








                    </div>

                </section>

                <Footer/>

            </div>


        );
    }}


export default MyMark;
