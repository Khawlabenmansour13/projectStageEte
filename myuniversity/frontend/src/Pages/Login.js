        import { Component } from "react";
        import  './../components/home.jsx'
        import { ToastContainer, toast } from "react-toastify";

        import history  from './../history';
        import ToastMessagejQuery from "react-toastr/lib/components/ToastMessage/ToastMessagejQuery";
        import PropTypes from "prop-types";
        import axios from "axios";

        import "./../../node_modules/toastr/build/toastr.css";
        import "./../../node_modules/react-animated-css";
        import {connect} from "react-redux";
        import {loginUser} from './../actions/authActions'
        import {Alert,Col,Row} from 'reactstrap';

        import { GoogleLogin } from "react-google-login";
        import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

        import {authenticate, isAuth} from "../_helper/auth";

        class Login extends Component {

            constructor(props) {
                super(props);

                this.state = {
                    email: "",
                    password: "",
                    message: "",
                    visible: false,

                }
            }

            // Cycle de vie  nextProps
            //Navigate
            componentWillReceiveProps(nextProps) {
                if (nextProps.errors) {
                    this.setState({
                        message: nextProps.errors.message,

                        success: nextProps.errors.success,
                        visible: nextProps.errors.visible,
                    });
                }

            }


            onDismiss = () => {
                this.setState({visible: false});
            };

            go = (response) => {
                    authenticate(response, () => {
                       if(isAuth() && isAuth().role === "ADMIN")
                             history.push("/admin");
                       else if ( isAuth() && isAuth().role === "STUDENT")


                    history.push("/dashboardUser");
                       else if ( isAuth() && isAuth().role === "TEACHER")


                           history.push("/admin");
                    });
                };



            /********GOOGLE AUTHENTIFICATION****************/
             sendGoogleToken = (tokenId) => {
                axios
                    .post(`http://localhost:8000/user/loginGoogle`, {
                        idToken: tokenId,
                    })
                    .then((res) => {
                        console.log("GOOGLE SIGNIN SUCCESS ="+JSON.stringify(res.data));
                        this.go(res);
                    })
                    .catch((error) => {
                        console.log("GOOGLE SIGNIN ERROR", JSON.stringify(error.response));
                    });
            };


            /************RESPONSE GOOGLE SUCCESS **************/
            responseGoogle = (response) => {
                console.log("RESPONSE GOOGLE==>"+JSON.stringify(response));
                this.sendGoogleToken(response.tokenId);
            };

            /********FACEBOOK AUTHENTIFICATION****************/

             sendFacebookToken = (userID, accessToken) => {
                axios
                    .post(`http://localhost:8000/user/loginFacebook`, {
                        userID,
                        accessToken,
                    })
                    .then((res) => {
                        console.log(res.data);
                        this.go(res);
                    })
                    .catch((error) => {
                        console.log("GOOGLE SIGNIN ERROR", error.response);
                    });
            };

            /************RESPONSE FACEBOOK SUCCESS **************/
            responseFacebook = (response) => {
                console.log("RESPONSE FACEBOOK==>"+JSON.stringify(response));
                this.sendFacebookToken(response.userID, response.accessToken);

            };









            //loginUser consomation appelle methode
    onLogin = e => {

      e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password

        }

        if(userData.email && userData.password){
            this.props.loginUser(userData)

                if(isAuth() && isAuth().role === "ADMIN") {
                    toast.success("Sign in as Admin");
                    history.push("/admin");

                }
        else if(isAuth() && isAuth().role ==="STUDENT") {
                    toast.success("Sign in as User.");

                    history.push("/dashboardUser");

                }
                else if(isAuth() && isAuth().role ==="TEACHER") {
                    toast.success("Sign in as TEACHER.");

                    history.push("/admin");

                }


        }
        else
            toast.error("Please fill all fields");


          // houni bch nzido condition
       /* this.topContainer.success("Logged In confirmed", "Success", {
          showAnimation: "animated slideInRight",
          hideAnimation: "animated slideOutRight"
        });*/






    }


  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {

    const { message, visible} = this.state;

    const REACT_APP_GOOGLE_CLIENT ="61663739071-ih254e53so2e09qm7p6gi5fndtbtaiqh.apps.googleusercontent.com";
    const REACT_APP_FACEBOOK_APP_CLIENT = "217241700359408"

    return (


         <div className="modal fade" id="login" tabIndex={-1} role="dialog" aria-labelledby="loginmodal" aria-hidden="true">
             <ToastContainer />

             <div className="modal-dialog modal-dialog-centered login-pop-form" role="document">
            <div className="modal-content" id="registermodal">
              <span className="mod-close" data-dismiss="modal" aria-hidden="true"><i className="ti-close" /></span>
              <div className="modal-body">

                <h4 className="modal-header-title">Log In</h4>


                <div className="login-form">
                  <form>
                  <div className="form-group">
                    <input
                      type="text"
                      name="email"
                      className="form-control"

                      placeholder="email"
                      onChange={this.onChange}
                      value ={this.state.email}
                    />
                  </div>


                    <div className="form-group">
                    <input
                    type="password"
                    name="password"
                     className="form-control"
                      placeholder="password"
                      onChange={this.onChange}
                      value ={this.state.password}
                      />
                  </div>


                  </form>


              <div className="form-group">
                    <button onClick={e => this.onLogin(e)} className="btn btn-md full-width pop-login" style={{background:"#da0b4e"}}>Login</button>
                    </div>

                  {visible ? (
                        <Row>
                          <Col>
                            <Alert
                              color="danger"
                              isOpen={visible}
                              toggle={this.onDismiss}
                            >
                              {message}
                            </Alert>
                          </Col>
                        </Row>
                      ) : null}
                </div>
                <div className="social-login mb-3">
                  <ul>
                    <li>
                      <input id="reg" className="checkbox-custom" name="reg" type="checkbox" />
                      <label htmlFor="reg" className="checkbox-custom-label">Save Password</label>
                    </li>
                    <li className="right"><a  href="#" data-toggle="modal" data-dismiss="modal"  data-target="#forget" className="theme-cl">Forget Password?</a></li>
                  </ul>
                </div>
                <div className="modal-divider"><span>Or login via</span></div>
                <div className="social-login ntr mb-3">
                  <ul>

                      <li>
                          <GoogleLogin
                          clientId={`${REACT_APP_GOOGLE_CLIENT}`}
                          onSuccess={this.responseGoogle}
                          onFailure={this.responseGoogle}
                          cookiePolicy={"single_host_origin"}
                          render={(renderProps) => (

                                  <button
                                      style={{background:"red"}}
                                      className="btn connect-google"
                                      onClick={renderProps.onClick}
                                      disabled={renderProps.disabled}
                                  >
                                      <i className="ti-google" />Google
                                  </button>


                          )}
                      ></GoogleLogin>
                      </li>
                      <li>
                          <FacebookLogin
                              appId={`${REACT_APP_FACEBOOK_APP_CLIENT}`}
                              autoLoad={false}
                              callback={this.responseFacebook}

                              render={(renderProps) => (
                                  <button
                                      className="btn connect-facebook"
                                      onClick={renderProps.onClick}
                                      style={{background:"#647b9c"}}

                                  >
                                      <i className="ti-facebook" />Facebook
                                  </button>
                              )}
                          />
                      </li>

                  </ul>
                </div>
                <div className="text-center">
                  <p className="mt-2">Haven't Any Account?
                  <a href="#" data-toggle="modal" data-target="#signup" data-dismiss="modal"
                   className="link">Click here</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>


     )
    }
}



const mapStateToProps = (state)=> ({
    auth: state.auth,
    errors:state.errors
  })

  export default connect(
    mapStateToProps,
    {loginUser}
  )(Login);
