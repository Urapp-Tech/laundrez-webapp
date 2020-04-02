export function removeCSSClass(ele, cls) {
  const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
  ele.className = ele.className.replace(reg, ' ');
}

export function addCSSClass(ele, cls) {
  ele.classList.add(cls);
}

export const toAbsoluteUrl = pathname => process.env.PUBLIC_URL + pathname;
/*  removeStorage: removes a key from localStorage and its sibling expiracy key
    params:
        key <string>     : localStorage key to remove
    returns:
        <boolean> : telling if operation succeeded
 */
export function removeStorage(key) {
  try {
    localStorage.setItem(key, '');
    localStorage.setItem(key + '_expiresIn', '');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(
      'removeStorage: Error removing key [' +
      key +
      '] from localStorage: ' +
      JSON.stringify(e)
    );
    return false;
  }
  return true;
}

/*  getStorage: retrieves a key from localStorage previously set with setStorage().
    params:
        key <string> : localStorage key
    returns:
        <string> : value of localStorage key
        null : in case of expired key or failure
 */
export function getStorage(key) {
  const now = Date.now(); //epoch time, lets deal only with integer
  // set expiration for storage
  let expiresIn = localStorage.getItem(key + '_expiresIn');
  if (expiresIn === undefined || expiresIn === null) {
    expiresIn = 0;
  }

  expiresIn = Math.abs(expiresIn);
  if (expiresIn < now) {
    // Expired
    removeStorage(key);
    return null;
  } else {
    try {
      const value = localStorage.getItem(key);
      return value;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(
        'getStorage: Error reading key [' +
        key +
        '] from localStorage: ' +
        JSON.stringify(e)
      );
      return null;
    }
  }
}
/*  setStorage: writes a key into localStorage setting a expire time
    params:
        key <string>     : localStorage key
        value <string>   : localStorage value
        expires <number> : number of seconds from now to expire the key
    returns:
        <boolean> : telling if operation succeeded
 */
export function setStorage(key, value, expires) {
  if (expires === undefined || expires === null) {
    expires = 24 * 60 * 60; // default: seconds for 1 day
  }

  const now = Date.now(); //millisecs since epoch time, lets deal only with integer
  const schedule = now + expires * 1000;
  try {
    localStorage.setItem(key, value);
    localStorage.setItem(key + '_expiresIn', schedule);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(
      'setStorage: Error setting key [' +
      key +
      '] in localStorage: ' +
      JSON.stringify(e)
    );
    return false;
  }
  return true;
}
export function setToken(token) {
  try {
    localStorage.setItem('token', token);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(
      'setToken: Error setting key [ token ] in localStorage: ' +
      JSON.stringify(e)
    );
  }
}
export function getToken() {
  try {
    return localStorage.getItem('token');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(
      'getToken: Error setting key [ token ] in localStorage: ' +
      JSON.stringify(e)
    );
  }
}
export function setUser(user) {
  try {
    localStorage.setItem('user', JSON.stringify(user));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(
      'setToken: Error setting key [ user ] in localStorage: ' +
      JSON.stringify(e)
    );
  }

}
export function getUser() {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(
      'getToken: Error setting key [ user ] in localStorage: ' +
      JSON.stringify(e)
    );
  }

}
export function clearStorage() {
  try {

    localStorage.clear();
  }
  catch (e) {
    // eslint-disable-next-line no-console
    console.log(
      'fail to clear storage' +
      JSON.stringify(e)
    );
  }
}

