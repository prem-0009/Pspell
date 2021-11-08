import React, { useState, useEffect, lazy, Suspense, useRef } from "react";
import { Button, Stack } from "@mui/material";
import { SearchWord } from "../components/SearchWord";
import { db } from "../firebase/config";
import {
  //   getFirestore,
  //   collection,
  //   getDocs,
  //   addDoc,
  updateDoc,
  doc,
  setDoc,
  getDoc,
  arrayUnion,
  onSnapshot,
  //   arrayRemove,
} from "firebase/firestore";
// /lite";
import "../App.css";
const CorrectList = lazy(() => import("./CorrectList"));
//------------------------------------------------------------------------start main
const FirstPage = ({ uid }) => {
  const [newWords, setNewWords] = useState("");
  const [alreadyThere, setAlreadyThere] = useState("");
  const [displayError, setDisplayError] = useState();
  const [wordsList, setWordsList] = useState();
  const [displayAlphabetsOnly, setDisplayAlphabetsOnly] = useState(
    "Type some words..."
  );
  const [correctList, setCorrectList] = useState();
  const [incorrectList, setIncorrectList] = useState();
  const wordsOnly = /^[a-zA-Z]+$/;
  // ----------------------------------------useRef
  const newIncorrectData = useRef();
  const newData = useRef();

  console.log(wordsList);

  //------------------------------------------------------------------------start
  const handleChange = async (e) => {
    setNewWords(e.target.value.trim());

    if (!wordsOnly.test(e.target.value.trim())) {
      setDisplayAlphabetsOnly("alphabets only..");
    } else {
      setDisplayAlphabetsOnly("Type word here..");
    }

    if (!newWords) {
      setDisplayAlphabetsOnly("Type word here..");
    }
  };

  //------------------------------------------------------------------------start

  const handlePlay = (e) => {
    if (!wordsOnly.test(newWords)) {
      setDisplayAlphabetsOnly("alphabets only");
    } else {
      const text = e.target.value;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      speechSynthesis.speak(utterance);
    }
  };

  //------------------------------------------------------------------------start

  const handleCorrect = async () => {
    if (!wordsOnly.test(newWords)) {
      setDisplayAlphabetsOnly("alphabets only");
    } else if (newWords.length < 3) {
      setDisplayAlphabetsOnly("more than 3 alphabets..");
    } else {
      const docRef = doc(db, "spell", uid);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data().correct;
      const newCorrect = [...userData, newWords];

      console.log(newCorrect);

      const dataToBeAdded = newWords;

      if (userData.includes(dataToBeAdded)) {
        setAlreadyThere("already in the system");
      }
      await updateDoc(docRef, {
        correct: arrayUnion(dataToBeAdded),
      });
      //--------------------adding to local array correct for display without refresh

      setCorrectList([...correctList, newWords]);
    }
  };
  //------------------------------------------------------------------------start

  const handleInCorrect = async () => {
    try {
      if (!wordsOnly.test(newWords)) {
        setDisplayAlphabetsOnly("alphabets only");
      } else if (newWords.length < 3) {
        setDisplayAlphabetsOnly("more than 3 alphabets..");
      } else {
        const docRef = doc(db, "spell", uid);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data().incorrect;
        //   console.log(userData);

        const dataToBeAdded = newWords;
        if (userData.includes(dataToBeAdded)) {
          // console.log('already there');
          setAlreadyThere("already in the system");
        }
        //--------------------adding to incorrect array to firebase--------------------
        await updateDoc(docRef, {
          incorrect: arrayUnion(dataToBeAdded),
        });
        console.log(wordsList);
        //--------------------adding to local array incorrect for display without refresh

        setIncorrectList([...incorrectList, newWords]);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  //------------------------------------------------------------------------start
  useEffect(() => {
    //get data firebase --works
    console.log("useEffect firest page");

    try {
      const getInfo = async () => {
        const docRef = doc(db, "spell", uid);

        const docSnap = await getDoc(docRef);

        const userData = docSnap.data();
        if (!userData) {
          await setDoc(doc(db, "spell", uid), { correct: [], incorrect: [] });
          console.log("created", userData);
        }

        // ----------------------------------------
        setWordsList({ ...userData });
        console.log("userData", userData);

        // ----------------------------------------ref
        newData.current = [...userData.correct];
        setCorrectList([...newData.current]);
        console.log("correctlist", correctList);
        // ----------------------------------------ref
        newIncorrectData.current = [...userData.incorrect];
        setIncorrectList([...newIncorrectData.current]);

        // ----------------------------------------
      };
      getInfo();
    } catch (e) {
      console.log(e.message);
    }
  }, [uid]);

  //------------------------------------------------------------------------return
  return (
    <div>
      <div className="middle-buttons App">
        <SearchWord
          newWords={newWords}
          handleChange={handleChange}
          displayAlphabetsOnly={displayAlphabetsOnly}
          alreadyThere={alreadyThere}
          displayError={displayError}
        />

        <Stack spacing={2} direction="row" className="buttons">
          <Button
            variant="contained"
            color="primary"
            value={newWords}
            onClick={(e) => handlePlay(e)}
            size="large"
            // sx={{width:'30px'}}
          >
            play{" "}
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={handleCorrect}
            size="medium"
            // sx={width='30px'}
          >
            correct
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleInCorrect}
            size="medium"
            // sx={{width:'50px'}}
          >
            incorrect
          </Button>
        </Stack>
      </div>
      <div className="list-words">
        <Suspense fallback={<div>...loading</div>}>
          <CorrectList
            wordsList={wordsList}
            setWordsList={setWordsList}
            uid={uid}
            newData={newData}
            correctList={correctList}
            incorrectList={incorrectList}
            setCorrectList={setCorrectList}
            setIncorrectList={setIncorrectList}
            // snap={snap}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default FirstPage;
