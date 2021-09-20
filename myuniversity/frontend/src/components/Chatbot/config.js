
// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";

import BotAvatar from "./BotAvatar";
import MyResult from "../../Pages/Result/MyResult";
import ShowMeResults from "./ShowMeResults";

const config = {
    initialMessages: [createChatBotMessage(`Hello world`)],
    botName: "MUBOT",
    customComponents: {
        botAvatar: (props) => <BotAvatar {...props}/>
    },
    customStyles: {
        botMessageBox: {
            backgroundColor: "#5ccc9d",
        },
        chatButton: {
            backgroundColor: "#5ccc9d",
        },
    },


    state:{
        marks:[]
    },

    widgets: [
        {
            widgetName: "marks",
            widgetFunc: (props) => <ShowMeResults {...props} />,
            mapStateToProps: ["marks"],
        },
        // {
        //     widgetName: "messageParser",
        //     widgetFunc: (props) => <MessageParser {...props} />,
        //     mapStateToProps: ["gist"],
        // },
        // {
        //     widgetName: "actionProviderDocs",
        //     widgetFunc: (props) => <ActionProviderDocs {...props} />,
        //     mapStateToProps: ["marks"],
        // },
    ],
};




export default config
