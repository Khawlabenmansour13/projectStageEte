        import { Component } from "react";
        import  './../components/home.jsx'

        import history  from './../history';
        import ToastMessagejQuery from "react-toastr/lib/components/ToastMessage/ToastMessagejQuery";
        import PropTypes from "prop-types";

        import { ToastContainer } from "react-toastr";
        import "./../../node_modules/toastr/build/toastr.css";
        import "./../../node_modules/react-animated-css";
        import {connect} from "react-redux";
        import {loginUser} from './../actions/authActions'
        import {Alert,Col,Row} from 'reactstrap';


        class Login extends Component {
    
            constructor(props) {
                super(props);
        
                this.state = {
                    email: "",
                    password:"",
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
            visible: nextProps.errors.visible,
          });
        }
        
      }


      onDismiss = () => {
        this.setState({ visible: false });
      };


    
      //Welcome and notify user when logged in 
    
    //loginUser consomation appelle methode
    onLogin = e => {

      e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
         
        }
        
         this.props.loginUser(userData)
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


    return (
      
        
         <div className="modal fade" id="login" tabIndex={-1} role="dialog" aria-labelledby="loginmodal" aria-hidden="true">
          
          <div className="modal-dialog modal-dialog-centered login-pop-form" role="document">
            <div className="modal-content" id="registermodal">
              <span className="mod-close" data-dismiss="modal" aria-hidden="true"><i className="ti-close" /></span>
              <div className="modal-body">
              <ToastContainer
          className="toast-top-right"
          ref={(ref) => {
            this.topContainer = ref;
          }}
        />
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
                    <button onClick={e => this.onLogin(e)} className="btn btn-md full-width pop-login">Login</button>
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
                    <li><a href="#" className="btn connect-fb"><i className="ti-facebook" />Facebook</a></li>
                    <li><a href="#" className="btn connect-google"><i className="ti-google" />Google</a></li>
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