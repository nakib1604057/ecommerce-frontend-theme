export function isEmailValid(email) {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    return re.test(String(email).toLowerCase());
}
export function isValidPassword(password) {
  return /^(?!.* ).{4,15}$/.test(password) ? true : false;
}
