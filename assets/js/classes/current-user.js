import global from "../global/main.js";

export default class usersClass {
  constructor() {
    const user = global.ls.getLocalStorage("currentUser") || {};
    Object.assign(this, user);
  }
  setCurrenUser(user) {
    const dataUser = { ...user };
    delete dataUser.password;
    delete dataUser.salt;
    Object.assign(this, dataUser);
    global.ls.setLocalStorage("currentUser", dataUser);
  }
  cleanCurrentUser() {
    localStorage.removeItem("currentUser");
  }
}
