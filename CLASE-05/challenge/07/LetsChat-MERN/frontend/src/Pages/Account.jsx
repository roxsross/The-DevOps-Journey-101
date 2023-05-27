import React, { useEffect, useState } from "react";
import '../App.css'
import { Link, useNavigate } from "react-router-dom";
import { AvatarGenerator } from 'random-avatar-generator'
import { toast } from 'react-toastify';
import axios from 'axios'

export default function RegisterUser() {
    const navigate = useNavigate();
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [show, setshow] = useState(true)
    const [avatar, setavatar] = useState('')

    const [ActiveTab, SetActiveTab] = useState(1);

    useEffect(() => {
        const userinfo = localStorage.getItem('UserInfo');
        if (userinfo !== null) {
            navigate('/Lets-Chat')
        }

        Generate();
    }, [navigate])

    function Generate() {
        const generator = new AvatarGenerator();
        const data = generator.generateRandomAvatar();
        setavatar(data)
    }

    const HandleLogin = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const { data } = await axios.post('http://localhost:5000/api/login', { email, password }, config);
            toast.success('User Login successfull.');
            navigate('/Lets-Chat');
            localStorage.setItem('UserInfo', JSON.stringify(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }


    const HandleRegistration = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const { data } = await axios.post('http://localhost:5000/api/signup', { name, email, password, avatar }, config);
            toast.success('User signup successfull.');
            navigate('/Lets-Chat');
            localStorage.setItem('UserInfo', JSON.stringify(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }


    return (
        <div className="container-fluid" id="Wrapper">
            <div className="row d-flex flex-column justify-content-center align-items-center w-100 h-100 m-0">

                <div id="Minor_Wrapper" className="mb-2 py-3">
                    <h4 className="m-0 text-center">Lets-Chat</h4>
                </div>

                <div id="Minor_Wrapper" className="py-4 px-4">
                    <div className="mb-3">
                        <ul className="nav nav-tabs border-bottom-0">
                            <li
                                className="nav-item w-50 text-center"
                                onClick={() => SetActiveTab(!ActiveTab)}
                            >
                                <Link className={(ActiveTab) ? "nav-link text-dark active" : "nav-link text-light"} data-toggle="tab" href="#login">Login</Link>
                            </li>
                            <li
                                className="nav-item w-50 text-center"
                                onClick={() => SetActiveTab(!ActiveTab)}
                            >
                                <Link className={(!ActiveTab) ? "nav-link text-dark active" : "nav-link text-light"} data-toggle="tab" href="#signup">Signup</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="tab-content">
                        <div id="login" className={(ActiveTab) ? "tab-pane active" : "tab-pane fade"}>
                            <div className="d-flex justify-content-center align-items-center mb-3">
                                <h1 className='m-0' id="OpeningText">Welcome</h1>
                            </div>
                            <form id="inpform" className="mb-3" onSubmit={HandleLogin}>
                                <div className="mb-2">
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="example@.com"
                                        value={email}
                                        onChange={(e) => setemail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-2">
                                    <label>Password</label>
                                    <input
                                        type={(!show) ? "text" : "password"}
                                        className="form-control"
                                        placeholder="******"
                                        value={password}
                                        onChange={(e) => setpassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-check mb-2">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={show}
                                        onClick={() => setshow(!show)}
                                        id="LoginCheckDefault"
                                    />
                                    <label className="form-check-label" htmlFor="LoginCheckDefault">
                                        show password
                                    </label>
                                </div>

                                <button className='btn btn-primary w-100 mt-1' type="submit">Login</button>
                            </form>
                        </div>
                        <div id="signup" className={(!ActiveTab) ? "tab-pane active" : "tab-pane fade"}>
                            <div className="d-flex flex-column justify-content-center align-items-center mb-0">
                                <img
                                    src={avatar}
                                    alt="User-avatar"
                                    style={{ width: "100px", height: "auto" }}
                                />
                                <p
                                    className="my-2"
                                    style={{ color: "#0d6efd", cursor: "pointer" }}
                                    onClick={() => Generate()}
                                >
                                    Change Avatar
                                </p>
                            </div>
                            <form id="inpform" className="mb-2" onSubmit={HandleRegistration}>
                                <div className="mb-2">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setname(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-2">
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="example@.com"
                                        value={email}
                                        onChange={(e) => setemail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-2">
                                    <label>Password</label>
                                    <input
                                        type={(!show) ? "text" : "password"}
                                        className="form-control"
                                        placeholder="******"
                                        value={password}
                                        onChange={(e) => setpassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-check mb-2">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={show}
                                        onClick={() => setshow(!show)}
                                        id="RegisterCheckDefault"
                                    />
                                    <label className="form-check-label" htmlFor="RegisterCheckDefault">
                                        show password
                                    </label>
                                </div>

                                <button className='btn btn-primary w-100 mt-1' type="submit">Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}