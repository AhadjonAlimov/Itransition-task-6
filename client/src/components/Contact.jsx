import React, { useEffect, useState } from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBBtn,
    // MDBScrollbar,
    MDBCardFooter,
    MDBCollapse,
    MDBTypography,
} from "mdb-react-ui-kit";
import DefaultUserImg from "../assets/default-user-img.png";
import axios from 'axios';
import useInterval from '../plugins/useInterval';
import moment from 'moment/moment';


export default function Contact({ contacts, currentUser }) {
    const [openedChat, setOpenedChat] = useState([]);
    const [chatMails, setChatMails] = useState("");
    const [mailInput, setMailInput] = useState("");
    
    useInterval(() => getMails(), 4000)

    useEffect(() => {
        getMails();
    }, [openedChat])

    const getMails = async () => {
        if (currentUser && openedChat) {
            const req = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/getmails`, {
                mailRoomId: openedChat._id,
                from: currentUser?.username,
                to: openedChat?.members,
            }, {
                headers: { username: currentUser.username, }
            }
            ).catch((err) => {
                console.log(err);
            })
            setChatMails(req.data)
        }
    }

    const sendMail = async () => {
        if (mailInput.length > 0) {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/addmails`, {
                from: currentUser?.username,
                to: openedChat?.members,
                sender: currentUser?._id,
                title: openedChat?.title,
                mail: mailInput,
                mailRoomId: openedChat._id,
            })
            // alert(mailInput);
            setMailInput("");
            getMails();
        }
    }

    return (
        <>
            {
                contacts?.map((contact, i) => {
                    return (
                        <div key={i} className="mb-1">
                            <MDBBtn onClick={() => setOpenedChat(openedChat._id === contact._id ? "" : contact)} color="info" className='p-1' size="lg" block style={{ backgroundColor: "#FFF" }}>
                                <MDBTypography listUnStyled className="mb-0">
                                    <li className="p-2 border-bottom">
                                        <a href="#!" className="d-flex justify-content-between">
                                            <div className="d-flex flex-row">
                                                <img
                                                    src={DefaultUserImg}
                                                    alt="avatar"
                                                    className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                                    width="40"
                                                />
                                                <div className="d-flex flex-column text-start textTransformNone">
                                                    <p className="fw-bold mb-0">{contact.title}</p>
                                                    <p className="mb-0 text-dark">{contact.members}</p>
                                                </div>
                                            </div>
                                            <div className="pt-1">
                                                <p className="small text-muted mb-1">{moment(contact.updatedAt).format('LT')}</p>
                                            </div>
                                        </a>
                                    </li>
                                </MDBTypography>
                            </MDBBtn>
                            <MDBCollapse show={openedChat._id === contact._id} className="mt-0">
                                <MDBCard id="chat4">
                                    <div
                                        // suppressScrollX
                                        className="card-body perfect-scrollbar ps ps--active-y ps--scrolling-y p-0"
                                        data-mdb-perfect-scrollbar="true"
                                        style={{ position: "relative", height: "400px" }}
                                    >
                                        <MDBCardBody>
                                            {chatMails ? (
                                                chatMails?.map((mails, i) => {
                                                    return (
                                                        <div key={i} className={`d-flex flex-row ${mails.fromSelf ? "justify-content-end" : "justify-content-start"}`}>
                                                            <div>
                                                                <p
                                                                    className={`small p-2 mb-0 rounded-3 text-wrap text-break ${mails.fromSelf ? "text-white bg-info ms-3" : "me-3"}`}
                                                                    style={{ backgroundColor: "#f5f6f7" }}
                                                                >
                                                                    {mails.mail}
                                                                </p>
                                                                <span className={`msgTime mb-2 ${mails.fromSelf ? "float-end" : "float-start"}`}>{moment(mails.updatedAt).format('LT')}</span>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            ) : (
                                                <h6>Loading message...</h6>
                                            )}
                                        </MDBCardBody>
                                    </div>
                                    <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="exampleFormControlInput3"
                                            placeholder="Type message"
                                            value={mailInput}
                                            onChange={(e) => setMailInput(e.target.value)}
                                        />
                                        <a className="ms-3 link-info" href="#!">
                                            <button
                                                type="button"
                                                className="btn btn-link px-3 me-2"
                                                onClick={() => sendMail()}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: "1.5rem", height: "1.5rem" }}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                                </svg>
                                            </button>
                                        </a>
                                    </MDBCardFooter>
                                </MDBCard>
                            </MDBCollapse>
                        </div>
                    )
                })
            }
        </>
    )
}
