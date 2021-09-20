import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Dimmer,
    Header,
    Image,
    Loader,
    Modal,
} from "semantic-ui-react";
import "react-dropzone-uploader/dist/styles.css";

import Dropzone from "react-dropzone-uploader";
import {Helmet} from "react-helmet";

import 'semantic-ui-css/semantic.min.css';
import axios from "axios";
import {isAuth} from "../_helper/auth";

function ChangeProfilePicture(props) {

    const Resources = useSelector((state) => state.user.Resources);
    const [loader, SetLoader] = useState(false);

    const [open, setOpen] = React.useState(false);
    const [image, setImage] = React.useState("");
    const dispatch = useDispatch();

    const updatePicture = () => {
        var formData = new FormData();
        SetLoader(true);
        formData.append("image", image);
        formData.append("_id", isAuth().id);
        console.log("this is pic");
        console.log("image="+image);



        axios.put("http://localhost:8000/user/uploadProfilePicture",formData).then(response=> {
            console.log(response);
            SetLoader(false);
            setOpen(false);
            setImage(image)
            localStorage.setItem("image",response.data.image);
        }).catch(err=>{
            SetLoader(false);
            });


    };
    const handleChangeStatus = ({ meta, file }, status) => {
        if (status === "done") {
            setImage(file);
        }
        if (status === "removed") {
            console.log(status, meta, file);
        }
    };

    const urlImage = "http://localhost:8000/user/getImage/"

    return (
        <div>
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={
                    <Image
                        fluid
                        centered
                        style={{
                            margin: "10px",
                            height: "250px",
                            width: "250px",
                        }}
                        label={{
                            as: "a",
                            color: "red",
                            content: "Edit",
                            icon: "edit",
                            ribbon: true,
                        }}

                        src={`${urlImage}${localStorage.getItem("image")}`}                    />
                }
            >
                <Modal.Header>Select a Photo</Modal.Header>

                <Modal.Content>
                    <Modal.Description>
                        <Header>Default Profile Image</Header>
                        <p>
                            We've found the following gravatar image associated with your
                            e-mail address.
                        </p>
                        <p>Is it okay to use this photo?</p>
                        <br />
                        <br />

                        <br />
                        <Dropzone
                            styles={{ dropzone: { minHeight: 120, maxHeight: 250 } }}
                            canCancel={true}
                            canRemove={true}
                            canRestart={true}
                            onChangeStatus={handleChangeStatus}
                            maxFiles={1}
                            multiple={false}
                            accept="image/*"
                            inputContent={(files, extra) =>
                                extra.reject ? "Image files only" : "Drag Files"
                            }
                            styles={{
                                dropzoneReject: { borderColor: "red", backgroundColor: "#DAA" },
                                inputLabel: (files, extra) =>
                                    extra.reject ? { color: "red" } : {},
                            }}
                        />
                        <br />
                        {loader ? (
                            <Dimmer active>
                                <Loader>Preparing Files ... please wait !</Loader>
                            </Dimmer>
                        ) : (
                            <></>
                        )}
                    </Modal.Description>
                </Modal.Content>

                <Modal.Actions>
                    <Button color="black" onClick={() => setOpen(false)}>
                        Discard
                    </Button>
                    <Button
                        content="Yep, Save"
                        labelPosition="right"
                        icon="checkmark"
                        onClick={updatePicture}
                        color="red"
                    />
                </Modal.Actions>
            </Modal>
        </div>
    );
}

export default ChangeProfilePicture;
