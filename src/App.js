import { useState } from "react";
import FirstPage from "./components/FirstPage";
import { signInWithGoogle } from "./firebase/config";
import { Button, Stack } from "@mui/material";
import { UserContext } from "./contexts/AuthContext";

import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../src/firebase/config";
import SignOut from "./components/SignOut";

const App = () => {
  // const [user, setUser] = useState('hello')
  const [user] = useAuthState(auth);
  console.log(user);

  return (
    <div>
      {user ? (
        <div>
          <SignOut />
          <FirstPage />
        </div>
      ) : (
        <div className="sign-in-button">
          <h1>Spelling Fun</h1>

          <Button variant="contained" size="medium" onClick={signInWithGoogle}>
            sign in with Google
          </Button>
        </div>
      )}
    </div>
  );
};

export default App;
