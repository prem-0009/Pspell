import { useState, useEffect } from "react";
import { Button, Stack } from "@mui/material";

import { SearchWord } from "../components/SearchWord";
import { alphabetsOnly } from "../hooks/useHooks";
import { db } from "../firebase/config";

// import { db } from "firebase/firestore";
import { firebase } from "../firebase/config";
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
// import { collection, doc, setDoc } from "firebase/firestore";

// import { getDocs } from "firebase/firestore";
import "../App.css";

const FirstPage = ({ uid }) => {
  const [list, setList] = useState();
  const [newWords, setNewWords] = useState("");
  const [incorrect, setIncorrect] = useState();
  const [correct, setCorrect] = useState();
  const [alreadyThere, setAlreadyThere] = useState("");
  // const [correctVocab, setCorrectVocab] = useState([]);
  //   for firebase
  //   --works
  const spellCollectionRef = collection(db, "spell");

  const [displayAlphabetsOnly, setDisplayAlphabetsOnly] = useState(
    "Type some words..."
  );

  //   console.log(uid);

  //   const [correctVocab, setCorrectVocab] = useState(
  //     JSON.parse(localStorage.getItem("vocab_correct"))
  //   );

  //   const [inCorrectVocab, setInCorrectVocab] = useState(
  //     JSON.parse(localStorage.getItem("vocab_incorrect"))
  //   );

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

    // if (localStorage.getItem("vocab_correct") === null) {
    //   localStorage.setItem("vocab_correct", "[]");
    // }

    if (!wordsOnly.test(newWords)) {
      console.log("right");

      setDisplayAlphabetsOnly("alphabets only");
      alphabetsOnly();
    } else {
      const old_vocab = JSON.parse(localStorage.getItem("vocab_correct"));
      old_vocab.push(newWords);
      localStorage.setItem("vocab_correct", JSON.stringify(old_vocab));
    }
  };
  //------------------------------------------------------------------------start

  const handleInCorrect = async () => {
    //if incorrect field doesn't exit create one and add to it

    //get data firebase --works
    const docRef = doc(db, "spell", uid);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data().incorrect;
    console.log(userData);

    const dataToBeAdded = newWords;
    if (userData.includes(dataToBeAdded)) {
      // console.log('already there');
      setAlreadyThere("already in the system");
    }
    await updateDoc(docRef, {
      incorrect: arrayUnion(dataToBeAdded),
    });
    // if (docSnap) {

    // }

    // if (!userData) {
    //   await setDoc(doc(db, "spell", uid), { correct: [], incorrect: [] });
    // }
    // //if incorrect exist add to it
    // if (userData) {

    //   //   await updateDoc(docRef, {incorrect:[...incorrect, dataToBeAdded]})
    //   //update the firestore data

    //   //   userData = [...userData, dataToBeAdded]
    // }

    // if()

    // console.log(docSnap.data().incorrect);

    //to add a new doc to a collection
    // await setDoc(doc(spellCollectionRef, uid), {regions: ["west_coast", "norcal"] });

    // --works but without my uid
    //   await addDoc(spellCollectionRef, {incorrect: [newWords],})

    // if (localStorage.getItem("vocab_incorrect") === null) {
    //   localStorage.setItem("vocab_incorrect", "[]");
    // }

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

  useEffect(async () => {
    //get data firebase --works
    const docRef = doc(db, "spell", uid);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data();

    //if the doc exist
    //1. get the both arrays ..correct and incorrect
    // if (userData) {
    //   console.log(docSnap.data());

    //   setList(docSnap.doc.map((item) => ({ ...item.data() })));
    //   console.log(list);
    // console.log(data.data().incorrect);

    //   console.log(userData);
    // }

    //if the document doesn't exit
    // 1. create document and empty arrays for correct and incorrect
    if (!userData) {
      await setDoc(doc(db, "spell", uid), { correct: [], incorrect: [] });
      console.log("created", userData);
    }
    console.log(userData);

    //   console.log(userData.incorrect);
    // if()
    // const docData = {
    //   correct: ['test'],
    //   incorrect: ['testIn'],
    // };

    // let userData;
    // if(docSnap){

    // }

    // async function getCities(db) {
    //     if(data){

    //         setIncorrect(await data.data().incorrect)
    //         setCorrect(await data.data().correct)
    //     }
    //why is it syncing late ????????????????????
    // console.log(incorrect);
    // console.log(correct);

    //   const citiesCol = collection(db, "spell", uid);
    //   const citySnapshot = await getDocs(citiesCol);
    //   console.log(citySnapshot);

    //   const cityList = citySnapshot.docs.map((doc) => ({
    //     ...doc.data(),
    //     // id: uid,
    //   }));
    //   console.log(cityList);

    //   return cityList;

    //   const data =
    // const spellRef = db.collection('spell').doc('hi');
    // const res = await spellRef.set({

    // })

    // getCities(db);
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
          alreadyThere={alreadyThere}
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
