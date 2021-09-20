import React, { useEffect } from "react";
import { Header, Icon, List, Message, Segment } from "semantic-ui-react";


import {
    fetchNotifications,
    selectNotifications,
} from "../../Reducers/notificationSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";
import {apiNotification} from "../../actions/notificationAction";
import {isAuth} from "../../_helper/auth";

function Notification() {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchNotifications(user._id));
    }, [dispatch]);

    const [notifications, errr] = useSelector(selectNotifications);
    const updatenotification = async (id_notif) => {
        try {
            const res = await apiNotification.putNotification(id_notif);
            dispatch(fetchNotifications(user._id));
        } catch (error) {
            alert(error);

        }
    };
    const deleted = async (id) => {
        try {
            const res = await apiNotification.deleteNotification(id);
            dispatch(fetchNotifications(user._id));
        } catch (error) {
            alert(error);
        }
    };
    return (
        <Segment raised color="red">
            <Header/>
            {
            isAuth().role === "STUDENT" ?
            <Link to={"/dashboardUser"}>Return Home</Link>
            :
            <Link to={"/admin"}>Return Home</Link>
            }
            <Header as="h2" icon textAlign="center">
                <Icon name="bell" circular color="yellow" />
                <Header.Content>Notifications</Header.Content>
            </Header>
            <List divided verticalAlign="middle">
                {notifications.map((notif, index) => (
                    <List.Item key={index}>
                        {
                            notif.Note !== null ?
                                <div>
                                    {notif.status === false ? (
                                        <Message style={{backgroundColor: "#ADD8E6"}}>
                                            <List.Content floated="right">
                                                <Icon
                                                    name="trash"
                                                    onClick={() => deleted(notif._id)}
                                                ></Icon>
                                            </List.Content>
                                            <Icon name="pao circle outline" size="large"/>
                                            <Link
                                                to={"/myMark/" + notif.Note}
                                                onClick={() => updatenotification(notif._id)}
                                            >
                                                {" "}
                                                <List.Content>{notif.Message}</List.Content>
                                                <List.Description>
                                                    <p style={{fontSize: "13px"}}>
                                                        {notif.Date}
                                                    </p>{" "}
                                                </List.Description>
                                            </Link>
                                        </Message>
                                    ) : (
                                        <Message>
                                            <List.Content floated="right">
                                                <Icon
                                                    name="trash"
                                                    onClick={() => deleted(notif._id)}
                                                ></Icon>
                                            </List.Content>
                                            <Icon name="question circle outline" size="large"/>
                                            <Link
                                                to={"/FAQ/" + notif.Question}
                                                onClick={() => updatenotification(notif._id)}
                                            >
                                                {" "}
                                                <List.Content>{notif.Message}</List.Content>
                                                <List.Description>
                                                    <p style={{fontSize: "13px"}}>
                                                        {notif.Date}
                                                    </p>{" "}
                                                </List.Description>
                                            </Link>
                                        </Message>
                                    )}
                                </div>

                                :
                                notif.Claim !== null &&
                                <div>
                                    {notif.status === false ? (
                                        <Message style={{backgroundColor: "#ADD8E6"}}>
                                            <List.Content floated="right">
                                                <Icon
                                                    name="trash"
                                                    onClick={() => deleted(notif._id)}
                                                ></Icon>
                                            </List.Content>
                                            <Icon name="pao circle outline" size="large"/>
                                            <Link
                                                to={"/listClaims/"}
                                                onClick={() => updatenotification(notif._id)}
                                            >
                                                {" "}
                                                <List.Content>{notif.Message}</List.Content>
                                                <List.Description>
                                                    <p style={{fontSize: "13px"}}>
                                                        {notif.Date}
                                                    </p>{" "}
                                                </List.Description>
                                            </Link>
                                        </Message>
                                    ) : (
                                        <Message>
                                            <List.Content floated="right">
                                                <Icon
                                                    name="trash"
                                                    onClick={() => deleted(notif._id)}
                                                ></Icon>
                                            </List.Content>
                                            <Icon name="question circle outline" size="large"/>
                                            {/*<Link*/}
                                            {/*    to={"/listClaim/"}*/}
                                            {/*    onClick={() => updatenotification(notif._id)}*/}
                                            {/*>*/}
                                            {/*    {" "}*/}
                                                <List.Content>{notif.Message}</List.Content>
                                                <List.Description>
                                                    <p style={{fontSize: "13px"}}>
                                                        {notif.Date}
                                                    </p>{" "}
                                                </List.Description>
                                            {/*</Link>*/}
                                        </Message>
                                    )}
                                </div>

                        }

                    </List.Item>
                ))}
            </List>
        </Segment>
    );
}

export default Notification;
