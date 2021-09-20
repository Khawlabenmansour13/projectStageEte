import { Component } from "react";
import  './../components/home.jsx'
import {connect} from "react-redux";
import {registerUser} from './../actions/authActions'


import history from "./../history";
import PropTypes from "prop-types";


import classnames from "classnames";

import {Alert,Col,Row} from 'reactstrap';


class Register extends Component {
    

  
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            password:'',
            passwordRepeat:'',
            country:'',
            phone:'',
            email:'',
           
            image:'',
            role:'', 
            message: '',
            visible: false,
            success:true           


            
        }
    }

    
      //Navigate 
      componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            message: nextProps.errors.message,
            visible: nextProps.errors.visible,
            success: nextProps.errors.success
          });
        }
      }
    
    



       //imageHandler 

       imageHandler = (img) => {
        this.setState({ image : img.target.files[0] })
  
        const formData = new FormData();
  
        formData.append('image', img.target.files[0]);
      }

        //Refresh component 
         refreshPage() {
          window.location.reload(false);
        
        }
        
        onDismiss = () => {
          this.setState({ visible: false });
        };



    //Authentification utilisateur

    onSubmit = e => {

      
      e.preventDefault();


        //Form Data 
        const formData = new FormData();
        formData.append('image',this.state.image);
        formData.append('firstName',this.state.firstName);
        formData.append('lastName',this.state.lastName);
        formData.append('password',this.state.password);
        formData.append('confirmPassword',this.state.confirmPassword);
        formData.append('email',this.state.email);
        formData.append('role',this.state.role);
        formData.append('country',this.state.country);
        formData.append('phone',this.state.phone);



        this.props.registerUser(formData)

        //history.push("/Home");
       // this.refreshPage() net3acha wnjidoudi bh 

      }
      
  
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };



  //release alert
  onDismiss = () => {
    this.setState({ visible: false });
  };



    render() {
      const { message, visible, success} = this.state;


        return (
            
        <div className="modal fade" style={{overflowY:"auto"}} id="signup" tabIndex={-1} role="dialog" aria-labelledby="sign-up" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered login-pop-form" role="document">
          <div className="modal-content" id="sign-up">
            <span className="mod-close" data-dismiss="modal" aria-hidden="true"><i className="ti-close" /></span>
            <div className="modal-body">
              <h4 className="modal-header-title">Sign Up</h4>
              
              <div className="login-form">

        
                <form>

                  <div className="form-group">
                    <input 
                    type="text"
                     className="form-control"
                      placeholder="FirstName"
                      onChange={this.onChange}
                      name="firstName"
                      value ={this.state.firstName}
                      />
                  </div>

                  <div className="form-group">
                    <input 
                    type="text"
                     className="form-control"
                      placeholder="lastName"
                      name="lastName"
                      onChange={this.onChange}
                      value ={this.state.lastName}
                      />
                  </div>
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
                     className="form-control"
                     name="password"
                      placeholder="password"
                      onChange={this.onChange}
                      value ={this.state.password}
                      />
                  </div>

  

                  <div className="form-group">
                    <input 
                    type="password"
                     className="form-control"
                      placeholder="confirmPassword"
                    name="confirmPassword"
                      onChange={this.onChange}
                      value ={this.state.confirmPassword}
                      />
                  </div>

                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="phone"
                            placeholder="phone"
                            onChange={this.onChange}
                            value ={this.state.phone}
                        />
                    </div>

                  <div className="form-group">
                    <select 
                      className="form-control"
                      name="role"
                      onChange={this.onChange}
                      value ={this.state.role}
                      >
                        <option value="ROLE">--Choose Your Role--</option>
                        <option value="EMPLOYEES">EMPLOYEES</option>
                        <option value="TEACHER">TEACHER</option>
                        <option value="STUDENT">STUDENT</option>



                        </select>
                  </div>

                    <div className="form-group">
                        <select
                            className="form-control"
                            name="country"
                            onChange={this.onChange}
                            value ={this.state.country}
                        >
                            <option value="ROLE">--Choose Your City--</option>
                            <option value="Tunis">Tunis</option>
                            <option value="Sousse">Sousse</option>
                            <option value="Monastir">Monastir</option>
                            <option value="Kef">Kef</option>
                            <option value="Tozeur">Tozeur</option>
                            <option value="Gafsa">Gafsa</option>
                            <option value="Kasserine">Kasserine</option>
                            <option value="Gbeli">Gbeli</option>
                            <option value="Nabeul">Nabeul</option>
                            <option value="Sfax">Sfax</option>
                            <option value="Bizerte">Bizerte</option>
                            <option value="Manouba">Manouba</option>
                            <option value="Ben Arous">Ben Arous</option>
                            <option value="Ariana">Ariana</option>
                            <option value="Siliana">Siliana</option>
                            <option value="Mednine">Mednine</option>
                            <option value="Tatouine">Tatouine</option>
                            <option value="Sidi bouzid">Sidi bouzid</option>
                            <option value="Mahdia">Mahdia</option>
                            <option value="Gabes">Gabes</option>
                            <option value="Kairoune">Kairoune</option>



                        </select>
                    </div>



                    <div class="upload-btn-wrapper">

                        <div className="file-input">
                            <input
                                type="file"
                                name="file-input"
                                id="file-input"
                                className="file-input__input"
                                multiple={false} onChange={this.imageHandler}

                            />
                            <label className="file-input__label" htmlFor="file-input">
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="upload"
                                    className="svg-inline--fa fa-upload fa-w-16"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                                    ></path>
                                </svg>
                                <span>Choose your image</span></label
                            >
                        </div>


                </div>

                  
                
                
                </form>
                {visible ? (
                    <Row>
                      <Col>
                        <Alert color={ success ? "success" : "danger" }  isOpen={visible} toggle={this.onDismiss}>
                          {message}

                        </Alert>
                      </Col>
                    </Row>
                  ) : null}
              
                <div className="form-group">
                      <button onClick={e => this.onSubmit(e)} className="btn btn-md full-width pop-login" style={{background:"#da0b4e"}}>Register</button>
                    </div>
              </div>
              <div className="modal-divider"><span>Or Signup via</span></div>
             
              <div className="text-center">
        
                <p className="mt-3"><i className="ti-user mr-1" />Already Have An Account? 

                
                <a href="#"  data-toggle="modal" data-dismiss="modal"  data-target="#login" className="link">Go For LogIn</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
        )
    }
}




Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};



const mapStateToProps = (state)=> ({
  auth: state.auth,
  errors:state.errors
})

export default  connect(
  mapStateToProps,
  {registerUser}
)(Register);


// Soit (Register) soit export default Register;
