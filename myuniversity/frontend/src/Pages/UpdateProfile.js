
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useParams } from "react-router";
import ResetPassword from "./ResetPassword";
import {isAuth, setLocalStorage} from "../_helper/auth";
import {getUserById, UpdateUserState} from "../Reducers/userSlice";
import Header from "../components/header";
import {Link} from "react-router-dom";
import {Button} from "bootstrap";
import {React, useEffect, useState} from "react";

import  {toast} from 'react-toastify';
import Sidebar from "../components/sidebar";
import ChangeProfilePicture from "./ChangeProfilePicture";



function UpdateProfile() {

    const id  = isAuth().id;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone,setPhone] = useState("");
    const [image,setImage] = useState("");
    const [role,setRole] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");

    const [formSuccessMessage, setFormSuccessMessage] = useState("");
    const [formClassName, SetFormClassName] = useState("");
    const Resources = useSelector((state) => state.user.Resources);
    const userById = useSelector((state) => state.user.UserById);
    const dispatch = useDispatch();

//Get CurrentUser
    let user = localStorage.getItem('currentUser');
    var obj = JSON.parse(user);
    useEffect(() => {
        dispatch(getUserById(id)).then((res) => {
            setFirstName(res.payload.data.firstName);
            setLastName(res.payload.data.lastName);
            setEmail(res.payload.data.email);
            setPhone(res.payload.data.phone);
            setCity(res.payload.data.country);
            setRole(res.payload.data.role);
            setImage(res.payload.data.image);
            localStorage.setItem("image",res.payload.data.image);

        });

        console.log(userById);
    }, [dispatch]);

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    }

    const handleCityChange = (e) => {
        setCity(e.target.value);
    }




    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const updateProfile = () => {
        axios
            .put(
                `http://localhost:8000/user/updateProfile/${
                    isAuth().id
                }`,
                {
                    firstName: firstName,
                    lastName: lastName,
                    country:city,
                    phone:phone,
                    image: image,
                }
            )
            .then((res) => {
                console.log(res.data);
                dispatch(UpdateUserState());
                setLocalStorage("user", res.data.result);

                toast.success("Your profile was updated successfully !");
                window.location.reload();

            })
            .catch((err) => {
                console.log(err);
                toast.error("Something went wrong !!");
                SetFormClassName("warning");
            });
    };
    const urlImage = "http://localhost:8000/user/getImage/"

    return (

        <div className="main-wrapper">

            <Header/>


            <section className="page-title">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">

                            <div className="breadcrumbs-wrap">
                                <h1 className="breadcrumb-title">My Profile </h1>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Profile</li>
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


                    <div className="col-lg-12 col-md-9 col-sm-12">

                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 pt-4 pb-4">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Profile</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="dashboard_container">
                                    <div className="dashboard_container_body p-4">
                                        <div className="viewer_detail_wraps">
                                            <div className="viewer_detail_thumb">
                                                <img style={{width:"80%"}} src={`${urlImage}${localStorage.getItem("image")}`} className="img-fluid" alt=""/>
                                            </div>
                                            <div className="caption">
                                                <div className="viewer_header">
                                                    <h4>{firstName} {lastName}</h4>
                                                    <span className="viewer_location">{city}, Tunisie</span>
                                                    <ul>
                                                        <li><strong>Result :</strong> Not Yet</li>
                                                        <li><strong>0</strong> Classes Completed</li>
                                                        <li><strong>0</strong> Présents Completed</li>
                                                        <li>
                                                            <div className="viewer_status">{role}</div>
                                                        </li>
                                                    </ul>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">



                            {/*<div class="col-lg-4 col-md-12 col-sm-12">*/}
                            {/*	<div class="card">*/}
                            {/*		<div class="card-header">*/}
                            {/*			<h6>Notifications</h6>*/}
                            {/*		</div>*/}
                            {/*		<div class="ground-list ground-hover-list">*/}
                            {/*			<div class="ground ground-list-single">*/}
                            {/*				<a href="#">*/}
                            {/*					<div class="btn-circle-40 btn-success"><i class="ti-calendar"></i></div>*/}
                            {/*				</a>*/}

                            {/*				<div class="ground-content">*/}
                            {/*					<h6><a href="#">Maryam Amiri</a></h6>*/}
                            {/*					<small class="text-fade">Check New Admin Dashboard..</small>*/}
                            {/*					<span class="small">Just Now</span>*/}
                            {/*				</div>*/}
                            {/*			</div>*/}
                            {/*			*/}
                            {/*			<div class="ground ground-list-single">*/}
                            {/*				<a href="#">*/}
                            {/*					<div class="btn-circle-40 btn-danger"><i class="ti-calendar"></i></div>*/}
                            {/*				</a>*/}

                            {/*				<div class="ground-content">*/}
                            {/*					<h6><a href="#">Maryam Amiri</a></h6>*/}
                            {/*					<small class="text-fade">You can Customize..</small>*/}
                            {/*					<span class="small">02 Min Ago</span>*/}
                            {/*				</div>*/}
                            {/*			</div>*/}
                            {/*			*/}
                            {/*			<div class="ground ground-list-single">*/}
                            {/*				<a href="#">*/}
                            {/*					<div class="btn-circle-40 btn-info"><i class="ti-calendar"></i></div>*/}
                            {/*				</a>*/}

                            {/*				<div class="ground-content">*/}
                            {/*					<h6><a href="#">Maryam Amiri</a></h6>*/}
                            {/*					<small class="text-fade">Need Responsive Business Tem...</small>*/}
                            {/*					<span class="small">10 Min Ago</span>*/}
                            {/*				</div>*/}
                            {/*			</div>*/}
                            {/*			*/}
                            {/*			<div class="ground ground-list-single">*/}
                            {/*				<a href="#">*/}
                            {/*					<div class="btn-circle-40 btn-warning"><i class="ti-calendar"></i></div>*/}
                            {/*				</a>*/}

                            {/*				<div class="ground-content">*/}
                            {/*					<h6><a href="#">Maryam Amiri</a></h6>*/}
                            {/*					<small class="text-fade">Next Meeting on Tuesday..</small>*/}
                            {/*					<span class="small">15 Min Ago</span>*/}
                            {/*				</div>*/}
                            {/*			</div>*/}
                            {/*			*/}
                            {/*		</div>*/}
                            {/*	</div>		*/}
                            {/*</div>*/}

                        </div>

                        <div className="row">

                            <div className="col-lg-12 col-md-12 col-sm-12">




                                            <div className="row">
                                                <div className="col-lg-12 col-md-12 col-sm-12">
                                                    <div className="dashboard_container">
                                                        <div className="dashboard_container_header">
                                                            <div className="dashboard_fl_1">
                                                                <h1 className="breadcrumb-title"
                                                                style={{textAlign:"center",padding:"20px"}}
                                                                >Update Your Profile </h1>
                                                            </div>
                                                        </div>
                                                        <div className="dashboard_container_body p-4">
                                                            <div className="submit-section">
                                                                <div className="form-row">

                                                                    <div className="form-group col-md-6">
                                                                        <label>First Name</label>
                                                                        <input type="text" className="form-control"

                                                                               name="firstName"
                                                                               maxLength="40"
                                                                               required
                                                                               value={firstName}
                                                                               onChange={handleFirstNameChange}
                                                                               placeholder="Enter you firstname"/>
                                                                    </div>


                                                                    <div className="form-group col-md-6">
                                                                        <label>Last Name</label>
                                                                        <input type="text" className="form-control"
                                                                               name="lastname"
                                                                               maxLength="40"
                                                                               required
                                                                               value={lastName}
                                                                               onChange={handleLastNameChange}
                                                                               placeholder="Enter you lastname"
                                                                              />
                                                                    </div>

                                                                    <div className="form-group col-md-6">
                                                                        <label>Phone</label>
                                                                        <input type="text" className="form-control"
                                                                               value={phone}
                                                                               onChange={handlePhoneChange}
                                                                               placeholder="Enter you phone number"
                                                                           />
                                                                    </div>



                                                                    <div className="form-group col-md-6">
                                                                        <label>City</label>
                                                                        <input type="text" className="form-control"
                                                                               value={city}
                                                                               onChange={handleCityChange}
                                                                               placeholder="City"/>
                                                                    </div>





                                                                </div>
                                                                        Profile Picture
                                                                    <ChangeProfilePicture/>



                                                                {/*<ResetPassword/>*/}

                                                                {/*<Message warning>*/}
                                                                {/*    <Message>*/}
                                                                {/*      <strong>&amp; why is it important to change passwords regularly ? 🤔</strong>*/}
                                                                {/*    </Message>*/}
                                                                {/*    <p>*/}
                                                                {/*        It can be difficult to figure out if someone else is using your*/}
                                                                {/*        account, so by changing your password consistently, you reduce*/}
                                                                {/*        the risk that other people will have frequent access to your*/}
                                                                {/*        accounts.*/}
                                                                {/*    </p>*/}
                                                                {/*</Message>*/}
                                                                {/*<hr/>*/}

                                                                <br />
                                                            </div>




                                                            <div className="row">
                                                                <div className="col text-center">
                                                                <button type="submit"
                                                                            floated="center" onClick={updateProfile}
                                                                            className="btn btn-theme btn-rounded">Save
                                                                    </button>
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
        </div>

    );
}

export default UpdateProfile;
