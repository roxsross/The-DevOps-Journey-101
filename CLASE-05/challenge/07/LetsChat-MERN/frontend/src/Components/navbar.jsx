import React, { useState } from 'react';
import { BsSearch } from "react-icons/bs";
import { useAppStates } from '../AppContext/Provider';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import UserComponent from './usercomponent';

export default function Navbar() {
    const navigate = useNavigate();
    const [search, setsearch] = useState('')
    const [searchresult, setsearchresult] = useState([])

    const { user, setselectedchats } = useAppStates();

    const logouthandler = () => {
        localStorage.removeItem('UserInfo');
        navigate("/");
        toast.success('Logged out successfully.')
    }

    const handlesearch = async (e) => {
        e.preventDefault();
        if (!search) {
            return
        } else {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }
                const { data } = await axios.get(`http://localhost:5000/api?search=${search}`, config);
                setsearchresult(data.users)
            } catch (err) {
                toast.error(err);
                return
            }
        }
    }


    const accessChat = async (id) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            }

            const { data } = await axios.post('http://localhost:5000/api/chats', { user_id: id }, config)
            setselectedchats(data);
        } catch (err) {
            toast.error(err);
            return
        }
    }

    return (
        <>
            <nav className="navbar text-light">
                <div className="container-fluid">
                    <div style={{ cursor: "pointer" }} data-bs-toggle="offcanvas" data-bs-target="#sidebar">
                        <p className='d-inline-flex mx-2 mb-0 mt-1' style={{ fontSize: "1rem" }}>Search</p>
                        <BsSearch size={15} className='mb-1' />
                    </div>
                    <h6 className='mb-0' style={{ fontWeight: "bold" }}>Lets-Chat</h6>
                    {user &&
                        <div className="dropstart me-1">
                            <button className="btn dropdown-toggle dropstart-btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={user.user.avatar} width='30px' height="auto" alt="profile." />
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li>
                                    <Link className="dropdown-item mb-0" to='/'
                                        data-bs-toggle='modal'
                                        data-bs-target='#myModal'
                                    >
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/"
                                        className="dropdown-item"
                                        onClick={logouthandler}
                                    >
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    }
                </div>
            </nav >

            <div className="offcanvas offcanvas-start" id="sidebar">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Lets-Chat Search</h5>
                    <button
                        type="button"
                        className="btn-close btn-close-white text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                        onClick={() => { setsearch(''); setsearchresult([]) }}
                    ></button>
                </div>
                <div className="offcanvas-body">
                    <form className="col-12 d-flex" onSubmit={(e) => handlesearch(e)}>
                        <input
                            type="text"
                            className="form-control styled"
                            placeholder="Search User"
                            value={search}
                            onChange={(e) => setsearch(e.target.value)}
                        />
                        <button className='btn btn-light ms-2'>Go</button>
                    </form>
                    <div className="col-12 mt-3">
                        <div className="row px-3">
                            {
                                searchresult && searchresult.map(user => {
                                    return (
                                        <UserComponent
                                            avatar={user.avatar}
                                            key={user._id}
                                            username={user.name}
                                            email={user.email}
                                            handleFunction={() => accessChat(user._id)}
                                        />
                                    );
                                })
                            }
                        </div>
                    </div>

                </div>
            </div>


            <div className="modal" id="myModal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Profile</h4>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>

                        {user &&
                            <div className="modal-body d-flex flex-column justify-content-center align-items-center">
                                <img src={user.user.avatar} width='150px' height="auto" alt="profile." />
                                <p className='mb-0 mt-2' style={{ fontSize: "1.2rem" }}>{user.user.email}</p>
                                <p className='mb-0 mt-2' style={{ fontSize: "1.1rem" }}>{user.user.name}</p>
                            </div>
                        }

                        <div className="modal-footer">
                            <button className="btn btn-light text-dark" data-bs-dismiss="modal">close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}