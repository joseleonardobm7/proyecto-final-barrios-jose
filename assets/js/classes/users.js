import global from "../global/main.js";
import integrations from "../integrations/main.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

// GENERAR SAL ALEATORIO PARA ENCRIPTAR LA CONTRASEÑA
const saltGenerator = (length) => {
  const buffer = new Uint8Array(length);
  window.crypto.getRandomValues(buffer);
  return Array.from(buffer, (byte) =>
    ("0" + (byte & 0xff).toString(16)).slice(-2)
  ).join("");
};
// GENERAR CODIGO DE VERIFICACIÓN
const codeGenerator = () => {
  const code = Math.floor(Math.random() * 900000) + 100000;
  return code.toString();
};
// ENCRIPTAR LA CONTRASEÑA
const passwordEncrypt = async (password, salt) => {
  const hashedPassword = await bcrypt.hash(password + salt, 10);
  return hashedPassword;
};
export default class usersClass {
  constructor() {
    this.users = global.ls.getLocalStorage("users") || [];
  }
  sendVerificationCode(userId) {
    const verificationCode = codeGenerator();
    const user = this.users.find((u) => u._id === userId);
    if (user) {
      user.verificationCode = verificationCode;
      global.ls.setLocalStorage("users", this.users);
      integrations.userAction.emailVerify(
        user.name,
        user.verificationCode,
        user.email
      );
    }
  }
  confirmVerificationCode(userId, code) {
    const user = this.users.find((u) => u._id === userId);
    if (user) {
      if (user.verificationCode === code) {
        user.validated = true;
        global.ls.setLocalStorage("users", this.users);
        return user;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  async createUser(name, email, password) {
    const salt = saltGenerator(16);
    const encryptedPassword = await passwordEncrypt(password, salt);
    const newUserData = {
      _id: uuidv4(),
      name,
      email,
      salt,
      password: encryptedPassword,
      validated: false,
    };
    this.users.push(newUserData);
    global.ls.setLocalStorage("users", this.users);
    this.sendVerificationCode(newUserData._id);
  }
  userVerify(email) {
    const user = this.users.find((u) => u.email === email);
    return user;
  }
  async passwordVerify(userId, password) {
    const user = this.users.find((u) => u._id === userId);
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        password + user.salt,
        user.password
      );
      return isPasswordCorrect;
    } else {
      return false;
    }
  }
  restartPassword(userId, newPassword) {
    const user = this.users.find((u) => u._id === userId);
    if (user) {
      const salt = saltGenerator(16);
      const encryptedPassword = passwordEncrypt(newPassword, salt);
      user.salt = salt;
      user.password = encryptedPassword;
    }
  }
}
