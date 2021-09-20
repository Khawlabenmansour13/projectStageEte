import {useEffect} from "react";
import {isAuth} from "../../_helper/auth";
import axios from "axios";

import './ShowResults.css';


const ShowMeResults=(props) =>{
    let email =isAuth().email;
    const {setState} = props;

    useEffect(()=> {

            //GET ALL  Sections
            axios.post('http://localhost:8000/mark/noteUser/',{email}).then((res) => {

                console.log(res.data.data);

                const results = res.data.data

                setState( state=>({...state, marks:results}))
            });
        },[]

    )

    const renderMarks = () => {


        return props.marks.map(mark => {
            return(
                <li className="results-widget-list-item" key={mark._id}>
                    {mark.mark >=0 ? <strong><br/> You have at  {mark.section}<br/>
                    test : {mark.test}<br/>
                    Tp : {mark.moyTp}<br/>
                    Ds : {mark.ds}<br/>
                    CC : {mark.moyCC}<br/>
                    <hr/>

                final mark :   <span style={{color:"green"}}>{mark.mark}</span></strong> : <p>you don't have any marks</p>}
                </li>

            )

        })
    }
    console.log(props.marks)

    return <div className="results-widget">
        <ul className="results-widget-list">
            {renderMarks()}
        </ul>

    </div>
}
export default ShowMeResults;
