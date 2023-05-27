export const getSender = (loggedUser, users) => {
    return (loggedUser.user._id) === users[0]._id ? users[1] : users[0];
};
