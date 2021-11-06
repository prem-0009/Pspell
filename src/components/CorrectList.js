import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
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
  const [value, setValue] = React.useState(0);
//   console.log(wordsList);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log(wordsList);
  }, [ ]);

  return (
    <Box
      sx={{
        width: "98vw",
        height: "68vh",
        margin: "auto",
        marginTop: "2vh",
        // border:'2px solid black'
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          centered
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="CORRECT" {...a11yProps(0)} />
          <Tab label="INCORRECT" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {wordsList &&
          wordsList.correct.map((item, i) => {
            return (
                
                  <li key={i}>{item}</li>
                
            );
          })}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {wordsList &&
          wordsList.incorrect.map((item, i) => {
            return (
                
                  <li key={i}>{item}</li>
                
            );
          })}
        
      </TabPanel>
    </Box>
  );
};

export default CorrectList;
