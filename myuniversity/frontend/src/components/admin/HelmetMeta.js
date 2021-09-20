import {Helmet} from "react-helmet";
import React, {Component} from "react";





export default class HelmetMeta extends Component {


    render(){

        return (

                <Helmet>
                    <meta charSet="utf-8"/>y
                    <title>MyUniversity</title>


                    <link rel="stylesheet" href="../../Pages/assetsAdminD/vendor/bootstrap/css/bootstrap.min.css"/>
                    <link rel="stylesheet" href="../../Pages/assetsAdminD/vendor/font-awesome/css/font-awesome.min.css"/>
                    <link rel="stylesheet" href="../../Pages/assetsAdminD/vendor/charts-c3/plugin.css"/>
                    <link rel="stylesheet" href="../../Pages/assetsAdminD/vendor/jvectormap/jquery-jvectormap-2.0.3.min.css"/>
                    <link rel="stylesheet" href="../../Pages/assetsAdminD/css/main.css"/>

                    <script src="../../Pages/assetsAdminD/bundles/libscripts.bundle.js"/>
                    <script src="../../Pages/assetsAdminD/bundles/vendorscripts.bundle.js"/>

                    <script src="../../Pages/assetsAdminD/bundles/apexcharts.bundle.js"/>
                    <script src="../../Pages/assetsAdminD/bundles/c3.bundle.js"/>
                    <script src="../../Pages/assetsAdminD/bundles/jvectormap.bundle.js"/>
                    <script src="../../Pages/assetsAdminD/bundles/mainscripts.bundle.js"/>
                    <script src="../../Pages/assetsAdminD/university/index.js"/>

                </Helmet>

















        )
    }



}
