import axios from "axios";
import jwt_decode from "jwt-decode";
import { ToastContainer } from "react-toastr";
import {toast} from 'react-toastify';
import history  from "./../history";
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
        success:true
       
      }
    })
  )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
        visible: true,
        success:false
    })
    );
};



// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post('http://localhost:8000/user/login', userData)
    .then(res => {


      localStorage.setItem('token', res.data.token);

      var decoded = jwt_decode(res.data.token);

    
      
      dispatch(clearErrors());
      dispatch(setCurrentUser(decoded));
       
      localStorage.setItem('currentUser',JSON.stringify(res.data.user))
      history.push('/dashboardUser')
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {
          message: err.response.data,
          visible: true
        }
      })
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
          message: 'Failed To send try again',
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
