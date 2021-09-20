import logo from './logo.svg';
import './App.css';
import  Header from './components/header.jsx';
import  Home from './components/home.jsx';
import Footer from './components/footer.jsx';
import { Provider } from 'react-redux';
import PrivateRoute  from './Routes/PrivateRoute';
import { BrowserRouter, Router,Switch, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import history  from "./history";

import store from './store'
import DashboardUser from './Pages/DashboardUser';
import ResetPassword from './Pages/ResetPassword';
import AdminRoute from './Routes/AdminRoute';
import Notification from './components/notifications/Notification'

import Admin from './Pages/Admin';
import Activate from "./Pages/Activate";
import {React} from "react";

import  UpdateProfile  from './Pages/UpdateProfile';
import Schedule from "./components/admin/Schedule";
import AddSection from "./components/admin/Section/AddSection";
import ListSection from "./components/admin/Section/ListSection";
import AffecterUserSection, {AffectUserSection} from "./components/admin/Section/AffectUserSection";
import SendClaim from "./Pages/Claim/MyClaim";
import {FormMarkInfoEdit} from "./components/admin/Mark/FormMarkInfoEdit";
import ListTeacher from "./components/admin/Teacher/ListTeacher";
import MyResult from "./Pages/Result/MyResult";
import ListClaims from "./components/admin/Claims/ListClaims";
import MyMark from "./Pages/Result/myMark";
import ChatWithbot from "./Pages/ChatWithbot";
import FormSectionEdit from "./components/admin/Section/FormSectionEdit";

function App() {
    return (


        <div>



            <Provider store={store}>

                <BrowserRouter >
                    <Switch>

                        <Route  path="/" exact render={(props) => <Home {...props} />} />


                        <Route path="/resetPassword" exact render={(props) => <ResetPassword {...props} />} />

                        <Route
                            path="/activate/:token"
                            exact
                            component={Activate} />}
                        />



                        <PrivateRoute
                                       path="/dashboardUser"
                            exact component ={DashboardUser}/>

                        {/*<PrivateRoute*/}
                        {/*    path="/meeting"*/}
                        {/*    exact component ={Meeting}/>*/}

                        <AdminRoute  path="/admin" exact component={Admin}/>

                        <Route exact path="/updateProfile" component={UpdateProfile} />

                        <Route exact path="/addSection" component={AddSection} />
                        <Route exact path="/listSection" component={ListSection} />
                        <Route exact path="/listClaims" component={ListClaims} />
                        <Route exact path="/teachers" component={ListTeacher} />


                        <Route path='/schedule' render={props => <Schedule {...props}/>} exact/>

                        <Route
                            path="/affectUserSection/:idSection"
                            render={(props) => <AffectUserSection {...props}  />}
                        />

                        <Route
                            path="/markInfo/update/:id"
                            render={(props) => <FormMarkInfoEdit {...props}  />}
                        />

                        <Route
                            path="/section/update/:id"
                            render={(props) => <FormSectionEdit {...props}  />}
                        />
                        <Route
                            path="/sendClaim"
                            render={(props => <SendClaim {...props}/>)}
                            />


                        <Route
                            path="/myresult"
                            render={(props) => <MyResult {...props}  />}
                        />
                        <Route
                            path="/myMark/:id"
                            render={(props) => <MyMark {...props}  />}
                        />
                        <Route
                            path="/Notifications"
                            render={(props) => <Notification {...props}  />}
                        />

                        <Route
                            path="/chatbot"
                            render={(props) => <ChatWithbot {...props}  />}
                        />

                    </Switch>



                </BrowserRouter>
            </Provider>




                <ToastContainer />



        </div>

);
}

export default App;
