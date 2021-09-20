// Navbar.js
import React, {Component} from 'react';
import HelmetMeta from "./HelmetMeta";
import NotificationHeader from "../notifications/NotificationHeader";
import {Link} from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";



export default class Navbar extends Component {

    render(){
        return (

            <nav className="navbar navbar-fixed-top" >

                <div className="container-fluid">
                <div className="navbar-brand">
                    <button type="button" className="btn-toggle-offcanvas"><i className="fa fa-bars"></i></button>
                    <button type="button" className="btn-toggle-fullwidth"><i className="fa fa-bars"></i></button>
                    <Link to={"/admin"}><img src="../../img/logo/logo.png"/> </Link>

                </div>

                    <div className="navbar-right">
                    <NavbarAdmin/>

                    <div id="navbar-menu">

                        <ul className="nav navbar-nav">


                        </ul>
                    </div>
    
                    <div id="navbar-menu">
                        <ul classNameName="nav navbar-nav">
                            
                            <li classNameName="dropdown">
                                <a href="javascript:void(0);" classNameName="dropdown-toggle icon-menu" data-toggle="dropdown">
                                    <i classNameName="fa fa-bell"></i>
                                    <span classNameName="notification-dot"></span>
                                </a>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </nav>


      )
    }
}
