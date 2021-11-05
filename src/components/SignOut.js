import React from "react";
import { auth } from "../firebase/config";
import Button from '@mui/material/Button';

const SignOut = () => {
  const style = {
    margin: "10px",
  };
  return (
    auth.currentUser && (
      <div className="sign-out-button">
        <Button variant='contained' color='error' onClick={() => auth.signOut()} >
          sign out
        </Button>
      </div>
    )
  );
};

export default SignOut;
