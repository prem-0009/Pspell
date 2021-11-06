import FirstPage from "./components/FirstPage";
import { signInWithGoogle } from "./firebase/config";
import { Button } from "@mui/material";

import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../src/firebase/config";
import SignOut from "./components/SignOut";
import {CorrectList} from "./components/CorrectList";

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <div>
      {user ? (
        <div>
          <SignOut />
          <FirstPage uid={user.uid} />
          {/* <CorrectList/> */}
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
