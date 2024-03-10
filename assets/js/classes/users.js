import global from "../global/main.js";

export default class usersClass {
  constructor() {
    this.users = global.ls.getLocalStorage("users") || [];
  }
  createUser(name, email, password) {
    this.users.push({
      _id: new Date(),
      name,
      email,
      password,
    });
  }
  restartPassword(userId, newPassword) {
    const user = this.users.find((u) => u._id === userId);
    if (user) {
      user.password = newPassword;
    }
  }
}
