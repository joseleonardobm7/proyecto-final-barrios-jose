import global from "../global/main.js";

export default class usersClass {
  constructor() {
    this.user = global.ls.getLocalStorage("activeUser") || null;
  }
}
