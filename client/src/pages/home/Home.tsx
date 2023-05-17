import { useEffect, useState } from "react";
import SubmitUserDetailsForm from "../../components/Form/SubmitUserDetailsForm";
import { useNavigate } from "react-router-dom";
import FormAlerter from "../../components/Alert/FormAlerter";
import { isAuth } from "../../auth/isAuthenticated";
import { saveToLocalStorage } from "../../utils/saveToLocalStorage";
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
        if (lastSegment == "users" && !isAuth()) {
          setShowAlertMsg(true);
          setWarningMessage("must enter their details before accessing the page.");
        }
      }
    });
  }, []);

  const handleClose=():void=>{
    setShowAlertMsg(false);
  }

  const handleSubmission=(formData:User)=>{
    if(!formData.isMissingDetails) {
      setUserDetails(userDetails);
      saveToLocalStorage("userDetails",formData);
      navigate("/users", { replace: true });
    }
  }

  return (
    <div className="home">
        {
          showAlertMsg && <FormAlerter message={warningMessage} handleClose={handleClose}/>
        }
      <SubmitUserDetailsForm handleSubmission={handleSubmission}/>
    </div>
  );
};

export default Home;
