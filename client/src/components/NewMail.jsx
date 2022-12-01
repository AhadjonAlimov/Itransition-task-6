import React, { useState } from 'react';
import {
    MDBAccordion,
    MDBAccordionItem,
    MDBInput,
    MDBTextArea,
} from "mdb-react-ui-kit";
import axios from 'axios';
var dropdownData = require("../plugins/dropdownData.json");


export default function NewMail({ currentUser, getContacts }) {
    const [username, setUsername] = useState("");
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const sendNewMail = async () => {
        if (username.length > 0 && title.length > 0 && text.length > 0) {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/addmails`, {
                from: currentUser?.username,
                to: username,
                sender: currentUser?._id,
                title: title,
                mail: text,
            }).then((data) => {
                if (data.data.msg === "ok") {
                    getContacts();
                    alert("Mail successfully sent")
                }
            })
            setUsername("");
            setTitle("");
            setText("");
        }
    }

    document.getElementsByClassName("collapse")[1]?.removeAttribute("style");

    return (
        <div className="pb-3 pt-5">
            <MDBAccordion className="card mb-2">
                <MDBAccordionItem collapseId={1} className="border-0 customHeight" headerTitle={`${currentUser?.username} - click to new mail`}>
                    <div className='usernameContainer mb-2'>
                        <MDBInput
                            label='Username'
                            type='text'
                            name="username" className='customInput'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <div className='customDropdown'>
                            {
                                dropdownData.filter((item) => {
                                    const searchValue = username.toLowerCase();
                                    const userName = item.full_name.toLowerCase();
                                    return (
                                        searchValue &&
                                        userName.startsWith(searchValue) &&
                                        userName !== searchValue
                                    )
                                }).slice(0, 5)
                                    .map((item, i) => (
                                        <div key={i} className='dropdownRow' onClick={() => setUsername(item.full_name)}>
                                            {item.full_name}
                                        </div>
                                    ))
                            }
                        </div>
                    </div>
                    <MDBInput
                        label='Title'
                        type='text'
                        className="mb-2"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <MDBTextArea
                        label='Text'
                        rows={4}
                        className="mb-2"
                        name="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <div className="d-grid gap-2 col-2 mx-auto">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => sendNewMail()}
                        >
                            SEND
                        </button>
                    </div>
                </MDBAccordionItem>
            </MDBAccordion>
        </div>
    )
}
