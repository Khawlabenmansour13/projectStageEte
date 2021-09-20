
import axios from "axios";import io from "socket.io-client";
import {isAuth} from "../../_helper/auth";
import Footer from "../../components/footer";
import React, {Component} from "react";
import HeaderUser from "../../components/HeaderUser";
import Header from "../../components/header";
import {Link} from "react-router-dom";



export class MyResult extends Component {


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


        //GET ALL  Sections
        let email =isAuth().email;
        axios.post('http://localhost:8000/mark/noteUser/',{email}).then((res) => {

            console.log(res.data.data);

            this.setState({ notes:res.data.data});
        });
    }
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


    render() {


        return (
            <div className="main-wrapper">

                <Header/>


                <section className="page-title">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12">

                                <div className="breadcrumbs-wrap">
                                    <h1 className="breadcrumb-title">My Result</h1>
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">Result</li>
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
                                                            <h4>Recent Order</h4>
                                                        </div>
                                                    </div>
                                                    <div className="dashboard_container_body">
                                                        <div className="table-responsive">
                                                            <table className="table">
                                                                <thead className="thead-dark">
                                                                <tr>
                                                                    <th scope="col">Modality</th>
                                                                    <th scope="col">Section</th>
                                                                    <th scope="col">Test</th>
                                                                    <th scope="col">Tpt</th>
                                                                    <th scope="col">Ds</th>
                                                                    <th scope="col">CC</th>
                                                                    <th scope="col">Exam</th>
                                                                    <th scope="col">Year</th>
                                                                    <th scope="col">Final mark</th>
                                                                    <th scope="col">result mark</th>
                                                                    <th scope="col">Action</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {this.state.notes.map((p, i) => (

                                                                    <tr  key={i}>
                                                                    <th scope="row">{p.modality}</th>
                                                                    <td>{p.section}</td>
                                                                    <td>{p.test}</td>
                                                                    <td>{p.moyTp}</td>
                                                                    <td>{p.ds}</td>
                                                                    <td>{p.moyCC}</td>
                                                                    <td>{p.exam}</td>
                                                                    <td>{p.year}</td>

                                                                    <td>{p.mark}</td>
                                                                        {(p.mark > 8 ?    <td><span className="payment_status complete">Success</span></td> : <td><span className="payment_status danger">Success</span></td>)}

                                                                        <td>
                                                                            <div className="dash_action_link">
                                                                                <Link to={"SendClaim"} href="#"
                                                                                   className="cancel">Send Claim</Link>
                                                                            </div>
                                                                        </td>
                                                                            </tr>
                                                                            ))}


                                                                </tbody>
                                                            </table>
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


export default MyResult;
