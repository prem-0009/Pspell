import { useState, useEffect } from "react";
import { Button, Stack } from "@mui/material";

import { SearchWord } from "../components/SearchWord";
import { alphabetsOnly } from "../hooks/useHooks";
import { db, } from "../firebase/config";

// import { db } from "firebase/firestore";
import { firebase } from "../firebase/config";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';


// import { getDocs } from "firebase/firestore";
import "../App.css";

const FirstPage = () => {
  const [list, setList] = useState([]);
  const [newWords, setNewWords] = useState("");
  const [inCorrect, setInCorrect] = useState("");
  // const [correctVocab, setCorrectVocab] = useState([]);

  const [displayAlphabetsOnly, setDisplayAlphabetsOnly] = useState(
    "Type some words..."
  );

  const [correctVocab, setCorrectVocab] = useState(
    JSON.parse(localStorage.getItem("vocab_correct"))
  );

  const [inCorrectVocab, setInCorrectVocab] = useState(
    JSON.parse(localStorage.getItem("vocab_incorrect"))
  );

  const wordsOnly = /^[a-zA-Z]+$/;
  //------------------------------------------------------------------------start
  const handleChange = async (e) => {
    //-------------firebase

    // const spellRef = db.collection('spell');
    // const doc = await spellRef.get();
    // console.log(doc);

    // const spellRef = collection(db, "spell");
    // .doc("spell-correct");
    // console.log(spellRef);

    // const doc = await spellRef.get();
    // console.log(doc.data());

    // const getData = await getDocs(spellRef);
    // setList(getData.docs.map((doc)=>({...doc.data(), id:doc.id})))

    // console.log(list);

    //-------------firebase
    setNewWords(e.target.value);

    if (!wordsOnly.test(newWords)) {
      console.log("wrong");

      setDisplayAlphabetsOnly("alphabets only");
    } else {
      setNewWords(e.target.value);
    }

    if (!newWords) {
      setDisplayAlphabetsOnly("Type words here..");
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

  const handleCorrect = async () => {
    
console.log(newWords);

    

    if (localStorage.getItem("vocab_correct") === null) {
      localStorage.setItem("vocab_correct", "[]");
    }

    if (!wordsOnly.test(newWords)) {
      console.log("wrong");

      setDisplayAlphabetsOnly("alphabets only");
      alphabetsOnly();
    } else {
      const old_vocab = JSON.parse(localStorage.getItem("vocab_correct"));
      old_vocab.push(newWords);
      localStorage.setItem("vocab_correct", JSON.stringify(old_vocab));
    }
  };
  //------------------------------------------------------------------------start

  const handleInCorrect = async() => {

    // const spellRef = collection(db, 'spell').doc('IapgnvApxJf8d9LQaKSd')
    // db.collection('spell').doc('IapgnvApxJf8d9LQaKSd');

    // console.log(spellRef);
    
    // const res = await spellRef.set({...spell, newWords})
    // db.collection('spell').doc("IapgnvApxJf8d9LQaKSd").set({...spell, newWords})
    
    if (localStorage.getItem("vocab_incorrect") === null) {
      localStorage.setItem("vocab_incorrect", "[]");
    }

    if (!wordsOnly.test(newWords)) {
      console.log("wrong");

      setDisplayAlphabetsOnly("alphabets only");
      alphabetsOnly();
    } else {
      const vocab_incorrect = JSON.parse(
        localStorage.getItem("vocab_incorrect")
      );
      vocab_incorrect.push(newWords);
      localStorage.setItem("vocab_incorrect", JSON.stringify(vocab_incorrect));
    }
  };

  useEffect(() => {
    async function getCities(db) {
        const citiesCol = collection(db, 'spell');
        const citySnapshot = await getDocs(citiesCol);
        const cityList = citySnapshot.docs.map(doc => ({...doc.data(),id:doc.id}));
        console.log(cityList);
        
        return cityList;
      }

    //   const data = 
    // const spellRef = db.collection('spell').doc('hi');
    // const res = await spellRef.set({
        
    // })
      
      getCities(db)
  }, []);

  return (
    <div className="App">
      <Stack spacing={6} direction="row" className="top-buttons">
        <Button variant="outlined" color="success">
          correct List
        </Button>
        <Button variant="outlined" color="error">
          incorrect List
        </Button>
      </Stack>
      <div className="middle-buttons">
        <SearchWord
          newWords={newWords}
          handleChange={handleChange}
          displayAlphabetsOnly={displayAlphabetsOnly}
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
    </div>
  );
};

export default FirstPage;
