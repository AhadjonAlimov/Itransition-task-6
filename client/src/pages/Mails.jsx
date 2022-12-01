import React, { useEffect, useState } from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
} from "mdb-react-ui-kit";
import NewMail from "../components/NewMail";
import Contact from "../components/Contact";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import useInterval from '../plugins/useInterval';


export default function Mails() {
    const [currentUser, setCurrentUser] = useState(undefined)
    const [contacts, setContacts] = useState([])
    const navigate = useNavigate();

    useInterval(() => getContacts(), 5000)

    useEffect(() => {
        async function checkUser() {
            if (!localStorage.getItem("user")) {
                navigate("/login");
            } else {
                setCurrentUser(await JSON.parse(localStorage.getItem("user")));
            }
        }
        checkUser();
    }, [])

    useEffect(() => {
        getContacts();
    }, [currentUser])

    const getContacts = async () => {
        if (currentUser) {
            const data = await axios.get(`/contacts/${currentUser._id}`,
                {
                    headers: {
                        username: currentUser.username,
                    }
                }
            ).catch((err) => {
                console.log(err);
            });
            setContacts(
                data?.data?.map((mailRoom) => {
                    return {
                        ...mailRoom,
                        members: mailRoom.members.find((e) => e !== currentUser?.username)
                    }
                }).sort((a,b) => new Date(a.updatedAt) - new Date(b.updatedAt)).reverse()
            );
        }
    }

    return (
        <MDBContainer fluid className="py-5 vh-100  custom-scrollbar" style={{ backgroundColor: "#54b4d3", overflowY: "auto" }}>
            <MDBRow className="d-flex justify-content-center">
                <MDBCol md="8" lg="6" xl="4">
                    <NewMail currentUser={currentUser} getContacts={getContacts} />
                    <Contact contacts={contacts} currentUser={currentUser} />
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}