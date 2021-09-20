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
import {fetchNotifications, selectNotifications} from "../Reducers/notificationSlice";
import {isAuth, signout} from "../_helper/auth";
const ENDPOINT = "http://localhost:3000/";
function HeaderUser() {
    const socket = io(ENDPOINT);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchNotifications(isAuth().id));
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

                    dispatch(fetchNotifications(i));
                }
            });
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    // const updatenotification = async (id_notif) => {
    //     try {
    //         const res = await notificationsApi.putNotification(id_notif);
    //         dispatch(fetchNotifications(user._id));
    //         let nn = notifications.filter((notif) => notif.status !== true);
    //         if (nn.length !== 0) {
    //             setNbrNotif(true);
    //         } else {
    //             setNbrNotif(false);
    //         }
    //     } catch (error) {
    //         alert(error);
    //     }
    // };
    return (

        <li style={{marginTop:"30px"}}>

                            
                            {isAuth().firstName}
                            {"  |  "}
                            {nbrNotif &&    <Label circular color={"red"} key={"red"}>
                                {numberNotif}
                            </Label>}

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
                                            {notif.Note !== null && (
                                                <Link
                                                    to={"/myMark/" + notif.Note}
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


        </li>


    );
}

export default HeaderUser;
