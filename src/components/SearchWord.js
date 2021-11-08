import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export const SearchWord = ({
  newWords,
  handleChange,
  displayAlphabetsOnly,
  displayError,
}) => {
  return (
    <div className="search-cp">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          // error
          id="filled-error-helper-text"
          // label="Error"
          // defaultValue="write some word.."
          value={newWords}
          helperText={displayAlphabetsOnly}
          variant="filled"
          onChange={(e) => handleChange(e)}
          type="text"
        />
      </Box>
    </div>
  );
};
