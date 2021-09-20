
// ActionProvider starter code
class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.createClientMessage = createClientMessage;
    }


    helloHandler =() => {
        const message = this.createChatBotMessage("Hello. I am MUBOT Welcome in your university")
        this.setChatbotMessage(message)
    }

    welcomeHandler =() => {
        const message= this.createChatBotMessage("You are welcome.");
        this.setChatbotMessage(message)
    }

    marksHandler=() => {
        const message  = this.createChatBotMessage("Sure. Here is your marks",{
            widget:"marks"
        })
        this.setChatbotMessage(message)
    }


    setChatbotMessage = (message) => {
        this.setState(state =>({...state,messages: [...state.messages,message]}))

    }
}
export default ActionProvider;
