import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export const SearchWord = ({ newWords, handleChange, displayAlphabetsOnly }) => {
  return (
    <div className='search-cp'>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="filled-basic"
          label={displayAlphabetsOnly}
          variant="filled"
          value={newWords}
          onChange={(e) => handleChange(e)}
        />
      </Box>
    </div>
  );
};
