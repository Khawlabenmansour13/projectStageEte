import axios from "axios";
import jwt_decode from "jwt-decode";
import { ToastContainer } from "react-toastr";
import {toast} from 'react-toastify';
import history  from "./../history";
import { isAuth,authenticate } from "../_helper/auth";
import {Redirect} from "react-router-dom";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  CLEAR_ERRORS
} from "./types";
import { Toast } from "reactstrap";
// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
  .post('http://localhost:8000/user/register', userData)
  .then(res =>
    dispatch({
      type: GET_ERRORS,
      payload: {
        message: res.data.message,
        visible: true,
        success:false,

      }
    })
  )
    .catch(err =>
        alert(JSON.stringify(err))
    );
};


// Activate account email

export  const activateAccount = (token)=> {
    axios
        .post('http://localhost:8000/user/activate', {token})
        .then(res =>
            {

                if(res.data.success === false) {
                    toast.warning(res.data.message);

                    return false;

                }

                if(res.data.success === false) {
                    toast.warning(res.data.message);

                    return false;

                }

                else if(res.data.error) {
                    toast.error(res.data.message.message+" Please sign up another time to get another link and activate your account");

                    return false;
                }
                else {
                    return true;



                }

            }

        )
        .catch(err =>
            {
                toast.error(err);
                return false;

            }
        );
};


export const loginUser = userData => dispatch => {
    axios
        .post('http://localhost:8000/user/login', userData)
        .then(res => {

            dispatch({
                type: GET_ERRORS,
                payload: {
                    message: res.data.message,
                    visible: true,
                    success:true

                }
            })


            //  localStorage.setItem('token', res.data.token);

            var decoded = jwt_decode(res.data.token);

            // localStorage.setItem('currentUser',JSON.stringify(res.data.user))
            authenticate(res, () => {

                if(isAuth() && isAuth().role === "ADMIN"||isAuth() && isAuth().role === "TEACHER")
                    history.push("/admin")
                else  if(isAuth() && isAuth().role === "STUDENT")
                    history.push("/dashboardUser")


            });

            window.location.reload();




        })
        .catch(err =>
            console.log(err)
        );
};










// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING    
  };
};
//LogOut User
export const logoutUser =() => dispatch => {
    localStorage.removeItem('token');
    dispatch(setCurrentUser({}))
}


// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};


//Forget Password
export const forgetPassword = (userData, history) => dispatch => {
  axios
  .post('http://localhost:8000/user/forgot_password', userData)
  .then(res =>
    dispatch({
      type: GET_ERRORS,
      payload: {
        message: "Thanks for send  check you emaill to get the link",
        visible: true,
        success:true 
      }
    })
    
  )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {
          message: 'Failed To send try again'+err,
          visible: true
        }
      })    )
      
};



//Forget Password
export const resetPassword = (userData) => {
  axios
  .post('http://localhost:8000/user/reset_password', userData)
  .then(res =>

    
    console.log(res)
  )

  .catch(err => {
    console.log(err)

  })
        
};
