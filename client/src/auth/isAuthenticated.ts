export const isAuth=():boolean=>{
    const data = localStorage.getItem('userDetails');
    if(!data) return false;
    // decrypt user data
    const encryptedUserDetails = JSON.parse(data);
    const decryptedUserDetails = JSON.parse(atob(encryptedUserDetails));
    if(!decryptedUserDetails.isMissingDetails) {
        return true;
    } 
    return false;
}