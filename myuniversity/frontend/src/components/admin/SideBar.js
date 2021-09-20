import React, { useState, useEffect } from "react";
import {Link, NavLink} from "react-router-dom";
import { toast } from "react-toastify";
import MetisMenu from '@metismenu/react';
import 'metismenujs/dist/metismenujs.css';
import { isAuth, signout } from "../../_helper/auth";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import NavbarAdmin from "./NavbarAdmin";




function SideBar() {
    const dispatch = useDispatch();


    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
    }, []);

    const [activeItem, SetActiveItem] = useState("Dashboard");
    const handleItemClick = (e, {name}) => {
        if (name === "Logout") {
            signout(() => {
                toast.error("Signout Successfully");
            });
            SetActiveItem(name);
        } else {
            SetActiveItem(name);
        }
    };

    const linkClick =(e)=>   {
        e.preventDefault();
        console.log("link clicked");
    }






    const urlImage = "http://localhost:8000/user/getImage/"

    return (

        <div id="left-sidebar" className="sidebar">
            <button type="button" className="btn-toggle-offcanvas"><i className="fa fa-arrow-left"/></button>
            <div className="sidebar-scroll">
                <div className="user-account">
                    <img src={`${urlImage}${isAuth().image}`}
                         className="rounded-circle user-photo"
                         alt="User Profile Picture"/>
                    <div className="dropdown">
                        <span>Welcome,</span>

                        <p style={{textAlign:"center"}}><strong>{isAuth().email}</strong></p>

                    </div>


                    <hr/>

                    <br/>
                    <div className="tab-content padding-0">
                        <div className="tab-pane active" id="menu">
                            <nav id="left-sidebar-nav" className="sidebar-nav">
                              
                              
                            <ul className="metismenu li_animation_delay">


{isAuth().role === "TEACHER" ?
    <li className="active"><Link to={"/mark"}><i
        className="fa fa-info"></i><span>Mark</span></Link></li>

    :

<>
<li className="active"><Link to={"/admin"}><i
className="fa fa-dashboard"></i><span>dashboard</span></Link></li>

<li>
<Link to={"/marks"}
><i
className="fa fa-inbox"></i><span>Mark</span></Link>

</li>
                              
                              
                                 <li>
                                            <Link to={"/schedule"}
                                                  className="e-schedule"><i
                                                className="fa fa-tag"></i><span>Schedule</span></Link>

                                        </li>

                                        <li><Link to="#" className="has-arrow"><i
                                        className="fa  fa-user-circle"></i><span>Teachers</span> </Link>
                                        <ul>
                                        <li><Link to={"/teachers"}>Teacher List</Link></li>
                                        >
                                        </ul>
                                        </li>

                                        <li><Link to="#" className="has-arrow"><i
                                        className="fa fa-users"></i><span>Students</span> </Link>
                                        <ul>
                                        <li><Link to="students-list.html">Students List</Link></li>
                                        <li><Link to="students-profile.html">Students Claims</Link></li>
                                        </ul>
                                        </li>
                                        <li><Link to="#" className="has-arrow"><i
                                        className="fa fa-user"></i><span>Claims</span> </Link>
                                        <ul>
                                        <li><Link to={"listClaims"}>Claims List</Link></li>
                                        <li><Link to="parents-list.html">Other</Link></li>
                                        </ul>
                                        </li>

                                        <li><Link to="#" className="has-arrow"><i
                                        className="fa  fa-user-circle"></i><span>Section</span> </Link>
                                        <ul>
                                        <li><Link to={"addSection"}>Add Section</Link></li>
                                        <li><Link to={"listSection"}>Section List</Link></li>
                                        <li><Link to="professors-profile.html">Affect Student</Link></li>
                                        >
                                        </ul>
                                        </li>


                                        <li><Link to="departments.html"><i className="fa fa-building"></i>Departments</Link>
                                        </li>
                                        <li><Link to="#" className="has-arrow"><i
                                        className="fa fa-graduation-cap"></i><span>Courses</span> </Link>
                                        <ul>
                                        <li><Link to="course-list.html">All Courses</Link></li>
                                        <li><Link to="course-add.html">Add Courses</Link></li>
                                        <li><Link to="course-info.html">Courses Info</Link></li>
                                        </ul>
                                        </li>
                                        <li><Link to="library.html"><i className="fa fa-book"></i>Library</Link></li>
                                        <li><Link to="classroom.html"><i className="fa fa-sitemap"></i>Classes</Link></li>
                                        <li><Link to="#" className="has-arrow"><i
                                        className="fa fa-cc-visa"></i><span>Payments</span> </Link>
                                        <ul>
                                        <li><Link to="payments.html">Payments</Link></li>
                                        <li><Link to="payments-add.html">Add Payment</Link></li>
                                        <li><Link to="payments-invoice.html">Invoice</Link></li>
                                        </ul>
                                        </li>
                                        <li><Link to="our-centres.html"><i className="fa fa-map"></i>University Centres</Link>
                                        </li>
</>}
                                    </ul>







                            </nav>
                        </div>

                    </div>
                    <div className="tab-pane" id="question">
                    </div>


                </div>
            </div>
        </div>


    );

}



export default SideBar;





