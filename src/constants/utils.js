var CryptoJS = require("crypto-js");
export function isEmailValid(email) {
  const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
  return re.test(String(email).toLowerCase());
}
export function isValidPassword(password) {
  return /^(?!.* ).{4,15}$/.test(password) ? true : false;
}

function encryption(data) {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    "my-secret-key@123"
  ).toString();
}

function decryption(data) {
  var bytes = data
    ? CryptoJS.AES.decrypt(data.toString(), "my-secret-key@123")
    : null;

  var decryptedData = bytes
    ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    : null;
  return decryptedData;
}
export function storeInLocalStorage(userInfo) {
  // const ciphertext = encryption(userInfo);
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
}
export function isUserLoggedIn() {
  const userInfo = localStorage.getItem("userInfo");
  const usr = userInfo ? JSON.parse(userInfo) : null;
  return usr;
}
