import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const Login = async () => {
        if (!username) {
            alert('Add username');
        } else {
            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
                username
            });
            if (data.error) {
                alert(data.error)
                localStorage.clear();
            }
            if(data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate('/');
            }
        }
    }

    useEffect(() => {
        if(localStorage.getItem("user")) {
            navigate("/")
        }
    }, [])

    return (
        <section className="vh-100" style={{ backgroundColor: "#54b4d3" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
                            <div className="card-body p-5 text-center">
                                <h3 className="mb-5">Sign in</h3>
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="typeEmailX-2">Username</label>
                                    <input
                                        type="text"
                                        id="typeEmailX-2"
                                        className="form-control form-control-lg"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <button
                                    className="btn btn-primary btn-lg btn-block"
                                    type="submit"
                                    onClick={() => Login()}
                                >
                                    Login
                                </button>
                                <hr className="my-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
