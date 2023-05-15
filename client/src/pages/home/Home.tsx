import { useEffect, useState } from 'react'
import SubmitUserDetailsForm from '../../components/form/SubmitUserDetailsForm'

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

    useEffect(()=>{
        if(!userDetails.isMissingDetails) {
            // save details to local storage
            window.localStorage.setItem("userDetails",JSON.stringify(userDetails));
            // redirect to new page
        }
    },[userDetails]);

  return (
    <div className='home'>
        <SubmitUserDetailsForm setUserDetails={setUserDetails}/>
    </div>
  )
}

export default Home