import React from "react";

export default function usercomponent(props) {
    return (
        <div
            onClick={props.handleFunction}
            className="col-12 UserComponent py-2 px-3 mt-1 d-flex align-items-center jutify-content-center"
        >
            <img className='mb-2' src={props.avatar} alt="profile.." width="50px" height="auto" />
            <div className="ps-3">
                <p className="mb-0">{props.username}</p>
                <p className="mb-0"><strong>Email:</strong> {props.email}</p>
            </div>
        </div>
    );
}