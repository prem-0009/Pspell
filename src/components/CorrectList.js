import React, { useEffect, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
// import { Stack } from "@mui/material";
import { db } from "../firebase/config";
import {
  //   getFirestore,
  //   collection,
  //   getDocs,
  //   addDoc,
  //   updateDoc,
  doc,
  setDoc,
  getDoc,
  deleteField,
  updateDoc,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";
// /lite";
// import {  ndoc as doc, onSnapshot } from "firebase/firestore";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
// --------------------------------------------------------------------------------start main
const CorrectList = ({
  wordsList,
  setWordsList,
  uid,
  correctList,
  incorrectList,
  setIncorrectList,
  setCorrectList,
}) => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  
  let newData = [];

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  //--------------------------------------------------------delete chip
  const handleDeleteCorrect = async (toDelete) => {
    const docRef = doc(db, "spell", uid);
    // -------------to remove from firebase
    await updateDoc(docRef, {
      correct: arrayRemove(toDelete),
    });
    // ----------to remove from display
    setCorrectList(correctList.filter((item) => item !== toDelete));
    console.log(correctList);
  };

  //--------------------------------------------------------delete chip
  const handleDeleteIncorrect = async (toDelete) => {
    const docRef = doc(db, "spell", uid);

    await updateDoc(docRef, {
      incorrect: arrayRemove(toDelete),
    });

    setIncorrectList(incorrectList.filter((item) => item !== toDelete));
    console.log(incorrectList);
  };

  //--------------------------------------------------------useEffect
  useEffect(() => {
    console.log("newData", wordsList);
    
  }, [uid]);

  //--------------------------------------------------------return
  return (
    <Box
      sx={{
        width: "98vw",
        // height: "68vh",
        margin: "auto",
        // marginTop: "2vh",
        // height:'25vh'
        // border:'2px solid black'
        // position:'fixed'
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          //   position: "fixed",
          //   margin: "0",
          width: "97%",
          //   border: "2px solid black",
          marginLeft: "2%",
          //   zIndex: "1",
          backgroundColor: "white",
          //   marginBottom: "1vh",
        }}
      >
        <Tabs
          centered
          value={selectedTab}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="CORRECT" {...a11yProps(0)} />
          <Tab label="INCORRECT" {...a11yProps(1)} />
        </Tabs>
      </Box>

      {/* ------------------------------------------------------------correct list */}
      <Suspense fallback={<div>...loading</div>}>
        {correctList &&
          selectedTab === 0 &&
          correctList.map((item, i) => {
            return (
              <Chip
                label={item}
                variant="outlined"
                onDelete={() => handleDeleteCorrect(item)}
                key={i}
                color="success"
                variant="outlined"
              />
            );
          })}
      </Suspense>
      {/* ------------------------------------------------------------incorrect list */}
      {incorrectList &&
        selectedTab === 1 &&
        incorrectList.map((item, i) => {
          return (
            <Chip
              label={item}
              variant="outlined"
              onDelete={() => handleDeleteIncorrect(item)}
              key={i}
              color="error"
              variant="outlined"
            />
          );
        })}
    </Box>
  );
};

export default CorrectList;
