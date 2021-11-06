import React, { useState, useEffect, lazy, Suspense } from "react";
import { Button, Stack } from "@mui/material";

import { SearchWord } from "../components/SearchWord";
import { alphabetsOnly } from "../hooks/useHooks";
import { db } from "../firebase/config";
import TextField from "@mui/material/TextField";

import { firebase } from "../firebase/config";
// import { CorrectList } from "../components/CorrectList";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  setDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore/lite";

import "../App.css";
const CorrectList = lazy(() => import("./CorrectList"));

const FirstPage = ({ uid }) => {
  const [newWords, setNewWords] = useState("");
  const [alreadyThere, setAlreadyThere] = useState("");
  const [displayError, setDisplayError] = useState(false);
  const [wordsList, setWordsList] = useState();

  const [displayAlphabetsOnly, setDisplayAlphabetsOnly] = useState(
    "Type some words..."
  );

  const wordsOnly = /^[a-zA-Z]+$/;
  //------------------------------------------------------------------------start
  const handleChange = async (e) => {
    setNewWords(e.target.value.trim());

    if (!wordsOnly.test(e.target.value.trim())) {
      setDisplayAlphabetsOnly("alphabets only..");
    } else {
      setDisplayAlphabetsOnly("Type word here..");
    }

    // console.log(e.target.value);

    if (!newWords) {
      setDisplayAlphabetsOnly("Type word here..");
    }
  };

  //------------------------------------------------------------------------start

  const handlePlay = (e) => {
    if (!wordsOnly.test(newWords)) {
      setDisplayAlphabetsOnly("alphabets only");
      //   alphabetsOnly();
    } else {
      const text = e.target.value;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      speechSynthesis.speak(utterance);
    }
  };

  //------------------------------------------------------------------------start

  const handleCorrect = async () => {
    // console.log(newWords);

    // if (localStorage.getItem("vocab_correct") === null) {
    //   localStorage.setItem("vocab_correct", "[]");
    // }

    if (!wordsOnly.test(newWords)) {
      //   console.log("right");

      setDisplayAlphabetsOnly("alphabets only");
      //   alphabetsOnly();
    } else {
      const docRef = doc(db, "spell", uid);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data().correct;

      const dataToBeAdded = newWords;

      if (userData.includes(dataToBeAdded)) {
        setAlreadyThere("already in the system");
      }
      await updateDoc(docRef, {
        correct: arrayUnion(dataToBeAdded),
      });
      //   const old_vocab = JSON.parse(localStorage.getItem("vocab_correct"));
      //   old_vocab.push(newWords);
      //   localStorage.setItem("vocab_correct", JSON.stringify(old_vocab));
    }
  };
  //------------------------------------------------------------------------start

  const handleInCorrect = async () => {
    //if incorrect field doesn't exit create one and add to it
    try {
      if (!wordsOnly.test(newWords)) {
        //     // console.log("wrong");

        setDisplayAlphabetsOnly("alphabets only");
        //     alphabetsOnly();
      } else {
        //if newWords.length < 2.. at least 3 and no white spaces

        //get data firebase --works

        const docRef = doc(db, "spell", uid);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data().incorrect;
        //   console.log(userData);

        const dataToBeAdded = newWords;
        if (userData.includes(dataToBeAdded)) {
          // console.log('already there');
          setAlreadyThere("already in the system");
        }
        await updateDoc(docRef, {
          incorrect: arrayUnion(dataToBeAdded),
        });
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    //get data firebase --works

    try {
      const getInfo = async () => {
        const docRef = doc(db, "spell", uid);

        const docSnap = await getDoc(docRef);

        const userData = docSnap.data();
        if (!userData) {
          await setDoc(doc(db, "spell", uid), { correct: [], incorrect: [] });
          console.log("created", userData);
        }
        await setWordsList(userData);
        // else {
        //   setWordsList(userData);
        // }
        console.log(userData);
      };
      getInfo();
      //if the document doesn't exit
      // 1. create document and empty arrays for correct and incorrect
    } catch (e) {
      console.log(e.message);
    }
  }, [uid]);

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
      <Suspense fallback={<div>...loading</div>}>
        <CorrectList wordsList={wordsList} />
      </Suspense>
    </div>
  );
};

export default FirstPage;
