

import {React, Component, useState, useEffect} from 'react';
import { logoutUser, setCurrentUser } from '../actions/authActions';

import Header from './../components/header';

import jwt_decode from 'jwt-decode';
import store from './../store';

import HeaderUser from "../components/HeaderUser";
import {Link} from "react-router-dom";
import {isAuth} from "../_helper/auth";
import Sidebar from "../components/sidebar";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {GetNoteByUser} from "../actions/noteActions";
import ChangeProfilePicture from "./ChangeProfilePicture";
import io from "socket.io-client";
import Footer from "../components/footer";
import ChatBotMain from "../components/Chatbot/ChatBotMain";
import {Button} from "semantic-ui-react";

if(localStorage.getItem('token')) {

	const decoded = jwt_decode(localStorage.token);

	//Set user  connected (current user session)
	store.dispatch(setCurrentUser(decoded))

	



	//Check fo expired token kif toufe token y5rjo ya3mlo logout wa7do
	const currentTime = Date.now() / 1000;


	if(decoded.exp < currentTime) {
		//Logout
		 const user =store.dispatch(logoutUser());
		//Redirect to login yraj3o
		//taw nzidou ligne hetha ..
	}
}

const DashboardUser = () => {







	const dispatch = useDispatch();
	const [cin, setCin] = useState("");
	const [codeElab, setCodeElab] = useState("");
	const [numInscription, setNumInscription] = useState("");
	const [mark, setMark] = useState("");
	const [groupeName, setGroupeName] = useState("");
	const [identifiant, setIdentifiant] = useState("");
	const [modality, setModality] = useState("");
	const [year, setYear] = useState("");
	const [session, setSession] = useState("");
	const socket = io("http://localhost:3000/");



	//GET NOTE USER AND SOME DETAILS
	useEffect(() => {
		dispatch(GetNoteByUser(isAuth().email)).then((response) => {
			if(response.success === true) {


				socket.on("new-mark", (content) => {

					setCin(response.payload.data.cin);
					setCodeElab(response.payload.data.codeELab);
					setGroupeName(response.payload.data.groupeName);
					setMark(response.payload.data.mark);
					setNumInscription(response.payload.data.numInscription);
					setNumInscription(response.payload.data.numInscription);
					setIdentifiant(response.payload.data.identifiant);
					setModality(response.payload.data.modality);
					setGroupeName(response.payload.data.groupeName);
					setYear(response.payload.data.year);
					setSession(response.payload.data.session);
				});
				return () => {
					socket.disconnect();
				};

			}

		});
	}, [dispatch]);


	//Get CurrentUser
	let user = localStorage.getItem('currentUser');
	var obj = JSON.parse(user);


//DATE SYSTEM

	// function getCurrentDate(separator = '') {
	//
	// 	let newDate = new Date()
	// 	let date = newDate.getDate();
	// 	let month = newDate.getMonth() + 1;
	// 	let year = newDate.getFullYear();
	//
	// 	return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
	// }
	const urlImage = "http://localhost:8000/user/getImage/"
	return (

		<div className="main-wrapper">

			<Header/>




			<div className="image-cover hero_banner" style={{background:"#4e58b2"}}>

				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6 col-md-6 col-sm-6">
							<div className="banner-search-2 transparent">
								<h1 className="big-header-capt cl_2 mb-2" style={{color:"white"}} >Welcome {isAuth().firstName}</h1>

								<br/>
								<Button color="white" float="center" ><Link to={"/chatbot"}>Chat with MUBOT</Link></Button>

							</div>
						</div>

						<div className="col-lg-6 col-md-6 col-sm-12">
							<div className="flixio pt-5">
								<img className="img-fluid" src=
								"../../img/6518.png"
								 alt=""/>
							</div>
						</div>

					</div>
				</div>
			</div>



			<section className="bg-light pt-0">
				<div className="container">
					<div className="row">




						<div className="col-lg-12 col-md-12 col-sm-12 pt-4 pb-4">
							<nav aria-label="breadcrumb">
								<ol className="breadcrumb">
									<li className="breadcrumb-item"><a href="#">Home</a></li>
									<li className="breadcrumb-item active" aria-current="page">Dashboard</li>
								</ol>
							</nav>
						</div>
					</div>
		</div>
</section>



			<Footer/>
</div>





);
}
export default DashboardUser;
