import React, {useState} from "react";

import "react-dropzone-uploader/dist/styles.css";
import Header from "../../components/header";
import {isAuth} from "../../_helper/auth";
import Footer from "../../components/footer";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import io from "socket.io-client";
import {sendClaim} from "../../Reducers/claimSlice";
import {apiNotification, apiNotification as notificationsApi} from "../../actions/notificationAction";
import {Dimmer, Loader} from "semantic-ui-react";
import {toast} from "react-toastify";
import axios from "axios";


function MyClaim(props) {

    const socket = io("http://localhost:3000/");
    const dispatch = useDispatch();
    const { id } = useParams();
    const [subject, SetSubject] = useState("");
    const [description, SetDescription] = useState("");
    const [dateCreation, SetDateCreation] = useState(Date.now());
    const [loader, SetLoader] = useState(false);
    const [formClassName, SetFormClassName] = useState("");
    const [formSuccessMessage, SetFormSuccessMessage] = useState("");
    const [formErrorMessage, SetFormErrorMessage] = useState("");
    const [owner,setOwner] = useState("");
    const [idClaim,setIdClaim] = useState("");







    const AddClaim = (e) => {

        e.preventDefault();

        //LOADER
        SetLoader(true);

        const student = isAuth().id;
        SetLoader(true);
       let dataClaim = {
           subject : subject,
           description : description,
           date:dateCreation,
           student:student
       }

       if(description.length ===0 || subject.length ===0 ) {
           SetLoader(false);
           toast.warning("please fill out description and subject  :)");

            return;
       }

         axios.post(
            "http://localhost:8000/claim/sendClaim",dataClaim)
            .then((response) => {


                setOwner(isAuth().id);
                setIdClaim(response.data.data._id);

                SetLoader(false);
                toast.success("claim was sent successfully !! thanks for your trust")





                let notifData = {
                    Owner: isAuth().id,
                    Message: isAuth().firstName+"sent you claim click to see details",
                    Claim:response.data.data._id

                }

                const res2 = apiNotification.addNotification(notifData);
                this.state.socket.emit("addNewNotification", isAuth().id);
                console.log(res2);

                //   window.location.reload();


            })


            .catch((err) => {
                alert(JSON.stringify(err))


            });
    };








    //SET DATA
    const handleChangeSubject = (e) => {
        SetSubject(e.target.value);
    };
    const handleChangeDescription = (e) => {
        SetDescription(e.target.value);
    };


    return (
        <div className="main-wrapper">

            <Header/>


            <section className="page-title">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">

                            <div className="breadcrumbs-wrap">
                                <h1 className="breadcrumb-title">Claim Space</h1>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Claim</li>
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

                        <div className="col-lg-8 col-md-7">
                            <div className="prc_wrap">

                                <div className="prc_wrap_header">
                                    <h4 className="property_block_title">Send Claim</h4>
                                </div>

                                <form onSubmit={AddClaim}>
                                    <div className="prc_wrap-body">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-12">
                                                <div className="form-group">
                                                    <label>Subject</label>
                                                    <input type="text" className="form-control simple"

                                                           name="subject"
                                                           maxLength="40"
                                                        // value={firstName}
                                                        onChange={handleChangeSubject}
                                                           placeholder="Enter Subject claim"/>

                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <div className="form-group">
                                                    <label>Email</label>
                                                    <input type="text" className="form-control simple"
                                                           name="lastname"
                                                           maxLength="40"
                                                           disabled="true"
                                                           value={isAuth().email}
                                                        // value={lastName}
                                                        // onChange={handleLastNameChange}
                                                    />
                                                </div>

                                            </div>
                                        </div>


                                        <div className="form-group">
                                            <label>Description</label>
                                            <textarea
                                                onChange={handleChangeDescription}

                                                name="description"
                                                className="form-control simple" placeholder="Enter claim description here..."></textarea>
                                        </div>


                                        <br/>
                                        <br/> {loader ? (
                                        <Dimmer active inverted>
                                            <Loader inline="centered">Loading ... please wait !</Loader>
                                        </Dimmer>
                                    ) : (
                                        <></>
                                    )}
                                        <div className="form-group">
                                            <button className="btn btn-theme" type="submit" style={{borderRadius:"20px" ,width:"auto"}}>Send</button>
                                        </div>
                                    </div>

                                </form>

                            </div>

                        </div>


                    </div>

                </div>

            </section>

            <Footer/>

        </div>


    );
}

export default MyClaim;
