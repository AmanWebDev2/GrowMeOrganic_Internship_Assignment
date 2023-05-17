export const saveToLocalStorage=(key:string,data:any) :void=> {
    const stringifyUserData = JSON.stringify(data);
      const encryptedUserDetails = btoa(stringifyUserData);
      window.localStorage.setItem(
        key,
        JSON.stringify(encryptedUserDetails)
    );
}