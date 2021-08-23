import { Component, useState ,useEffect} from "react";
import { ToastContainer, toast } from "react-toastify";

import "./../../node_modules/toastr/build/toastr.css";
import "./../../node_modules/react-animated-css";
import {connect} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import history  from "./../history";

import {resetPassword} from './../actions/authActions';



 const ResetPassword =({match})=> {

    const [data ,setData] = useState({

        newPassword:"",
        confirmPassword:"",
        token:"",
        loading:"Submit"
     });
     const {newPassword,confirmPassword,loading,token} = data;
 

     useEffect(() => {
      //  let token = match.params.token;
        const params = new URLSearchParams(window.location.search) // id=123
        let token = params.get('token') // 123 
    
        if (token!==null) {
            data.token = token;
          setData({ ...data, token });
          console.log("token=====>"+data.token)
        }
      }, []);

      const handleChange = (text) => (e) => {
        setData({ ...data, [text]: e.target.value });
      };

    

const onResetPassword = (e)=> {
    e.preventDefault();
    try{
        if(newPassword === confirmPassword && newPassword && confirmPassword) {

            setData({...data,loading:"loading..."})
            resetPassword({newPassword:newPassword, token:token})
            toast.success("Great!! Password has been changed. ")
            history.push("/Home")
    
        }
        else {
            toast.warning(" Passwords do not matches ");
        }

    }catch(err){
        toast.error("An error occured.")
    }
    
}



const myImage = "../img/log.png";  


return (
    <div id="main-wrapper" style={{
        background:"#e4e4e4"
    }}>


    <section class="log-space">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-11 col-md-11">
                
                    <div class="row no-gutters position-relative log_rads">
                        <div class="col-lg-6 col-md-5 bg-cover" style={{
                           background:`#1f2431 url(${myImage})no-repeat`
                        }}>
                            <div class="lui_9okt6">
                                <div class="_loh_revu97">
                                    <div id="reviews-login">
                                    
                                        
                                                                         
                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-lg-6 col-md-7 position-static p-4">
                            <div class="log_wraps">
                                <a href="index.html" class="log-logo_head"><img src="assets/img/logo.png" class="img-fluid" width="80" alt="" /></a>
                                <div class="log__heads">
                                    <h4 class="mt-0 logs_title">Password <span class="theme-cl">Reset</span></h4>
                                </div>
                                <form  onSubmit={onResetPassword}>
                                    
                                <div class="form-group">
                                    <label>New Password*</label>
                                    <input type="text" class="form-control" placeholder="New password"
                                    onChange={handleChange("newPassword")}
                                    value={newPassword}
                                    />
                                </div>

                                <div class="form-group">
                                    <label>Confirm Password*</label>
                                    <input type="text" class="form-control" placeholder="Confirm password"
                                     onChange={handleChange("confirmPassword")}
                                     value={confirmPassword}/>
                                </div>
                                
                                
                                <div class="form-group">
                                <button  className="btn btn-md full-width pop-login" type="submit">Submit</button>
                                </div>

                                   
                                    
                                    
                                </form> 
                                onResetPassword
                               
                                
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
export default ResetPassword;