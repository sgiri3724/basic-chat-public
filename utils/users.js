let users = [];

const userJoin = (id, username, room) => {
  // console.log(id);
  const user = { id, username, room };
  users.push(user);
  return user;
};

// const curUser = (id) => {
//   // find each user in users, and return the user that has the id passed in
//   return users.find((user) => user.id === id);
// };

const userLeave = (id) => {
  // if not found return -1
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    // remove (1) item at index --(index, 1)
    users.splice(index, 1);
    return users;
  }
};

const getCurrentOnlineUser = (room) => {
  return users.filter((user) => user.room === room);
};

module.exports = {
  userJoin,
  // curUser,
  userLeave,
  getCurrentOnlineUser,
};
