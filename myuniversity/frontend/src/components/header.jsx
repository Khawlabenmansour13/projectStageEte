

import  {React , Component}  from 'react';

import history from './../history';
import ToastMessagejQuery from "react-toastr/lib/components/ToastMessage/ToastMessagejQuery";

import { ToastContainer } from "react-toastr";
import "./../../node_modules/toastr/build/toastr.css";

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
		
		history.push('/Home')
		window.location.reload();

		
	}	
  
    render() {  
		//Set user connected

			var element;
			var elementSignIN;
			var elementSignUp;
			var elementLogout;
			if(localStorage.token && localStorage.getItem('currentUser')){
			    element =  <li  style={{top:"25px"}}
				
				className="sec-heading">{JSON.parse(localStorage.getItem('currentUser')).firstName}</li>;
				elementLogout =  <li 
				style={{top:"25px"}}
				
				>
				<button   onClick ={e=>this.logout(e)}
				
				style={{

					border:"none",
					borderRadius:"10px",
					padding: "5px 7px",
					marginTop:"20px",
					marginLeft:"10px"

				}}>
				<i 
				style={{marginRight:".5vh"}}
				className="ti-power-off"></i>Logout
				
					</button>
				</li>
				
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
          
			<div className="header header-light">					
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
									<ul className="nav-dropdown nav-submenu">
										<li><a href="index.html">Home 1</a></li>
										<li><a href="home-2.html">Home 2</a></li>
										<li><a href="home-3.html">Home 3</a></li>
										<li><a href="home-4.html">Home 4</a></li>
										<li><a href="home-5.html">Home 5</a></li>
										<li><a href="home-6.html">Home 6</a></li>
										<li><a href="home-7.html">Home 7</a></li>
										<li><a href="home-8.html">Home 8</a></li>
										<li><a href="home-9.html">Home 9</a></li>
										<li><a href="home-10.html">Home 10</a></li>
									</ul>
								</li>
								
								<li><a href="#">Courses<span className="submenu-indicator"></span></a>
									<ul className="nav-dropdown nav-submenu">
										<li><a href="#">Courses Grid Sidebar<span className="submenu-indicator"></span></a>
											<ul className="nav-dropdown nav-submenu">
												<li><a href="grid-with-sidebar.html">Courses grid 1</a></li>
												<li><a href="grid-with-sidebar-2.html">Courses grid 1</a></li>
												<li><a href="grid-with-sidebar-3.html">Courses grid 1</a></li>
											</ul>
										</li>
										<li><a href="list-with-sidebar.html">List Layout with Sidebar</a></li>
										<li><a href="#">Courses Grid Full Width<span className="submenu-indicator"></span></a>
											<ul className="nav-dropdown nav-submenu">
												<li><a href="full-width-course.html">Courses grid 1</a></li>
												<li><a href="full-width-course-2.html">Courses grid 1</a></li>
												<li><a href="full-width-course-3.html">Courses grid 1</a></li>
												<li><a href="full-width-course-4.html">Courses grid 1</a></li>
											</ul>
										</li>
										<li><a href="#">Courses Detail<span className="submenu-indicator"></span></a>
											<ul className="nav-dropdown nav-submenu">
												<li><a href="detail.html">Course Detail 1</a></li>
												<li><a href="detail-2.html">Course Detail 2</a></li>
												<li><a href="detail-3.html">Course Detail 3</a></li>
												<li><a href="detail-4.html">Course Detail 4</a></li>
												<li><a href="detail-5.html">Course Detail 5</a></li>
											</ul>
										</li>
										<li><a href="find-instructor.html">Find Instructor</a></li>
										<li><a href="instructor-detail.html">Instructor Detail</a></li>
									</ul>
								</li>
								
								<li><a href="#">Pages<span className="submenu-indicator"></span></a>
									<ul className="nav-dropdown nav-submenu">
										<li className=""><a href="#">User Dashboard<span className="submenu-indicator"></span></a>
											<ul className="nav-dropdown nav-submenu">
												<li><a href="dashboard.html">User Dashboard</a></li>
												<li><a href="my-profile.html">My Profile</a></li>
												<li><a href="all-courses.html">My Courses</a></li>
												<li><a href="my-order.html">My Order</a></li>
												<li><a href="saved-courses.html">Saved Courses</a></li>
												<li><a href="reviews.html">My Reviews</a></li>
												<li><a href="settings.html">My Settings</a></li>
											</ul>
										</li>
										<li><a href="#">Shop Pages<span className="submenu-indicator"></span></a>
											<ul className="nav-dropdown nav-submenu">
												<li><a href="shop-full-width.html">Shop Full Width</a></li>
												<li><a href="shop-left-sidebar.html">Shop Sidebar Left</a></li>
												<li><a href="shop-right-sidebar.html">Shop Sidebar Right</a></li>
												<li><a href="product-detail.html">Shop Detail</a></li>
												<li><a href="add-to-cart.html">Add To Cart</a></li>
												<li><a href="product-wishlist.html">Wishlist</a></li>
												<li><a href="checkout.html">Checkout</a></li>
												<li><a href="shop-order.html">Order</a></li>
											</ul>
										</li>
										<li><a href="about-us.html">About Us</a></li>
										<li><a href="blog.html">Blog Style</a></li>
										<li><a href="blog-detail.html">Blog Detail</a></li>
										<li><a href="pricing.html">Pricing</a></li>
										<li><a href="404.html">404 Page</a></li>
										<li><a href="register.html">Register</a></li>
										<li><a href="component.html">Elements</a></li>
										<li><a href="privacy.html">Privacy Policy</a></li>
										<li><a href="faq.html">FAQs</a></li>
									</ul>
								</li>
								
								<li><a href="contact.html">Contact</a></li>
								
							</ul>
							
							<ul className="nav-menu nav-menu-social align-to-right">
								{element}
								{elementSignIN}
								{elementSignUp}
								{elementLogout}
							
							</ul>
						</div>
					</nav>
				</div>
			</div>
		
		
        )



 
}
}


export default Header