import React, { useEffect, useState } from "react";
import { useAppStates } from "../AppContext/Provider";
import { toast } from 'react-toastify';
import axios from 'axios';
import { getSender } from '../ChatLogic';
import UserComponent from "./usercomponent";

export default function MyChats() {
    const [loading, setloading] = useState(true);
    const [loggedUser, SetLoggedUser] = useState();
    const [search, setsearch] = useState('');
    const [searchresult, setsearchresult] = useState([]);
    const [groupmembers, setgroupmembers] = useState([]);
    const [groupname, setgroupname] = useState('');

    const { user, chats, setchats, selectedchats, setselectedchats } = useAppStates();

    const fetchChats = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            };

            const { data } = await axios.get("http://localhost:5000/api/chats", config);
            setchats(data);
            setloading(false);
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message);
        }
    }

    fetchChats();

    useEffect(() => {
        SetLoggedUser(JSON.parse(localStorage.getItem('UserInfo')));
    }, [])

    const handleUserSearch = async (e) => {
        e.preventDefault();
        if (!search) {
            toast.error('Please enter username or email to search.');
            return
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.get(`http://localhost:5000/api?search=${search}`, config);
            setsearchresult(data.users)
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const handleAddition = (usertoAdd) => {

        if (groupmembers.includes(usertoAdd)) {
            toast.info('User already added !')
            return
        }
        setgroupmembers([...groupmembers, usertoAdd]);
    }

    const handleDeletion = (usertoDelete) => {
        setgroupmembers(groupmembers.filter((prsn) => prsn._id !== usertoDelete._id));
    }

    const handleGroupCreation = async () => {
        if (!groupname) {
            toast.error('Enter a valid Group Name');
            return
        }
        if (groupmembers.length < 2) {
            toast.error('More than two users are required for a Group Chat');
            return
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.post('http://localhost:5000/api/chats/group', { users: JSON.stringify(groupmembers), groupname }, config);
            setchats([data, ...chats]);
            setsearch('');
            setgroupmembers([]);
            setsearchresult([]);
            setgroupname('');
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <>
            < div className="modal" id="CreateGroupModal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Create Group</h4>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                    setsearch('');
                                    setsearchresult([]);
                                    setgroupmembers([]);
                                    setgroupname('')
                                }}
                            ></button>
                        </div>

                        <div className="modal-body">
                            <input
                                type="text"
                                className="form-control mb-2"
                                id="CreateGrpInp"
                                name="GroupName"
                                placeholder="Group Chat Name"
                                value={groupname}
                                onChange={(e) => setgroupname(e.target.value)}
                            />

                            <form
                                onSubmit={handleUserSearch}
                            >
                                <input
                                    type="text"
                                    className="form-control"
                                    id="CreateGrpInp"
                                    name="GroupUsers"
                                    placeholder="Search users"
                                    value={search}
                                    onChange={(e) => setsearch(e.target.value)}
                                />
                            </form>
                            <div className="my-4">
                                {groupmembers.length > 0
                                    ? groupmembers.map(member => {
                                        return (
                                            <span
                                                key={member._id}
                                                className="badge p-2 m-1"
                                            >
                                                {member.name}
                                                <button
                                                    className="btn btn-close ms-2"
                                                    style={{ width: "5px", height: "6px" }}
                                                    onClick={() => handleDeletion(member)}
                                                ></button>
                                            </span>
                                        )
                                    })
                                    :
                                    <p className="mb-0 ms-2">Please select at least 2 users to create a Group Chat.</p>
                                }
                            </div>
                            <div className="">
                                {
                                    searchresult && searchresult.map(user => {
                                        return (
                                            <UserComponent
                                                avatar={user.avatar}
                                                key={user._id}
                                                username={user.name}
                                                email={user.email}
                                                handleFunction={() => handleAddition(user)}
                                            />
                                        );
                                    })
                                }
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn-light"
                                onClick={handleGroupCreation}
                            >
                                create
                            </button>
                        </div>
                    </div>
                </div>
            </div >


            <div
                className={
                    (!selectedchats)
                        ?
                        "col-md-4 col-lg-4 col-xl-3 MyChats py-1 px-2"
                        :
                        "d-none d-md-block col-md-4 col-lg-4 col-xl-3 MyChats py-1 px-2"
                }
            >
                <div className="d-flex justify-content-between">
                    <h3 className="m-2 d-inline">My Chats</h3>
                    <button
                        data-bs-toggle='modal'
                        data-bs-target='#CreateGroupModal'
                        className="btn btn-light mt-2"
                        style={{ width: "150px", height: "35px" }}
                    >
                        Create Group +
                    </button>
                </div>
                {user && chats && (!loading) ?
                    chats.map(chat => {
                        return (
                            <div
                                key={chat._id}
                                className="col-12 d-flex align-items-center ChatUser p-3 mt-2"
                                onClick={() => setselectedchats(chat)}
                            >
                                {
                                    (chat.isGroupChat)
                                        ?
                                        <img
                                            src={`https://api.dicebear.com/6.x/thumbs/svg?seed=${chat.ChatName}`}
                                            alt="Group_image"
                                            width="50px"
                                            height="auto"
                                            className="mb-1"
                                            style={{ borderRadius: "50%" }} />
                                        :
                                        <img
                                            src={getSender(loggedUser, chat.users).avatar}
                                            alt="profile"
                                            width="50px"
                                            height="auto"
                                            className="mb-1"
                                        />
                                }
                                <div className="ms-3">
                                    {
                                        (chat.isGroupChat)
                                            ?
                                            <p className="mb-0"><strong>{chat.ChatName}</strong></p>
                                            :
                                            <p className="mb-0"><strong>{getSender(loggedUser, chat.users).name}</strong></p>
                                    }
                                </div>
                            </div>
                        );
                    })
                    :
                    <p className="mt-2 text-center">loading</p>
                }
            </div>
        </>
    );
}