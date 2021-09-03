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
export function removeLogOut(){
  localStorage.removeItem('userInfo')
}
export function timeToDate(timestamp) {
  var date = new Date(timestamp);

  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;

  return (
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear() +
    " " +
    strTime
  );
}
