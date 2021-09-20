import React, { useState, useEffect } from "react";
import config from "./config";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import Chatbot from "react-chatbot-kit";


function ChatBotMain() {

    return(
        <div style={{display:"flex",justifyContent:"center"}}>
            <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
            />
        </div>
    )
}
export  default  ChatBotMain;
