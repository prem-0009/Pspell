import React, { useState, useEffect, lazy, Suspense, useRef } from "react";
import { Button, Stack } from "@mui/material";
import { SearchWord } from "../components/SearchWord";
import { db } from "../firebase/config";
import { updateDoc, doc, setDoc, getDoc, arrayUnion } from "firebase/firestore";
import "../App.css";
import { alphabetsOnly } from "../hooks/useHooks";
const WordsList = lazy(() => import("./WordsList"));

//------------------------------------------------------------------------start main
const FirstPage = ({ uid }) => {
  const [newWords, setNewWords] = useState("");
  const [alreadyThere, ] = useState("");
  // eslint-disable-next-line
  const [displayError, setDisplayError] = useState();
  const [wordsList, setWordsList] = useState(null);
  const [displayAlphabetsOnly, setDisplayAlphabetsOnly] = useState(
    "Type some words..."
  );
  const [correctList, setCorrectList] = useState();
  const [incorrectList, setIncorrectList] = useState();
  const wordsOnly = /^[a-zA-Z]+$/;
  // ----------------------------------------useRef
  const newIncorrectData = useRef();
  const newCorrectData = useRef();

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
      alphabetsOnly();
    } else {
      const text = e.target.value;
      const utterance = new SpeechSynthesisUtterance(text);

      utterance.rate = 1;
      speechSynthesis.speak(utterance);
    }
  };

  //------------------------------------------------------------------------start

  const handleAddOrNot = async (e) => {
    console.log(e);
    
    if (!wordsOnly.test(newWords)) {
      setDisplayAlphabetsOnly("alphabets only");
      alphabetsOnly();
    } else if (newWords.length < 3) {
      setDisplayAlphabetsOnly("more than 3 alphabets..");
    } else {
      const docRef = doc(db, "spell", uid);
      // const docSnap = await getDoc(docRef);
      // const userData = docSnap.data().correct;

      const dataToBeAdded = newWords;

      // if (userData.includes(dataToBeAdded)) {
      //   setAlreadyThere("already in the system");
      // }
      //--------------------adding to local array correct for display without refresh
            if (correctList.includes(newWords) || incorrectList.includes(newWords)) {
              setDisplayAlphabetsOnly("already in the list");
            } else {
              // console.log('in here');
                if(e==='correct'){

                  setCorrectList([...correctList, newWords]);
                  await updateDoc(docRef, {
                    correct: arrayUnion(dataToBeAdded),
                  });
                  // console.log('added in co..');
                }
                if(e==='incorrect'){
                  setIncorrectList([...incorrectList, newWords]);
                  await updateDoc(docRef, {
                    incorrect: arrayUnion(dataToBeAdded),
                  });
                  // console.log('added in inco..');
                }
              
            }
    }
  };

  

  //------------------------------------------------------------------------start
  useEffect(() => {
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

        // ----------------------------------------ref
        newCorrectData.current = [...userData.correct];
        setCorrectList([...newCorrectData.current]);

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
          >
            play{" "}
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={()=>handleAddOrNot("correct")}
            size="medium"
            value="correct"
            >
            add to correct
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={()=>handleAddOrNot('incorrect')}
            size="medium"
            value="inCorrect"
          >
            add to incorrect
          </Button>
        </Stack>
      </div>
      <div className="list-words">
        <Suspense fallback={<div>...loading</div>}>
          <WordsList
            uid={uid}
            correctList={correctList}
            incorrectList={incorrectList}
            setCorrectList={setCorrectList}
            setIncorrectList={setIncorrectList}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default FirstPage;
