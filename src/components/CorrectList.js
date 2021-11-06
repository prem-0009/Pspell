import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
// import { IncorrectList } from "./IncorrectList";

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
// -------------------------------------------------------------------start
const CorrectList = ({ wordsList }) => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  //   console.log(wordsList);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  //-----------------------------------------------------------------------delete chip
  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  useEffect(() => {
    console.log(wordsList);
  }, []);

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
      {selectedTab === 0 &&
        wordsList &&
        wordsList.correct.map((item, i) => {
          return (
            <Chip
              label={item}
              variant="outlined"
              onDelete={handleDelete}
              key={i}
              color='success'
              variant='outlined'
            />
          );
        })}
      {/* ------------------------------------------------------------incorrect list */}
      {selectedTab === 1 &&
        wordsList &&
        wordsList.incorrect.map((item, i) => {
          return (
            <Chip
              label={item}
              variant="outlined"
              onDelete={handleDelete}
              key={i}
              color='primary'
              variant='outlined'
            />
          );
        })}
    </Box>
  );
};

export default CorrectList;
