
import axios from 'axios';

const api = axios.create(
    {
        baseURL:`http://localhost:8000/`

    });

    // TOKEN 
    /**Let's begin 
     * So I am going to add function called interceptors which is  a request iterceptor piece of code that gets
     * activated for single HTTP REQUEST received by your application like for example debugging , log messages or token  or config
    */ 
    api.interceptors.request.use(function(config) {

        // Get Token Value
        const token = localStorage.getItem("token");


        if(token != null) {
            const headers = {
                "Authorization": `Bearer${token}`, 
                "Content-Type": "application/json"
            }

            config.headers = headers;
        }

        return config;

    },function(err) {
        console.log("there is an error occured "+err);
        return Promise.reject(err)
    });

    export default axios;