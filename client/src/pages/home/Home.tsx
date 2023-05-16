import { useEffect, useState } from "react";
import SubmitUserDetailsForm from "../../components/form/SubmitUserDetailsForm";
import { useNavigate } from "react-router-dom";
import FormAlerter from "../../components/alert/FormAlerter";
export interface User {
  name: string;
  email: string;
  contact: number | null;
  isMissingDetails: boolean;
}

const initialUserDetails: User = {
  name: "",
  email: "",
  contact: null,
  isMissingDetails: true,
};

const Home = () => {
  const [userDetails, setUserDetails] = useState<User>(initialUserDetails);
  const [showAlertMsg, setShowAlertMsg] = useState(false);
  const [warningMessage,setWarningMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const entries = performance.getEntriesByType("navigation");
    entries.forEach((entry) => {
      if (entry.entryType == "navigation") {
        const lastSegment = entry.name.split("/").pop();
        if (lastSegment == "users") {
          setShowAlertMsg(true);
          setWarningMessage("must enter their details before accessing the page.");
        }
      }
    });
  }, []);

  useEffect(() => {
    if (showAlertMsg) {
      console.log("show alert message");
    }
  }, [showAlertMsg]);

  useEffect(() => {
    if (!userDetails.isMissingDetails) {
      // save details to local storage
      const stringifyUserData = JSON.stringify(userDetails);
      const encryptedUserDetails = btoa(stringifyUserData);
      window.localStorage.setItem(
        "userDetails",
        JSON.stringify(encryptedUserDetails)
      );
      // redirect to new page
      navigate("/users", { replace: true });
    }
  }, [userDetails]);

  const handleClose=():void=>{
    setShowAlertMsg(false);
  }

  return (
    <div className="home">
        {
            showAlertMsg && <FormAlerter message={warningMessage} handleClose={handleClose}/>
        }
      <SubmitUserDetailsForm setUserDetails={setUserDetails} />
    </div>
  );
};

export default Home;
