

import  {React , Component}  from 'react';

import history from './../history';
import ToastMessagejQuery from "react-toastr/lib/components/ToastMessage/ToastMessagejQuery";

import { ToastContainer } from "react-toastr";
import "./../../node_modules/toastr/build/toastr.css";
import  cookies from 'js-cookie';
import {isAuth} from "../_helper/auth";
import {Link} from "react-router-dom";
import HeaderUser from "./HeaderUser";
import {Label} from "semantic-ui-react";


export class Header extends Component {



	//Notif when logout 

	//Welcome and notify user when logged in
	notify = () => {
		this.topContainer.info("Logged out confirmed", "Success", {
			showAnimation: "animated slideInRight",
			hideAnimation: "animated slideOutRight"
		});

	};

	//Logout method 
	logout(e) {
		//bch ybadl event ba3d matkml meno w yet3ada l event jdid 7asb ma2nti chnoi t7eb
		e.preventDefault();
		localStorage.removeItem("currentUser");

		history.push('/')
		window.location.reload();


	}

	render() {
		//Set user connected

		var element;
		var elementSignIN;
		var elementSignUp;
		var elementLogout;
		if(cookies.get('token') && localStorage.getItem('currentUser') ){

			if(isAuth().role === "TEACHER") {
				element =  <Link style={{top:"25px"}} to={"/admin"}

								 className="sec-heading">{JSON.parse(localStorage.getItem('currentUser')).firstName}</Link>;
				elementLogout =  <li
					style={{top:"30px"}}

				>
					}









					<button   onClick ={e=>this.logout(e)}

							  style={{

								  border:"none",
								  borderRadius:"10px",
								  padding: "5px 7px",
								  marginTop:"40px	",
								  marginLeft:"10px"

							  }}>
						<i
							style={{marginRight:".5vh"}}
							className="ti-power-off"></i>Logout

					</button>
				</li>

			}

			else if(isAuth().role === "STUDENT") {
				element =  <Link style={{top:"25px"}} to={"/dashboardUser"}

								 className="sec-heading">{JSON.parse(localStorage.getItem('currentUser')).firstName}</Link>;
				elementLogout =  <li
					style={{top:"35px"}}

				>










					<button   onClick ={e=>this.logout(e)}

							  style={{

								  border:"none",
								  borderRadius:"10px",
								  padding: "5px 7px",
								  marginTop:"28px",
								  marginLeft:"10px"

							  }}>
						<i
							style={{marginRight:".5vh"}}
							className="ti-power-off"></i>Logout

					</button>
				</li>

			}
		}
		else {

			elementSignIN= 	<li className="login_click light">
				<a href="#" data-toggle="modal" data-target="#login">Sign in</a>
			</li>
			elementSignUp= <li className="login_click theme-bg">
				<a href="#" data-toggle="modal" data-target="#signup">Sign up</a>
			</li>

		}


		const transition ={transitionProperty: 'none'};
		return(

			<div className="header header-light head-shadow">
				<div className="container">
					<nav id="navigation" className="navigation navigation-landscape">
						<div className="nav-header">
							<a className="nav-brand" href="#">
								<img src="../img/logo/logo.png" className="logo" alt="" />
							</a>
							<div className="nav-toggle"></div>
						</div>

						<div className="nav-menus-wrapper" style={transition}>
							<ul className="nav-menu">

								<li className="active"><a href="#">Home<span className="submenu-indicator"></span></a>

								</li>
								{
									isAuth()  ? <li ><Link className="text-info" to={"/myresult"}>Result</Link></li> : null

								}
								{
									isAuth()  ? <li ><Link className="text-info" to={"/updateProfile"}>My Profile</Link></li> : null

								}







								<li><a href="#">Administration<span className="submenu-indicator"></span></a>
									<ul className="nav-dropdown nav-submenu">
										<li><a href="grid-with-sidebar.html">Informatique Service</a></li>
										<li><a href="grid-with-sidebar-2.html">Finance Service</a></li>
										<li><a href="grid-with-sidebar-3.html">Scolarity Service</a></li>
									</ul>
								</li>

								<li><a href="#">Courses<span className="submenu-indicator"></span></a>
									<ul className="nav-dropdown nav-submenu">
										<li><a href="grid-with-sidebar.html">Informatique </a></li>
										<li><a href="grid-with-sidebar-2.html">Finance </a></li>
										<li><a href="grid-with-sidebar-3.html">Physics</a></li>
										<li><a href="grid-with-sidebar-3.html">Prépa</a></li>
									</ul>
								</li>


								<li><a href="#">News<span className="submenu-indicator"></span></a>
									{/*<ul className="nav-dropdown nav-submenu">*/}
									{/*	<li className=""><a href="#">User Dashboard<span className="submenu-indicator"></span></a>*/}
									{/*		<ul className="nav-dropdown nav-submenu">*/}
									{/*			<li><a href="dashboard.html">User Dashboard</a></li>*/}
									{/*			<li><a href="my-profile.html">My Profile</a></li>*/}
									{/*			<li><a href="all-courses.html">My Courses</a></li>*/}
									{/*			<li><a href="my-order.html">My Order</a></li>*/}
									{/*			<li><a href="saved-courses.html">Saved Courses</a></li>*/}
									{/*			<li><a href="reviews.html">My Reviews</a></li>*/}
									{/*			<li><a href="settings.html">My Settings</a></li>*/}
									{/*		</ul>*/}
									{/*	</li>*/}
									{/*	<li><a href="#">Shop Pages<span className="submenu-indicator"></span></a>*/}
									{/*		<ul className="nav-dropdown nav-submenu">*/}
									{/*			<li><a href="shop-full-width.html">Shop Full Width</a></li>*/}
									{/*			<li><a href="shop-left-sidebar.html">Shop Sidebar Left</a></li>*/}
									{/*			<li><a href="shop-right-sidebar.html">Shop Sidebar Right</a></li>*/}
									{/*			<li><a href="product-detail.html">Shop Detail</a></li>*/}
									{/*			<li><a href="add-to-cart.html">Add To Cart</a></li>*/}
									{/*			<li><a href="product-wishlist.html">Wishlist</a></li>*/}
									{/*			<li><a href="checkout.html">Checkout</a></li>*/}
									{/*			<li><a href="shop-order.html">Order</a></li>*/}
									{/*		</ul>*/}
									{/*	</li>*/}
									{/*	<li><a href="about-us.html">About Us</a></li>*/}
									{/*	<li><a href="blog.html">Blog Style</a></li>*/}
									{/*	<li><a href="blog-detail.html">Blog Detail</a></li>*/}
									{/*	<li><a href="pricing.html">Pricing</a></li>*/}
									{/*	<li><a href="404.html">404 Page</a></li>*/}
									{/*	<li><a href="register.html">Register</a></li>*/}
									{/*	<li><a href="component.html">Elements</a></li>*/}
									{/*	<li><a href="privacy.html">Privacy Policy</a></li>*/}
									{/*	<li><a href="faq.html">FAQs</a></li>*/}
									{/*</ul>*/}
								</li>

								{
									isAuth()  ? <li><Link to={"/sendClaim"}>My Claims</Link></li>  								: null

								}
								{
									isAuth()  ? <HeaderUser/>								: null

								}


								<li>
									{elementLogout}



								</li>
							</ul>
							<ul className="nav-menu nav-menu-social align-to-right">
								{elementSignIN}
								{elementSignUp}

								{
									isAuth()  ? 
									<div className="nav-header">

									<button className="btn btn-primary "
									style={{
										border:"none",
										borderRadius:"10px",
										backgroundColor:"#647b9c",
										padding: "10px 7px",
										marginTop:"20px	",
										marginRight:"100px"
									}}



									>Join Meeting</button>							
										</div>
									: null

								}
							</ul>

						</div>
					</nav>
				</div>

			</div>


		)




	}
}


export default Header
