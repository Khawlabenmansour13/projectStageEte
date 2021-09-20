import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
    Card,
    Image,
    Button,
    Icon,
    Message,
    Menu,
    Label,
    Grid,
    List,
    Divider,
    Dropdown,
    Segment,
    Step,
} from "semantic-ui-react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import io from "socket.io-client";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";
import {fetchAdminNotifications, selectNotifications} from "../../Reducers/notificationSlice";
import {isAuth, signout} from "../../_helper/auth";
import cookies from "js-cookie";
import history from "../../history";
const ENDPOINT = "http://localhost:3000/";
function NavbarAdmin() {
    const socket = io(ENDPOINT);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAdminNotifications(isAuth().id));
    }, [dispatch]);
    const state = useSelector((state) => state.user.userUpdated);

    const [notifications, errr] = useSelector(selectNotifications);



    const user = JSON.parse(localStorage.getItem("currentUser"));
    useEffect(() => {}, [state]);

    const [activeItem, SetActiveItem] = useState("Dashboard");
    const handleItemClick = (e, { name }) => {
        if (name === "Logout") {
            signout(() => {
                toast.error("Signout Successfully");
            });
            SetActiveItem(name);
        } else {
            SetActiveItem(name);
        }
    };

    const [nbrNotif, setNbrNotif] = useState(false);

    const[numberNotif,setNumberNotif] = useState(0);
    useEffect(() => {


        let nn = notifications.map((notif) => notif.status !== true);

        if (nn.length !== 0) {
            setNbrNotif(true);
            setNumberNotif(nn.length);

        } else {
            setNbrNotif(false);
        }

        socket.on("newNotification", (content) => {
            content.forEach((i) => {
                if (isAuth().id === i) {
                    setNbrNotif(true);


                    dispatch(fetchAdminNotifications(i));
                }
            });
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    //Logout method
   const logout =(e)=> {
        //bch ybadl event ba3d matkml meno w yet3ada l event jdid 7asb ma2nti chnoi t7eb
        e.preventDefault();
        localStorage.removeItem("currentUser");

        history.push('/')
        window.location.reload();


    }
    return (

<div class="navbar-right">


{nbrNotif &&    <Label circular color={"red"} key={"red"}>
    {numberNotif}
</Label>}

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<Dropdown icon="bell outline" scrolling>
    <Dropdown.Menu>
        <Dropdown.Divider />
        <Dropdown.Header
            icon="bell outline"
            content="      Notification"
            as="h3"
        />
        <Divider />
        {notifications.map((notif, index) => (
            <div>
                {notif.Claim !== null && (
                    <Link to={"/Notifications"}
                        // to={"/claims/" + notif.Claim}
                        // onClick={() => updatenotification(notif._id)}
                    >
                        <List divided>
                            <List.Item>
                                <List.Icon
                                    name="file text"
                                    size="large"
                                    verticalAlign="middle"
                                />

                                <List.Content>



                                    {notif.status === false ? (
                                        <List.Header as="p" style={{ color: "blue" }}>
                                            {notif.Message}
                                        </List.Header>
                                    ) : (
                                        <List.Header as="p">
                                            {notif.Message}
                                        </List.Header>
                                    )}
                                    <List.Description>
                                        <p style={{ fontSize: "13px" }}>
                                            {/*<ReactTimeAgo*/}
                                            {/*    date={notif.Date}*/}
                                            {/*/>{" "}*/}
                                            {notif.Date}
                                        </p>{" "}
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                        </List>
                        <Divider />
                    </Link>
                )}
                <Dropdown.Divider />

            </div>
        ))}
        <Link to={"/Notifications"}>
            <Step.Group size="mini" widths="seven">
                <Step>
                    <Icon name="bell" />
                    <Step.Content>
                        <Step.Title>ALL</Step.Title>
                    </Step.Content>
                </Step>

                <Step active>
                    <Step.Content>
                        <Step.Title>Notifications</Step.Title>
                    </Step.Content>
                </Step>
            </Step.Group>
        </Link>
    </Dropdown.Menu>
</Dropdown>

<span className="date">
    {/*Joined in {moment(isAuth().createdAt).format("yy")}*/}
  </span>

{(cookies.get('token') && localStorage.getItem('currentUser')) ?
    <Button onClick={event => logout(event)}>Logout</Button>
    :null


}

</div>


                        
     

    );
}

export default NavbarAdmin;
