const setCookie = (name, value, date) => {
  const oDate = new Date();

  if (typeof (date) === "number") {
    oDate.setDate(oDate.getDate() + date);
  }
  document.cookie = `${name}=${value};expires=${oDate}`;
}

const getCookie = (name) => {
  const str = document.cookie;
  const arr = str.split("; ");
  for (let i = 0; i < arr.length; i += 1) {
    // console.log(arr[i]);
    const newArr = arr[i].split("=");
    if (newArr[0] === name) {
      return newArr[1];
    }
  }
}

const removeCookie = (name) => {
  setCookie(name, '', -1);
}

const clearAllCookie = () => {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}

export {
  setCookie, getCookie, removeCookie, clearAllCookie
}
