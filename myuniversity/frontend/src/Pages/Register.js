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
        formData.append('email',this.state.email);
        formData.append('role',this.state.role);



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
                      onChange={this.onChange}
                      value ={this.state.confirmPassword}
                      />
                  </div>

                  <div className="form-group">
                    <select 
                      className="form-control"
                      name="role"
                      onChange={this.onChange}
                      value ={this.state.role}
                      >
                        <option value="EMPLOYEES">EMPLOYEES</option>
                        <option value="TEACHER">TEACHER</option>
                        <option value="STUDENT">STUDENT</option>



                        </select>
                  </div>

                
                  
              <div class="upload-btn-wrapper">
              <button class="btn">Upload a file</button>
               <input type="file" 
               
               multiple={false} onChange={this.imageHandler} 
               />
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
                      <button onClick={e => this.onSubmit(e)} className="btn btn-md full-width pop-login">Register</button>
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