// MessageParser starter code
class MessageParser {
    constructor(actionProvider, state) {
        this.actionProvider = actionProvider;
        this.state = state;

    }

    parse(message) {
        console.log(message)
        const lowerCase = message.toLowerCase();
        console.log(lowerCase)
        if(lowerCase.includes("hi") || lowerCase.includes("hello")) {
            this.actionProvider.helloHandler()
        }

        if(lowerCase.includes("marks")) {
            this.actionProvider.marksHandler();
        }

        if(lowerCase.includes("thank you") ) {
            this.actionProvider.welcomeHandler();

        }
    }
}


export default MessageParser;

