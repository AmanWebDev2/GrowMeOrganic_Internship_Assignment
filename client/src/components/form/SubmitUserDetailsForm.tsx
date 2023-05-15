import React, { ReactNode, useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { User } from "../../pages/home/Home";

interface Props {
  setUserDetails: React.Dispatch<React.SetStateAction<User>>
}

const SubmitUserDetailsForm = ({setUserDetails}:Props): JSX.Element=> {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const contactInputRef = useRef<HTMLInputElement>(null);

  const [isError,setIsError] = useState(false);

  const handleSubmit=():void=>{
    const name = nameInputRef.current?.value;
    const email = emailInputRef.current?.value;
    const contact = Number(contactInputRef.current?.value);
   
    if(name && email && contact) {
      const data:User = {
        name,
        email,
        contact,
        isMissingDetails: false
      }
      setUserDetails(data);
    }else {
      setIsError(true);
    }
    
  }

  return (
    <>
      <Card sx={{ maxWidth: 445, margin: "0 auto", minHeight:"60vh" }}>
        <CardContent>
          <Typography variant="h4" margin={2}>Fill up the given details</Typography>
          <form>
            <Grid container spacing={2}>
              <Grid xs={12} item>
                <TextField
                  variant="outlined"
                  label="Full Name"
                  type="text"
                  fullWidth
                  required
                  inputRef={nameInputRef}
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  variant="outlined"
                  label="Email"
                  type="email"
                  fullWidth
                  required
                  inputRef = {emailInputRef}
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  variant="outlined"
                  label="Contact Number"
                  type="number"
                  fullWidth
                  required
                  inputRef={contactInputRef}
                />
              </Grid>
              <Grid xs={12} item>
              <Button variant="contained" size="medium" fullWidth onClick={handleSubmit}>
                Save
              </Button>
            </Grid>
            </Grid>
           
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default SubmitUserDetailsForm;
