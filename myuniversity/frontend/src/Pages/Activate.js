import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import jwt from "jsonwebtoken";
import { Link, Redirect } from "react-router-dom";
import {activateAccount} from "../actions/authActions";
import {isAuth} from "../_helper/auth";
import history from "../history";

const Activate = ({ match }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName:"",
        email:"",
        password:"",
        role:"",
        country:"",
        phone:"",
        image:"",
        token: "",
        show: true,
    });


    const [link,setLink] = useState(
     ""
    )
    const[disableButton,setDisableButton] = useState("")
    const[titleActivate,setTitleActivate] = useState("")


    useEffect(() => {
        let token = match.params.token;

        console.log(token)
        let { firstName ,lastName,email,password,phone,image,country,role } = jwt.decode(token);
        //alert("IMAGE="+image);

        if (token) {
            setFormData({ ...formData,token,firstName ,lastName,email,password,phone,image,country,role });
        }

    }, [match.params]);
    const { firstName ,lastName,email,password,phone,image,country,role ,token, show } = formData;
    //alert(JSON.stringify(formData.image))

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            setFormData({
                ...formData,
                show: false,
            });

          activateAccount(formData);


              setLink("Go To Home and Sign In");
                  setDisableButton(true);

                toast.info("Now You can Sign in");








        }catch (err){
            toast.error("An error occured..."+err)

        }
    };


    const myImage = "../img/log.png";


    return (
        <div id="main-wrapper" style={{
            background:"#e4e4e4"
        }}>

            {isAuth() ? <Redirect to="/" /> : null}

            <section className="log-space">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-11 col-md-11">

                            <div className="row no-gutters position-relative log_rads">
                                <div className="col-lg-6 col-md-5 bg-cover" style={{
                                    background:`#1f2431 url(${myImage})no-repeat`
                                }}>
                                    <div className="lui_9okt6">
                                        <div className="_loh_revu97">
                                            <div id="reviews-login">




                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-7 position-static p-4">
                                    <div className="log_wraps">
                                        <a href="index.html" className="log-logo_head"><img src="assets/img/logo.png" className="img-fluid" width="80" alt="" /></a>
                                        <div className="log__heads">
                                            <h4 className="mt-0 logs_title">Activate <span className="theme-cl">Account</span></h4>
                                        </div>
                                        <form  onSubmit={handleSubmit}>





                                            <div className="form-group">
                                                {
                                                    (!disableButton ?<button  className="btn btn-add_cart" type="submit">Activate Your Account</button> : null)
                                                }
                                            </div>

                                            <div className="form-group">
                                                <Link  to={"/"} style={{color:"#7c3aed"}}>{link}
                                                </Link>

                                            </div>


                                        </form>


                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>



        </div>
    )
}
export default Activate;
