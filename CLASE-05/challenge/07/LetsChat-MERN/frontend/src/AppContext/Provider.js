import React, { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const Appcontext = createContext();

export default function ContextProvider({ children }) {
    const [user, setuser] = useState();
    const [chats, setchats] = useState();
    const [selectedchats, setselectedchats] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const userinfo = JSON.parse(localStorage.getItem('UserInfo'))
        setuser(userinfo);
        if (userinfo === null) {
            navigate("/");
        }

    }, [navigate, selectedchats]);

    return (
        <Appcontext.Provider
            value={{
                user,
                setuser,
                selectedchats,
                setselectedchats,
                chats,
                setchats
            }}
        >
            {children}
        </Appcontext.Provider >
    )
}

export const useAppStates = () => {
    return useContext(Appcontext);
}

