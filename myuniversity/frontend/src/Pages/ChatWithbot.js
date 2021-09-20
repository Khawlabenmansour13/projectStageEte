import Header from "../components/header";
import {isAuth} from "../_helper/auth";
import {React} from "react";
import ChatBotMain from "../components/Chatbot/ChatBotMain";
import Footer from "../components/footer";


function ChatWithbot(props)  {


    return (
        <div className="main-wrapper">

            <Header/>




            <div className="image-cover hero_banner" style={{background:"#4e58b2"}}>

                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="banner-search-2 transparent">
                                <h1 className="big-header-capt cl_2 mb-2" style={{color:"white"}} >Welcome {isAuth().firstName}</h1>

                            </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="flixio pt-5">
                                <img className="img-fluid" src=
                                    "../../img/chatwithbot.png"
                                     alt=""/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <section>
                <h5  style={{textAlign:"center",fontSize:"20px",outline:"none",fontWeight:"900",textDecoration:"white"}}>Here You can Chat with our smart Bot "MUBOT" You can ask about your marks</h5>
                <br/>
                <ChatBotMain/>

            </section>

            <Footer/>
        </div>

            )
}

export default ChatWithbot;
