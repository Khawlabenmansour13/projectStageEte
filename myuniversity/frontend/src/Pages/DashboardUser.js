

import  {React , Component}  from 'react';
import { logoutUser, setCurrentUser } from '../actions/authActions';

import jwt_decode from 'jwt-decode';
import store from './../store';


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

export class DashboardUser extends Component {

	//Notification when logged in success

	
      //Welcome and notify user when logged in 
      notify = () => {
        this.topContainer.success("Logged In confirmed", "Success", {
          showAnimation: "animated slideInRight",
          hideAnimation: "animated slideOutRight"
        });
       
      };


	  componentDidMount() {
		 // this.notify();

	  }
    render() {

//Get CurrentUser
let user = localStorage.getItem('currentUser');
var obj = JSON.parse(user);
		

//URl image 
 const urlImage = "http://localhost:8000/user/getImage/"
		return(

<section class="gray pt-0">
				<div class="container-fluid">
										
					<div class="row">





                        
                        
					
						<div class="col-lg-3 col-md-3 p-0">
							<div class="dashboard-navbar">
								
								<div class="d-user-avater">
									<img src={`${urlImage}${obj.image}`}
								
									class="img-fluid avater" alt=""></img>
									<h4>
									{obj.firstName}
								</h4>
									<span>{obj.email}</span>
								</div>
								
								<div class="d-navigation">
									<ul id="side-menu">
										<li class="active"><a href="dashboard.html"><i class="ti-user"></i>Dashboard</a></li>
										<li><a href="my-profile.html"><i class="ti-heart"></i>My Profile</a></li>
										<li><a href="add-listing.html"><i class="ti-plus"></i>Add Course</a></li>
										<li><a href="saved-courses.html"><i class="ti-heart"></i>Saved Courses</a></li>
										<li class="dropdown">
											<a href="all-courses.html"><i class="ti-layers"></i>All Courses<span class="ti-angle-left"></span></a>
											<ul class="nav nav-second-level">
												<li><a href="all-courses.html">All</a></li>
												<li><a href="javascript:void(0);">Published</a></li>
												<li><a href="javascript:void(0);">Pending</a></li>
												<li><a href="javascript:void(0);">Expired</a></li>
												<li><a href="javascript:void(0);">In Draft</a></li>
											</ul>
										</li>
										<li><a href="my-order.html"><i class="ti-shopping-cart"></i>My Order</a></li>
										<li><a href="settings.html"><i class="ti-settings"></i>Settings</a></li>
										<li><a href="reviews.html"><i class="ti-comment-alt"></i>Reviews</a></li>
										<li><a href="#"><i class="ti-power-off"></i>Log Out</a></li>
									</ul>
								</div>
								
							</div>
							
							
						</div>	
						
						<div class="col-lg-9 col-md-9 col-sm-12">
							
							<div class="row">
								<div class="col-lg-12 col-md-12 col-sm-12 pt-4 pb-4">
									<nav aria-label="breadcrumb">
										<ol class="breadcrumb">
											<li class="breadcrumb-item"><a href="#">Home</a></li>
											<li class="breadcrumb-item active" aria-current="page">Dashboard</li>
										</ol>
									</nav>
								</div>
							</div>
						
							<div class="row">
						
								<div class="col-lg-4 col-md-6 col-sm-12">
									<div class="dashboard_stats_wrap widget-1">
										<div class="dashboard_stats_wrap_content"><h4>607</h4> <span>Listings Included</span></div>
										<div class="dashboard_stats_wrap-icon"><i class="ti-location-pin"></i></div>
									</div>	
								</div>
								
								<div class="col-lg-4 col-md-6 col-sm-12">
									<div class="dashboard_stats_wrap widget-2">
										<div class="dashboard_stats_wrap_content"><h4>102</h4> <span>Listings Remaining</span></div>
										<div class="dashboard_stats_wrap-icon"><i class="ti-pie-chart"></i></div>
									</div>	
								</div>
								
								<div class="col-lg-4 col-md-6 col-sm-12">
									<div class="dashboard_stats_wrap widget-4">
										<div class="dashboard_stats_wrap_content"><h4>70</h4> <span>Featured Included</span></div>
										<div class="dashboard_stats_wrap-icon"><i class="ti-user"></i></div>
									</div>	
								</div>

							</div>
					
							<div class="row">
						
								<div class="col-lg-8 col-md-12 col-sm-12">
									<div class="row">
										
										<div class="col-lg-6 col-md-6 col-sm-12">
											<div class="course_overlay_cat">
												<div class="course_overlay_cat_thumb">
													<a href="#" tabindex="0"><img src="assets/img/course-1.jpg" class="img-fluid" alt=""></img></a>
                                                        
												</div>
												<div class="course_overlay_cat_caption">
													<div class="llp-left">
														<h4><a href="#">Web Designing</a></h4>
														<span>17 Classes</span>
													</div>
												</div>
											</div>
										</div>
										
										<div class="col-lg-6 col-md-6 col-sm-12">
											<div class="course_overlay_cat">
												<div class="course_overlay_cat_thumb">
													<a href="#" tabindex="0"><img src="assets/img/course-2.jpg" class="img-fluid" alt=""></img></a>
												</div>
												<div class="course_overlay_cat_caption">
													<div class="llp-left">
														<h4><a href="#">Digital Marketing</a></h4>
														<span>20 Classes</span>
													</div>
												</div>
											</div>
										</div>
										
										<div class="col-lg-6 col-md-6 col-sm-12">
											<div class="course_overlay_cat">
												<div class="course_overlay_cat_thumb">
													<a href="#" tabindex="0"><img src="assets/img/course-3.jpg" class="img-fluid" alt=""></img></a>
												</div>
												<div class="course_overlay_cat_caption">
													<div class="llp-left">
														<h4><a href="#">Account & Chart</a></h4>
														<span>22 Classes</span>
													</div>
												</div>
											</div>
										</div>
										<div class="col-lg-6 col-md-6 col-sm-12">
											<div class="course_overlay_cat">
												<div class="course_overlay_cat_thumb">
													<a href="#" tabindex="0"><img src="assets/img/course-5.jpg" class="img-fluid" alt=""></img></a>
												</div>
												<div class="course_overlay_cat_caption">
													<div class="llp-left">
														<h4><a href="#">Business Development</a></h4>
														<span>10 Classes</span>
													</div>
												</div>
											</div>
										</div>
										
									</div>
								</div>
								
								<div class="col-lg-4 col-md-12 col-sm-12">
									<div class="card">
										<div class="card-header">
											<h6>Notifications</h6>
										</div>
										<div class="ground-list ground-hover-list">
											<div class="ground ground-list-single">
												<a href="#">
													<div class="btn-circle-40 btn-success"><i class="ti-calendar"></i></div>
												</a>

												<div class="ground-content">
													<h6><a href="#">Maryam Amiri</a></h6>
													<small class="text-fade">Check New Admin Dashboard..</small>
													<span class="small">Just Now</span>
												</div>
											</div>
											
											<div class="ground ground-list-single">
												<a href="#">
													<div class="btn-circle-40 btn-danger"><i class="ti-calendar"></i></div>
												</a>

												<div class="ground-content">
													<h6><a href="#">Maryam Amiri</a></h6>
													<small class="text-fade">You can Customize..</small>
													<span class="small">02 Min Ago</span>
												</div>
											</div>
											
											<div class="ground ground-list-single">
												<a href="#">
													<div class="btn-circle-40 btn-info"><i class="ti-calendar"></i></div>
												</a>

												<div class="ground-content">
													<h6><a href="#">Maryam Amiri</a></h6>
													<small class="text-fade">Need Responsive Business Tem...</small>
													<span class="small">10 Min Ago</span>
												</div>
											</div>
											
											<div class="ground ground-list-single">
												<a href="#">
													<div class="btn-circle-40 btn-warning"><i class="ti-calendar"></i></div>
												</a>

												<div class="ground-content">
													<h6><a href="#">Maryam Amiri</a></h6>
													<small class="text-fade">Next Meeting on Tuesday..</small>
													<span class="small">15 Min Ago</span>
												</div>
											</div>
											
										</div>
									</div>		
								</div>

							</div>
						
							<div class="row">
						
								<div class="col-lg-12 col-md-12 col-sm-12">
									<div class="dashboard_container">
										<div class="dashboard_container_header">
											<div class="dashboard_fl_1">
												<h4>Recent Order</h4>
											</div>
										</div>
										<div class="dashboard_container_body">
											<div class="table-responsive">
												<table class="table">
													<thead class="thead-dark">
														<tr>
															<th scope="col">Order</th>
															<th scope="col">Date</th>
															<th scope="col">Status</th>
															<th scope="col">Total</th>
															<th scope="col">Action</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<th scope="row">#0000149</th>
															<td>02 July 2020</td>
															<td><span class="payment_status inprogress">In Progress</span></td>
															<td>$110.00</td>
															<td>
																<div class="dash_action_link">
																	<a href="#" class="view">View</a>
																	<a href="#" class="cancel">Cancel</a>
																</div>	
															</td>
														</tr>
														<tr>
															<th scope="row">#0000150</th>
															<td>04 July 2020</td>
															<td><span class="payment_status complete">Completed</span></td>
															<td>$119.00</td>
															<td>
																<div class="dash_action_link">
																	<a href="#" class="view">View</a>
																	<a href="#" class="cancel">Cancel</a>
																</div>	
															</td>
														</tr>
														<tr>
															<th scope="row">#0000151</th>
															<td>07 July 2020</td>
															<td><span class="payment_status complete">Completed</span></td>
															<td>$149.00</td>
															<td>
																<div class="dash_action_link">
																	<a href="#" class="view">View</a>
																	<a href="#" class="cancel">Cancel</a>
																</div>	
															</td>
														</tr>
														<tr>
															<th scope="row">#0000152</th>
															<td>10 July 2020</td>
															<td><span class="payment_status pending">Pending Payment</span></td>
															<td>$199.00</td>
															<td>
																<div class="dash_action_link">
																	<a href="#" class="view">View</a>
																	<a href="#" class="cancel">Cancel</a>
																</div>	
															</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
										
									</div>
								</div>
								
							</div>
							
						</div>
					
					</div>
					
				</div>
			</section>




        
    
        );
      }
    }
    export default DashboardUser;