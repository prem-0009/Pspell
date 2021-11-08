import FirstPage from "./components/FirstPage";
import { signInWithGoogle } from "./firebase/config";
import { Button } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../src/firebase/config";
import SignOut from "./components/SignOut";

const App = () => {
  const [user] = useAuthState(auth);
  // console.log(user.displayName);
  

  return (
    <div>
      {user ? (
        <div>
          <SignOut displayName={user.displayName}/>
          <FirstPage uid={user.uid} />
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
