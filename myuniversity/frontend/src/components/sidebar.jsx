





import  {React , Component}  from 'react';
import { logoutUser, setCurrentUser } from '../actions/authActions';

import Header from './../components/header';

import jwt_decode from 'jwt-decode';
import store from './../store';

import HeaderUser from "../components/HeaderUser";
import {Link} from "react-router-dom";
import {isAuth} from "../_helper/auth";

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

export class Sidebar extends Component {

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

            <div className="col-lg-3 col-md-3 p-0">
                <div className="dashboard-navbar">

                    <div className="d-user-avater">
                        <img src="https://people.googleapis.com/v1/people/me?personFields=photos"

                             className="img-fluid avater" alt=""></img>
                        <h4>
                            {obj.firstName}
                        </h4>
                        <span>{obj.email}</span>
                    </div>

                    <div className="d-navigation">
                        <ul id="side-menu">
                            <li className="active"><Link to={"dashboardUser"}><i
                                className="ti-user"></i>Dashboard</Link></li>

                            <li>

                                <Link to={`updateProfile`}> <i className="fa fa-user"/>

                                    My Profile</Link></li>

                            <li><a href="add-listing.html"><i className="ti-plus"></i>Add Course</a></li>
                            <li><a href="saved-courses.html"><i className="ti-heart"></i>Saved Courses</a></li>
                            <li className="dropdown">
                                <a href="all-courses.html"><i className="ti-layers"></i>All Courses<span
                                    className="ti-angle-left"></span></a>
                                <ul className="nav nav-second-level">
                                    <li><a href="all-courses.html">All</a></li>
                                    <li><a href="javascript:void(0);">Published</a></li>
                                    <li><a href="javascript:void(0);">Pending</a></li>
                                    <li><a href="javascript:void(0);">Expired</a></li>
                                    <li><a href="javascript:void(0);">In Draft</a></li>
                                </ul>
                            </li>
                            <li><a href="my-order.html"><i className="ti-shopping-cart"></i>My Order</a></li>
                            <li><a href="settings.html"><i className="ti-settings"></i>Settings</a></li>
                            <li><a href="reviews.html"><i className="ti-comment-alt"></i>Reviews</a></li>
                            <li><a href="#"><i className="ti-power-off"></i>Log Out</a></li>
                        </ul>
                    </div>

                </div>


            </div>






        );
    }
}
export default Sidebar;
