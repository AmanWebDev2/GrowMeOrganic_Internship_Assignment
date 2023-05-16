import { useEffect, useState } from 'react'
import SubmitUserDetailsForm from '../../components/form/SubmitUserDetailsForm'
import { useNavigate } from "react-router-dom";

export interface User {
    name: string,
    email: string,
    contact: number | null,
    isMissingDetails: boolean
}

const initialUserDetails:User = {
    name:"",
    email: "",
    contact: null,
    isMissingDetails: true
}

const Home = () => {
    const [userDetails, setUserDetails] = useState<User>(initialUserDetails);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!userDetails.isMissingDetails) {
            // save details to local storage
            const stringifyUserData = JSON.stringify(userDetails);
            const encryptedUserDetails = btoa(stringifyUserData); 
            window.localStorage.setItem("userDetails",JSON.stringify(encryptedUserDetails));
            // redirect to new page
            navigate('/users')
        }
    },[userDetails]);

  return (
    <div className='home'>
        <SubmitUserDetailsForm setUserDetails={setUserDetails}/>
    </div>
  )
}

export default Home